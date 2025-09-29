require('global-agent/bootstrap')
import {NextResponse} from "next/server";
import {adminAuth} from "../../../lib/firebaseAdmin";


export async function POST(req: Request) {
  const {token}: { token: string } = await req.json();
  try {
    console.log('this is token')
    // ۲. اعتبارسنجی توکن با استفاده از Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log(decodedToken, 'decodedToken');
  } catch (e) {
    console.error(e, ' catch e from post');
  }
  const res = NextResponse.json({success: true});
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600
  })

  return res
}
