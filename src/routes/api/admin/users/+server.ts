import { json } from '@sveltejs/kit';
import { getAllUsers, deleteUser } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  const adminId = cookies.get('auth_admin_id');
  if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const users = await getAllUsers();
  return json(users);
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
  const adminId = cookies.get('auth_admin_id');
  if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id } = await request.json();
    await deleteUser(id);
    return json({ success: true });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
