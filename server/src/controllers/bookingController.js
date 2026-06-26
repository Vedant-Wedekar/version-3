import { adminDb } from "../config/firebaseAdmin.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { calculatePrice } from "../utils/pricing.js";

// POST /api/bookings — creates a PENDING booking record.
// Price is calculated server-side from the live package; client values are ignored.
export const createBooking = asyncHandler(async (req, res) => {
  const { uid, email } = req.user;
  const {
    packageSlug,
    adults,
    children,
    travelDate,
    tierId,
    contact,
    notes,
  } = req.body;

  // 1. Load the package — must exist and be active
  const pkgSnap = await adminDb.collection("packages").doc(packageSlug).get();
  if (!pkgSnap.exists) throw new ApiError(404, "Package not found");
  const pkg = pkgSnap.data();
  if (!pkg.isActive) throw new ApiError(400, "Package is not available");

  // 2. Validate group size
  if (adults < (pkg.minPeople || 1)) {
    throw new ApiError(400, `Minimum ${pkg.minPeople} adult(s) required`);
  }
  if (adults + children > (pkg.maxPeople || 20)) {
    throw new ApiError(400, `Maximum ${pkg.maxPeople} travelers allowed`);
  }

  // 3. Validate travel date is in the future
  const dt = new Date(travelDate);
  if (Number.isNaN(dt.getTime()) || dt < new Date(Date.now() - 86400000)) {
    throw new ApiError(400, "Travel date must be in the future");
  }

  // 4. Compute price server-side (truth)
  const price = calculatePrice(pkg, { adults, children, tierId });

  // 5. Build snapshot — freezes package data into the booking forever,
  // so admin edits to the package don't change historical bookings.
  const packageSnapshot = {
    slug: pkg.slug,
    title: pkg.title,
    image: pkg.image,
    duration: pkg.duration,
    location: pkg.location,
    pricing: pkg.pricing,
    tiers: pkg.tiers,
  };

  // 6. Persist
  const bookingRef = adminDb.collection("bookings").doc();
  const booking = {
    id: bookingRef.id,
    userId: uid,
    userEmail: email,
    packageSlug,
    packageSnapshot,
    travelers: { adults, children },
    travelDate,
    tierId,
    tierName: price.tierName,
    contact,
    notes: notes || "",
    pricing: {
      perAdult: price.perAdult,
      perChild: price.perChild,
      adultsTotal: price.adultsTotal,
      childrenTotal: price.childrenTotal,
      total: price.total,
    },
    totalAmount: price.total,
    paymentStatus: "pending",
    bookingStatus: "pending",
    razorpayOrderId: null,
    razorpayPaymentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await bookingRef.set(booking);

  res.status(201).json({ success: true, booking });
});

// GET /api/bookings/me — list current user's bookings
export const listMyBookings = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const snap = await adminDb
    .collection("bookings")
    .where("userId", "==", uid)
    .orderBy("createdAt", "desc")
    .get();
  const bookings = snap.docs.map((d) => d.data());
  res.json({ success: true, count: bookings.length, bookings });
});

// GET /api/bookings/:id — single booking (must belong to caller or be admin)
export const getBooking = asyncHandler(async (req, res) => {
  const { uid, admin } = req.user;
  const snap = await adminDb.collection("bookings").doc(req.params.id).get();
  if (!snap.exists) throw new ApiError(404, "Booking not found");
  const booking = snap.data();
  if (!admin && booking.userId !== uid) {
    throw new ApiError(403, "Not authorized to view this booking");
  }
  res.json({ success: true, booking });
});