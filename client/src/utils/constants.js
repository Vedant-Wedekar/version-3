// Central place for site-wide constants.
// Update business details here once — they propagate everywhere.

export const SITE = {
  name: "Andaman Travel",
  tagline: "Discover the Untouched Andamans",
  // TODO: replace with the client's real details
  phone: "919137835433", // used for tel: links (no spaces)
  phoneDisplay: "919137835433", // shown to users
  whatsapp: "919137835433", // wa.me format (country code, no +)
  email: "hello@andamantravel.com",
  address: "Shop Unit No. 237, Ground Floor, Raghuleela Mega Mall, Behind Poisar Bus Depot, S. V. Road, Kandivali (W), Mumbai - 400067",
};

// Default WhatsApp prefilled message
export const WHATSAPP_MESSAGE =
  "Hi! I'm interested in your Andaman travel packages. Can you share more details?";

// Main navigation links
export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Packages", path: "/packages" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

// Package categories (matches Firestore schema)
export const PACKAGE_CATEGORIES = [
  { value: "honeymoon", label: "Honeymoon" },
  { value: "family", label: "Family" },
  { value: "adventure", label: "Adventure" },
  { value: "budget", label: "Budget" },
  { value: "luxury", label: "Luxury" },
];