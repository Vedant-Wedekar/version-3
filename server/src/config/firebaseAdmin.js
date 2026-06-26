// Firebase Admin SDK initialization
// This has FULL access to the project — security rules do not apply.
// Only ever runs on the server, never exposed to the client.

import admin from "firebase-admin";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT env var is missing. " +
    "Check server/.env and ensure the base64-encoded service account is set."
  );
}

// Decode the base64 service account JSON
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf-8")
);

// Initialize only once (hot-reload safe with nodemon)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`,
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminStorage = admin.storage();

export default admin;