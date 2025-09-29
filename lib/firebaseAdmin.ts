import admin from "firebase-admin";


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: "https://supermarket-e52be.firebaseio.com",
  });
}

const adminDb = admin.firestore()
const adminAuth = admin.auth()
export {adminDb, admin, adminAuth};

async function test() {
  "use server"
  try {
    const docRef = adminDb.collection("test").doc("check");
    await docRef.set({hello: "gov-world"});
    const snap = await docRef.get();
    console.log("gov-Data:", snap.data());

    // console.log("sessionCookie", sessionCookie)

  } catch (err: any) {
    console.error("gov-Error:", err.code, err.message);
  }
}

test();
