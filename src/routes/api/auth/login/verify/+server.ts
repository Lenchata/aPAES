import { json } from '@sveltejs/kit';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { rpID, origin, getUserCredentials, getUserByCredentialId, updateCredentialCounter } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const challenge = cookies.get('login_challenge');

    if (!challenge) {
      return json({ error: 'No login session found' }, { status: 400 });
    }

    const credentialId = body.id;
    const user = await getUserByCredentialId(credentialId);

    if (!user) {
      return json({ error: 'No user associated with this credential' }, { status: 404 });
    }

    const userId = user._id.toString();
    const credentials = await getUserCredentials(userId);
    const userCredential = credentials.find(c => c.id === credentialId);

    if (!userCredential) {
      return json({ error: 'Credential not found' }, { status: 400 });
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
      requireUserVerification: false,
    });

    if (verification.verified) {
      await updateCredentialCounter(credentialId, verification.authenticationInfo.newCounter);

      cookies.set('auth_user_id', userId, { 
          path: '/', 
          httpOnly: true, 
          secure: true, 
          sameSite: 'strict', 
          maxAge: 15552000 
      });
      cookies.delete('login_challenge', { path: '/' });
      
      return json({ verified: true });
    } else {
      return json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    console.error('Login Verify Error:', err);
    return json({ error: err.message }, { status: 500 });
  }
};
