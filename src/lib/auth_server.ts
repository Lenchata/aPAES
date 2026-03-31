import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  VerifiedRegistrationResponse,
  VerifiedAuthenticationResponse,
} from '@simplewebauthn/server';
import { isoUint8Array } from '@simplewebauthn/server/helpers';
import db from './db';

// Replying Party (RP) info
const rpName = 'aPAES Entrenamiento';
const rpID = process.env.NEXT_PUBLIC_RP_ID || 'localhost';
const origin = process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3000';

export interface UserCredential {
  id: string; // base64url encoded
  public_key: Uint8Array;
  counter: number;
  device_type: string;
  backed_up: boolean;
  transports: string[]; // JSON stringified in DB
}

export function getUserByUsername(username: string) {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
}

export function getUserById(userId: string) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
}

export function getUserCredentials(userId: string) {
  const rows = db.prepare('SELECT * FROM credentials WHERE user_id = ?').all(userId) as any[];
  return rows.map(row => ({
    id: row.id,
    public_key: new Uint8Array(row.public_key as Buffer),
    counter: row.counter,
    device_type: row.device_type,
    backed_up: !!row.backed_up,
    transports: JSON.parse(row.transports || '[]')
  }));
}

export function saveUserRegistrationOptions(userId: string, challenge: string, username: string) {
  // upsert user if registration starts
  const existing = getUserById(userId);
  if (!existing) {
    db.prepare('INSERT INTO users (id, username, current_challenge) VALUES (?, ?, ?)')
      .run(userId, username, challenge);
  } else {
    db.prepare('UPDATE users SET current_challenge = ? WHERE id = ?')
      .run(challenge, userId);
  }
}

export function saveUserChallenge(userId: string, challenge: string) {
  db.prepare('UPDATE users SET current_challenge = ? WHERE id = ?').run(challenge, userId);
}

export function saveCredential(userId: string, credential: UserCredential) {
  db.prepare(`
    INSERT INTO credentials (id, user_id, public_key, counter, device_type, backed_up, transports)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    credential.id,
    userId,
    Buffer.from(credential.public_key),
    credential.counter,
    credential.device_type,
    credential.backed_up ? 1 : 0,
    JSON.stringify(credential.transports)
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Admins
// ────────────────────────────────────────────────────────────────────────────

export function getAdminByUsername(user: string) {
  return db.prepare('SELECT * FROM admins WHERE username = ?').get(user) as any;
}

export function getAdminById(id: string) {
  return db.prepare('SELECT * FROM admins WHERE id = ?').get(id) as any;
}

export function saveAdminChallenge(id: string, challenge: string) {
  db.prepare('UPDATE admins SET current_challenge = ? WHERE id = ?').run(challenge, id);
}

export function getAdminCredentials(id: string) {
  const rows = db.prepare('SELECT * FROM admin_credentials WHERE admin_id = ?').all(id) as any[];
  return rows.map(r => ({
    id: r.id,
    publicKey: new Uint8Array(r.public_key as Buffer),
    counter: r.counter,
    transports: JSON.parse(r.transports || '[]')
  }));
}

export function saveAdminCredential(adminId: string, credential: any) {
  db.prepare(`
    INSERT INTO admin_credentials (id, admin_id, public_key, counter, transports)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    credential.id,
    adminId,
    Buffer.from(credential.publicKey),
    credential.counter,
    JSON.stringify(credential.transports)
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Global Exams
// ────────────────────────────────────────────────────────────────────────────

export function getGlobalExams() {
  const rows = db.prepare('SELECT * FROM global_exams ORDER BY created_at DESC').all() as any[];
  return rows.map(r => ({
    id: r.id,
    metadata: JSON.parse(r.metadata),
    data: JSON.parse(r.questions),
    isGlobal: true,
  }));
}

export function saveGlobalExam(metadata: any, questions: any) {
  db.prepare('INSERT INTO global_exams (metadata, questions) VALUES (?, ?)')
    .run(JSON.stringify(metadata), JSON.stringify(questions));
}

export function deleteGlobalExam(id: number) {
  db.prepare('DELETE FROM global_exams WHERE id = ?').run(id);
}

export { rpName, rpID, origin };
