import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  IndianRupee,
  ArrowUpRight,
  Plus,
  Sparkles,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { listMyBookings } from "../services/bookings";
import { useAuth } from "../context/AuthContext";

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

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    listMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.bookingStatus === filter);

  return (
    <>
      <SEO title="My Bookings" description="Your Andaman trips, all in one place." />

      <section className="relative min-h-screen bg-gradient-to-b from-cyan-50/30 to-white pt-28 pb-16 sm:pt-32">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                Your trips
              </span>
              <h1 className="mt-2 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
                Hey {user?.displayName?.split(" ")[0] || "traveler"} 👋
              </h1>
              <p className="mt-2 text-base text-slate-500">
                {bookings.length === 0
                  ? "Ready to plan your first Andaman adventure?"
                  : `${bookings.length} ${bookings.length === 1 ? "trip" : "trips"} so far. Let's keep them coming.`}
              </p>
            </div>

            <Link
              to="/packages"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-700"
            >
              <Plus className="h-4 w-4" />
              Plan a new trip
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Filters */}
          {bookings.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setFilter(s.value)}
                  className={
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all " +
                    (filter === s.value
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50")
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* States */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-44 animate-pulse rounded-3xl bg-white ring-1 ring-slate-100" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-red-50 p-6 ring-1 ring-red-100">
              <p className="font-semibold text-red-700">{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <EmptyState />
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-slate-100">
              <p className="font-semibold text-slate-900">
                No {filter} bookings
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try a different filter to see your other trips.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((b, i) => (
                <BookingCard key={b.id} booking={b} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function BookingCard({ booking, index }) {
  const pkg = booking.packageSnapshot || {};
  const travelDate = new Date(booking.travelDate);
  const isUpcoming = travelDate >= new Date() && booking.bookingStatus !== "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
    >
      <div className="grid md:grid-cols-[280px_1fr]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden md:h-auto">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent md:bg-gradient-to-r" />
          <div className="absolute inset-x-0 bottom-0 p-4 md:hidden">
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
              {booking.tierName}
            </p>
            <p className="font-display text-lg font-bold text-white">{pkg.title}</p>
          </div>
          {isUpcoming && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-teal-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-900">
              <Sparkles className="h-2.5 w-2.5" /> Upcoming
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <div className="hidden md:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
              {booking.tierName} Package
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-slate-900">{pkg.title}</h3>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-4">
            <MetaRow icon={MapPin} label={pkg.location} />
            <MetaRow
              icon={Calendar}
              label={travelDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            />
            <MetaRow
              icon={Users}
              label={`${booking.travelers?.adults} adult${booking.travelers?.adults > 1 ? "s" : ""}${booking.travelers?.children ? `, ${booking.travelers.children} child` : ""}`}
            />
            <MetaRow
              icon={Clock}
              label={`${pkg.duration?.days}D / ${pkg.duration?.nights}N`}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-4">
            <div>
              <div className="flex items-center gap-2">
                <StatusPill status={booking.bookingStatus} />
                <PaymentPill payment={booking.paymentStatus} />
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                ID: {booking.id?.slice(0, 12).toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Total</p>
              <p className="font-display text-2xl font-bold text-slate-900">
                {inr(booking.totalAmount)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to={`/booking-confirmed/${booking.id}`}
              className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
            >
              View booking
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <Link
              to={`/packages/${booking.packageSlug}`}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:border-teal-300 hover:text-teal-700"
            >
              View package
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MetaRow({ icon: Icon, label }) {
  return (
    <div className="flex items-start gap-2 text-slate-600">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function StatusPill({ status }) {
  const cfg =
    {
      pending: { label: "Pending", cls: "bg-amber-50 text-amber-700", icon: Clock },
      confirmed: { label: "Confirmed", cls: "bg-teal-50 text-teal-700", icon: CheckCircle2 },
      completed: { label: "Completed", cls: "bg-slate-100 text-slate-700", icon: CheckCircle2 },
      cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600", icon: XCircle },
    }[status] || { label: status, cls: "bg-slate-100 text-slate-600", icon: Clock };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.cls}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function PaymentPill({ payment }) {
  if (payment !== "paid") return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
      <IndianRupee className="h-3 w-3" /> Paid
    </span>
  );
}

function EmptyState() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100 sm:p-16">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100">
        <Briefcase className="h-7 w-7 text-teal-700" />
      </div>
      <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
        No bookings yet
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Browse our handcrafted packages and book your first Andaman adventure. Your trips
        will appear right here.
      </p>
      <Link
        to="/packages"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700"
      >
        Browse packages
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}