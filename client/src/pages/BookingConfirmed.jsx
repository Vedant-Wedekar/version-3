import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, MapPin, Calendar, Users, Clock, Download, Home } from "lucide-react";
import SEO from "../components/common/SEO";
import { getBooking } from "../services/bookings";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export default function BookingConfirmed() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBooking(id)
      .then(setBooking)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-teal-600" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <p className="font-semibold text-red-600">{error || "Booking not found"}</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const pkg = booking.packageSnapshot;

  return (
    <>
      <SEO title="Booking confirmed" />
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-50/40 to-white pt-28 pb-16 sm:pt-32">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Success badge */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 shadow-xl shadow-teal-500/30"
          >
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-7 text-center"
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              You're <span className="italic text-teal-700">in</span>!
            </h1>
            <p className="mt-3 text-base text-slate-500">
              Your Andaman trip is confirmed. We've sent a confirmation email to{" "}
              <span className="font-semibold text-slate-900">{booking.contact.email}</span>.
            </p>
          </motion.div>

          {/* Receipt card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  {booking.tierName} Package
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  {pkg.title}
                </h2>
              </div>
            </div>

            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Booking ID
                </span>
                <span className="font-mono text-sm font-semibold text-slate-900">
                  {booking.id.slice(0, 12).toUpperCase()}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Detail
                  icon={MapPin}
                  label="Destination"
                  value={pkg.location}
                />
                <Detail
                  icon={Calendar}
                  label="Travel date"
                  value={new Date(booking.travelDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                />
                <Detail
                  icon={Clock}
                  label="Duration"
                  value={`${pkg.duration.days} Days / ${pkg.duration.nights} Nights`}
                />
                <Detail
                  icon={Users}
                  label="Travelers"
                  value={`${booking.travelers.adults} adult${
                    booking.travelers.adults > 1 ? "s" : ""
                  }${
                    booking.travelers.children > 0
                      ? `, ${booking.travelers.children} child${
                          booking.travelers.children > 1 ? "ren" : ""
                        }`
                      : ""
                  }`}
                />
              </div>

              <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
                <span className="text-sm text-slate-500">Total paid</span>
                <span className="font-display text-2xl font-bold text-slate-900">
                  {inr(booking.totalAmount)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 rounded-3xl bg-teal-50/50 p-6 ring-1 ring-teal-100"
          >
            <h3 className="font-display text-lg font-bold text-slate-900">
              What happens next
            </h3>
            <ol className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                  1
                </span>
                Your dedicated trip manager will call you within an hour to confirm details.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                  2
                </span>
                You'll receive your full itinerary, hotel vouchers, and ferry tickets via email.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                  3
                </span>
                Start packing! We can't wait to show you the islands.
              </li>
            </ol>
          </motion.div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/my-bookings"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700"
            >
              <Download className="h-4 w-4" /> View my bookings
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:border-teal-300 hover:text-teal-700"
            >
              <Home className="h-4 w-4" /> Back home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-teal-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}