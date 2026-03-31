import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { rpID, origin, getUserCredentials, getUserById } from '@/lib/auth_server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const challenge = req.cookies.get('login_challenge')?.value;

    if (!challenge) {
      return NextResponse.json({ error: 'No login session found' }, { status: 400 });
    }

    // Identify user by credential ID (discovery)
    const credentialId = body.id;
    const credentialRow = db.prepare('SELECT * FROM credentials WHERE id = ?').get(credentialId) as any;

    if (!credentialRow) {
      return NextResponse.json({ error: 'No user associated with this credential' }, { status: 404 });
    }

    const userId = credentialRow.user_id;
    const credentials = getUserCredentials(userId);
    const userCredential = credentials.find(c => c.id === credentialId);

    if (!userCredential) {
      return NextResponse.json({ error: 'Credential not found' }, { status: 400 });
    }

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: userCredential.id,
        publicKey: userCredential.public_key,
        counter: userCredential.counter,
        transports: userCredential.transports as any,
      },
    });

    if (verification.verified) {
      // Update counter
      db.prepare('UPDATE credentials SET counter = ? WHERE id = ?').run(verification.authenticationInfo.newCounter, credentialId);

      const response = NextResponse.json({ verified: true });
      response.cookies.set('auth_user_id', userId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 15552000 }); // 30 days
      response.cookies.delete('login_challenge');
      return response;
    } else {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
