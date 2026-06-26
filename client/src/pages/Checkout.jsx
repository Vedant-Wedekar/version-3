import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  User,
  CreditCard,
  Clock,
  MapPin,
  Users,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import SEO from "../components/common/SEO";
import { useAuth } from "../context/AuthContext";
import { createBooking, payForBooking } from "../services/bookings";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

// Pages route to here with { state: { draft: { ... } } } — see PackageDetails Book button.
export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const draft = state?.draft;

  // Redirect if missing draft (user landed here directly) or not signed in
  useEffect(() => {
    if (loading) return;
    if (!draft) {
      navigate("/packages", { replace: true });
      return;
    }
    if (!user) {
      navigate("/login", {
        replace: true,
        state: { from: "/checkout", draft },
      });
    }
  }, [draft, user, loading, navigate]);

  const [contact, setContact] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
  });
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Once user loads, prefill name/email
  useEffect(() => {
    if (user) {
      setContact((c) => ({
        ...c,
        name: c.name || user.displayName || "",
        email: c.email || user.email || "",
      }));
    }
  }, [user]);

  if (loading || !draft || !user) return null;

  const updateContact = (k, v) => setContact((c) => ({ ...c, [k]: v }));

  const handlePay = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone) {
      toast.error("Please fill in your name, email, and phone.");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the terms before continuing.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Create the pending booking
      const booking = await createBooking({
        packageSlug: draft.packageSlug,
        adults: draft.adults,
        children: draft.children,
        travelDate: draft.travelDate,
        tierId: draft.tierId,
        contact,
        notes,
      });

      // 2. Open Razorpay + verify on success
      const paid = await payForBooking(booking, {
        name: contact.name,
        email: contact.email,
      });

      // 3. Confirmation
      toast.success("Payment successful — your trip is booked!");
      navigate(`/booking-confirmed/${paid.id}`, { replace: true });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Checkout" />
      <section className="relative min-h-screen bg-gradient-to-b from-cyan-50/30 to-white pt-28 pb-16 sm:pt-32">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to={`/packages/${draft.packageSlug}`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to package
          </Link>

          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Confirm your booking
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Just a couple of details and we'll get your Andaman adventure locked in.
          </p>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* LEFT — contact + payment */}
            <form
              onSubmit={handlePay}
              className="space-y-6 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8"
            >
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Contact details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your trip manager will use these to reach you.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field
                    icon={User}
                    label="Full name"
                    required
                    value={contact.name}
                    onChange={(v) => updateContact("name", v)}
                    placeholder="Your name"
                  />
                  <Field
                    icon={Mail}
                    label="Email"
                    required
                    type="email"
                    value={contact.email}
                    onChange={(v) => updateContact("email", v)}
                    placeholder="you@example.com"
                  />
                  <div className="sm:col-span-2">
                    <Field
                      icon={Phone}
                      label="Phone / WhatsApp"
                      required
                      type="tel"
                      value={contact.phone}
                      onChange={(v) => updateContact("phone", v)}
                      placeholder="+91 99999 99999"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Anything we should know? (optional)
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special occasions, dietary needs, mobility considerations…"
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="rounded-2xl bg-teal-50/50 p-4 ring-1 ring-teal-100">
                <label className="flex items-start gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    I agree to the{" "}
                    <Link to="/terms" className="font-semibold text-teal-700 hover:underline">
                      Terms
                    </Link>
                    {" "}and the{" "}
                    <Link to="/cancellation" className="font-semibold text-teal-700 hover:underline">
                      cancellation policy
                    </Link>
                    . Free cancellation up to 30 days before travel.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg disabled:opacity-60"
              >
                {submitting ? (
                  "Opening payment…"
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay {inr(draft.total)} securely
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                Payments processed securely by Razorpay
                <CreditCard className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </form>

            {/* RIGHT — order summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100"
              >
                {draft.image && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={draft.image}
                      alt={draft.packageTitle}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                        {draft.tierName}
                      </p>
                      <h3 className="font-display text-lg font-bold text-white">
                        {draft.packageTitle}
                      </h3>
                    </div>
                  </div>
                )}

                <div className="space-y-4 p-6">
                  <SummaryRow
                    icon={MapPin}
                    label="Destination"
                    value={draft.location}
                  />
                  <SummaryRow
                    icon={Calendar}
                    label="Travel date"
                    value={new Date(draft.travelDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  />
                  <SummaryRow
                    icon={Clock}
                    label="Duration"
                    value={`${draft.days} Days / ${draft.nights} Nights`}
                  />
                  <SummaryRow
                    icon={Users}
                    label="Travelers"
                    value={`${draft.adults} adult${draft.adults > 1 ? "s" : ""}${
                      draft.children > 0
                        ? `, ${draft.children} child${draft.children > 1 ? "ren" : ""}`
                        : ""
                    }`}
                  />

                  <div className="border-t border-dashed border-slate-200 pt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Price breakdown
                    </h4>
                    <div className="mt-2 space-y-1.5 text-sm">
                      <Row
                        label={`${draft.adults} × adult @ ${inr(draft.perAdult)}`}
                        value={inr(draft.perAdult * draft.adults)}
                      />
                      {draft.children > 0 && (
                        <Row
                          label={`${draft.children} × child @ ${inr(draft.perChild)}`}
                          value={inr(draft.perChild * draft.children)}
                        />
                      )}
                      <div className="my-2 h-px bg-slate-100" />
                      <Row label="Total (incl. GST)" value={inr(draft.total)} bold />
                    </div>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ----- helpers ----- */

function Field({ icon: Icon, label, required, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-teal-600">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={
            "w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 " +
            (Icon ? "pl-10 pr-4" : "px-4")
          }
        />
      </div>
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className={"text-slate-500 " + (bold ? "font-semibold text-slate-900" : "")}>
        {label}
      </span>
      <span
        className={
          "text-slate-700 " + (bold ? "font-display text-base font-bold text-slate-900" : "")
        }
      >
        {value}
      </span>
    </div>
  );
}