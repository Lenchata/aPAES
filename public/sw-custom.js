/**
 * sw-custom.js — injected into the generated service worker by next-pwa
 * Handles Background Sync for offline user data writes.
 */

const SYNC_TAG = 'apaes-user-data-sync';
const USER_DATA_URL = '/api/user/data';
const GLOBAL_EXAMS_URL = '/api/global-exams';
const CACHE_NAME = 'apaes-api-cache-v1';

// ── Cache global exams on fetch (read-only, safe to cache) ──────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache global exams with stale-while-revalidate
  if (url.pathname === GLOBAL_EXAMS_URL && event.request.method === 'GET') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        const networkFetch = fetch(event.request)
          .then((res) => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
  }
});

// ── Background Sync: flush pending user data writes ─────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === SYNC_TAG) {
    event.waitUntil(flushPendingWrites());
  }
});

async function flushPendingWrites() {
  // Open the same IndexedDB used by the app
  const db = await openDB('apaes-offline', 1);
  const queue = await getAllFromStore(db, 'sync_queue');

  if (queue.length === 0) return;

  // Send only the latest snapshot
  const latest = queue[queue.length - 1];
  try {
    const res = await fetch(USER_DATA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latest.data),
    });

    if (res.ok) {
      await clearStore(db, 'sync_queue');
    }
  } catch {
    // Will retry on next sync event
    throw new Error('Sync failed, will retry');
  }
}

// ── Minimal IndexedDB helpers (no external deps in SW) ──────────────────────
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, version);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function getAllFromStore(db, storeName) {
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => resolve(req.result ?? []);
      req.onerror = () => reject(req.error);
    } catch {
      resolve([]);
    }
  });
}

function clearStore(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
