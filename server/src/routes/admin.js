import { Router } from "express";
import { verifyAuth, verifyAdmin } from "../middleware/verifyAuth.js";
import {
  getDashboardStats,
  listAllBookings,
  updateBooking,
  listAllInquiries,
  updateInquiry,
  listAllPackagesAdmin,
  updatePackage,
} from "../controllers/adminController.js";

const router = Router();

router.use(verifyAuth, verifyAdmin);

router.get("/stats", getDashboardStats);

router.get("/bookings", listAllBookings);
router.patch("/bookings/:id", updateBooking);

router.get("/inquiries", listAllInquiries);
router.patch("/inquiries/:id", updateInquiry);

router.get("/packages", listAllPackagesAdmin);
router.patch("/packages/:slug", updatePackage);

export default router;