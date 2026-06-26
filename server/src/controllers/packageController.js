import { adminDb } from "../config/firebaseAdmin.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// GET /api/packages — public list. Supports basic filters via query.
export const listPackages = asyncHandler(async (req, res) => {
  const { category, featured } = req.query;

  let q = adminDb.collection("packages").where("isActive", "==", true);

  if (category) q = q.where("category", "==", category);
  if (featured === "true") q = q.where("isFeatured", "==", true);

  const snap = await q.get();
  const packages = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  res.json({ success: true, count: packages.length, packages });
});

// GET /api/packages/:slug — single package.
export const getPackageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const snap = await adminDb.collection("packages").doc(slug).get();

  if (!snap.exists) throw new ApiError(404, "Package not found");

  const pkg = { id: snap.id, ...snap.data() };
  if (!pkg.isActive) throw new ApiError(404, "Package not found");

  res.json({ success: true, package: pkg });
});