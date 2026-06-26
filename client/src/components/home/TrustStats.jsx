import { motion } from "framer-motion";
import { Plane, Waves, Sun, MapPin } from "lucide-react";

// TODO: replace numbers + images with the client's real data
const STATS = [
  {
    value: "10K+",
    label: "Happy Travelers",
    icon: Sun,
    highlight: false,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  },
  {
    value: "12+",
    label: "Years of Experience",
    icon: MapPin,
    highlight: true,
    img: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=80",
  },
  {
    value: "4.8★",
    label: "Google Rating",
    icon: Waves,
    highlight: false,
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
  {
    value: "5K+",
    label: "Instagram Followers",
    icon: Plane,
    highlight: false,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
  },
];

const FEATURE_IMG =
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80"; // overwater bungalow

export default function TrustStats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-cyan-50/40 py-16 sm:py-24">
      {/* Soft decorative ocean blobs */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 grid items-end gap-6 md:grid-cols-2">
          <div>
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-teal-600">
              Why Travel With Us
            </span>
            <h2 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Your Trusted Andaman <br className="hidden sm:block" /> Travel Experts
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-500 md:pb-2">
            A modern Andaman travel company redefining how you explore the
            islands — seamless planning, handpicked stays, and unforgettable
            experiences across every shore.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Big feature card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl shadow-lg lg:col-span-2"
          >
            {/* Full image background */}
            <img
              src={FEATURE_IMG}
              alt="Andaman overwater villas"
              className="h-72 w-full object-cover sm:h-full sm:min-h-[380px]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 to-transparent" />

            {/* Content over image */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              {/* Rotating badge top-left */}
              <div className="relative h-24 w-24">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="h-full w-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <defs>
                    <path
                      id="badgePath"
                      d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="fill-white/80 text-[9px] font-bold uppercase tracking-[0.2em]">
                    <textPath href="#badgePath">
                      • Island Expertise • 12 Years
                    </textPath>
                  </text>
                </motion.svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-teal-700 shadow-lg backdrop-blur">
                    <Plane className="h-5 w-5 -rotate-45" />
                  </span>
                </div>
              </div>

              {/* Bottom text */}
              <div className="max-w-md">
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  A decade of island journeys
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Having explored every corner of the Andamans, we've earned the
                  trust of thousands through carefully crafted journeys and
                  genuine local expertise.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2x2 stat grid — image backed */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-3xl p-5 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Background image */}
                  <img
                    src={stat.img}
                    alt={stat.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay — teal tint on the highlighted one, dark on the rest */}
                  <div
                    className={
                      "absolute inset-0 " +
                      (stat.highlight
                        ? "bg-gradient-to-t from-teal-900/90 via-teal-800/50 to-teal-700/30"
                        : "bg-gradient-to-t from-slate-900/90 via-slate-900/45 to-slate-900/20")
                    }
                  />

                  {/* Icon badge */}
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Icon className="h-4 w-4" />
                  </span>

                  {/* Number + label */}
                  <div className="relative mt-6">
                    <span className="block font-display text-3xl font-bold drop-shadow sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-white/85">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}