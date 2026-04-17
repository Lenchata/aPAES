import { NextRequest, NextResponse } from 'next/server';
import { getAllAdmins, deleteAdmin, getUserById } from '@/lib/auth_server';

async function isAdmin(req: NextRequest) {
  const userId = req.cookies.get('auth_user_id')?.value;
  if (!userId) return false;
  const user = await getUserById(userId);
  return !!user?.is_admin;
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getAllAdmins());
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  const currentUserId = req.cookies.get('auth_user_id')?.value;
  if (id === currentUserId) return NextResponse.json({ error: 'No puedes borrarte a ti mismo' }, { status: 400 });
  await deleteAdmin(id);
  return NextResponse.json({ success: true });
}
