import { forwardRef } from "react";
import { cn } from "../../utils/cn";

// Reusable text input with label, error, and helper text.
// forwardRef so it works with react-hook-form's register().
const Input = forwardRef(function Input(
  { label, error, helper, className, id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-ink",
          "placeholder:text-ink/40",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500",
          error ? "border-red-400" : "border-gray-200",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helper && !error && (
        <p className="mt-1 text-sm text-ink/50">{helper}</p>
      )}
    </div>
  );
});

export default Input;