import { json } from '@sveltejs/kit';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { rpName, rpID, getAdminById, saveAdminChallenge } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const adminId = cookies.get('auth_admin_id');
    if (!adminId) return json({ error: 'Unauthorized' }, { status: 401 });

    const admin = await getAdminById(adminId);
    if (!admin) return json({ error: 'Admin not found' }, { status: 404 });

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: Buffer.from(adminId),
      userName: admin.username,
      userDisplayName: `Admin: ${admin.username}`,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred',
      },
      excludeCredentials: [],
    });

    await saveAdminChallenge(adminId, options.challenge);

    return json(options);
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
