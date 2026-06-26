import { useState } from "react";
import { cn } from "../../utils/cn";

// Image with native lazy loading and a fade-in once loaded.
export default function LazyImage({ src, alt, className, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition-opacity duration-700",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
      {...props}
    />
  );
}