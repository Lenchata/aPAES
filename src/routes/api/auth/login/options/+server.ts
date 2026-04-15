import { json } from '@sveltejs/kit';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { rpID } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'preferred',
    });

    cookies.set('login_challenge', options.challenge, { 
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
