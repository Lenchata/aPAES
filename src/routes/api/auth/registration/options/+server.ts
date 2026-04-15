import { json } from '@sveltejs/kit';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { rpName, rpID, saveUserRegistrationOptions, getUserByUsername } from '$lib/server/auth';
import crypto from 'crypto';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { username } = await request.json();

    if (!username) {
      return json({ error: 'Username is required' }, { status: 400 });
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return json({ error: 'Username already taken' }, { status: 400 });
    }

    const userId = crypto.randomUUID();

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: Buffer.from(userId),
      userName: username,
      userDisplayName: username,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred',
      },
      excludeCredentials: [],
    });

    await saveUserRegistrationOptions(userId, options.challenge, username);

    cookies.set('reg_user_id', userId, { 
        path: '/', 
        httpOnly: true, 
        secure: true, 
        sameSite: 'strict', 
        maxAge: 600 
    });
    
    return json(options);
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
