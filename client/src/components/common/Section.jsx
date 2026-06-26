import { cn } from "../../utils/cn";
import Container from "./Container";

// A page section with consistent vertical padding and optional heading block.
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  containerClassName,
  centered = true,
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <Container className={containerClassName}>
        {(eyebrow || title || subtitle) && (
          <div className={cn("mb-12 max-w-2xl", centered && "mx-auto text-center")}>
            {eyebrow && (
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-coral-500">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-ink/60">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}