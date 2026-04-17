import { NextRequest, NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { rpID, origin, getUserById, saveAdminCredential, saveAdminChallenge } from '@/lib/auth_server';

export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get('auth_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const user = await getUserById(userId) as any;
    if (!user || !user.is_admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!user.current_challenge) return NextResponse.json({ error: 'Challenge not found' }, { status: 400 });

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: user.current_challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    const { id, publicKey, counter } = verification.registrationInfo.credential;
    await saveAdminCredential(userId, { id, publicKey, counter, transports: body.response?.transports || [] });
    await saveAdminChallenge(userId, '');

    return NextResponse.json({ verified: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
