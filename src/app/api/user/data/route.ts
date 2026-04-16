import { NextRequest, NextResponse } from 'next/server';
import { getUserData, saveUserData } from '@/lib/auth_server';

export async function GET(req: NextRequest) {
  const userId = req.cookies.get('auth_user_id')?.value;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json((await getUserData(userId)) || {});
}

export async function POST(req: NextRequest) {
  const userId = req.cookies.get('auth_user_id')?.value;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if (body) await saveUserData(userId, body);
  return NextResponse.json({ success: true });
}
