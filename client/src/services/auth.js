import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import api from "./api";

function readableError(err) {
  const code = err?.code || "";
  const map = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/too-many-requests": "Too many failed attempts. Please wait a few minutes.",
    "auth/popup-closed-by-user": "Sign-in cancelled.",
    "auth/cancelled-popup-request": "Sign-in cancelled.",
    "auth/popup-blocked":
      "Your browser blocked the sign-in popup. Please allow popups and try again, or use email sign-in.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
  };
  return map[code] || err?.message || "Something went wrong. Please try again.";
}

async function syncUserProfile(name) {
  try {
    await api.post("/users/me", { name: name || "" });
  } catch (err) {
    console.warn("Profile sync failed:", err.message);
  }
}

export async function registerWithEmail({ name, email, password }) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    await syncUserProfile(name);
    return cred.user;
  } catch (err) {
    throw new Error(readableError(err));
  }
}

export async function loginWithEmail({ email, password }) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err) {
    throw new Error(readableError(err));
  }
}

// Popup-only Google sign-in. No redirect fallback (redirect is unreliable
// across the Firebase auth domain ↔ Vercel domain boundary due to browser
// storage partitioning). Users with blocked popups get a clear message.
export async function loginWithGoogle() {
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    await syncUserProfile(cred.user.displayName);
    return cred.user;
  } catch (err) {
    const code = err?.code || "";
    // Silent on user cancellation — no toast, just return null
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      return null;
    }
    throw new Error(readableError(err));
  }
}

export async function logout() {
  await signOut(auth);
}

export async function sendResetEmail(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw new Error(readableError(err));
  }
}