import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'paes_auth.db');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    current_challenge TEXT
  );

  CREATE TABLE IF NOT EXISTS credentials (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    public_key BLOB,
    counter INTEGER,
    device_type TEXT,
    backed_up BOOLEAN,
    transports TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password_hash TEXT,
    current_challenge TEXT
  );

  CREATE TABLE IF NOT EXISTS admin_credentials (
    id TEXT PRIMARY KEY,
    admin_id TEXT,
    public_key BLOB,
    counter INTEGER,
    transports TEXT,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
  );

  CREATE TABLE IF NOT EXISTS global_exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metadata TEXT,
    questions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
