import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createInquiry } from "../controllers/inquiryController.js";
import { validate } from "../middleware/validate.js";
import { inquirySchema } from "../validators/schemas.js";

const router = Router();

// Cap public submissions: 10 per 15 min per IP
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many inquiries — please try again in a few minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", inquiryLimiter, validate(inquirySchema), createInquiry);

export default router;