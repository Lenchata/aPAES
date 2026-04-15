import { json } from '@sveltejs/kit';
import { getGlobalExams } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const exams = await getGlobalExams();
    return json(exams);
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
