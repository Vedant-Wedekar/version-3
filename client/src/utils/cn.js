// Merges class names, filtering out falsy values.
// Usage: cn("base", condition && "active", props.className)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}