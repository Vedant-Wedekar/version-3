import api from "../../services/api";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  User,
  AtSign,
  PhoneCall,
  Users,
  Calendar,
} from "lucide-react";
import { SITE, WHATSAPP_MESSAGE } from "../../utils/constants";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "2",
    travelDate: "",
    interest: "Honeymoon",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

 const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in your name, email, and phone.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/inquiries", form);
      toast.success("Thanks! We'll get back to you within an hour.");
      setForm({
        name: "",
        email: "",
        phone: "",
        travelers: "2",
        travelDate: "",
        interest: "Honeymoon",
        message: "",
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/30 to-white py-20 sm:py-28">
      {/* Atmospheric blobs */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            <span className="h-px w-8 bg-teal-600" />
            Start your journey
            <span className="h-px w-8 bg-teal-600" />
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
            Let's plan your <span className="italic text-teal-700">Andaman</span> escape
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500">
            Tell us a little about your trip and a real human will get back to
            you with a tailored proposal — usually within an hour.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8 lg:p-10"
          >
            {/* Soft top accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-50/60 to-transparent" />

            <div className="relative">
              <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Tell us about your trip
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                It only takes a minute. No spam, ever.
              </p>

              <form onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <Field
                  icon={User}
                  label="Full name"
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                />

                {/* Email */}
                <Field
                  icon={AtSign}
                  label="Email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                />

                {/* Phone */}
                <Field
                  icon={PhoneCall}
                  label="Phone / WhatsApp"
                  required
                  type="tel"
                  placeholder="+91 99999 99999"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                />

                {/* Travelers */}
                <Select
                  icon={Users}
                  label="Travelers"
                  value={form.travelers}
                  onChange={(v) => update("travelers", v)}
                  options={["1", "2", "3", "4", "5", "6+"]}
                />

                {/* Travel date */}
                <Field
                  icon={Calendar}
                  label="Approx. travel date"
                  type="date"
                  value={form.travelDate}
                  onChange={(v) => update("travelDate", v)}
                />

                {/* Interest */}
                <Select
                  label="Interested in"
                  value={form.interest}
                  onChange={(v) => update("interest", v)}
                  options={[
                    "Honeymoon",
                    "Family",
                    "Adventure",
                    "Scuba Diving",
                    "Luxury",
                    "Budget",
                    "Custom",
                  ]}
                />

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Anything specific you'd like us to know?
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Special occasion, dietary needs, must-see places, anything…"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Submit + trust line */}
                <div className="sm:col-span-2 flex flex-col items-stretch gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                    We reply within an hour during business hours
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg disabled:opacity-60"
                  >
                    {submitting ? (
                      "Sending…"
                    ) : (
                      <>
                        Send my inquiry
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: Direct contact methods */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            {/* WhatsApp — top, most prominent */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-lg ring-1 ring-emerald-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-7"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-white/20">
                    Fastest reply
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
                  Chat on WhatsApp
                </h3>
                <p className="mt-1 text-sm text-white/85">
                  Quick questions? Get real-time answers from our team.
                </p>
                <p className="mt-4 font-display text-base font-semibold">
                  {SITE.phoneDisplay} →
                </p>
              </div>
            </a>

            {/* Call */}
            <a
              href={`tel:${SITE.phone}`}
              className="group block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Call us
                  </p>
                  <p className="font-display text-lg font-bold text-slate-900">
                    {SITE.phoneDisplay}
                  </p>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.email}`}
              className="group block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <p className="truncate font-display text-base font-bold text-slate-900">
                    {SITE.email}
                  </p>
                </div>
              </div>
            </a>

            {/* Office hours + location */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Office hours
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Mon – Sat · 9:00 AM – 8:00 PM
                  </p>
                  <p className="text-sm text-slate-500">Sun · 10:00 AM – 5:00 PM</p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4 border-t border-slate-100 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Visit our office
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {SITE.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reusable field components ---------- */

function Field({ icon: Icon, label, required, type, placeholder, value, onChange }) {
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
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={
            "w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 " +
            (Icon ? "pl-10 pr-4" : "px-4")
          }
        />
      </div>
    </div>
  );
}

function Select({ icon: Icon, label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            "w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 py-3 text-sm font-medium text-slate-900 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 " +
            (Icon ? "pl-10 pr-10" : "px-4 pr-10")
          }
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
      </div>
    </div>
  );
}