"use server";

import {cookies} from "next/headers";
import * as jose from "jose";
import {cache} from "react";

const JWKS = jose.createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  )
);

const verifyTokenCached = cache(async (token: string) => {
  return await jose.jwtVerify(token, JWKS, {
    algorithms: ["RS256"],
    audience: process.env.FIREBASE_PROJECT_ID,
    issuer: `https://securetoken.google.com/${process.env.FIREBASE_PROJECT_ID}`,
  });
});

export async function getCurrentUser() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    const decoded = jose.decodeJwt(token);
    console.log("Decoded JWT:", decoded);

    // ✅ verify با کش
    const {payload} = await verifyTokenCached(token);

    return {
      uid: payload.user_id as string,
      email: payload.email as string,
      emailVerified: payload.email_verified as boolean,
    };
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}
