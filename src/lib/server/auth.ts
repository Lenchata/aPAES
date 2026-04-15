import { getCollection } from './db';
import { Binary, type WithId, type Document } from 'mongodb';

// Replying Party (RP) info
export const rpName = 'aPAES Entrenamiento';
export const rpID = process.env.PUBLIC_RP_ID || 'localhost';
export const origin = process.env.PUBLIC_ORIGIN || 'http://localhost:5173';

export interface UserCredential {
  id: string; // base64url encoded
  public_key: Uint8Array;
  counter: number;
  device_type: string;
  backed_up: boolean;
  transports: string[];
}

export async function getUserByUsername(username: string) {
  const users = await getCollection('users');
  return users.findOne({ username });
}

export async function getUserById(userId: string) {
  const users = await getCollection('users');
  return users.findOne({ _id: userId as any });
}

export async function getUserCredentials(userId: string) {
  const users = await getCollection('users');
  const user = await users.findOne({ _id: userId as any });
  if (!user || !user.credentials) return [];
  
  return (user.credentials as any[]).map(cred => ({
    id: cred.id,
    public_key: new Uint8Array(cred.public_key.buffer),
    counter: cred.counter,
    device_type: cred.device_type,
    backed_up: !!cred.backed_up,
    transports: cred.transports || []
  }));
}

export async function saveUserRegistrationOptions(userId: string, challenge: string, username: string) {
  const users = await getCollection('users');
  await users.updateOne(
    { _id: userId as any },
    { $set: { username, current_challenge: challenge } },
    { upsert: true }
  );
}

export async function saveUserChallenge(userId: string, challenge: string) {
  const users = await getCollection('users');
  await users.updateOne({ _id: userId as any }, { $set: { current_challenge: challenge } });
}

export async function saveCredential(userId: string, credential: UserCredential) {
  const users = await getCollection('users');
  await users.updateOne(
    { _id: userId as any },
    { 
      $push: { 
        credentials: {
          id: credential.id,
          public_key: new Binary(Buffer.from(credential.public_key)),
          counter: credential.counter,
          device_type: credential.device_type,
          backed_up: credential.backed_up,
          transports: credential.transports
        } 
      } as any
    }
  );
}

export async function updateCredentialCounter(id: string, newCounter: number) {
  const users = await getCollection('users');
  await users.updateOne(
    { 'credentials.id': id },
    { $set: { 'credentials.$.counter': newCounter } }
  );
}

export async function getUserByCredentialId(id: string) {
  const users = await getCollection('users');
  return users.findOne({ 'credentials.id': id });
}

export async function getUserData(userId: string) {
  const userData = await getCollection('user_data');
  const row = await userData.findOne({ user_id: userId });
  return row ? row.data : null;
}

export async function saveUserData(userId: string, data: any) {
  const userData = await getCollection('user_data');
  await userData.updateOne(
    { user_id: userId },
    { $set: { data, updated_at: new Date() } },
    { upsert: true }
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Admins
// ────────────────────────────────────────────────────────────────────────────

export async function getAdminByUsername(username: string) {
  const admins = await getCollection('admins');
  return admins.findOne({ username });
}

export async function getAdminById(id: string) {
  const admins = await getCollection('admins');
  return admins.findOne({ _id: id as any });
}

export async function saveAdminChallenge(id: string, challenge: string) {
  const admins = await getCollection('admins');
  await admins.updateOne({ _id: id as any }, { $set: { current_challenge: challenge } });
}

export async function getAdminCredentials(id: string) {
  const admins = await getCollection('admins');
  const admin = await admins.findOne({ _id: id as any });
  if (!admin || !admin.credentials) return [];
  
  return (admin.credentials as any[]).map(r => ({
    id: r.id,
    publicKey: new Uint8Array(r.public_key.buffer),
    counter: r.counter,
    transports: r.transports || []
  }));
}

export async function saveAdminCredential(adminId: string, credential: any) {
  const admins = await getCollection('admins');
  await admins.updateOne(
    { _id: adminId as any },
    { 
      $push: { 
        credentials: {
          id: credential.id,
          public_key: new Binary(Buffer.from(credential.publicKey)),
          counter: credential.counter,
          transports: credential.transports
        } 
      } as any,
      $set: { password_hash: null }
    }
  );
}

export async function getAllUsers() {
  const users = await getCollection('users');
  return users.find({}, { projection: { username: 1 } }).toArray();
}

export async function getAllAdmins() {
  const admins = await getCollection('admins');
  const list = await admins.find({}, { projection: { username: 1, password_hash: 1 } }).toArray();
  return list.map(a => ({
    _id: a._id,
    username: a.username,
    has_password: a.password_hash !== null
  }));
}

export async function getAdminByCredentialId(id: string) {
  const admins = await getCollection('admins');
  return admins.findOne({ 'credentials.id': id });
}

export async function updateAdminCredentialCounter(id: string, newCounter: number) {
  const admins = await getCollection('admins');
  await admins.updateOne(
    { 'credentials.id': id },
    { $set: { 'credentials.$.counter': newCounter } }
  );
}

export async function deleteUser(id: string) {
  const users = await getCollection('users');
  await users.deleteOne({ _id: id as any });
}

export async function deleteAdmin(id: string) {
  const admins = await getCollection('admins');
  await admins.deleteOne({ _id: id as any });
}

// ────────────────────────────────────────────────────────────────────────────
// Global Exams
// ────────────────────────────────────────────────────────────────────────────

export async function getGlobalExams() {
  const exams = await getCollection('global_exams');
  const rows = await exams.find({}).sort({ created_at: -1 }).toArray();
  return rows.map(r => ({
    id: r._id,
    metadata: r.metadata,
    data: r.questions,
    isGlobal: true,
  }));
}

export async function saveGlobalExam(metadata: any, questions: any) {
  const exams = await getCollection('global_exams');
  await exams.insertOne({
    metadata,
    questions,
    created_at: new Date()
  });
}

export async function deleteGlobalExam(id: string) {
  const exams = await getCollection('global_exams');
  await exams.deleteOne({ _id: id as any });
}
