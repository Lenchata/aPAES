import { NextRequest, NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { rpID, origin, getAdminById, saveAdminCredential, saveAdminChallenge } from '@/lib/auth_server';

export async function POST(req: NextRequest) {
  try {
    const adminId = req.cookies.get('auth_admin_id')?.value;
    if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const admin = getAdminById(adminId);
    if (!admin || !admin.current_challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 400 });
    }

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: admin.current_challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false,
    });

    if (verification.verified && verification.registrationInfo) {
      const { credential } = verification.registrationInfo;
      const { id, publicKey, counter } = credential;

      saveAdminCredential(adminId, {
        id,
        publicKey,
        counter,
        transports: body.response?.transports || [],
      });

      saveAdminChallenge(adminId, '');

      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
