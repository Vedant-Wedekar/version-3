// Sample packages — full schema with tiers, itinerary, inclusions.
// Just 4 packages for testing. Easy to swap to Firestore later.

export const PACKAGES = [
  {
    id: "havelock-honeymoon-5d",
    slug: "havelock-honeymoon-5d-4n",
    title: "Havelock Honeymoon Escape",
    category: "honeymoon",
    categoryLabel: "Honeymoon",
    tagline: "Five days of slow mornings and golden sunsets",
    description:
      "A romantic five-day journey through the most beautiful corners of the Andamans. Beach villas, candlelight dinners, snorkeling at Elephant Beach, and an unforgettable sunset at Radhanagar — handpicked for couples who want magic, not crowds.",
    location: "Port Blair · Havelock",
    duration: { days: 5, nights: 4 },
    maxPeople: 4,
    minPeople: 2,
    rating: 4.9,
    reviews: 212,
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
    ],
    video:
      "https://cdn.coverr.co/videos/coverr-tropical-beach-from-above-5244/1080p.mp4",
    // Pricing: per adult; children pay 60% (handled in calc).
    // Tier multipliers stack on the base.
    pricing: {
      adult: 24999, // Standard tier per adult
      child: 14999, // Standard tier per child
    },
    tiers: [
      {
        id: "standard",
        name: "Standard",
        tagline: "Comfort & charm",
        multiplier: 1,
        hotelCategory: "3-Star",
        hotelExamples: "Sea Shell Havelock, Holiday Inn Port Blair",
        transport: "Shared AC vehicle",
        ferries: "Premium class ferry",
      },
      {
        id: "deluxe",
        name: "Deluxe",
        tagline: "Most popular",
        multiplier: 1.35,
        hotelCategory: "4-Star",
        hotelExamples: "Symphony Palms, Sentinel Beach Resort",
        transport: "Private AC vehicle",
        ferries: "Premium / Royal class ferry",
        popular: true,
      },
      {
        id: "luxury",
        name: "Luxury",
        tagline: "Best of the islands",
        multiplier: 1.85,
        hotelCategory: "5-Star",
        hotelExamples: "Taj Exotica, Barefoot at Havelock (Villa)",
        transport: "Private SUV + Speedboat",
        ferries: "Royal class ferry",
      },
    ],
    highlights: [
      "Candlelight dinner on the beach",
      "Sunset at Radhanagar Beach",
      "Snorkeling at Elephant Beach",
      "Private speedboat transfers",
      "Couple spa session included",
    ],
    activities: [
      "Snorkeling",
      "Glass-bottom boat",
      "Beach picnic",
      "Light & Sound Show",
      "Spa session",
    ],
    inclusions: [
      "All hotel accommodations (4 nights)",
      "Daily breakfast & 2 dinners",
      "All inter-island ferry tickets",
      "AC transport throughout",
      "All sightseeing as per itinerary",
      "Welcome drink on arrival",
      "Honeymoon cake & flower decor",
      "GST & service charges",
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Personal expenses (laundry, calls)",
      "Lunches not mentioned",
      "Watersports & activities not in itinerary",
      "Travel insurance",
      "Anything not listed under inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Port Blair",
        meals: ["Dinner"],
        image:
          "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&q=80",
        activities: [
          "Airport pickup with welcome garland",
          "Check-in & freshen up",
          "Corbyn's Cove Beach visit",
          "Light & Sound Show at Cellular Jail",
          "Candlelight welcome dinner",
        ],
      },
      {
        day: 2,
        title: "Port Blair → Havelock Island",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
        activities: [
          "Morning ferry to Havelock",
          "Check-in at beach resort",
          "Lunch & rest",
          "Sunset at Radhanagar Beach (Asia's best!)",
          "Romantic seafood dinner",
        ],
      },
      {
        day: 3,
        title: "Elephant Beach Adventure",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        activities: [
          "Speedboat to Elephant Beach",
          "Snorkeling among coral reefs",
          "Optional sea walking",
          "Beach picnic lunch",
          "Couple spa session at resort",
        ],
      },
      {
        day: 4,
        title: "Havelock → Port Blair",
        meals: ["Breakfast"],
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        activities: [
          "Leisure morning on the beach",
          "Afternoon ferry to Port Blair",
          "Check-in & shopping at Aberdeen Bazaar",
          "Free evening together",
        ],
      },
      {
        day: 5,
        title: "Departure",
        meals: ["Breakfast"],
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        activities: [
          "Leisure breakfast",
          "Last-minute shopping",
          "Airport drop-off with farewell",
        ],
      },
    ],
    tags: ["Candlelight Dinner", "Beach Villa", "Snorkeling"],
  },

  {
    id: "andaman-adventure-6d",
    slug: "andaman-adventure-6d-5n",
    title: "Andaman Adventure Trail",
    category: "adventure",
    categoryLabel: "Adventure",
    tagline: "Six days of thrills above and below the sea",
    description:
      "For the explorer who needs salt in their hair and adrenaline in their veins. Scuba, sea walking, kayaking through bioluminescent mangroves, and trekking — a packed itinerary across three islands.",
    location: "Port Blair · Neil · Havelock",
    duration: { days: 6, nights: 5 },
    maxPeople: 8,
    minPeople: 1,
    rating: 4.8,
    reviews: 168,
    image:
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
      "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
    ],
    video:
      "https://cdn.coverr.co/videos/coverr-aerial-view-of-the-sea-5108/1080p.mp4",
    pricing: {
      adult: 28499,
      child: 17999,
    },
    tiers: [
      {
        id: "standard",
        name: "Standard",
        tagline: "Lean & adventurous",
        multiplier: 1,
        hotelCategory: "3-Star",
        hotelExamples: "TSG Blue Resort, Sea Shell",
        transport: "Shared AC vehicle",
        ferries: "Premium class ferry",
      },
      {
        id: "deluxe",
        name: "Deluxe",
        tagline: "Most popular",
        multiplier: 1.3,
        hotelCategory: "4-Star",
        hotelExamples: "Symphony Palms, Silver Sand",
        transport: "Private AC vehicle",
        ferries: "Premium / Royal class",
        popular: true,
      },
      {
        id: "luxury",
        name: "Luxury",
        tagline: "Pro adventure",
        multiplier: 1.7,
        hotelCategory: "5-Star",
        hotelExamples: "Taj Exotica, Munjoh Ocean Resort",
        transport: "Private SUV + Speedboat",
        ferries: "Royal class ferry",
      },
    ],
    highlights: [
      "Scuba diving at Havelock",
      "Sea walking at North Bay",
      "Bioluminescent kayaking",
      "Trek to Neil Island viewpoints",
      "All gear & certified instructors",
    ],
    activities: [
      "Scuba Diving",
      "Sea Walking",
      "Kayaking",
      "Trekking",
      "Parasailing",
      "Snorkeling",
    ],
    inclusions: [
      "5 nights accommodation",
      "Daily breakfast & 3 dinners",
      "All ferry tickets",
      "AC transport throughout",
      "Scuba diving (1 dive)",
      "Sea walking + Kayaking",
      "Certified instructors & gear",
      "GST & service charges",
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Personal expenses",
      "Underwater photography",
      "Additional dives or activities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive · Port Blair",
        meals: ["Dinner"],
        image:
          "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&q=80",
        activities: [
          "Airport pickup",
          "Check-in & freshen up",
          "Corbyn's Cove visit",
          "Cellular Jail Light & Sound Show",
        ],
      },
      {
        day: 2,
        title: "North Bay & Ross Island",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        activities: [
          "Ferry to North Bay Island",
          "Sea walking experience",
          "Snorkeling session",
          "Ross Island heritage walk",
          "Return to Port Blair",
        ],
      },
      {
        day: 3,
        title: "Port Blair → Havelock",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
        activities: [
          "Morning ferry to Havelock",
          "Check-in at resort",
          "Radhanagar Beach at sunset",
          "Beach BBQ dinner",
        ],
      },
      {
        day: 4,
        title: "Scuba Day · Havelock",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80",
        activities: [
          "PADI scuba briefing",
          "Beginner-friendly dive (30 min)",
          "Elephant Beach exploration",
          "Mangrove kayaking at dusk",
        ],
      },
      {
        day: 5,
        title: "Havelock → Neil → Port Blair",
        meals: ["Breakfast"],
        image:
          "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
        activities: [
          "Ferry to Neil Island",
          "Natural Bridge trek",
          "Bharatpur Beach",
          "Evening ferry to Port Blair",
        ],
      },
      {
        day: 6,
        title: "Departure",
        meals: ["Breakfast"],
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        activities: ["Leisure breakfast", "Last-minute shopping", "Airport drop"],
      },
    ],
    tags: ["Scuba Diving", "Sea Walk", "Kayaking"],
  },

  {
    id: "family-island-4d",
    slug: "family-island-getaway-4d-3n",
    title: "Family Island Getaway",
    category: "family",
    categoryLabel: "Family",
    tagline: "Four days of fun for the whole family",
    description:
      "Designed for families with kids — gentle adventures, family-friendly stays, glass-bottom boat rides, and zero stress. Short enough for a long weekend, rich enough to feel like a real holiday.",
    location: "Port Blair · Havelock",
    duration: { days: 4, nights: 3 },
    maxPeople: 6,
    minPeople: 2,
    rating: 4.7,
    reviews: 134,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
    ],
    video:
      "https://cdn.coverr.co/videos/coverr-waves-on-a-beach-3034/1080p.mp4",
    pricing: {
      adult: 18999,
      child: 11499,
    },
    tiers: [
      {
        id: "standard",
        name: "Standard",
        tagline: "Cozy & comfortable",
        multiplier: 1,
        hotelCategory: "3-Star",
        hotelExamples: "TSG Aurus, Sea Shell",
        transport: "Shared AC vehicle",
        ferries: "Premium class ferry",
      },
      {
        id: "deluxe",
        name: "Deluxe",
        tagline: "Most popular",
        multiplier: 1.3,
        hotelCategory: "4-Star",
        hotelExamples: "Symphony Palms, Silver Sand",
        transport: "Private AC vehicle",
        ferries: "Premium / Royal class",
        popular: true,
      },
      {
        id: "luxury",
        name: "Luxury",
        tagline: "Family suite life",
        multiplier: 1.7,
        hotelCategory: "5-Star",
        hotelExamples: "Taj Exotica family suites",
        transport: "Private SUV",
        ferries: "Royal class ferry",
      },
    ],
    highlights: [
      "Glass-bottom boat ride",
      "Cellular Jail family-friendly tour",
      "Soft snorkeling at Elephant Beach",
      "Kids' menu at all stays",
      "Family rooms guaranteed",
    ],
    activities: [
      "Glass Boat",
      "Snorkeling",
      "Beach Time",
      "Sightseeing",
      "Light & Sound Show",
    ],
    inclusions: [
      "3 nights family room accommodation",
      "Daily breakfast & 2 dinners",
      "All ferry tickets",
      "AC transport throughout",
      "All sightseeing as per itinerary",
      "Glass-bottom boat ride",
      "Kid-friendly meal options",
      "GST & service charges",
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Personal expenses",
      "Lunches not mentioned",
      "Additional activities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Port Blair",
        meals: ["Dinner"],
        image:
          "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&q=80",
        activities: [
          "Airport pickup",
          "Check-in to family room",
          "Corbyn's Cove Beach",
          "Cellular Jail Light & Sound Show",
        ],
      },
      {
        day: 2,
        title: "Havelock Island",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
        activities: [
          "Morning ferry to Havelock",
          "Check-in & lunch",
          "Radhanagar Beach (sunset)",
          "Family-friendly dinner",
        ],
      },
      {
        day: 3,
        title: "Elephant Beach Day",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        activities: [
          "Boat to Elephant Beach",
          "Glass-bottom boat ride",
          "Snorkeling (kids welcome)",
          "Beach picnic",
          "Return to Port Blair",
        ],
      },
      {
        day: 4,
        title: "Departure",
        meals: ["Breakfast"],
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        activities: ["Leisure breakfast", "Shopping at Sagarika Emporium", "Airport drop"],
      },
    ],
    tags: ["Family Rooms", "Glass Boat", "Kid Friendly"],
  },

  {
    id: "luxury-andaman-7d",
    slug: "luxury-andaman-retreat-7d-6n",
    title: "Luxury Andaman Retreat",
    category: "luxury",
    categoryLabel: "Luxury",
    tagline: "Seven days of indulgence across three islands",
    description:
      "The Andamans, elevated. Overwater villas, chef-curated dining, private speedboats, and a personal trip concierge. For travelers who measure a holiday by the quality of every detail.",
    location: "Port Blair · Havelock · Neil",
    duration: { days: 7, nights: 6 },
    maxPeople: 4,
    minPeople: 2,
    rating: 5.0,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
    ],
    video:
      "https://cdn.coverr.co/videos/coverr-tropical-beach-from-above-5244/1080p.mp4",
    pricing: {
      adult: 64999,
      child: 38999,
    },
    tiers: [
      {
        id: "standard",
        name: "Premium",
        tagline: "5-star comfort",
        multiplier: 1,
        hotelCategory: "5-Star",
        hotelExamples: "Symphony Palms, Sentinel Resort",
        transport: "Private AC SUV",
        ferries: "Royal class ferry",
      },
      {
        id: "deluxe",
        name: "Signature",
        tagline: "Most chosen",
        multiplier: 1.4,
        hotelCategory: "5-Star Premium",
        hotelExamples: "Taj Exotica, Barefoot Villa",
        transport: "Private SUV + Speedboat",
        ferries: "Royal class + Private boat",
        popular: true,
      },
      {
        id: "luxury",
        name: "Ultra Luxury",
        tagline: "Best in the islands",
        multiplier: 1.85,
        hotelCategory: "Overwater Villa",
        hotelExamples: "Jalakara, Munjoh Ocean Villa",
        transport: "Helicopter + Speedboat",
        ferries: "Private charter boat",
      },
    ],
    highlights: [
      "Overwater villa stay (3 nights)",
      "Chef's tasting menu dinner",
      "Private speedboat transfers",
      "In-room couple spa",
      "Personal trip concierge 24/7",
      "Helicopter transfer option",
    ],
    activities: [
      "Private Scuba",
      "Yacht Cruise",
      "Couple Spa",
      "Chef's Table",
      "Sunset Sailing",
    ],
    inclusions: [
      "6 nights luxury accommodation",
      "Daily breakfast & 5 chef-curated dinners",
      "Private ferry / speedboat transfers",
      "Private AC SUV throughout",
      "Personal concierge",
      "Welcome champagne",
      "Couple spa session",
      "GST & service charges",
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Helicopter transfer (optional add-on)",
      "Premium watersports",
      "Travel insurance",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Port Blair · Arrival",
        meals: ["Dinner"],
        image:
          "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&q=80",
        activities: [
          "VIP airport pickup",
          "Welcome champagne",
          "Check-in at 5-star",
          "Chef's tasting dinner",
        ],
      },
      {
        day: 2,
        title: "Port Blair Explorations",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        activities: [
          "Ross Island private tour",
          "Lunch at Aberdeen",
          "Cellular Jail (private guide)",
          "Sunset cruise on the bay",
        ],
      },
      {
        day: 3,
        title: "Havelock · Overwater Villa",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
        activities: [
          "Private speedboat to Havelock",
          "Overwater villa check-in",
          "Private beach lunch",
          "In-villa spa session",
        ],
      },
      {
        day: 4,
        title: "Beach & Sea Day",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        activities: [
          "Private scuba session",
          "Lunch on a private sandbar",
          "Radhanagar sunset with photographer",
          "Beachside chef's table dinner",
        ],
      },
      {
        day: 5,
        title: "Havelock → Neil Island",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
        activities: [
          "Private boat to Neil",
          "Natural Bridge & Bharatpur",
          "Sunset at Laxmanpur",
          "Quiet beachside dinner",
        ],
      },
      {
        day: 6,
        title: "Neil → Port Blair",
        meals: ["Breakfast", "Dinner"],
        image:
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80",
        activities: [
          "Slow morning at the villa",
          "Private boat to Port Blair",
          "Spa session before farewell",
          "Farewell dinner at the marina",
        ],
      },
      {
        day: 7,
        title: "Departure",
        meals: ["Breakfast"],
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
        activities: ["Leisure breakfast", "Private airport drop"],
      },
    ],
    tags: ["Overwater Villa", "Chef's Table", "Concierge"],
  },
];

// --- Helpers ---

// Look up a package by slug (for the details page)
export function getPackageBySlug(slug) {
  return PACKAGES.find((p) => p.slug === slug) || null;
}

// Calculate the total price for a package given options.
// pricing formula (Option A): total = (adults × adultPrice + children × childPrice) × tierMultiplier
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
    breakdown: {
      adultsTotal,
      childrenTotal,
      tier: tier.name,
    },
  };
}