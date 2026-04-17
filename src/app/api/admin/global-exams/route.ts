import { NextRequest, NextResponse } from 'next/server';
import { saveGlobalExam, getGlobalExams, deleteGlobalExam, getUserById } from '@/lib/auth_server';

async function isAdmin(req: NextRequest) {
  const userId = req.cookies.get('auth_user_id')?.value;
  if (!userId) return false;
  const user = await getUserById(userId);
  return !!user?.is_admin;
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getGlobalExams());
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { metadata, data } = await req.json();
    await saveGlobalExam(metadata, data);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteGlobalExam(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
