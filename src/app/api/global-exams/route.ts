import { NextResponse } from 'next/server';
import { getGlobalExams } from '@/lib/auth_server';

export async function GET() {
  try {
    return NextResponse.json(await getGlobalExams());
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
