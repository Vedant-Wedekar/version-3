import { adminAuth } from "../config/firebaseAdmin.js";
import { ApiError } from "../utils/ApiError.js";

// Decodes the Firebase ID token from the Authorization header.
// Attaches { uid, email, admin } to req.user.
// Throws 401 if missing or invalid.
export async function verifyAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      throw new ApiError(401, "Missing auth token");
    }

    const decoded = await adminAuth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      admin: decoded.admin === true,
    };
    next();
  } catch (err) {
    next(new ApiError(401, err.message || "Invalid auth token"));
  }
}

// Stricter — only allows admins through. Must be used AFTER verifyAuth.
export function verifyAdmin(req, res, next) {
  if (!req.user?.admin) {
    return next(new ApiError(403, "Admin access required"));
  }
  next();
}