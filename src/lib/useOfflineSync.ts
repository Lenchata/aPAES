/**
 * useOfflineSync.ts
 * React hook that replaces the raw fetch-based sync() in page.tsx.
 *
 * Strategy:
 *  1. On every state change, write to IndexedDB immediately (always works offline).
 *  2. If online, also POST to /api/user/data right away.
 *  3. If offline (or the POST fails), enqueue the write.
 *  4. When the browser comes back online, flush the queue — sending only the
 *     latest snapshot (no need to replay every intermediate write).
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import {
  saveLocalData,
  getLocalData,
  enqueuePendingSync,
  getPendingQueue,
  clearPendingQueue,
} from './offlineDB';

const SYNC_URL = '/api/user/data';

async function postToServer(data: object): Promise<boolean> {
  try {
    const res = await fetch(SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'offline' | 'pending';

export function useOfflineSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const flushingRef = useRef(false);

  // ── Flush the pending queue to the server ──────────────────────────────────
  const flushQueue = useCallback(async () => {
    if (flushingRef.current) return;
    flushingRef.current = true;
    setSyncStatus('syncing');

    try {
      const queue = await getPendingQueue();
      if (queue.length === 0) {
        setSyncStatus('synced');
        return;
      }

      // Only send the latest snapshot — no need to replay every intermediate write
      const latest = queue[queue.length - 1];
      const ok = await postToServer(latest.data);

      if (ok) {
        await clearPendingQueue();
        setSyncStatus('synced');
      } else {
        setSyncStatus('offline');
      }
    } finally {
      flushingRef.current = false;
    }
  }, []);

  // ── Online / offline listeners ─────────────────────────────────────────────
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      flushQueue();
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Flush on mount in case there are pending items from a previous session
    if (navigator.onLine) flushQueue();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [flushQueue]);

  // ── Main sync function (replaces the old sync() in page.tsx) ──────────────
  const sync = useCallback(async (data: object) => {
    // 1. Always persist locally first
    await saveLocalData(data);

    if (isOnline) {
      setSyncStatus('syncing');
      const ok = await postToServer(data);
      if (ok) {
        setSyncStatus('synced');
        return;
      }
    }

    // 2. Offline or server unreachable — enqueue
    await enqueuePendingSync(data);
    setSyncStatus('pending');

    // Register a Background Sync tag so the SW can flush when connectivity returns
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      try {
        const reg = await navigator.serviceWorker.ready;
        await (reg as any).sync.register('apaes-user-data-sync');
      } catch {
        // Background Sync not supported — the online listener will handle it
      }
    }
  }, [isOnline]);

  // ── Load initial data (tries server first, falls back to IndexedDB) ────────
  const loadData = useCallback(async (): Promise<object | null> => {
    if (isOnline) {
      try {
        const res = await fetch(SYNC_URL);
        if (res.ok) {
          const serverData = await res.json();
          // Cache the fresh server data locally
          if (serverData && Object.keys(serverData).length > 0) {
            await saveLocalData(serverData);
          }
          return serverData;
        }
      } catch {
        // fall through to local
      }
    }

    // Offline or server failed — use local cache
    const local = await getLocalData();
    if (local) setSyncStatus('pending');
    return local;
  }, [isOnline]);

  return { sync, loadData, syncStatus, isOnline };
}
