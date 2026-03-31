import { NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { rpID } from '@/lib/auth_server';

export async function POST() {
  try {
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'preferred',
      // No username needed for passkey authentication
    });

    const response = NextResponse.json(options);
    // Temporary challenge for generic login session
    response.cookies.set('login_challenge', options.challenge, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 600 });
    
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
