import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Star,
  Clock,
  Users,
  MapPin,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { usePackages } from "../hooks/usePackages";
import { PACKAGE_CATEGORIES } from "../utils/constants";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const DURATIONS = [
  { value: "all", label: "Any duration" },
  { value: "3-4", label: "3–4 days" },
  { value: "5-6", label: "5–6 days" },
  { value: "7+", label: "7+ days" },
];

const SORTS = [
  { value: "popular", label: "Most popular" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export default function Packages() {
  const [params, setParams] = useSearchParams();
  const initialCategory = params.get("category") || "all";

  const [category, setCategory] = useState(initialCategory);
  const [duration, setDuration] = useState("all");
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Keep URL in sync when category changes
  useEffect(() => {
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    setParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

 // Server filters by category; client handles duration, search, and sort.
  const { packages, loading, error } = usePackages({
    category: category === "all" ? null : category,
  });

  const filtered = useMemo(() => {
    let list = [...packages];

    if (duration !== "all") {
      list = list.filter((p) => {
        const d = p.duration.days;
        if (duration === "3-4") return d >= 3 && d <= 4;
        if (duration === "5-6") return d >= 5 && d <= 6;
        if (duration === "7+") return d >= 7;
        return true;
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.pricing.adult - b.pricing.adult);
        break;
      case "price-high":
        list.sort((a, b) => b.pricing.adult - a.pricing.adult);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return list;
  }, [packages, duration, sort, search]);

  const clearAll = () => {
    setCategory("all");
    setDuration("all");
    setSort("popular");
    setSearch("");
  };

  const activeFilters =
    (category !== "all" ? 1 : 0) +
    (duration !== "all" ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <>
      <SEO
        title="Andaman Packages"
        description="Curated Andaman tour packages — honeymoon, family, adventure, and luxury journeys handpicked for every traveler."
      />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/50 to-white pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              <span className="h-px w-8 bg-teal-600" />
              All Packages
              <span className="h-px w-8 bg-teal-600" />
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Find your <span className="italic text-teal-700">perfect</span> Andaman trip
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500">
              Browse handcrafted packages and customize any of them to your dates,
              group size, and dream stay.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <section className="sticky top-20 z-30 border-y border-slate-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search packages…"
                className="w-full rounded-full border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Desktop pills */}
            <div className="hidden flex-wrap items-center gap-2 lg:flex">
              <CategoryPill
                value="all"
                label="All"
                active={category === "all"}
                onClick={() => setCategory("all")}
              />
              {PACKAGE_CATEGORIES.map((cat) => (
                <CategoryPill
                  key={cat.value}
                  value={cat.value}
                  label={cat.label}
                  active={category === cat.value}
                  onClick={() => setCategory(cat.value)}
                />
              ))}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Spacer pushes sort to the right on desktop */}
            <div className="hidden flex-1 lg:block" />

            {/* Duration + Sort dropdowns */}
            <div className="hidden items-center gap-2 lg:flex">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-teal-400 focus:outline-none"
              >
                {DURATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-teal-400 focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              {activeFilters > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile expanded filters */}
          {showFilters && (
            <div className="mt-3 space-y-3 border-t border-slate-100 pt-3 lg:hidden">
              <div className="flex flex-wrap gap-2">
                <CategoryPill
                  value="all"
                  label="All"
                  active={category === "all"}
                  onClick={() => setCategory("all")}
                />
                {PACKAGE_CATEGORIES.map((cat) => (
                  <CategoryPill
                    key={cat.value}
                    value={cat.value}
                    label={cat.label}
                    active={category === cat.value}
                    onClick={() => setCategory(cat.value)}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-teal-400 focus:outline-none"
                >
                  {DURATIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-teal-400 focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              {activeFilters > 0 && (
                <button
                  onClick={clearAll}
                  className="flex w-full items-center justify-center gap-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  <X className="h-4 w-4" /> Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Result count */}
          <p className="mb-6 text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "package" : "packages"}
            {category !== "all" && (
              <>
                {" "}for{" "}
                <span className="font-semibold text-teal-700">
                  {PACKAGE_CATEGORIES.find((c) => c.value === category)?.label}
                </span>
              </>
            )}
          </p>

        {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[460px] animate-pulse rounded-3xl bg-slate-100"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-100 bg-red-50/50 p-8 text-center">
              <p className="font-semibold text-red-700">{error}</p>
              <p className="mt-1 text-sm text-red-600/80">
                Make sure the backend is running on port 5000.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 py-16 text-center">
              <Filter className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                No packages match these filters
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try clearing some filters or browse all packages.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ---------- Sub-components ---------- */

function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 " +
        (active
          ? "bg-slate-900 text-white shadow-sm"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300")
      }
    >
      {label}
    </button>
  );
}

function PackageCard({ pkg, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        to={`/packages/${pkg.slug}`}
        className="group relative block overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition-all duration-300 hover:shadow-2xl hover:ring-teal-100"
      >
        {/* Media */}
        <div className="relative h-60 overflow-hidden [isolation:isolate]">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-700 backdrop-blur">
            {pkg.categoryLabel}
          </span>
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {pkg.rating}
          </span>

          <span className="absolute bottom-3 left-4 flex items-center gap-1 text-xs font-medium text-white/90">
            <MapPin className="h-3.5 w-3.5" /> {pkg.location}
          </span>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-display text-xl font-bold text-slate-900">
            {pkg.title}
          </h3>

          <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal-600" />
              {pkg.duration.days}D / {pkg.duration.nights}N
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-teal-600" />
              Up to {pkg.maxPeople}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {pkg.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Starts from
              </p>
              <p className="font-display text-2xl font-bold text-slate-900">
                {inr(pkg.pricing.adult)}
                <span className="ml-1 text-xs font-medium text-slate-400">
                  / person
                </span>
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-teal-700 group-hover:gap-2">
              View <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}