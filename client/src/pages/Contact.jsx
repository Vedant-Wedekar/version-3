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
  User,
  AtSign,
  PhoneCall,
  Users,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import SEO from "../components/common/SEO";
import api from "../services/api";
import { SITE, WHATSAPP_MESSAGE } from "../utils/constants";

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

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

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
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Andaman Travel — call, message, or visit our Port Blair office. A real planner replies within an hour."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/40 to-white pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            <span className="h-px w-8 bg-teal-600" />
            Get in touch
            <span className="h-px w-8 bg-teal-600" />
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
            We're here to <br />
            <span className="italic text-teal-700">help you plan</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500">
            Real planners. Real fast replies. No bots, no call centers — just islanders
            who love their job.
          </p>
        </div>
      </section>

      {/* Quick contact tiles */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-7"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                <MessageCircle className="h-5 w-5" />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-bold">Chat on WhatsApp</h3>
              <p className="relative mt-1 text-sm text-white/85">Real-time replies</p>
              <p className="relative mt-4 font-semibold">{SITE.phoneDisplay} →</p>
            </a>

            <a
              href={`tel:${SITE.phone}`}
              className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <Phone className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900">Give us a call</h3>
              <p className="mt-1 text-sm text-slate-500">Mon–Sat, 9 AM – 8 PM</p>
              <p className="mt-4 font-semibold text-slate-900">{SITE.phoneDisplay} →</p>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                <Mail className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900">Drop an email</h3>
              <p className="mt-1 text-sm text-slate-500">Reply within an hour</p>
              <p className="mt-4 truncate font-semibold text-slate-900">{SITE.email} →</p>
            </a>
          </div>
        </div>
      </section>

      {/* Main: form + sidebar */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8 lg:p-10"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-50/60 to-transparent" />
              <div className="relative">
                <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Tell us about your dream trip and we'll send a tailored proposal.
                </p>

                <form onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field icon={User} label="Full name" required value={form.name} onChange={(v) => update("name", v)} placeholder="Your name" />
                  <Field icon={AtSign} label="Email" required type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                  <Field icon={PhoneCall} label="Phone / WhatsApp" required type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+91 99999 99999" />
                  <Select icon={Users} label="Travelers" value={form.travelers} onChange={(v) => update("travelers", v)} options={["1", "2", "3", "4", "5", "6+"]} />
                  <Field icon={Calendar} label="Approx. travel date" type="date" value={form.travelDate} onChange={(v) => update("travelDate", v)} />
                  <Select label="Interested in" value={form.interest} onChange={(v) => update("interest", v)} options={["Honeymoon", "Family", "Adventure", "Scuba Diving", "Luxury", "Budget", "Custom"]} />

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Anything specific?
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Special occasion, dietary needs, must-see places…"
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
                    />
                  </div>

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
                      {submitting ? "Sending…" : (
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

            {/* Sidebar — office details + hours */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5"
            >
              {/* Office */}
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&q=80"
                    alt="Port Blair"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                      Our home base
                    </p>
                    <p className="font-display text-xl font-bold">Port Blair Office</p>
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <p className="text-sm font-medium text-slate-700">{SITE.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <div className="text-sm text-slate-700">
                      <p className="font-semibold">Mon – Sat · 9:00 AM – 8:00 PM</p>
                      <p className="text-xs text-slate-500">Sun · 10:00 AM – 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust block */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                  Why book with us
                </p>
                <h3 className="mt-2 font-display text-xl font-bold">
                  12 years on the islands.
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    50,000+ travelers hosted
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    Government-registered tour operator
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    Secure payments via Razorpay
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    24/7 on-ground trip support
                  </li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Inputs ---------- */

function Field({ icon: Icon, label, required, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-teal-600">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
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
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            "w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 py-3 text-sm font-medium text-slate-900 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 " +
            (Icon ? "pl-10 pr-10" : "px-4 pr-10")
          }
        >
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
      </div>
    </div>
  );
}