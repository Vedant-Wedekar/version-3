import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Minus,
  ArrowUpRight,
  Compass,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";

// TODO: replace with the client's real photos, copy, and pillars.
const PILLARS = [
  {
    id: "local",
    title: "Born from the islands",
    icon: Compass,
    desc: "We're not a generic tour company. Our team grew up navigating these reefs, beaches, and mangroves — we plan trips the way we'd plan our own.",
  },
  {
    id: "handpicked",
    title: "Handpicked stays & experiences",
    icon: Sparkles,
    desc: "Every hotel, boat, and activity in our packages is personally vetted. If we wouldn't book it for our family, it doesn't go on our list.",
  },
  {
    id: "trust",
    title: "Trusted by 50,000+ travelers",
    icon: Heart,
    desc: "Over a decade in business, a 4.9★ rating, and a 98% recommendation rate. We treat every booking like our reputation depends on it — because it does.",
  },
  {
    id: "support",
    title: "24/7 on-ground support",
    icon: Shield,
    desc: "Things happen — weather changes, plans shift. Our local team is one call away from sunrise to sunrise, every day of your trip.",
  },
];

const STATS = [
  { value: "12+", label: "Years on the islands" },
  { value: "50K+", label: "Happy travelers" },
  { value: "300+", label: "Curated experiences" },
  { value: "4.9★", label: "Average rating" },
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";

export default function AboutUs() {
  const [openId, setOpenId] = useState(PILLARS[0].id);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Soft atmosphere */}
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Massive editorial headline */}
        <div className="mb-12 sm:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            <span className="h-px w-8 bg-teal-600" />
            About Us
          </span>
          <h2 className="font-display text-[14vw] font-bold leading-[0.95] tracking-tight text-slate-900 sm:text-[10vw] lg:text-[8rem]">
            We make the <br />
            <span className="italic text-teal-700">Andamans</span> personal.
          </h2>
        </div>

        {/* Three-column editorial spread: text — image — text */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: short intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Who we are
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Andaman Travel is a homegrown team of island-obsessed planners,
              guides, and dreamers who believe every trip should feel made for
              one person — you.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              From the reef at Havelock to the caves at Baratang, we know these
              islands by heart — and we'd love to share them with you.
            </p>
          </motion.div>

          {/* Middle: hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-slate-900/5 sm:h-96 lg:h-[480px]">
              <img
                src={HERO_IMG}
                alt="Andaman team on the beach"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Subtle gradient for the floating chip readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/60 to-transparent" />

              {/* Floating "since 2013" chip */}
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                  Est. 2013
                </p>
                <p className="font-display text-lg font-bold leading-tight text-slate-900">
                  A decade of <br /> island journeys
                </p>
              </div>
            </div>

            {/* Decorative teal panel behind image (Image 1 reference vibe) */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 hidden h-full w-full rounded-[2rem] bg-teal-100/60 lg:block" />
          </motion.div>

          {/* Right: philosophy block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Our philosophy
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              Travel that respects the place — and the people in it.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              We work with local boat owners, family-run stays, and certified
              dive instructors. Tourism done right keeps the magic alive for
              the next generation of travelers.
            </p>

            <Link
              to="/about"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              Read our full story
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* "Why choose us" accordion (Image 3 reference vibe) */}
        <div className="mt-20 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Why choose us
            </span>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Built on <span className="italic text-teal-700">trust</span>, <br />
              driven by detail.
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
              Four reasons travelers keep coming back — and why first-timers
              feel at home from the moment they message us.
            </p>

            {/* Stats strip */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
                >
                  <p className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {PILLARS.map((p) => {
              const isOpen = openId === p.id;
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className={
                    "overflow-hidden rounded-2xl ring-1 transition-all duration-300 " +
                    (isOpen
                      ? "bg-white ring-teal-200 shadow-md"
                      : "bg-slate-50 ring-slate-100 hover:ring-slate-200")
                  }
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : p.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 " +
                          (isOpen
                            ? "bg-teal-600 text-white"
                            : "bg-white text-teal-600 ring-1 ring-slate-200")
                        }
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h4 className="font-display text-base font-bold text-slate-900 sm:text-lg">
                        {p.title}
                      </h4>
                    </div>
                    <span
                      className={
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 " +
                        (isOpen
                          ? "bg-teal-600 text-white rotate-180"
                          : "bg-white text-slate-400 ring-1 ring-slate-200")
                      }
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 pb-5 pl-[4.5rem] pr-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pl-[4.75rem]">
                          {p.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}