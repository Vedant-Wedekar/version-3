import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus, HelpCircle, MessageCircle, ArrowUpRight } from "lucide-react";
import { FAQS, FAQ_CATEGORIES } from "../../data/faq";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={
        "overflow-hidden rounded-2xl ring-1 transition-all duration-300 " +
        (isOpen
          ? "bg-white ring-teal-200 shadow-md"
          : "bg-slate-50/60 ring-slate-100 hover:bg-white hover:ring-slate-200")
      }
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
      >
        <h4
          className={
            "font-display text-base font-bold leading-snug transition-colors sm:text-lg " +
            (isOpen ? "text-slate-900" : "text-slate-800")
          }
        >
          {faq.question}
        </h4>
        <span
          className={
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 " +
            (isOpen
              ? "bg-teal-600 text-white rotate-180"
              : "bg-white text-slate-400 ring-1 ring-slate-200")
          }
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-6 pr-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState(FAQS[0].id);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return FAQS;
    return FAQS.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Soft atmosphere */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left: sticky header card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Questions, <br />
              <span className="italic text-teal-700">answered.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
              The things travelers ask us most — from permits and weather to
              cancellation and customization.
            </p>

            {/* Help card */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-display text-lg font-bold">
                    Still have a question?
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    Our team usually replies within 30 minutes on WhatsApp.
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:bg-teal-50 hover:text-teal-700"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right: filter + accordion */}
          <div>
            {/* Category pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((c) => {
                const isActive = c.id === activeCategory;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCategory(c.id);
                      // open first item of the new filter
                      const next = FAQS.find(
                        (f) => c.id === "all" || f.category === c.id
                      );
                      setOpenId(next ? next.id : null);
                    }}
                    className={
                      "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 " +
                      (isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900")
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((f) => (
                  <motion.div
                    key={f.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FAQItem
                      faq={f}
                      isOpen={openId === f.id}
                      onToggle={() =>
                        setOpenId(openId === f.id ? null : f.id)
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}