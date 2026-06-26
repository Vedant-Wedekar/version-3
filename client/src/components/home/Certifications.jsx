import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { CERTIFICATIONS } from "../../data/certifications";

// Duplicate so the marquee loops seamlessly
const ROW = [...CERTIFICATIONS, ...CERTIFICATIONS];

function BadgeCard({ cert }) {
  return (
    <div className="group flex w-[220px] shrink-0 items-center gap-4 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md sm:w-[260px]">
      {/* Logo placeholder — replace with real <img> when client provides assets */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 ring-1 ring-teal-100 transition-colors duration-300 group-hover:from-teal-100 group-hover:to-cyan-100">
        {cert.logo ? (
          <img
            src={cert.logo}
            alt={cert.name}
            className="h-8 w-8 object-contain"
          />
        ) : (
          <span className="font-display text-sm font-bold text-teal-700">
            {cert.short}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate font-display text-sm font-bold text-slate-900">
          {cert.name}
        </p>
        <p className="truncate text-[11px] text-slate-500">{cert.sub}</p>
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/30 to-white py-16 sm:py-20">
      <div className="relative">
        {/* Compact two-column header */}
        <div className="mx-auto mb-10 max-w-7xl px-4 sm:mb-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="grid items-end gap-6 sm:grid-cols-[1fr_auto]"
          >
            <div>
              <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
                <ShieldCheck className="h-4 w-4" />
                Certified & Trusted
              </span>
              <h2 className="font-display text-3xl font-bold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl">
                Recognized by the people who <br className="hidden sm:block" />
                <span className="italic text-teal-700">define</span> good travel.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              We hold every certification, license, and recognition you'd
              expect from a serious travel partner — so you can book with full
              confidence.
            </p>
          </motion.div>
        </div>

        {/* Marquee row */}
        <div className="group/row relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

          <motion.div
            className="flex gap-4 py-2 group-hover/row:[animation-play-state:paused]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {ROW.map((cert, i) => (
              <BadgeCard key={`${cert.name}-${i}`} cert={cert} />
            ))}
          </motion.div>
        </div>

        {/* Reassurance footer line */}
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 text-xs font-medium text-slate-500 sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Registered tour operator
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              GST compliant
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Verified payment partners
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              100% secure booking
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}