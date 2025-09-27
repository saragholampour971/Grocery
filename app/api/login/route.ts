import {NextResponse} from "next/server";

export async function POST(req: Request) {
  const {token}: { token: string } = await req.json();

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
