import { NextRequest, NextResponse } from 'next/server';
import { getUserById, getUserCredentials } from '@/lib/auth_server';

export async function GET(req: NextRequest) {
  const userId = req.cookies.get('auth_user_id')?.value;
  if (!userId) return NextResponse.json({ authenticated: false });
  const user = await getUserById(userId) as any;
  if (!user) {
    const res = NextResponse.json({ authenticated: false });
    res.cookies.delete('auth_user_id');
    return res;
  }
  const credentials = await getUserCredentials(userId);
  return NextResponse.json({ 
    authenticated: true, 
    username: user.username, 
    is_admin: !!user.is_admin,
    has_passkey: credentials.length > 0
  });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('auth_user_id');
  return response;
}
