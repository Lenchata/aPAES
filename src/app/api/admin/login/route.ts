import { NextRequest, NextResponse } from 'next/server';
import { getAdminByUsername } from '@/lib/auth_server';
import { verifyPassword } from '@/lib/admin_crypto';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const admin = await getAdminByUsername(username) as any;
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    if (!admin.password_hash) return NextResponse.json({ error: 'La clave normal ha sido desactivada. Usa tu Passkey para entrar.' }, { status: 401 });
    if (!verifyPassword(password, admin.password_hash)) return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });

    const res = NextResponse.json({ success: true });
    res.cookies.set('auth_admin_id', admin._id, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 2 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
