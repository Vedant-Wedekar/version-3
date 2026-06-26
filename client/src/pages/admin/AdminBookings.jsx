import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  Mail,
  Phone,
  IndianRupee,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  Eye,
  MapPin,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { listAllBookings, updateBooking } from "../../services/admin";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    listAllBookings(statusFilter === "all" ? {} : { status: statusFilter })
      .then(setBookings)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.toLowerCase();
    return bookings.filter(
      (b) =>
        b.contact?.name?.toLowerCase().includes(q) ||
        b.contact?.email?.toLowerCase().includes(q) ||
        b.contact?.phone?.includes(q) ||
        b.packageSnapshot?.title?.toLowerCase().includes(q) ||
        b.id?.toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateBooking(id, { bookingStatus: status });
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      if (selected?.id === id) setSelected(updated);
      toast.success(`Booking marked as ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Bookings</h1>
          <p className="mt-1 text-sm text-slate-500">
            {filtered.length} {filtered.length === 1 ? "booking" : "bookings"}
            {statusFilter !== "all" && ` · ${statusFilter}`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, package…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-sm focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors " +
                (statusFilter === s.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200")
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-semibold text-slate-900">No bookings found</p>
            <p className="mt-1 text-sm text-slate-500">
              {search ? "Try a different search." : "Bookings will appear here."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Booking</th>
                    <th className="px-6 py-3 text-left font-semibold">Guest</th>
                    <th className="px-6 py-3 text-left font-semibold">Travel date</th>
                    <th className="px-6 py-3 text-right font-semibold">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((b) => (
                    <tr key={b.id} className="transition-colors hover:bg-slate-50/40">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.packageSnapshot?.image}
                            alt=""
                            className="h-10 w-14 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">
                              {b.packageSnapshot?.title}
                            </p>
                            <p className="font-mono text-[10px] text-slate-400">
                              {b.id.slice(0, 10).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{b.contact?.name}</p>
                        <p className="text-xs text-slate-500">{b.contact?.email}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {new Date(b.travelDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        <p className="text-xs text-slate-500">
                          {b.travelers?.adults} adult
                          {b.travelers?.adults > 1 ? "s" : ""}
                          {b.travelers?.children > 0 && `, ${b.travelers.children} child`}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-semibold text-slate-900">
                          {inr(b.totalAmount)}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">
                          {b.paymentStatus}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill status={b.bookingStatus} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelected(b)}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                        >
                          <Eye className="h-3 w-3" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-slate-100 md:hidden">
              {filtered.map((b) => (
                <div key={b.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={b.packageSnapshot?.image}
                      alt=""
                      className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">
                        {b.packageSnapshot?.title}
                      </p>
                      <p className="text-xs text-slate-500">{b.contact?.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="font-semibold text-slate-900">
                          {inr(b.totalAmount)}
                        </p>
                        <StatusPill status={b.bookingStatus} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(b)}
                    className="mt-3 w-full rounded-full bg-slate-900 py-2 text-xs font-semibold text-white"
                  >
                    View details
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <BookingDrawer
            booking={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- subcomponents ---- */

function StatusPill({ status }) {
  const cfg =
    {
      pending: { cls: "bg-amber-50 text-amber-700", icon: Clock },
      confirmed: { cls: "bg-teal-50 text-teal-700", icon: CheckCircle2 },
      completed: { cls: "bg-slate-100 text-slate-700", icon: CheckCircle2 },
      cancelled: { cls: "bg-red-50 text-red-700", icon: XCircle },
    }[status] || { cls: "bg-slate-100 text-slate-600", icon: Clock };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.cls}`}>
      <Icon className="h-3 w-3" />
      {status || "—"}
    </span>
  );
}

function BookingDrawer({ booking, onClose, onStatusChange }) {
  const pkg = booking.packageSnapshot || {};
  const ACTIONS = [
    { status: "confirmed", label: "Confirm", cls: "bg-teal-600 hover:bg-teal-700" },
    { status: "completed", label: "Mark Completed", cls: "bg-slate-700 hover:bg-slate-800" },
    { status: "cancelled", label: "Cancel", cls: "bg-red-600 hover:bg-red-700" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-900/50"
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Booking details
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {/* Package */}
          <div className="overflow-hidden rounded-2xl ring-1 ring-slate-100">
            <div className="relative h-32">
              <img src={pkg.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  {booking.tierName} Package
                </p>
                <p className="font-display text-base font-bold leading-tight">
                  {pkg.title}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
            <Row icon={MapPin} label="Destination" value={pkg.location} />
            <Row icon={Calendar} label="Travel date" value={new Date(booking.travelDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
            <Row icon={Users} label="Travelers" value={`${booking.travelers?.adults} adult${booking.travelers?.adults > 1 ? "s" : ""}${booking.travelers?.children ? `, ${booking.travelers.children} child` : ""}`} />
            <Row icon={IndianRupee} label="Total amount" value={inr(booking.totalAmount)} />
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Guest contact</h4>
            <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm">
              <Row icon={User} label="Name" value={booking.contact?.name} />
              <Row icon={Mail} label="Email" value={booking.contact?.email} />
              <Row icon={Phone} label="Phone" value={booking.contact?.phone} />
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Notes from guest</h4>
              <div className="rounded-2xl bg-amber-50/50 p-4 text-sm text-slate-700 ring-1 ring-amber-100">
                {booking.notes}
              </div>
            </div>
          )}

          {/* Payment */}
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Payment</h4>
            <div className="space-y-1.5 rounded-2xl bg-slate-50 p-4 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Status</span><span className="font-semibold text-slate-900">{booking.paymentStatus}</span></div>
              {booking.razorpayPaymentId && (
                <div className="flex justify-between"><span className="text-slate-500">Payment ID</span><span className="font-mono text-slate-700">{booking.razorpayPaymentId}</span></div>
              )}
              <div className="flex justify-between"><span className="text-slate-500">Booking ID</span><span className="font-mono text-slate-700">{booking.id.slice(0, 14).toUpperCase()}</span></div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Status</h4>
            <div className="mb-3"><StatusPill status={booking.bookingStatus} /></div>
            <div className="grid gap-2">
              {ACTIONS.filter((a) => a.status !== booking.bookingStatus).map((a) => (
                <button
                  key={a.status}
                  onClick={() => onStatusChange(booking.id, a.status)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${a.cls}`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="break-words text-sm font-semibold text-slate-900">{value || "—"}</p>
      </div>
    </div>
  );
}