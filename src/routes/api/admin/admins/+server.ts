import { json } from '@sveltejs/kit';
import { getAllAdmins, deleteAdmin } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  const adminId = cookies.get('auth_admin_id');
  if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const admins = await getAllAdmins();
  return json(admins);
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
  const adminId = cookies.get('auth_admin_id');
  if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id } = await request.json();
    if (id === adminId) return json({ error: 'No puedes borrarte a ti mismo' }, { status: 400 });
    
    await deleteAdmin(id);
    return json({ success: true });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
