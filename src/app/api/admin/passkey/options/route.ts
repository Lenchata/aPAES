import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { rpName, rpID, getAdminById, saveAdminChallenge } from '@/lib/auth_server';

export async function POST(req: NextRequest) {
  try {
    const adminId = req.cookies.get('auth_admin_id')?.value;
    if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const admin = getAdminById(adminId);
    if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: Buffer.from(adminId),
      userName: admin.username,
      userDisplayName: `Admin: ${admin.username}`,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred',
      },
      excludeCredentials: [],
    });

    saveAdminChallenge(adminId, options.challenge);

    return NextResponse.json(options);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
