// One-off script: marks a user as admin by setting a custom claim.
// Usage: node src/scripts/setAdmin.js user@example.com
// Re-runs are safe (idempotent). Admin must sign out and sign in again
// to refresh their token and pick up the new claim.

import "dotenv/config";
import { adminAuth, adminDb } from "../config/firebaseAdmin.js";

const email = process.argv[2];

if (!email) {
  console.error("\n❌ Please provide an email.\n");
  console.error("   Usage: node src/scripts/setAdmin.js user@example.com\n");
  process.exit(1);
}

async function run() {
  console.log(`\n🔐 Promoting ${email} to admin...\n`);

  // 1. Find the user
  const user = await adminAuth.getUserByEmail(email).catch(() => null);
  if (!user) {
    console.error(`❌ No user found with email: ${email}`);
    console.error("   They need to sign up on the site first.\n");
    process.exit(1);
  }

  // 2. Set custom claim
  await adminAuth.setCustomUserClaims(user.uid, { admin: true });

  // 3. Mirror role in Firestore so the admin UI can read it easily
  await adminDb
    .collection("users")
    .doc(user.uid)
    .set({ role: "admin" }, { merge: true });

  console.log(`✅ ${email} is now an admin.`);
  console.log(`   UID: ${user.uid}`);
  console.log(`   ⚠️  They must sign out and sign in again for it to take effect.\n`);
  process.exit(0);
}

run().catch((err) => {
  console.error("\n❌ Failed:", err);
  process.exit(1);
});