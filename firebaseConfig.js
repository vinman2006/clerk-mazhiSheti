// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your existing Firebase project configuration (hard‑coded for nexora-af757)
const firebaseConfig = {
  apiKey: "AIzaSyDuMalOk5ngQ9KBYvMHPpsCvh5gbUTHCco",
  authDomain: "nexora-af757.firebaseapp.com",
  projectId: "nexora-af757",
  storageBucket: "nexora-af757.firebasestorage.app",
  messagingSenderId: "319144962265",
  appId: "1:319144962265:web:0c6179e6aea8e8cf5db6c8",
  measurementId: "G-29V7Y219GJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
