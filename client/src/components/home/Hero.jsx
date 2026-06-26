import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Plane, Waves, ChevronDown } from "lucide-react";
import IslandMap from "./IslandMap";
import { ISLANDS } from "../../data/islands";

// TODO: replace with the client's own high-res Andaman hero photo
const HERO_IMG =
  "https://t4.ftcdn.net/jpg/02/09/90/41/360_F_209904146_5gxybJmjdPRIl1Ar6CnrmrnSKRdOXtoT.jpg";

const STATS = [
  { value: "11+", label: "Islands" },
  { value: "500+", label: "Happy travelers" },
  { value: "4.9★", label: "Rated journeys" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-bleed background photo with slow ken-burns drift */}
      <div className="absolute inset-0">
        <motion.img
          src={HERO_IMG}
          alt="Andaman Islands beach"
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

        {/* Ambient gradient orbs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-violet-500/25 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 35, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-cyan-400/25 blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.15 },
              },
            }}
            className="text-center lg:text-left"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-md"
            >
              <Compass className="h-4 w-4 text-cyan-300" />
              India&apos;s Island Paradise
            </motion.span>

            {/* Staggered serif + sans headline */}
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 36 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Discover the
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 36 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #7C3AED, #60A5FA, #22D3EE, #60A5FA, #7C3AED)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  className="font-display font-semibold italic"
                >
                  Untouched
                </motion.span>{" "}
                Andamans
              </motion.span>
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/85 lg:mx-0"
            >
              Turquoise waters, white-sand beaches, and unforgettable adventures
              — handcrafted island journeys made just for you.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Link
                to="/packages"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#60A5FA] to-[#22D3EE] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(34,211,238,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(34,211,238,0.4)]"
              >
                Explore Packages
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Plan My Trip
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="mt-10 flex items-center justify-center gap-3 lg:justify-start"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/20 backdrop-blur-md"
                >
                  <p className="text-lg font-bold text-white sm:text-xl">
                    {s.value}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Mobile: island story chips (the map is desktop-only) */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="mt-8 lg:hidden"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                Explore island stories
              </p>
              <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                {ISLANDS.map((isl) => (
                  <Link
                    key={isl.id}
                    to={`/islands/${isl.id}`}
                    className="shrink-0 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-md transition-colors active:bg-white/25"
                  >
                    {isl.name.split(" ")[0]}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: floating glass map with floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <IslandMap />

            {/* Floating badge: seaplane */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-12 z-30 flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-xl backdrop-blur-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
                <Plane className="h-4 w-4" />
              </span>
              Seaplane hops
            </motion.div>

            {/* Floating badge: diving */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -right-6 bottom-20 z-30 flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-xl backdrop-blur-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#60A5FA] text-white">
                <Waves className="h-4 w-4" />
              </span>
              60+ dive sites
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 sm:flex"
        >
          <ChevronDown className="h-4 w-4 animate-bounce" />
          Scroll
        </motion.div>
      </div>

      {/* Wavy divider */}
      <div className="absolute inset-x-0 bottom-0 leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="h-12 w-full sm:h-16 lg:h-20"
          preserveAspectRatio="none"
        >
          <path
            fill="#F8FAFC"
            d="M0,64 C240,120 480,120 720,80 C960,40 1200,40 1440,80 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}
