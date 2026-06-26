import api from "./api";
import { loadRazorpay } from "./razorpay";
import { SITE } from "../utils/constants";

// Create a pending booking on the server.
// Returns the booking object (with `id` and `totalAmount`).
export async function createBooking(payload) {
  const res = await api.post("/bookings", payload);
  return res.data.booking;
}

export async function listMyBookings() {
  const res = await api.get("/bookings/me");
  return res.data.bookings;
}

export async function getBooking(id) {
  const res = await api.get(`/bookings/${id}`);
  return res.data.booking;
}

// Full payment flow:
// 1. Ask backend for a Razorpay order (server validates booking, returns orderId)
// 2. Load Razorpay script, open checkout popup
// 3. On user payment success, send the 3 IDs back to server to verify the signature
// 4. Server returns the final paid booking
export async function payForBooking(booking, userInfo) {
  const loaded = await loadRazorpay();
  if (!loaded) {
    throw new Error(
      "Couldn't load Razorpay — check your internet connection and try again."
    );
  }

  // 1. Create order
  const orderRes = await api.post("/payments/create-order", {
    bookingId: booking.id,
  });
  const { orderId, amount, currency, keyId } = orderRes.data;

  // 2. Open Razorpay checkout
  return new Promise((resolve, reject) => {
    const options = {
      key: keyId,
      amount,
      currency,
      name: SITE.name,
      description: booking.packageSnapshot?.title || "Andaman Trip",
      image: "/vite.svg", // TODO: replace with brand logo URL
      order_id: orderId,
      prefill: {
        name: userInfo?.name || booking.contact?.name || "",
        email: userInfo?.email || booking.contact?.email || "",
        contact: booking.contact?.phone || "",
      },
      notes: { bookingId: booking.id },
      theme: { color: "#0F766E" }, // teal-700
      handler: async (response) => {
        try {
          // 3. Verify signature server-side
          const verifyRes = await api.post("/payments/verify", {
            bookingId: booking.id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          resolve(verifyRes.data.booking);
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => {
          reject(new Error("Payment was cancelled."));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (resp) => {
      reject(new Error(resp.error?.description || "Payment failed."));
    });
    rzp.open();
  });
}