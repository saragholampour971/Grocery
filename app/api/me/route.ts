import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {adminAuth} from "@/lib/firebaseAdmin";

export async function GET() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401});
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return NextResponse.json({uid: decoded.uid, email: decoded.email});
  } catch {
    return NextResponse.json({error: "Invalid token"}, {status: 401});
  }
}
