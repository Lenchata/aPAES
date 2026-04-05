import { NextRequest, NextResponse } from 'next/server';
import { getAllAdmins, deleteAdmin } from '@/lib/auth_server';

export async function GET(req: NextRequest) {
  const adminId = req.cookies.get('auth_admin_id')?.value;
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getAllAdmins());
}

export async function DELETE(req: NextRequest) {
  const adminId = req.cookies.get('auth_admin_id')?.value;
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { id } = await req.json();
  if (id === adminId) return NextResponse.json({ error: 'No puedes borrarte a ti mismo' }, { status: 400 });
  
  deleteAdmin(id);
  return NextResponse.json({ success: true });
}
