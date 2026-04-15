import { json } from '@sveltejs/kit';
import { getAdminByUsername } from '$lib/server/auth';
import { verifyPassword } from '$lib/server/admin_crypto';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    const admin = await getAdminByUsername(username);
    if (!admin) {
      return json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!admin.password_hash) {
      return json({ error: 'La clave normal ha sido desactivada. Usa tu Passkey para entrar.' }, { status: 401 });
    }

    const isValid = verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    cookies.set('auth_admin_id', admin._id.toString(), { 
        path: '/',
        httpOnly: true, 
        secure: true, 
        sameSite: 'strict', 
        maxAge: 60 * 60 * 2 
    });
    
    return json({ success: true });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
