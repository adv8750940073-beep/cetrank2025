import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY!,
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
