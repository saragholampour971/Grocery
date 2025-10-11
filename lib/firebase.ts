import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth' // اگه احراز هویت می‌خوای
import { getFirestore } from 'firebase/firestore' // اگه Firestore می‌خوای

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// مقداردهی اولیه Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// سرویس‌های مورد نیازت رو صادر کن
export const auth = getAuth(app) // برای احراز هویت
export const db = getFirestore(app) // برای Firestore
