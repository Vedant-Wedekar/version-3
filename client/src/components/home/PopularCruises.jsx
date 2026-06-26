import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, Users, MapPin, Anchor, ArrowUpRight, Check } from "lucide-react";
import { CRUISES } from "../../data/cruises";

function CruiseRow({ cruise, index }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={
        "grid items-center gap-8 lg:gap-12 " +
        (isReversed
          ? "lg:grid-cols-[1fr_1.2fr]"
          : "lg:grid-cols-[1.2fr_1fr]")
      }
    >
      {/* Image — order swaps based on row index */}
      <div
        className={
          "group relative " +
          (isReversed ? "lg:order-2" : "lg:order-1")
        }
      >
        <div className="relative h-72 overflow-hidden rounded-[2rem] shadow-md ring-1 ring-slate-900/5 transition-shadow duration-500 group-hover:shadow-2xl sm:h-96 lg:h-[460px]">
          {/* Media wrapper with isolation to prevent corner flicker */}
          <div className="absolute inset-0 overflow-hidden [isolation:isolate]">
            <img
              src={cruise.img}
              alt={cruise.name}
              className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Floating chips on the image */}
          <div className="absolute left-5 top-5 flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-700 shadow-sm backdrop-blur">
              <Anchor className="h-3 w-3" /> {cruise.type}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {cruise.rating}
          </div>

          {/* Bottom location bar */}
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md ring-1 ring-white/20">
            <span className="flex items-center gap-2 text-xs font-medium text-white">
              <MapPin className="h-3.5 w-3.5 text-teal-300" />
              {cruise.route}
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-wider text-white/80 sm:inline">
              Andaman
            </span>
          </div>
        </div>

        {/* Decorative accent number */}
        <span
          className={
            "absolute -top-6 font-display text-7xl font-bold text-teal-600/15 sm:-top-8 sm:text-8xl " +
            (isReversed ? "-right-2 sm:-right-4" : "-left-2 sm:-left-4")
          }
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content side */}
      <div
        className={
          "relative " + (isReversed ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6")
        }
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
          {cruise.tagline}
        </span>
        <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {cruise.name}
        </h3>

        {/* Quick facts row */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-100 py-4 text-sm">
          <span className="flex items-center gap-2 text-slate-700">
            <Clock className="h-4 w-4 text-teal-600" />
            <span>
              <span className="text-slate-400">Duration · </span>
              <span className="font-semibold">{cruise.duration}</span>
            </span>
          </span>
          <span className="flex items-center gap-2 text-slate-700">
            <Users className="h-4 w-4 text-teal-600" />
            <span>
              <span className="text-slate-400">Capacity · </span>
              <span className="font-semibold">{cruise.capacity}</span>
            </span>
          </span>
        </div>

        {/* Features */}
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {cruise.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5 text-sm text-slate-700"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Starts from
            </p>
            <p className="font-display text-3xl font-bold text-slate-900">
              {cruise.price}
              <span className="ml-1 text-sm font-medium text-slate-400">
                / person
              </span>
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
          >
            Book this cruise
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function PopularCruises() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/30 to-white py-20 sm:py-28">
      {/* Atmospheric blobs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            <span className="h-px w-8 bg-teal-600" />
            Across the Sea
            <span className="h-px w-8 bg-teal-600" />
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
            Popular <span className="italic text-teal-700">cruises</span> & ferries
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500">
            How you island-hop matters. Pick a comfortable ferry, a magical
            sunset cruise, or your own private yacht.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-20 sm:space-y-24 lg:space-y-28">
          {CRUISES.map((cruise, index) => (
            <CruiseRow key={cruise.id} cruise={cruise} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}