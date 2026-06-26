import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/testimonials";

// Duplicate the array so the marquee loops seamlessly (no visible gap when it resets)
const ROW_A = [...TESTIMONIALS, ...TESTIMONIALS];
const ROW_B = [...TESTIMONIALS].reverse();
const ROW_B_DOUBLED = [...ROW_B, ...ROW_B];

function TestimonialCard({ t }) {
  return (
    <div className="w-[300px] shrink-0 sm:w-[380px]">
      <div className="group relative h-full rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
        {/* Soft teal glow on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-teal-100/0 to-cyan-100/0 opacity-0 transition-opacity duration-500 group-hover:from-teal-100/60 group-hover:to-cyan-100/40 group-hover:opacity-100" />

        <div className="relative">
          {/* Quote icon */}
          <Quote className="h-6 w-6 fill-teal-100 text-teal-100" strokeWidth={0} />

          {/* Stars */}
          <div className="mt-3 flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Quote text */}
          <p className="mt-3 line-clamp-5 text-[15px] leading-relaxed text-slate-700">
            "{t.message}"
          </p>

          {/* Person */}
          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
            <img
              src={t.photo}
              alt={t.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-500">{t.package}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", duration = 40 }) {
  // direction: "left" = move from right→left; "right" = move left→right
  const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="group/row relative overflow-hidden py-4">
      {/* Fade gradients on the edges so cards melt in/out instead of cutting off */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-cyan-50/80 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-cyan-50/80 to-transparent sm:w-32" />

      <motion.div
        className="flex gap-5 group-hover/row:[animation-play-state:paused]"
        animate={{ x }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        // Pause when hovering the row (added via inline style hover trick)
        whileHover={{}}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/40 to-white py-20 sm:py-28">
      {/* Soft background atmosphere */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            <span className="h-px w-8 bg-teal-600" />
            Traveler Stories
            <span className="h-px w-8 bg-teal-600" />
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
            Reviews from <span className="italic text-teal-700">real</span> travelers
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500">
            Trusted by thousands of explorers — real stories from travelers who
            made memories with us.
          </p>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">4.9 / 5</span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
            </span>
            <span className="hidden h-4 w-px bg-slate-300 sm:block" />
            <span className="text-slate-500">
              Based on{" "}
              <span className="font-semibold text-slate-900">2,400+ verified reviews</span>
            </span>
          </div>
        </div>

        {/* Two marquee rows moving in opposite directions */}
        <div className="space-y-2">
          <MarqueeRow items={ROW_A} direction="left" duration={45} />
          <MarqueeRow items={ROW_B_DOUBLED} direction="right" duration={50} />
        </div>
      </div>
    </section>
  );
}