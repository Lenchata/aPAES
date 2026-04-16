import { query } from './db';

export const rpName = 'aPAES Entrenamiento';
export const rpID = process.env.NEXT_PUBLIC_RP_ID || 'localhost';
export const origin = process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3000';

// ── Users ─────────────────────────────────────────────────────────────────────

export async function getUserByUsername(username: string) {
  const rows = await query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0] ?? null;
}

export async function getUserById(userId: string) {
  const rows = await query('SELECT * FROM users WHERE id = $1', [userId]);
  return rows[0] ?? null;
}

export async function getUserCredentials(userId: string) {
  const rows = await query('SELECT * FROM credentials WHERE user_id = $1', [userId]);
  return rows.map(r => ({
    id: r.id as string,
    public_key: new Uint8Array(r.public_key),
    counter: r.counter as number,
    device_type: r.device_type as string,
    backed_up: !!r.backed_up,
    transports: (r.transports as string[]) || [],
  }));
}

export async function saveUserRegistrationOptions(userId: string, challenge: string, username: string) {
  await query(
    `INSERT INTO users (id, username, current_challenge) VALUES ($1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET current_challenge = $3`,
    [userId, username, challenge]
  );
}

export async function saveUserChallenge(userId: string, challenge: string) {
  await query('UPDATE users SET current_challenge = $1 WHERE id = $2', [challenge, userId]);
}

export async function saveCredential(userId: string, credential: {
  id: string; public_key: Uint8Array; counter: number;
  device_type: string; backed_up: boolean; transports: string[];
}) {
  await query(
    `INSERT INTO credentials (id, user_id, public_key, counter, device_type, backed_up, transports)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [credential.id, userId, Buffer.from(credential.public_key), credential.counter,
     credential.device_type, credential.backed_up, credential.transports]
  );
}

export async function getCredentialById(credentialId: string) {
  const rows = await query('SELECT * FROM credentials WHERE id = $1', [credentialId]);
  return rows[0] ?? null;
}

export async function updateCredentialCounter(credentialId: string, counter: number) {
  await query('UPDATE credentials SET counter = $1 WHERE id = $2', [counter, credentialId]);
}

export async function getUserData(userId: string) {
  const rows = await query('SELECT data FROM user_data WHERE user_id = $1', [userId]);
  return rows[0]?.data ?? null;
}

export async function saveUserData(userId: string, data: any) {
  await query(
    `INSERT INTO user_data (user_id, data, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (user_id) DO UPDATE SET data = $2, updated_at = now()`,
    [userId, JSON.stringify(data)]
  );
}

export async function getAllUsers() {
  const rows = await query('SELECT id, username FROM users');
  return rows;
}

export async function deleteUser(id: string) {
  await query('DELETE FROM users WHERE id = $1', [id]);
}

// ── Admins ────────────────────────────────────────────────────────────────────

export async function getAdminByUsername(username: string) {
  const rows = await query('SELECT * FROM admins WHERE username = $1', [username]);
  return rows[0] ?? null;
}

export async function getAdminById(id: string) {
  const rows = await query('SELECT * FROM admins WHERE id = $1', [id]);
  return rows[0] ?? null;
}

export async function saveAdminChallenge(id: string, challenge: string) {
  await query('UPDATE admins SET current_challenge = $1 WHERE id = $2', [challenge, id]);
}

export async function getAdminCredentials(adminId: string) {
  const rows = await query('SELECT * FROM admin_credentials WHERE admin_id = $1', [adminId]);
  return rows.map(r => ({
    id: r.id as string,
    publicKey: new Uint8Array(r.public_key),
    counter: r.counter as number,
    transports: (r.transports as string[]) || [],
  }));
}

export async function getAdminCredentialById(credentialId: string) {
  const rows = await query('SELECT * FROM admin_credentials WHERE id = $1', [credentialId]);
  return rows[0] ?? null;
}

export async function updateAdminCredentialCounter(credentialId: string, counter: number) {
  await query('UPDATE admin_credentials SET counter = $1 WHERE id = $2', [counter, credentialId]);
}

export async function saveAdminCredential(adminId: string, credential: {
  id: string; publicKey: Uint8Array; counter: number; transports: string[];
}) {
  await query(
    `INSERT INTO admin_credentials (id, admin_id, public_key, counter, transports)
     VALUES ($1, $2, $3, $4, $5)`,
    [credential.id, adminId, Buffer.from(credential.publicKey), credential.counter, credential.transports]
  );
  await query('UPDATE admins SET password_hash = NULL WHERE id = $1', [adminId]);
}

export async function getAllAdmins() {
  const rows = await query('SELECT id, username, (password_hash IS NOT NULL) as has_password FROM admins');
  return rows;
}

export async function deleteAdmin(id: string) {
  await query('DELETE FROM admins WHERE id = $1', [id]);
}

export async function createAdmin(id: string, username: string, password_hash: string) {
  await query(
    'INSERT INTO admins (id, username, password_hash) VALUES ($1, $2, $3)',
    [id, username, password_hash]
  );
}

export async function adminCount() {
  const rows = await query('SELECT COUNT(*) as count FROM admins');
  return parseInt(rows[0].count, 10);
}

// ── Global Exams ──────────────────────────────────────────────────────────────

export async function getGlobalExams() {
  const rows = await query('SELECT * FROM global_exams ORDER BY created_at DESC');
  return rows.map(r => ({
    id: r.id as string,
    metadata: r.metadata,
    data: r.questions,
    isGlobal: true,
  }));
}

export async function saveGlobalExam(metadata: any, questions: any) {
  await query(
    'INSERT INTO global_exams (metadata, questions) VALUES ($1, $2)',
    [JSON.stringify(metadata), JSON.stringify(questions)]
  );
}

export async function deleteGlobalExam(id: string) {
  await query('DELETE FROM global_exams WHERE id = $1', [id]);
}
