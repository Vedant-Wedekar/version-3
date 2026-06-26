import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Camera } from "lucide-react";
import SEO from "../components/common/SEO";

// TODO: replace with the client's real photo collection
const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80", category: "Beaches", title: "Radhanagar at sunset" },
  { id: 2, src: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80", category: "Beaches", title: "Havelock shores" },
  { id: 3, src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80", category: "Underwater", title: "Coral gardens" },
  { id: 4, src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80", category: "Beaches", title: "Ross Island calm" },
  { id: 5, src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80", category: "Underwater", title: "Reef encounter" },
  { id: 6, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", category: "Aerial", title: "Above the islands" },
  { id: 7, src: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1200&q=80", category: "Activities", title: "Above the waves" },
  { id: 8, src: "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1200&q=80", category: "Mangroves", title: "Mangrove dawn" },
  { id: 9, src: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&q=80", category: "Beaches", title: "Untouched shore" },
  { id: 10, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80", category: "Stays", title: "Beachside villa" },
  { id: 11, src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80", category: "Activities", title: "Yacht life" },
  { id: 12, src: "https://images.unsplash.com/photo-1599582350154-2f7ba834eaf3?w=1200&q=80", category: "Activities", title: "On the ferry" },
  { id: 13, src: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=1200&q=80", category: "Port Blair", title: "Cellular Jail at dusk" },
  { id: 14, src: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&q=80", category: "Underwater", title: "Sea walk magic" },
  { id: 15, src: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&q=80", category: "Underwater", title: "Snorkel paradise" },
];

const CATEGORIES = ["All", "Beaches", "Underwater", "Activities", "Aerial", "Mangroves", "Stays", "Port Blair"];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(() => {
    if (active === "All") return PHOTOS;
    return PHOTOS.filter((p) => p.category === active);
  }, [active]);

  return (
    <>
      <SEO
        title="Gallery"
        description="Photos from our travelers — beaches, reefs, sunsets, and everything that makes the Andaman Islands unforgettable."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/40 to-white pt-32 pb-12 sm:pt-36">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            <span className="h-px w-8 bg-teal-600" />
            <Camera className="h-4 w-4" />
            Gallery
            <span className="h-px w-8 bg-teal-600" />
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
            Snapshots from <br />
            <span className="italic text-teal-700">paradise</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500">
            Moments captured by our travelers — and a few from our own team.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-20 z-30 border-y border-slate-100 bg-white/85 py-3 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 " +
                  (cat === active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300")
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID — masonry-like with varied heights */}
      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {filtered.map((photo, i) => (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
                onClick={() => setLightbox(photo)}
                className="group mb-4 block w-full overflow-hidden rounded-3xl bg-slate-100 break-inside-avoid"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 2 === 0 ? "4/3" : "1/1" }}
              >
                <div className="relative h-full w-full overflow-hidden [isolation:isolate]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                      {photo.category}
                    </p>
                    <p className="font-display text-base font-bold">{photo.title}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="max-h-[85vh] w-auto object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
                {lightbox.category}
              </p>
              <p className="mt-1 font-display text-xl font-bold text-white">
                {lightbox.title}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}