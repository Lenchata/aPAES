import { NextResponse } from 'next/server';
import { adminCount, createAdmin } from '@/lib/auth_server';
import { hashPassword } from '@/lib/admin_crypto';
import crypto from 'crypto';

export async function GET() {
  try {
    const count = await adminCount();
    if (count > 0) return NextResponse.json({ message: 'Admin already setup' });

    const id = crypto.randomUUID();
    const password = 'admin123';
    await createAdmin(id, 'admin', hashPassword(password));

    return NextResponse.json({ message: 'Default admin created', credentials: { username: 'admin', password } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
