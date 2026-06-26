import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, Users, MapPin, ArrowRight } from "lucide-react";
import { usePackages } from "../../hooks/usePackages";

// Indian Rupee formatter
const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

// Container stagger: children animate in one-by-one
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 90, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function PackageCard({ pkg }) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {}); // ignore autoplay rejection
    }
  };
  const handleLeave = () => {
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <motion.div variants={cardVariants}>
      <Link
        to={`/packages/${pkg.slug}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative block overflow-hidden rounded-3xl bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl"
      >
        {/* Media wrapper — isolate fixes the rounded-corner flicker on hover */}
        <div className="relative h-60 overflow-hidden [isolation:isolate]">
          {/* Image (always visible) */}
          <img
            src={pkg.image}
            alt={pkg.title}
            className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Video preview (fades in on hover) */}
          <video
            ref={videoRef}
            src={pkg.video}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full transform-gpu object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

          {/* Category chip */}
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-teal-700 backdrop-blur">
            {pkg.category}
          </span>
          {/* Rating chip */}
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {pkg.rating}
          </span>

          {/* Location at bottom of media */}
          <span className="absolute bottom-3 left-4 flex items-center gap-1 text-xs font-medium text-white/90">
            <MapPin className="h-3.5 w-3.5" /> {pkg.location}
          </span>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-display text-xl font-bold text-slate-900">
            {pkg.title}
          </h3>

          {/* Meta */}
          <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal-600" />
              {pkg.duration.days}D / {pkg.duration.nights}N
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-teal-600" />
              {pkg.people} People
            </span>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
            <div>
              <span className="text-xs text-slate-400 line-through">
                {inr(pkg.oldPrice)}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-bold text-slate-900">
                  {inr(pkg.price)}
                </span>
                <span className="text-xs text-slate-400">/ person</span>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-teal-700 group-hover:gap-2">
              View <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BestPackages() {
  const { packages, loading } = usePackages({ featured: true });
  const featured = packages.slice(0, 3); // show top 3 featured

  return (
    <section className="bg-gradient-to-b from-cyan-50/40 to-slate-50 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-teal-600">
              Handpicked For You
            </span>
            <h2 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Our Best Packages
            </h2>
          </div>
          <Link
            to="/packages"
            className="group flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-teal-600 hover:text-teal-700"
          >
            View All Packages
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards — stagger in one by one on scroll */}
       {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[520px] animate-pulse rounded-3xl bg-white/60" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {featured.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}