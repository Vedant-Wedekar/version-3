import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { BEACHES } from "../../data/beaches";

function BeachCard({ beach, large = false }) {
  return (
    <Link
      to={`/packages?beach=${beach.id}`}
      className={
        "group relative block h-full overflow-hidden rounded-[2rem] shadow-md ring-1 ring-slate-900/5 transition-all duration-500 hover:shadow-2xl " +
        (large ? "min-h-[420px] lg:min-h-[640px]" : "min-h-[280px]")
      }
    >
      {/* Image with hover zoom — rounded-[2rem] added here to fix corner flicker on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] [isolation:isolate]">
        <img
          src={beach.img}
          alt={beach.name}
          className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-110"
        />
      </div>

      {/* Always-on bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" />
      {/* Hover top tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top tag */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-700 shadow-sm backdrop-blur">
          {beach.featured && <Sparkles className="h-3 w-3" />}
          {beach.tag}
        </span>
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md ring-1 ring-white/20">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {beach.island}
          </span>
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
        <h3
          className={
            "font-display font-bold leading-tight text-white drop-shadow-md " +
            (large
              ? "text-3xl sm:text-4xl lg:text-5xl"
              : "text-2xl sm:text-3xl")
          }
        >
          {beach.name}
        </h3>

        {/* Description expands on hover */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p
              className={
                "mt-2 leading-relaxed text-white/85 " +
                (large ? "text-base" : "text-sm")
              }
            >
              {beach.desc}
            </p>
          </div>
        </div>

        {/* Always-visible meta + CTA */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/20 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/50">
              Best for
            </p>
            <p className="text-sm font-semibold text-white">{beach.bestFor}</p>
          </div>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
            View
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PopularBeaches() {
  // Find the featured beach (large card) and the rest
  const featured = BEACHES.find((b) => b.featured) || BEACHES[0];
  const others = BEACHES.filter((b) => b.id !== featured.id);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50/30 py-20 sm:py-28">
      {/* Atmospheric blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              <span className="h-px w-8 bg-teal-600" />
              On the shore
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Popular <span className="italic text-teal-700">beaches</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500">
              Soft sand, glass-clear water, and not a footprint in sight —
              the Andamans' most loved shores.
            </p>
          </div>

          <Link
            to="/packages"
            className="group flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-teal-600 hover:text-teal-700"
          >
            All beach packages
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bento grid: 1 big card + 5 smaller ones */}
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured large card — spans 1 column, 2 rows on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:row-span-2"
          >
            <BeachCard beach={featured} large />
          </motion.div>

          {/* Remaining beaches in a 2-column grid on desktop */}
          {others.map((beach, i) => (
            <motion.div
              key={beach.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BeachCard beach={beach} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
