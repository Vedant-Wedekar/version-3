import { adminDb } from "../config/firebaseAdmin.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// POST /api/users/me — auth required.
// Creates or updates the user's Firestore profile (called once after signup).
export const upsertMyProfile = asyncHandler(async (req, res) => {
  const { uid, email } = req.user;
  const { name } = req.body;

  const userRef = adminDb.collection("users").doc(uid);
  const snap = await userRef.get();

  if (!snap.exists) {
    await userRef.set({
      uid,
      email,
      name: name || "",
      role: "user",
      createdAt: new Date(),
    });
  } else if (name) {
    await userRef.update({ name });
  }

  const fresh = await userRef.get();
  res.json({ success: true, user: fresh.data() });
});

// GET /api/users/me — auth required.
export const getMyProfile = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const snap = await adminDb.collection("users").doc(uid).get();

  if (!snap.exists) {
    return res.json({ success: true, user: null });
  }
  res.json({ success: true, user: snap.data() });
});