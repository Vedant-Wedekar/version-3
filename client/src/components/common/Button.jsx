import { cn } from "../../utils/cn";

// Reusable button with variants and sizes.
// Renders <button> by default, or any element via the `as` prop (e.g. Link, "a").
const VARIANTS = {
  primary:
    "bg-ocean-600 text-white hover:bg-ocean-700 shadow-soft hover:shadow-card",
  secondary:
    "bg-coral-500 text-white hover:bg-coral-600 shadow-soft hover:shadow-card",
  outline:
    "border-2 border-ocean-600 text-ocean-700 hover:bg-ocean-50",
  ghost: "text-ocean-700 hover:bg-ocean-50",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "transition-all duration-300 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
