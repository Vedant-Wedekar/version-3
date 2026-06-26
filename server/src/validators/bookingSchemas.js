import { z } from "zod";

// Pricing tier IDs the client can send
const TIER_IDS = z.enum(["standard", "deluxe", "luxury"]);

// Body for POST /api/bookings — create a pending booking
export const createBookingSchema = z.object({
  packageSlug: z.string().min(1),
  adults: z.number().int().min(1).max(20),
  children: z.number().int().min(0).max(20).default(0),
  travelDate: z.string().min(8).max(20), // ISO date string
  tierId: TIER_IDS,
  contact: z.object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    phone: z.string().min(7).max(20),
  }),
  notes: z.string().max(2000).optional().default(""),
});

// Body for POST /api/payments/create-order
export const createOrderSchema = z.object({
  bookingId: z.string().min(1),
});

// Body for POST /api/payments/verify
export const verifyPaymentSchema = z.object({
  bookingId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});