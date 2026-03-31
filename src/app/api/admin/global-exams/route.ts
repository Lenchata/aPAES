import { NextRequest, NextResponse } from 'next/server';
import { saveGlobalExam, getGlobalExams, deleteGlobalExam } from '@/lib/auth_server';

export async function GET(req: NextRequest) {
  const adminId = req.cookies.get('auth_admin_id')?.value;
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getGlobalExams());
}

export async function POST(req: NextRequest) {
  const adminId = req.cookies.get('auth_admin_id')?.value;
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { metadata, data } = await req.json();
    saveGlobalExam(metadata, data);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const adminId = req.cookies.get('auth_admin_id')?.value;
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await req.json();
    deleteGlobalExam(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
