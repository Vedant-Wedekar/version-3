import { Router } from "express";
import rateLimit from "express-rate-limit";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { validate } from "../middleware/validate.js";
import {
  createOrderSchema,
  verifyPaymentSchema,
} from "../validators/bookingSchemas.js";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = Router();

// Tight rate limit on payment routes (prevent abuse)
const paymentLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: { error: "Too many payment requests — please wait a few minutes." },
});

router.use(verifyAuth);
router.use(paymentLimiter);

router.post("/create-order", validate(createOrderSchema), createOrder);
router.post("/verify", validate(verifyPaymentSchema), verifyPayment);

export default router;