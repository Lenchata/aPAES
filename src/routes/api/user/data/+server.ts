import { json } from '@sveltejs/kit';
import { getUserData, saveUserData } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  const userId = cookies.get('auth_user_id');
  if (!userId) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const data = await getUserData(userId);
  return json(data || {});
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  const userId = cookies.get('auth_user_id');
  if (!userId) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const body = await request.json();
  if (body) {
    await saveUserData(userId, body);
  }
  return json({ success: true });
};
