import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, deleteUser } from '@/lib/auth_server';

export async function GET(req: NextRequest) {
  const adminId = req.cookies.get('auth_admin_id')?.value;
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getAllUsers());
}

export async function DELETE(req: NextRequest) {
  const adminId = req.cookies.get('auth_admin_id')?.value;
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { id } = await req.json();
  deleteUser(id);
  return NextResponse.json({ success: true });
}
