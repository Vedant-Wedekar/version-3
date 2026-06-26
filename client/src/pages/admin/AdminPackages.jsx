import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  ExternalLink,
  Package as PackageIcon,
  Clock,
  Users,
  Star,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { listAllPackagesAdmin, updatePackageAdmin } from "../../services/admin";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllPackagesAdmin()
      .then(setPackages)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (slug, field, value) => {
    try {
      const updated = await updatePackageAdmin(slug, { [field]: value });
      setPackages((prev) => prev.map((p) => (p.slug === slug ? updated : p)));
      toast.success(`${field === "isActive" ? "Active" : "Featured"} ${value ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Packages</h1>
          <p className="mt-1 text-sm text-slate-500">
            {packages.length} packages total
          </p>
        </div>
        <div className="rounded-xl bg-amber-50 px-4 py-2 text-xs text-amber-700 ring-1 ring-amber-100">
          💡 Full package editing (text, images, itinerary) will be available soon. For now,
          edit details directly in Firestore Console.
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 animate-pulse rounded-3xl bg-white ring-1 ring-slate-100" />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-slate-100">
          <PackageIcon className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-900">No packages yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Run the seedPackages script to populate test data.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {packages.map((p) => (
            <div
              key={p.slug}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    {p.categoryLabel}
                  </span>
                  {p.isFeatured && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                      <Sparkles className="h-2.5 w-2.5" /> Featured
                    </span>
                  )}
                  {!p.isActive && (
                    <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Inactive
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-display text-lg font-bold leading-tight">{p.title}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-teal-600" />
                    {p.duration?.days}D / {p.duration?.nights}N
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-teal-600" />
                    Up to {p.maxPeople}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {p.rating}
                  </span>
                </div>

                <p className="mt-3 font-display text-lg font-bold text-slate-900">
                  {inr(p.pricing?.adult)}
                  <span className="text-xs font-medium text-slate-400"> / adult</span>
                </p>

                {/* Toggles */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                  <Toggle
                    label="Active"
                    value={p.isActive}
                    onChange={(v) => handleToggle(p.slug, "isActive", v)}
                  />
                  <Toggle
                    label="Featured"
                    value={p.isFeatured}
                    onChange={(v) => handleToggle(p.slug, "isFeatured", v)}
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/packages/${p.slug}`}
                    target="_blank"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
                  >
                    <Eye className="h-3.5 w-3.5" /> View on site
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-xs ring-1 ring-slate-100 transition-colors hover:ring-slate-200"
    >
      <span className="font-semibold text-slate-700">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          value ? "bg-teal-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}