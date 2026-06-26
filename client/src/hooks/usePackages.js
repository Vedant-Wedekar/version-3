import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

// Fetches the list of packages. Optional filters: { category, featured }.
export function usePackages(filters = {}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { category, featured } = filters;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = {};
    if (category && category !== "all") params.category = category;
    if (featured) params.featured = "true";

    api
      .get("/packages", { params })
      .then((res) => {
        if (!cancelled) setPackages(res.data.packages || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, featured]);

  return { packages, loading, error };
}

// Fetches a single package by slug.
export function usePackage(slug) {
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get(`/packages/${slug}`)
      .then((res) => {
        if (!cancelled) setPkg(res.data.package);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (slug) return load();
  }, [slug, load]);

  return { pkg, loading, error, reload: load };
}

// Price calculator stays as a pure helper (no API needed)
export function calculatePrice(pkg, { adults = 2, children = 0, tierId = "standard" }) {
  if (!pkg) return { total: 0, perAdult: 0, perChild: 0, breakdown: null };

  const tier = pkg.tiers.find((t) => t.id === tierId) || pkg.tiers[0];
  const m = tier.multiplier || 1;

  const perAdult = Math.round(pkg.pricing.adult * m);
  const perChild = Math.round(pkg.pricing.child * m);
  const adultsTotal = perAdult * adults;
  const childrenTotal = perChild * children;
  const total = adultsTotal + childrenTotal;

  return {
    total,
    perAdult,
    perChild,
    breakdown: { adultsTotal, childrenTotal, tier: tier.name },
  };
}