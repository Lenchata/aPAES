import { NextResponse } from 'next/server';
import { getGlobalExams } from '@/lib/auth_server';

export async function GET() {
  try {
    const exams = getGlobalExams();
    return NextResponse.json(exams);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
