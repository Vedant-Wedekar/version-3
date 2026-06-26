// Format a number as Indian Rupees, e.g. 12500 -> "₹12,500"
export function formatPrice(amount) {
  if (amount == null) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format duration, e.g. { days: 5, nights: 4 } -> "5 Days / 4 Nights"
export function formatDuration(duration) {
  if (!duration) return "";
  return `${duration.days} Days / ${duration.nights} Nights`;
}