import { Router } from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { validate } from "../middleware/validate.js";
import { createBookingSchema } from "../validators/bookingSchemas.js";
import {
  createBooking,
  listMyBookings,
  getBooking,
} from "../controllers/bookingController.js";

const router = Router();

router.use(verifyAuth); // all booking routes need auth

router.post("/", validate(createBookingSchema), createBooking);
router.get("/me", listMyBookings);
router.get("/:id", getBooking);

export default router;