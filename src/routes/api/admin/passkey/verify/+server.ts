import { json } from '@sveltejs/kit';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { rpID, origin, getAdminById, saveAdminCredential, saveAdminChallenge } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const adminId = cookies.get('auth_admin_id');
    if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const admin = await getAdminById(adminId);
    if (!admin || !admin.current_challenge) {
      return json({ error: 'Challenge not found' }, { status: 400 });
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

      await saveAdminCredential(adminId, {
        id,
        publicKey,
        counter,
        transports: body.response?.transports || [],
      });

      await saveAdminChallenge(adminId, '');

      return json({ verified: true });
    } else {
      return json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
