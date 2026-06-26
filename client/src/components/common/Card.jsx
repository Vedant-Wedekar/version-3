import { cn } from "../../utils/cn";

// Reusable card surface. `hover` adds a lift effect on hover.
export default function Card({ children, className, hover = false }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-soft",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}