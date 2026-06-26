import { adminDb } from "../config/firebaseAdmin.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// GET /api/admin/stats — dashboard summary
export const getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(now);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now);
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Fetch in parallel
  const [bookingsSnap, inquiriesSnap] = await Promise.all([
    adminDb.collection("bookings").get(),
    adminDb.collection("inquiries").get(),
  ]);

  let revenue = 0;
  let revenueThisMonth = 0;
  let bookingsToday = 0;
  let bookingsThisWeek = 0;
  let pendingBookings = 0;
  let confirmedBookings = 0;
  const recentBookings = [];

  bookingsSnap.forEach((doc) => {
    const b = doc.data();
    const createdAt = b.createdAt?.toDate?.() || new Date(b.createdAt);

    if (b.paymentStatus === "paid") {
      revenue += b.totalAmount || 0;
      if (createdAt >= startOfMonth) revenueThisMonth += b.totalAmount || 0;
    }

    if (createdAt >= startOfDay) bookingsToday++;
    if (createdAt >= startOfWeek) bookingsThisWeek++;

    if (b.bookingStatus === "pending") pendingBookings++;
    if (b.bookingStatus === "confirmed") confirmedBookings++;

    recentBookings.push({
      ...b,
      _createdAtMs: createdAt.getTime(),
    });
  });

  // Sort recent bookings desc, take top 5
  recentBookings.sort((a, b) => b._createdAtMs - a._createdAtMs);
  const recent = recentBookings.slice(0, 5).map(({ _createdAtMs, ...b }) => b);

  let inquiriesNew = 0;
  inquiriesSnap.forEach((doc) => {
    const i = doc.data();
    if (i.status === "new") inquiriesNew++;
  });

  res.json({
    success: true,
    stats: {
      totalBookings: bookingsSnap.size,
      bookingsToday,
      bookingsThisWeek,
      pendingBookings,
      confirmedBookings,
      revenue,
      revenueThisMonth,
      totalInquiries: inquiriesSnap.size,
      newInquiries: inquiriesNew,
    },
    recentBookings: recent,
  });
});

// GET /api/admin/bookings — admin list (all bookings, with optional filters)
export const listAllBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  let q = adminDb.collection("bookings");
  if (status) q = q.where("bookingStatus", "==", status);

  const snap = await q.orderBy("createdAt", "desc").get();
  const bookings = snap.docs.map((d) => d.data());

  res.json({ success: true, count: bookings.length, bookings });
});

// PATCH /api/admin/bookings/:id — update status / notes
export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bookingStatus, adminNote } = req.body;

  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (bookingStatus && !allowed.includes(bookingStatus)) {
    throw new ApiError(400, "Invalid bookingStatus");
  }

  const ref = adminDb.collection("bookings").doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw new ApiError(404, "Booking not found");

  const update = { updatedAt: new Date() };
  if (bookingStatus) update.bookingStatus = bookingStatus;
  if (adminNote !== undefined) update.adminNote = adminNote;

  await ref.update(update);
  const fresh = await ref.get();
  res.json({ success: true, booking: fresh.data() });
});

// GET /api/admin/inquiries — admin list
export const listAllInquiries = asyncHandler(async (req, res) => {
  const { status } = req.query;
  let q = adminDb.collection("inquiries");
  if (status) q = q.where("status", "==", status);

  const snap = await q.orderBy("createdAt", "desc").get();
  const inquiries = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  res.json({ success: true, count: inquiries.length, inquiries });
});

// PATCH /api/admin/inquiries/:id — mark as handled / add note
export const updateInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, adminNote } = req.body;

  const allowed = ["new", "in-progress", "handled", "spam"];
  if (status && !allowed.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const ref = adminDb.collection("inquiries").doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw new ApiError(404, "Inquiry not found");

  const update = { updatedAt: new Date() };
  if (status) update.status = status;
  if (adminNote !== undefined) update.adminNote = adminNote;

  await ref.update(update);
  const fresh = await ref.get();
  res.json({ success: true, inquiry: { id, ...fresh.data() } });
});