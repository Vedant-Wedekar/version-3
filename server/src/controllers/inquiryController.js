import { adminDb } from "../config/firebaseAdmin.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// POST /api/inquiries — public. Stores contact form submissions.
export const createInquiry = asyncHandler(async (req, res) => {
  const data = req.body;

  const docRef = await adminDb.collection("inquiries").add({
    ...data,
    status: "new",
    createdAt: new Date(),
  });

  res.status(201).json({
    success: true,
    id: docRef.id,
    message: "Inquiry received — we'll reach out within an hour.",
  });
});