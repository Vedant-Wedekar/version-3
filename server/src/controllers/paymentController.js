import crypto from "crypto";
import { adminDb } from "../config/firebaseAdmin.js";
import { razorpay } from "../config/razorpay.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// POST /api/payments/create-order — creates a Razorpay order for a pending booking.
// Returns the orderId + public key so the client can open the checkout popup.
export const createOrder = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { bookingId } = req.body;

  const bookingRef = adminDb.collection("bookings").doc(bookingId);
  const snap = await bookingRef.get();
  if (!snap.exists) throw new ApiError(404, "Booking not found");
  const booking = snap.data();

  if (booking.userId !== uid) {
    throw new ApiError(403, "Not your booking");
  }
  if (booking.paymentStatus === "paid") {
    throw new ApiError(400, "This booking is already paid");
  }

  // Razorpay needs the amount in the smallest currency unit (paise).
  // We use the booking total stored on the server — NEVER trust a client amount.
  const amountInPaise = Math.round(booking.totalAmount * 100);

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: bookingId.slice(0, 40), // Razorpay receipt limit
    notes: {
      bookingId,
      userId: uid,
      packageSlug: booking.packageSlug,
    },
  });

  // Store the order ID against the booking
  await bookingRef.update({
    razorpayOrderId: order.id,
    updatedAt: new Date(),
  });

  res.json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID, // public — safe to send to client
  });
});

// POST /api/payments/verify — verifies the HMAC signature Razorpay sent back
// after a successful client-side payment. ONLY then do we mark the booking paid.
export const verifyPayment = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const {
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const bookingRef = adminDb.collection("bookings").doc(bookingId);
  const snap = await bookingRef.get();
  if (!snap.exists) throw new ApiError(404, "Booking not found");
  const booking = snap.data();
  if (booking.userId !== uid) throw new ApiError(403, "Not your booking");

  // Sanity: order ID must match the one we stored
  if (booking.razorpayOrderId !== razorpay_order_id) {
    throw new ApiError(400, "Order ID mismatch");
  }

  // Verify the HMAC SHA256 signature.
  // Razorpay's contract: signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    // Mark booking failed for record-keeping
    await bookingRef.update({
      paymentStatus: "failed",
      updatedAt: new Date(),
    });
    throw new ApiError(400, "Payment signature verification failed");
  }

  // Signature valid — mark paid and confirmed
  await bookingRef.update({
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
    paidAt: new Date(),
    updatedAt: new Date(),
  });

  const updated = await bookingRef.get();
  res.json({ success: true, booking: updated.data() });
});