import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Palmtree,
  Mail,
  Phone,
  MapPin,
  CircleFadingPlus,
  ScanFace,
  SquarePlay,
  Send,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { SITE, NAV_LINKS, WHATSAPP_MESSAGE } from "../../utils/constants";
import toast from "react-hot-toast";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: NAV_LINKS,
  },
  {
    title: "Packages",
    links: [
      { label: "Honeymoon", path: "/packages?category=honeymoon" },
      { label: "Adventure", path: "/packages?category=adventure" },
      { label: "Family", path: "/packages?category=family" },
      { label: "Scuba Diving", path: "/packages?category=scuba" },
      { label: "Luxury", path: "/packages?category=luxury" },
      { label: "Pocket-Friendly", path: "/packages?category=budget" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Why Choose Us", path: "/about#why" },
      { label: "Reviews", path: "/#testimonials" },
      { label: "Certifications", path: "/#certifications" },
      { label: "FAQ", path: "/#faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", path: "/contact" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Cancellation Policy", path: "/cancellation" },
    ],
  },
];

const SOCIALS = [
  { icon: CircleFadingPlus, href: "https://instagram.com/", label: "Instagram" },
  { icon: ScanFace  , href: "https://facebook.com/", label: "Facebook" },
  { icon: SquarePlay, href: "https://youtube.com/", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("Subscribed! Watch your inbox for island stories.");
    setEmail("");
  };

  return (
    <foote className="relative">
      {/* TOP TIER — light, aesthetic final CTA */}
      <div className="relative overflow-hidden bg-gradient-to-b from-cyan-50/40 to-white">
        {/* Atmospheric blobs */}
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              <span className="h-px w-8 bg-teal-600" />
              Ready when you are
              <span className="h-px w-8 bg-teal-600" />
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Your Andaman <span className="italic text-teal-700">escape</span> <br className="hidden sm:block" />
              starts here.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-500">
              A real planner is one message away. Tell us what you dream of —
              we'll handle the rest.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg"
              >
                Plan my trip
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400 hover:text-teal-700 hover:shadow-md"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TIER — light, airy footer */}
      <div className="relative border-t border-slate-200 bg-slate-50">
        {/* Soft top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/60 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20 lg:px-8">
          {/* Main grid */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Brand block */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-700 text-white shadow-md">
                  <Palmtree className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-bold text-slate-900">
                  {SITE.name}
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">
                Handcrafted Andaman journeys since 2013. Honest planning, local
                expertise, and trips you'll talk about for years.
              </p>

              {/* Contact lines */}
              <ul className="mt-6 space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <a
                    href={`tel:${SITE.phone}`}
                    className="text-slate-600 transition-colors hover:text-teal-700"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-slate-600 transition-colors hover:text-teal-700"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <span className="text-slate-600">{SITE.address}</span>
                </li>
              </ul>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
                    {col.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-sm text-slate-500 transition-colors hover:text-teal-700"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
                Island stories
              </h4>
              <p className="mb-4 text-sm text-slate-500">
                Travel tips, photo essays, and offers. One thoughtful email a
                month — never spam.
              </p>
              <form
                onSubmit={onSubscribe}
                className="flex items-center gap-2 rounded-full bg-white p-1.5 ring-1 ring-slate-200 transition-all focus-within:ring-teal-400"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition-all hover:bg-teal-700"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-6 pt-6 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {year} {SITE.name}. Crafted with care for island lovers.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:bg-teal-600 hover:text-white hover:ring-teal-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Legal mini-links */}
            <div className="flex items-center gap-5 text-xs text-slate-500">
              <Link to="/privacy" className="hover:text-teal-700">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-teal-700">
                Terms
              </Link>
              <Link to="/cancellation" className="hover:text-teal-700">
                Cancellation
              </Link>
            </div>
          </div>
        </div>

        {/* Giant subtle brand watermark */}
        <div className="pointer-events-none relative overflow-hidden">
          <p className="-mb-8 select-none whitespace-nowrap text-center font-display text-[18vw] font-bold leading-none text-teal-900/[0.05] sm:-mb-12 sm:text-[16vw]">
            ANDAMAN TRAVEL
          </p>
        </div>
      </div>
    </foote>
  );
}