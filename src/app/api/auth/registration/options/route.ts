import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { rpName, rpID, saveUserRegistrationOptions, getUserByUsername } from '@/lib/auth_server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (!username) return NextResponse.json({ error: 'Username is required' }, { status: 400 });

    const existing = await getUserByUsername(username);
    if (existing) return NextResponse.json({ error: 'Username already taken' }, { status: 400 });

    const userId = crypto.randomUUID();
    const options = await generateRegistrationOptions({
      rpName, rpID,
      userID: Buffer.from(userId),
      userName: username,
      userDisplayName: username,
      attestationType: 'none',
      authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
      excludeCredentials: [],
    });

    await saveUserRegistrationOptions(userId, options.challenge, username);

    const response = NextResponse.json(options);
    response.cookies.set('reg_user_id', userId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 600 });
    return response;
  } catch (err: any) {
    console.error('[registration/options]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
