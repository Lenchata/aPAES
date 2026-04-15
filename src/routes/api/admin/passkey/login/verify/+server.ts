import { json } from '@sveltejs/kit';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { rpID, origin, getAdminCredentials, getAdminByCredentialId, updateAdminCredentialCounter } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const challenge = cookies.get('admin_login_challenge');

    if (!challenge) {
      return json({ error: 'No admin login session found' }, { status: 400 });
    }

    const credentialId = body.id;
    const admin = await getAdminByCredentialId(credentialId);

    if (!admin) {
      return json({ error: 'No admin associated with this credential' }, { status: 404 });
    }

    const adminId = admin._id.toString();
    const credentials = await getAdminCredentials(adminId);
    const adminCredential = credentials.find(c => c.id === credentialId);

    if (!adminCredential) {
      return json({ error: 'Credential not found' }, { status: 400 });
    }

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: adminCredential.id,
        publicKey: adminCredential.publicKey,
        counter: adminCredential.counter,
        transports: adminCredential.transports,
      },
      requireUserVerification: false,
    });

    if (verification.verified) {
      await updateAdminCredentialCounter(credentialId, verification.authenticationInfo.newCounter);

      cookies.set('auth_admin_id', adminId, { 
        path: '/',
        httpOnly: true, 
        secure: true, 
        sameSite: 'strict', 
        maxAge: 60 * 60 * 4 
      });
      cookies.delete('admin_login_challenge', { path: '/' });
      
      return json({ verified: true });
    } else {
      return json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
