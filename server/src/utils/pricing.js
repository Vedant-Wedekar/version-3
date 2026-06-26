// Server-side price calculation.
// We re-calculate the total from the saved package + booking options on the
// server when creating a Razorpay order. We NEVER trust a client-sent price.

export function calculatePrice(pkg, { adults, children = 0, tierId = "standard" }) {
  const tier =
    pkg.tiers?.find((t) => t.id === tierId) || pkg.tiers?.[0];
  if (!tier) {
    throw new Error("Package has no pricing tiers configured");
  }

  const multiplier = tier.multiplier || 1;
  const perAdult = Math.round(pkg.pricing.adult * multiplier);
  const perChild = Math.round(pkg.pricing.child * multiplier);

  const adultsTotal = perAdult * adults;
  const childrenTotal = perChild * children;
  const total = adultsTotal + childrenTotal;

  return {
    total,
    perAdult,
    perChild,
    adultsTotal,
    childrenTotal,
    tierName: tier.name,
  };
}