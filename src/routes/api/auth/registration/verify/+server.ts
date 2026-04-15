import { json } from '@sveltejs/kit';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { rpID, origin, getUserById, saveCredential, saveUserChallenge } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const userId = cookies.get('reg_user_id');

    if (!userId) {
      return json({ error: 'No registration session found' }, { status: 400 });
    }

    const user = await getUserById(userId);
    if (!user || !user.current_challenge) {
      return json({ error: 'User or challenge not found' }, { status: 400 });
    }

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: user.current_challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false,
    });

    if (verification.verified && verification.registrationInfo) {
      const { credential } = verification.registrationInfo;
      const { id, publicKey, counter } = credential;

      await saveCredential(userId, {
        id,
        public_key: publicKey,
        counter,
        device_type: 'single-device',
        backed_up: true,
        transports: (body.response?.transports as string[]) || [],
      });

      await saveUserChallenge(userId, '');

      cookies.set('auth_user_id', userId, { 
          path: '/', 
          httpOnly: true, 
          secure: true, 
          sameSite: 'strict', 
          maxAge: 60 * 60 * 24 * 30 
      });
      cookies.delete('reg_user_id', { path: '/' });

      return json({ verified: true });
    } else {
      return json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    console.error('Registration Verify Error:', err);
    return json({ error: err.message }, { status: 500 });
  }
};
