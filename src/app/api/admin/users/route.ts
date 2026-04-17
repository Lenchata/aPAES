import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, deleteUser, getUserById } from '@/lib/auth_server';

async function isAdmin(req: NextRequest) {
  const userId = req.cookies.get('auth_user_id')?.value;
  if (!userId) return false;
  const user = await getUserById(userId);
  return !!user?.is_admin;
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getAllUsers());
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await deleteUser(id);
  return NextResponse.json({ success: true });
}
