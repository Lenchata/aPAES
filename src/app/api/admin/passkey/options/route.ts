import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { rpName, rpID, getUserById, saveAdminChallenge } from '@/lib/auth_server';

export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get('auth_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await getUserById(userId) as any;
    if (!user || !user.is_admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const options = await generateRegistrationOptions({
      rpName, rpID,
      userID: Buffer.from(userId),
      userName: user.username,
      userDisplayName: `Admin: ${user.username}`,
      attestationType: 'none',
      authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
      excludeCredentials: [],
    });

    await saveAdminChallenge(userId, options.challenge);
    return NextResponse.json(options);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
