import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashPassword } from '@/lib/admin_crypto';
import crypto from 'crypto';

export async function GET() {
  try {
    const existing = db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number };
    if (existing.count > 0) {
      return NextResponse.json({ message: 'Admin already setup' });
    }

    const id = crypto.randomUUID();
    const username = 'admin';
    const password = 'admin123';
    const hashedPassword = hashPassword(password);

    db.prepare('INSERT INTO admins (id, username, password_hash) VALUES (?, ?, ?)')
      .run(id, username, hashedPassword);

    return NextResponse.json({ 
      message: 'Default admin created', 
      credentials: { username, password }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
