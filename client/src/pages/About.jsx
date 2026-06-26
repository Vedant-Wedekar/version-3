import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Compass,
  Heart,
  Shield,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Users,
  Award,
  Globe,
  HandHeart,
  MessageCircle,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { SITE, WHATSAPP_MESSAGE } from "../utils/constants";

const TIMELINE = [
  {
    year: "2013",
    title: "The beginning",
    body: "Two cousins, one boat, and a dream — we started running small day trips around Port Blair for travelers we met at the harbor.",
  },
  {
    year: "2016",
    title: "First real office",
    body: "We outgrew the harbor and opened our first storefront. Crossed 1,000 happy travelers that year.",
  },
  {
    year: "2019",
    title: "Honeymoons & families",
    body: "Started specializing in honeymoons and family trips. Built relationships with the best resorts and dive shops across the islands.",
  },
  {
    year: "2022",
    title: "Going digital",
    body: "Launched our online booking system so travelers from anywhere could plan their Andaman trip in minutes.",
  },
  {
    year: "Today",
    title: "50,000+ travelers later",
    body: "A team of 24 island-obsessed planners, guides, and trip managers. Still family-run. Still in love with these islands.",
  },
];

const VALUES = [
  {
    icon: Compass,
    title: "We know these islands",
    body: "Born and raised in the Andamans. We've snorkeled every reef, eaten at every fish-fry stand, and met every boat captain worth knowing.",
  },
  {
    icon: HandHeart,
    title: "We work with locals",
    body: "Every hotel, boat, guide, and driver we book with is a local business. Tourism done right keeps the islands alive for the people who call them home.",
  },
  {
    icon: Shield,
    title: "We're with you 24/7",
    body: "From the moment you land to the moment you fly home, a real person on the islands is one call away. No outsourced call centers.",
  },
  {
    icon: Sparkles,
    title: "We don't oversell",
    body: "If a destination isn't right for your dates, group, or budget, we'll tell you. We'd rather you have a great trip than book the most expensive one.",
  },
];

const TEAM = [
  {
    name: "",
    role: "",
    img: "",
  },
  {
    name: "",
    role: "",
    img: "",
  },
  {
    name: "",
    role: "",
    img: "",
  },
  {
    name: "",
    role: "",
    img: "",
  },
];

const STATS = [
  { value: "12+", label: "Years on the islands" },
  { value: "50K+", label: "Travelers hosted" },
  { value: "24", label: "Team members" },
  { value: "4.9★", label: "Average rating" },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Meet the team behind Andaman Travel — a homegrown company of island-obsessed planners crafting unforgettable journeys since 2013."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/40 to-white pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              <span className="h-px w-8 bg-teal-600" />
              About Us
              <span className="h-px w-8 bg-teal-600" />
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
              Born from the <br />
              <span className="italic text-teal-700">islands</span> we love
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
              Andaman Travel is a homegrown team of planners, guides, and dreamers who
              believe every trip should feel made for one person — you.
            </p>
          </div>

          {/* Hero image with stats overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto mt-12 max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-slate-900/5">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
                alt="Andaman beaches"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="relative -mt-16 mx-auto grid max-w-4xl grid-cols-2 gap-4 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:grid-cols-4 sm:p-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                Our Story
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                From two cousins <br />
                <span className="italic text-teal-700">to fifty thousand</span> travelers
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-500">
                We didn't grow up dreaming of running a travel company. We grew up on these
                islands — and one summer, started showing visitors around because no one
                else seemed to know the spots we did.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-500">
                Twelve years later, we still plan every trip with that same instinct: where
                would we send our own family?
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-300 via-teal-200 to-transparent" />
              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="relative flex gap-5"
                  >
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 text-[10px] font-bold text-white shadow-md ring-4 ring-white">
                      {item.year}
                    </span>
                    <div className="flex-1 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
                      <h4 className="font-display text-lg font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-gradient-to-b from-white to-cyan-50/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
              What we stand for
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
              Four things we get <span className="italic text-teal-700">right</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-700">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
              The team
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
              The people behind <br />
              your <span className="italic text-teal-700">island story</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/5] overflow-hidden [isolation:isolate]">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="font-display text-lg font-bold leading-tight">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-xs text-teal-200">{person.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-cyan-50/30 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
            Ready when you are
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            Let's plan something <span className="italic text-teal-700">beautiful</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500">
            Tell us what you dream of and we'll send a tailored itinerary, usually within
            an hour.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
            >
              Plan my trip
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-900 transition-all hover:border-teal-400 hover:text-teal-700"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}