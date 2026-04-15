import { json } from '@sveltejs/kit';
import { getUserById } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  const userId = cookies.get('auth_user_id');
  if (!userId) {
    return json({ authenticated: false });
  }

  const user = await getUserById(userId);
  if (!user) {
    cookies.delete('auth_user_id', { path: '/' });
    return json({ authenticated: false });
  }

  return json({ authenticated: true, username: user.username });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete('auth_user_id', { path: '/' });
  return json({ success: true });
};
