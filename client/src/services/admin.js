import api from "./api";

export async function getDashboardStats() {
  const res = await api.get("/admin/stats");
  return res.data; // { stats, recentBookings }
}

export async function listAllBookings(filters = {}) {
  const params = {};
  if (filters.status) params.status = filters.status;
  const res = await api.get("/admin/bookings", { params });
  return res.data.bookings;
}

export async function updateBooking(id, update) {
  const res = await api.patch(`/admin/bookings/${id}`, update);
  return res.data.booking;
}

export async function listAllInquiries(filters = {}) {
  const params = {};
  if (filters.status) params.status = filters.status;
  const res = await api.get("/admin/inquiries", { params });
  return res.data.inquiries;
}

export async function updateInquiry(id, update) {
  const res = await api.patch(`/admin/inquiries/${id}`, update);
  return res.data.inquiry;
}

export async function listAllPackagesAdmin() {
  const res = await api.get("/admin/packages");
  return res.data.packages;
}

export async function updatePackageAdmin(slug, update) {
  const res = await api.patch(`/admin/packages/${slug}`, update);
  return res.data.package;
}