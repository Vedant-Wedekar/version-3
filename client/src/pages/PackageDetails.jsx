import { useState, useMemo, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  Check,
  X as XIcon,
  Hotel,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Plus,
  Minus,
  ShieldCheck,
  HeartHandshake,
  MessageCircle,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";
import SEO from "../components/common/SEO";
import { usePackage, usePackages, calculatePrice } from "../hooks/usePackages";
import { SITE } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export default function PackageDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { pkg, loading, error } = usePackage(slug);
  const { packages: allPackages } = usePackages();

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelDate, setTravelDate] = useState("");
  const [tierId, setTierId] = useState("standard");
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (pkg) {
      const popular = pkg.tiers?.find((t) => t.popular);
      setTierId(popular?.id || pkg.tiers?.[0]?.id || "standard");
    }
  }, [pkg]);

  const priceInfo = useMemo(() => {
    if (!pkg) return { total: 0, perAdult: 0, perChild: 0, breakdown: null };
    return calculatePrice(pkg, { adults, children, tierId });
  }, [pkg, adults, children, tierId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="h-12 w-2/3 rounded-2xl bg-slate-100" />
          <div className="mt-4 h-6 w-1/3 rounded-xl bg-slate-100" />
          <div className="mt-8 h-96 rounded-3xl bg-slate-100" />
        </div>
      </div>
    );
  }
  if (error || !pkg) return <Navigate to="/packages" replace />;

  const related = allPackages.filter((p) => p.id !== pkg.id).slice(0, 3);

  // Build the checkout draft and navigate to /checkout.
  // ProtectedRoute will bounce non-signed-in users to /login first.
  const handleBook = () => {
    if (!travelDate) {
      toast.error("Please pick a travel date to continue.");
      return;
    }
    const tier = pkg.tiers.find((t) => t.id === tierId);
    const draft = {
      packageSlug: pkg.slug,
      packageTitle: pkg.title,
      image: pkg.image,
      location: pkg.location,
      days: pkg.duration.days,
      nights: pkg.duration.nights,
      tierId,
      tierName: tier?.name || "Standard",
      adults,
      children,
      travelDate,
      perAdult: priceInfo.perAdult,
      perChild: priceInfo.perChild,
      total: priceInfo.total,
    };

    if (!user) {
      // Send to login, then bounce back to checkout with the same draft
      navigate("/login", {
        state: { from: "/checkout", draft },
      });
      return;
    }

    navigate("/checkout", { state: { draft } });
  };

  const handleInquiry = () => {
    toast.success("Sending your inquiry — we'll be in touch within an hour.");
  };

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `Hi! I'm interested in the "${pkg.title}" package. Can you help?`
  )}`;

  return (
    <>
      <SEO
        title={pkg.title}
        description={pkg.description.slice(0, 160)}
        image={pkg.image}
        path={`/packages/${pkg.slug}`}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/50 to-white pt-28 pb-10 sm:pt-32">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
            <Link to="/" className="hover:text-teal-700">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/packages" className="hover:text-teal-700">Packages</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-900">{pkg.categoryLabel}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-700 ring-1 ring-teal-100">
                <Sparkles className="h-3 w-3" />
                {pkg.categoryLabel}
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
                {pkg.title}
              </h1>
              <p className="mt-3 text-lg italic text-teal-700">{pkg.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-100 py-4 text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-4 w-4 text-teal-600" />
                  <span className="font-semibold">{pkg.location}</span>
                </span>
                <span className="flex items-center gap-2 text-slate-700">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span className="font-semibold">
                    {pkg.duration.days} Days / {pkg.duration.nights} Nights
                  </span>
                </span>
                <span className="flex items-center gap-2 text-slate-700">
                  <Users className="h-4 w-4 text-teal-600" />
                  <span className="font-semibold">Up to {pkg.maxPeople} people</span>
                </span>
                <span className="flex items-center gap-2 text-slate-700">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{pkg.rating}</span>
                  <span className="text-slate-400">({pkg.reviews} reviews)</span>
                </span>
              </div>

              <p className="mt-6 text-base leading-relaxed text-slate-600">
                {pkg.description}
              </p>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-slate-200">
                <div className="relative aspect-[4/3] overflow-hidden [isolation:isolate]">
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={pkg.gallery[activeImg]}
                    alt={pkg.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {pkg.gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={
                      "aspect-square overflow-hidden rounded-xl ring-2 transition-all " +
                      (activeImg === i ? "ring-teal-500" : "ring-transparent hover:ring-slate-200")
                    }
                  >
                    <img src={src} alt={`${pkg.title} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            <div>
              <Block title="Highlights" eyebrow="What makes this trip special">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium text-slate-700">{h}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Day-by-day itinerary" eyebrow="Your journey, mapped">
                <div className="relative space-y-6">
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-200 via-teal-100 to-transparent sm:left-[19px]" />

                  {pkg.itinerary.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="relative flex gap-4 sm:gap-5"
                    >
                      <div className="relative shrink-0">
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 text-xs font-bold text-white shadow-md ring-4 ring-white sm:h-10 sm:w-10 sm:text-sm">
                          {day.day}
                        </span>
                      </div>

                      <div className="flex-1 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md hover:ring-teal-100">
                        <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                          <div className="aspect-[16/10] overflow-hidden sm:aspect-auto sm:h-full">
                            <img src={day.image} alt={day.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                          </div>
                          <div className="p-4 pt-0 sm:p-5 sm:pl-0">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">Day {day.day}</span>
                              {day.meals?.length > 0 && (
                                <span className="text-[11px] text-slate-400">{day.meals.join(" · ")}</span>
                              )}
                            </div>
                            <h4 className="mt-1 font-display text-lg font-bold text-slate-900">{day.title}</h4>
                            <ul className="mt-3 space-y-1.5">
                              {day.activities.map((act) => (
                                <li key={act} className="flex items-start gap-2 text-sm text-slate-600">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                                  {act}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Block>

              <Block title="Choose your style" eyebrow="Three ways to travel">
                <div id="tiers" className="grid gap-4 md:grid-cols-3">
                  {pkg.tiers.map((tier) => {
                    const isActive = tier.id === tierId;
                    const tierPrice = Math.round(pkg.pricing.adult * tier.multiplier);
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setTierId(tier.id)}
                        className={
                          "group relative overflow-hidden rounded-3xl p-5 text-left transition-all duration-300 " +
                          (isActive
                            ? "bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl"
                            : "bg-white text-slate-900 ring-1 ring-slate-200 hover:ring-teal-200 hover:shadow-md")
                        }
                      >
                        {tier.popular && (
                          <span className={"absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider " + (isActive ? "bg-teal-400 text-slate-900" : "bg-teal-50 text-teal-700")}>
                            Popular
                          </span>
                        )}
                        <h4 className="font-display text-xl font-bold">{tier.name}</h4>
                        <p className={"mt-0.5 text-sm " + (isActive ? "text-teal-200" : "text-slate-500")}>{tier.tagline}</p>
                        <div className="mt-5 space-y-2 text-sm">
                          <Detail label="Hotel" value={tier.hotelCategory} isActive={isActive} />
                          <Detail label="Transport" value={tier.transport} isActive={isActive} />
                          <Detail label="Ferry" value={tier.ferries} isActive={isActive} />
                        </div>
                        <div className={"mt-5 border-t pt-4 " + (isActive ? "border-white/15" : "border-slate-100")}>
                          <p className={"text-[10px] uppercase tracking-wider " + (isActive ? "text-white/60" : "text-slate-400")}>From</p>
                          <p className="font-display text-2xl font-bold">
                            {inr(tierPrice)}
                            <span className={"ml-1 text-xs font-medium " + (isActive ? "text-white/60" : "text-slate-400")}>/ adult</span>
                          </p>
                          <p className={"mt-1 text-[11px] " + (isActive ? "text-teal-200" : "text-slate-400")}>{tier.hotelExamples}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Block>

              <Block title="What's included" eyebrow="Fine print, made simple">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl bg-teal-50/50 p-6 ring-1 ring-teal-100">
                    <div className="mb-4 flex items-center gap-2">
                      <Check className="h-5 w-5 text-teal-700" strokeWidth={3} />
                      <h4 className="font-display text-lg font-bold text-slate-900">Inclusions</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-200 text-teal-800">
                            <Check className="h-2.5 w-2.5" strokeWidth={4} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                    <div className="mb-4 flex items-center gap-2">
                      <XIcon className="h-5 w-5 text-slate-500" strokeWidth={3} />
                      <h4 className="font-display text-lg font-bold text-slate-900">Exclusions</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.exclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                            <XIcon className="h-2.5 w-2.5" strokeWidth={4} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Block>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-100">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 px-6 py-5 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                    Your trip · {pkg.tiers.find((t) => t.id === tierId)?.name}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <motion.p
                        key={priceInfo.total}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-3xl font-bold sm:text-4xl"
                      >
                        {inr(priceInfo.total)}
                      </motion.p>
                      <p className="text-[11px] text-white/60">
                        {adults} adult{adults > 1 ? "s" : ""}
                        {children > 0 && ` · ${children} child${children > 1 ? "ren" : ""}`}
                        {" · "}all inclusive
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      Travel date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
                    />
                  </div>

                  <Counter label="Adults" sub="13+ years" value={adults} min={pkg.minPeople} max={pkg.maxPeople} onChange={setAdults} />
                  <Counter label="Children" sub="2–12 years · 40% off" value={children} min={0} max={pkg.maxPeople - adults} onChange={setChildren} />

                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Travel style</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="font-display text-base font-bold text-slate-900">
                        {pkg.tiers.find((t) => t.id === tierId)?.name}
                      </p>
                      <button
                        onClick={() => document.getElementById("tiers")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Change ↓
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-slate-200 p-4">
                    <h5 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Price breakdown</h5>
                    <div className="space-y-1.5 text-sm">
                      <Row label={`${adults} × adult @ ${inr(priceInfo.perAdult)}`} value={inr(priceInfo.breakdown?.adultsTotal || 0)} />
                      {children > 0 && (
                        <Row label={`${children} × child @ ${inr(priceInfo.perChild)}`} value={inr(priceInfo.breakdown?.childrenTotal || 0)} />
                      )}
                      <div className="my-2 h-px bg-slate-100" />
                      <Row label="Total (incl. GST)" value={inr(priceInfo.total)} bold />
                    </div>
                  </div>

                  <button
                    onClick={handleBook}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
                  >
                    Book this trip
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <button
                    onClick={handleInquiry}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:border-teal-300 hover:text-teal-700"
                  >
                    Send inquiry first
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                    No charge yet · Free cancellation 30 days before travel
                  </p>
                </div>

                <div className="flex border-t border-slate-100">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <span className="w-px bg-slate-100" />
                  <a
                    href={`tel:${SITE.phone}`}
                    className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-3xl bg-teal-50/50 p-5 ring-1 ring-teal-100">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                <div>
                  <p className="font-display text-sm font-bold text-slate-900">Talk to a real planner</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Want this trip changed — different days, different hotels, different pace? Drop us a line and we'll redesign it just for you.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Also loved</span>
                <h3 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">You might also like</h3>
              </div>
              <Link to="/packages" className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-700">
                View all packages
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/packages/${p.slug}`}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-lg hover:ring-teal-100"
                >
                  <div className="relative h-44 overflow-hidden [isolation:isolate]">
                    <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-teal-700 backdrop-blur">{p.categoryLabel}</span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-lg font-bold text-slate-900">{p.title}</h4>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-teal-600" />{p.duration.days}D/{p.duration.nights}N</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{p.rating}</span>
                    </div>
                    <p className="mt-3 font-display text-lg font-bold text-slate-900">
                      {inr(p.pricing.adult)}<span className="text-xs font-medium text-slate-400"> / person</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Block({ title, eyebrow, children }) {
  return (
    <section className="mb-12 sm:mb-14">
      <div className="mb-5">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">{eyebrow}</span>
        <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Detail({ label, value, isActive }) {
  return (
    <div className="flex items-start gap-2">
      <Hotel className={"mt-0.5 h-3.5 w-3.5 shrink-0 " + (isActive ? "text-teal-300" : "text-teal-600")} />
      <div className="min-w-0">
        <p className={"text-[10px] uppercase tracking-wider " + (isActive ? "text-white/50" : "text-slate-400")}>{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Counter({ label, sub, value, min, max, onChange }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-[11px] text-slate-500">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={dec} disabled={value <= min} aria-label={`Decrease ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center font-display text-base font-bold text-slate-900">{value}</span>
        <button onClick={inc} disabled={value >= max} aria-label={`Increase ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className={"text-slate-500 " + (bold ? "font-semibold text-slate-900" : "")}>{label}</span>
      <span className={"text-slate-700 " + (bold ? "font-display text-base font-bold text-slate-900" : "")}>{value}</span>
    </div>
  );
}