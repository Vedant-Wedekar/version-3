import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, MapPin, TrendingUp, Check, ArrowUpRight } from "lucide-react";
import { ACTIVITIES } from "../../data/activities";

export default function TrendingActivities() {
  const [activeId, setActiveId] = useState(ACTIVITIES[0].id);
  const active = ACTIVITIES.find((a) => a.id === activeId) || ACTIVITIES[0];
  const videoRef = useRef(null);

  // Auto-play preview video when active activity changes
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [activeId]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/40 to-white py-20 sm:py-28">
      {/* Atmospheric blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              <span className="h-px w-8 bg-teal-600" />
              Things to do
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Trending <span className="italic text-teal-700">activities</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500">
              From the deep blue to the open sky — the experiences travelers
              can't stop talking about.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-100">
            <TrendingUp className="h-4 w-4" />
            Most booked this month
          </span>
        </div>

        {/* Tab buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          {ACTIVITIES.map((a) => {
            const isActive = a.id === activeId;
            return (
              <button
                key={a.id}
                onClick={() => setActiveId(a.id)}
                className={
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 " +
                  (isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300")
                }
              >
                {a.name}
              </button>
            );
          })}
        </div>

        {/* Active activity panel */}
        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-100">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            {/* Left: media */}
            <div className="relative h-72 overflow-hidden sm:h-96 lg:h-[560px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/* Image base */}
                  <img
                    src={active.img}
                    alt={active.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Video overlay */}
                  <video
                    ref={videoRef}
                    src={active.video}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                  />
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating tag on image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${active.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-6 top-6"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 backdrop-blur shadow-sm">
                    <TrendingUp className="h-3 w-3" /> {active.tag}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Location pill bottom-left */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`loc-${active.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20"
                >
                  <MapPin className="h-3.5 w-3.5 text-teal-300" />
                  {active.location}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: details */}
            <div className="relative p-7 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`details-${active.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                    {active.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {active.desc}
                  </p>

                  {/* Meta row */}
                  <div className="mt-7 grid grid-cols-2 gap-4 border-y border-slate-100 py-5">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
                        <Clock className="h-3.5 w-3.5" /> Duration
                      </div>
                      <p className="mt-1 font-semibold text-slate-900">
                        {active.duration}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
                        Level
                      </div>
                      <p className="mt-1 font-semibold text-slate-900">
                        {active.level}
                      </p>
                    </div>
                  </div>

                  {/* Perks */}
                  <ul className="mt-6 grid gap-2.5">
                    {active.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-2.5 text-sm text-slate-700"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="mt-8 flex flex-col items-stretch gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Starts from
                      </p>
                      <p className="font-display text-3xl font-bold text-slate-900">
                        {active.price}
                        <span className="ml-1 text-sm font-medium text-slate-400">
                          / person
                        </span>
                      </p>
                    </div>
                    <Link
                      to="/contact"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
                    >
                      Book this experience
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}