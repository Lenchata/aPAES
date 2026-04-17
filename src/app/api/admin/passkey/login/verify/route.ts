import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { rpID, origin, getUserCredentials, getCredentialById, updateCredentialCounter } from '@/lib/auth_server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const challenge = req.cookies.get('admin_login_challenge')?.value;
    if (!challenge) return NextResponse.json({ error: 'No admin login session found' }, { status: 400 });

    const credentialRow = await getCredentialById(body.id);
    if (!credentialRow) return NextResponse.json({ error: 'No user associated with this credential' }, { status: 404 });

    const userId = credentialRow.user_id as string;
    const credentials = await getUserCredentials(userId);
    const userCredential = credentials.find(c => c.id === body.id);
    if (!userCredential) return NextResponse.json({ error: 'Credential not found' }, { status: 400 });

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
      requireUserVerification: false,
    });

    if (!verification.verified) return NextResponse.json({ error: 'Verification failed' }, { status: 400 });

    await updateCredentialCounter(body.id, verification.authenticationInfo.newCounter);

    const response = NextResponse.json({ verified: true });
    // Set both for compatibility during transition
    const cookieOptions = { httpOnly: true, secure: true, sameSite: 'strict' as const, maxAge: 60 * 60 * 4 };
    response.cookies.set('auth_admin_id', userId, cookieOptions);
    response.cookies.set('auth_user_id', userId, cookieOptions);
    response.cookies.delete('admin_login_challenge');
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
