import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { rpName, rpID, saveUserRegistrationOptions, getUserByUsername } from '@/lib/auth_server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const existingUser = getUserByUsername(username);
    if (existingUser) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    // Generate random userId
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

    // Save challenge for verification
    saveUserRegistrationOptions(userId, options.challenge, username);

    // Temp save userId in session cookie to associate it later
    const response = NextResponse.json(options);
    response.cookies.set('reg_user_id', userId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 600 });
    
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
