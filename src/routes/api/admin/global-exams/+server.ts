import { json } from '@sveltejs/kit';
import { saveGlobalExam, getGlobalExams, deleteGlobalExam } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  const adminId = cookies.get('auth_admin_id');
  if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const exams = await getGlobalExams();
  return json(exams);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  const adminId = cookies.get('auth_admin_id');
  if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { metadata, data } = await request.json();
    await saveGlobalExam(metadata, data);
    return json({ success: true });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
  const adminId = cookies.get('auth_admin_id');
  if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    await deleteGlobalExam(id);
    return json({ success: true });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
