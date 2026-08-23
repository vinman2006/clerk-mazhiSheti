// auth.js
import { auth, db } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// UI helpers
const setLoading = (show) => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = show ? "block" : "none";
};

const showError = (msg) => {
  const err = document.getElementById("error-msg");
  if (err) {
    err.textContent = msg;
    err.style.display = "block";
  }
};

const clearError = () => {
  const err = document.getElementById("error-msg");
  if (err) err.style.display = "none";
};

// Sign‑up (email/password)
export const signUp = async (email, password, name) => {
  clearError();
  setLoading(true);
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      name: name,
      email: email,
      role: "patient",
    });
  } catch (e) {
    showError(e.message);
  } finally {
    setLoading(false);
  }
};

// Login (email/password)
export const logIn = async (email, password) => {
  clearError();
  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    showError(e.message);
  } finally {
    setLoading(false);
  }
};

// Google Sign‑In
export const googleSignIn = async () => {
  clearError();
  setLoading(true);
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: "patient",
      },
      { merge: true }
    );
  } catch (e) {
    showError(e.message);
  } finally {
    setLoading(false);
  }
};

// Logout
export const logOut = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

// Forgot password
export const resetPassword = async (email) => {
  clearError();
  setLoading(true);
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent.");
  } catch (e) {
    showError(e.message);
  } finally {
    setLoading(false);
  }
};

// Persistent login – redirect to dashboard if already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    const isLoginPage = window.location.pathname.endsWith("login.html");
    if (isLoginPage) {
      window.location.href = "dashboard.html";
    }
  }
});
