import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/lib/auth_server';

export async function GET(req: NextRequest) {
  const userId = req.cookies.get('auth_user_id')?.value;
  if (!userId) return NextResponse.json({ authenticated: false });
  const user = await getUserById(userId) as any;
  if (!user) {
    const res = NextResponse.json({ authenticated: false });
    res.cookies.delete('auth_user_id');
    return res;
  }
  return NextResponse.json({ authenticated: true, username: user.username });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('auth_user_id');
  return response;
}
