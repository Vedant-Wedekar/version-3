import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// TODO: replace with the client's own photos + descriptions
const ISLANDS = [
  {
    name: "Port Blair",
    tag: "The Capital",
    desc: "Gateway to the Andamans — colonial history, Cellular Jail, and the iconic Light & Sound Show at dusk.",
    highlights: ["Cellular Jail", "Corbyn's Cove", "Ross Island"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2aQ9hYsiuZlktuJp_-zcp3KdvUxsLLbr3AA&s",
    video: "https://res.cloudinary.com/dduri4zfq/video/upload/v1780386905/13168204_1080_1920_30fps_gf2a3o.mp4",
    accent: "01",
  },
  {
    name: "Havelock",
    tag: "Beach Paradise",
    desc: "Home to Radhanagar — Asia's best beach — and world-class scuba diving on vibrant coral reefs.",
    highlights: ["Radhanagar Beach", "Scuba Diving", "Elephant Beach"],
    img: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
    video: "https://cdn.coverr.co/videos/coverr-aerial-view-of-the-sea-5108/1080p.mp4",
    accent: "02",
  },
  {
    name: "Neil Island",
    tag: "Quiet Escape",
    desc: "Untouched coral reefs, natural bridges, and the slowest sunsets in the archipelago.",
    highlights: ["Natural Bridge", "Bharatpur Beach", "Sunset Point"],
    img: "https://www.andamanislands.com/assets/site1/theme3/images/neil-island-travel-guide-natural-bridge3.jpg",
    video: "https://cdn.coverr.co/videos/coverr-waves-on-a-beach-3034/1080p.mp4",
    accent: "03",
  },
  {
    name: "Long Island",
    tag: "Offbeat & Pristine",
    desc: "Where civilization fades — white-sand beaches, dense rainforest, and zero crowds.",
    highlights: ["Lalaji Bay", "Merk Bay", "Trekking Trails"],
    img: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
    video: "https://cdn.coverr.co/videos/coverr-underwater-coral-reef-2569/1080p.mp4",
    accent: "04",
  },
  {
    name: "Diglipur",
    tag: "The Northern Wonder",
    desc: "The highest peak, twin islands of Ross & Smith, and the magical sight of turtle nesting season.",
    highlights: ["Saddle Peak", "Ross & Smith", "Turtle Nesting"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    video: "https://cdn.coverr.co/videos/coverr-tropical-beach-from-above-5244/1080p.mp4",
    accent: "05",
  },
  {
    name: "Baratang",
    tag: "Hidden Marvels",
    desc: "Mangrove creeks lead to limestone caves and India's only living mud volcanoes.",
    highlights: ["Limestone Caves", "Mud Volcano", "Mangrove Creek"],
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
    video: "https://cdn.coverr.co/videos/coverr-aerial-view-of-the-sea-5108/1080p.mp4",
    accent: "06",
  },
];

function IslandCard({ island }) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group panel relative shrink-0"
      style={{ width: "clamp(280px, 28vw, 400px)" }}
    >
      <div className="relative h-[440px] overflow-hidden rounded-[2rem] shadow-md ring-1 ring-slate-900/5 transition-shadow duration-500 group-hover:shadow-2xl sm:h-[500px]">
        {/* Media wrapper — prevents corner flicker */}
        <div className="absolute inset-0 overflow-hidden [isolation:isolate]">
          <img
            src={island.img}
            alt={island.name}
            className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <video
            ref={videoRef}
            src={island.video}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full transform-gpu object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/20">
            {island.tag}
          </span>
          <span className="font-display text-2xl font-bold text-white/70 sm:text-3xl">
            {island.accent}
          </span>
        </div>

        {/* Bottom block */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-300">
            <MapPin className="h-3.5 w-3.5" />
            Andaman Islands
          </div>
          <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-4xl">
            {island.name}
          </h3>

          {/* Description expands on hover */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                {island.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {island.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm ring-1 ring-white/15"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white">
            <span>Explore island</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DiscoverIslands() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const pinEl = pinRef.current;
      if (!track || !pinEl) return;

      const getDistance = () => track.scrollWidth - pinEl.clientWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          // FIX 2: pin starts only when the pin container's top hits the viewport top,
          // which happens AFTER the section is fully scrolled into view.
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50/50"
    >
      {/* Atmospheric blobs */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      {/* Header — NORMAL flow, scrolls in first like any other section.
          The pin only takes over AFTER the user has scrolled past this header. */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              <span className="h-px w-8 bg-teal-600" />
              Discover
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Islands worth <br className="hidden sm:block" />
              <span className="italic text-teal-700">getting lost in</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500">
              Each island has its own rhythm. Keep scrolling — they glide past
              one by one.
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP: dedicated pin container.
          - h-screen + flex centers cards vertically so they NEVER get cut in half (FIX 1)
          - overflow-hidden prevents horizontal scrollbar from appearing while the track is wide
          - The pin trigger is THIS element, not the section — so it starts only after
            the header has scrolled past and this container reaches the top (FIX 2) */}
      <div
        ref={pinRef}
        className="relative mt-12 hidden h-screen w-full overflow-hidden lg:flex lg:items-center"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 pl-[8vw] pr-[10vw] will-change-transform"
        >
          {ISLANDS.map((island) => (
            <IslandCard key={island.name} island={island} />
          ))}
        </div>
      </div>

      {/* MOBILE / TABLET: native horizontal swipe row */}
      <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-16 sm:px-6 lg:hidden">
        {ISLANDS.map((island) => (
          <div key={island.name} className="snap-start">
            <IslandCard island={island} />
          </div>
        ))}
        <div className="shrink-0 w-1 sm:w-4" aria-hidden="true" />
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}