import { NextRequest, NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { rpID, origin, getUserById, saveCredential, saveUserChallenge } from '@/lib/auth_server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = req.cookies.get('reg_user_id')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'No registration session found' }, { status: 400 });
    }

    const user = getUserById(userId);
    if (!user || !user.current_challenge) {
      return NextResponse.json({ error: 'User or challenge not found' }, { status: 400 });
    }

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: user.current_challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });

    if (verification.verified && verification.registrationInfo) {
      const { credential } = verification.registrationInfo;
      const { id, publicKey, counter } = credential;

      // In the database we store ID as a string, typically base64url encoded
      const credentialIdStr = Buffer.from(id).toString('base64url');

      saveCredential(userId, {
        id: credentialIdStr,
        public_key: publicKey,
        counter,
        device_type: 'single-device',
        backed_up: true,
        transports: (body.response?.transports as string[]) || [],
      });

      // Clear challenge
      saveUserChallenge(userId, '');

      // Create login session
      const response = NextResponse.json({ verified: true });
      response.cookies.set('auth_user_id', userId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 30 }); // 30 days
      response.cookies.delete('reg_user_id');

      return response;
    } else {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
