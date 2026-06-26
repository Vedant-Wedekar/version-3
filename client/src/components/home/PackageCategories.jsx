import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Compass,
  Users,
  Waves,
  Crown,
  Wallet,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  {
    title: "Honeymoon",
    slug: "honeymoon",
    desc: "Romantic island escapes",
    icon: Heart,
    from: "₹28,999",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
    video: "https://res.cloudinary.com/dduri4zfq/video/upload/v1780386905/13168204_1080_1920_30fps_gf2a3o.mp4",
  },
  {
    title: "Adventure",
    slug: "adventure",
    desc: "Thrills on land & sea",
    icon: Compass,
    from: "₹22,499",
    img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80",
    video: "https://cdn.coverr.co/videos/coverr-aerial-view-of-the-sea-5108/1080p.mp4",
  },
  {
    title: "Family",
    slug: "family",
    desc: "Fun for all ages",
    icon: Users,
    from: "₹19,999",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYi_N_fH5QTgEI8FOdKdCHvPlFpWy4VYtMQ&s",
    video: "https://cdn.coverr.co/videos/coverr-waves-on-a-beach-3034/1080p.mp4",
  },
  {
    title: "Scuba Diving",
    slug: "scuba",
    desc: "Explore the deep blue",
    icon: Waves,
    from: "₹24,999",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    video: "https://cdn.coverr.co/videos/coverr-underwater-coral-reef-2569/1080p.mp4",
  },
  {
    title: "Luxury",
    slug: "luxury",
    desc: "Premium island living",
    icon: Crown,
    from: "₹49,999",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    video: "https://cdn.coverr.co/videos/coverr-tropical-beach-from-above-5244/1080p.mp4",
    featured: true,
  },
  {
    title: "Pocket-Friendly",
    slug: "budget",
    desc: "Great value getaways",
    icon: Wallet,
    from: "₹12,499",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnyYf8VrkkukeMk-MQJRvfTmWCb0Gq9Ii-w&s",
    video: "https://cdn.coverr.co/videos/coverr-waves-on-a-beach-3034/1080p.mp4",
  },
];

function CategoryTile({ cat, index, scrollYProgress }) {
  const Icon = cat.icon;
  const videoRef = useRef(null);

  const total = CATEGORIES.length;
  const start = index * (0.5 / total);
  const end = start + 0.3;

  const y = useTransform(scrollYProgress, [start, end], [400, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <motion.div style={{ y, opacity }} className="group relative">
      {/* Soft glow that appears behind the card on hover */}
      <div className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-teal-400/40 via-cyan-500/30 to-teal-600/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <Link
        to={`/packages?category=${cat.slug}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative flex h-56 flex-col justify-end overflow-hidden rounded-3xl shadow-md ring-1 ring-slate-900/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:ring-teal-400/40 sm:h-72"
      >
        {/* Media wrapper */}
        <div className="absolute inset-0 overflow-hidden [isolation:isolate]">
          <img
            src={cat.img}
            alt={cat.title}
            className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <video
            ref={videoRef}
            src={cat.video}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full transform-gpu object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          />
        </div>

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent transition-all duration-500 group-hover:from-teal-950" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-transparent" />

        {/* Animated corner accents */}
        <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-white/0 transition-all duration-500 group-hover:left-4 group-hover:top-4 group-hover:border-white/80" />
        <span className="pointer-events-none absolute right-3 bottom-3 h-5 w-5 border-b-2 border-r-2 border-white/0 transition-all duration-500 group-hover:right-4 group-hover:bottom-4 group-hover:border-white/80" />

        {/* Featured ribbon (only on the highlighted card) */}
        {cat.featured && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950 shadow-md">
            <Sparkles className="h-3 w-3" /> Bestseller
          </span>
        )}

        {/* Big index number — editorial touch */}
        <span className="absolute right-5 top-4 font-display text-3xl font-bold text-white/30 transition-all duration-500 group-hover:text-white/60 sm:text-4xl">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon badge — slides up slightly on hover */}
        <span className="absolute right-5 bottom-[6.5rem] flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg backdrop-blur-md ring-1 ring-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-teal-700">
          <Icon className="h-4 w-4" />
        </span>

        {/* Bottom content block — slides up on hover, reveals "View" link */}
        <div className="relative z-10 p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
            From {cat.from}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-white drop-shadow-md sm:text-3xl">
            {cat.title}
          </h3>
          <p className="mt-1 text-sm text-white/75">{cat.desc}</p>

          {/* Hidden CTA that slides up on hover */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="mt-3 flex items-center gap-2 border-t border-white/20 pt-3 text-sm font-semibold text-white">
                Explore packages
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PackageCategories() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/30 to-white py-16 sm:py-24"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with side accent line */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            <span className="h-px w-8 bg-teal-600" />
            Find Your Trip
            <span className="h-px w-8 bg-teal-600" />
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
            Packages for <span className="italic text-teal-700">Every</span> Traveler
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500">
            Whether you're chasing romance, adventure, or relaxation — there's
            an Andaman journey crafted just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, index) => (
            <CategoryTile
              key={cat.slug}
              cat={cat}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}