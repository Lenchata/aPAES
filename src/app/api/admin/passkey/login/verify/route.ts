import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { rpID, origin, getAdminCredentials, getAdminById } from '@/lib/auth_server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const challenge = req.cookies.get('admin_login_challenge')?.value;

    if (!challenge) {
      return NextResponse.json({ error: 'No admin login session found' }, { status: 400 });
    }

    // Identify admin by credential ID
    const credentialId = body.id;
    const credentialRow = db.prepare('SELECT * FROM admin_credentials WHERE id = ?').get(credentialId) as any;

    if (!credentialRow) {
      return NextResponse.json({ error: 'No admin associated with this credential' }, { status: 404 });
    }

    const adminId = credentialRow.admin_id;
    const credentials = getAdminCredentials(adminId);
    const adminCredential = credentials.find(c => c.id === credentialId);

    if (!adminCredential) {
      return NextResponse.json({ error: 'Credential not found' }, { status: 400 });
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
    });

    if (verification.verified) {
      // Update counter
      db.prepare('UPDATE admin_credentials SET counter = ? WHERE id = ?').run(verification.authenticationInfo.newCounter, credentialId);

      const response = NextResponse.json({ verified: true });
      response.cookies.set('auth_admin_id', adminId, { 
        httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 4 
      });
      response.cookies.delete('admin_login_challenge');
      return response;
    } else {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
