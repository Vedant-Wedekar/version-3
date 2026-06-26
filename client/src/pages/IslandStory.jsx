import { useEffect, useRef, useState, Suspense } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  Compass,
  Route,
  Plane,
  ChevronDown,
} from "lucide-react";
import { ISLANDS } from "../data/islands";
import { cn } from "../utils/cn";
import { MapCamera, PlaneModel } from "../components/home/TravelOverlay";
import { PlaneGLB, CloudGLB } from "../components/three/Models";

/* ------------------------------------------------------------------ */
/* 3D sky — the real Eclipse jet crosses the page as you scroll,       */
/* real volumetric clouds drift on their own + parallax with scroll    */
/* ------------------------------------------------------------------ */

function ScrollJet({ progress }) {
  const group = useRef();
  const prop = useRef();

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    const t = progress.get(); // 0..1 page scroll
    const x = -18 + t * 136; // crosses the whole screen over the page
    const y = 66 + Math.sin(t * Math.PI * 3) * 12;
    const slope = Math.cos(t * Math.PI * 3) * 0.4;

    g.rotation.order = "ZYX";
    g.position.set(x, y, 10);
    g.rotation.z = slope * 0.45;
    g.rotation.x =
      Math.sin(state.clock.elapsedTime * 1.3) * 0.1 + slope * 0.5;
    g.scale.setScalar(1.05);
  });

  return (
    <group ref={group} position={[-30, 66, 10]}>
      <Suspense fallback={<PlaneModel propRef={prop} />}>
        <PlaneGLB />
      </Suspense>
    </group>
  );
}

function DriftingCloud({ progress, y, z, speed, scale, start, parallax }) {
  const ref = useRef();
  const xRef = useRef(start);

  useFrame((_, delta) => {
    const c = ref.current;
    if (!c) return;
    xRef.current += delta * speed;
    if (xRef.current > 120) xRef.current = -20;
    // gentle parallax: clouds slide up slightly as you scroll down
    c.position.set(xRef.current, y - progress.get() * parallax, z);
  });

  return (
    <group ref={ref} position={[start, y, z]}>
      <Suspense fallback={null}>
        <CloudGLB scale={scale} />
      </Suspense>
    </group>
  );
}

function StorySky({ progress }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        orthographic
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <MapCamera />
        <ambientLight intensity={1.1} />
        <hemisphereLight intensity={0.6} groundColor="#bae6fd" />
        <directionalLight position={[30, 40, 80]} intensity={1.5} />
        <directionalLight position={[-20, -10, 40]} intensity={0.4} />

        <ScrollJet progress={progress} />

        <DriftingCloud progress={progress} y={84} z={4} speed={2.0} scale={1.3} start={12} parallax={10} />
        <DriftingCloud progress={progress} y={34} z={3} speed={1.3} scale={0.9} start={68} parallax={16} />
        <DriftingCloud progress={progress} y={58} z={2} speed={1.7} scale={0.7} start={40} parallax={22} />
        <DriftingCloud progress={progress} y={16} z={2} speed={1.1} scale={1.1} start={92} parallax={8} />
      </Canvas>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One story chapter — image + text, scroll-revealed                   */
/* ------------------------------------------------------------------ */

function Chapter({ chapter, index, flip }) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Ghost chapter number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 left-2 select-none font-display text-[9rem] font-bold leading-none text-slate-900/[0.04] sm:text-[13rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image — clip-path reveal with soft colored glow */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-25px_rgba(34,211,238,0.35)]",
            flip && "lg:order-2"
          )}
        >
          <motion.img
            src={chapter.image}
            alt={chapter.title}
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-72 w-full object-cover sm:h-96"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/10" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
          className={cn(flip && "lg:order-1")}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#0891B2] bg-clip-text text-xs font-bold uppercase tracking-[0.3em] text-transparent"
          >
            Chapter {String(index + 1).padStart(2, "0")}
          </motion.p>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {chapter.title}
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {chapter.text}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The page                                                            */
/* ------------------------------------------------------------------ */

export default function IslandStory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [splash, setSplash] = useState(true);
  const { scrollYProgress } = useScroll();

  const island = ISLANDS.find((i) => i.id === id);
  const idx = ISLANDS.findIndex((i) => i.id === id);
  const next = ISLANDS[(idx + 1) % ISLANDS.length];

  // Reset on island change: scroll top + replay arrival splash
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSplash(true);
    const t = setTimeout(() => setSplash(false), 1500);
    return () => clearTimeout(t);
  }, [id]);

  if (!island) return <Navigate to="/" replace />;

  const displayName = island.name.split(" (")[0];
  const facts = island.story.facts;

  return (
    <div className="relative min-h-screen bg-[#FAFCFD] text-slate-900">
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#7C3AED] via-[#60A5FA] to-[#22D3EE]"
      />

      {/* Soft pastel washes */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-cyan-100/70 to-transparent" />
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-violet-200/50 blur-[130px]" />
        <div className="absolute -right-40 top-2/3 h-96 w-96 rounded-full bg-cyan-200/60 blur-[130px]" />
      </div>

      {/* 3D sky: the real jet + real clouds, scroll-driven */}
      <StorySky progress={scrollYProgress} />

      <div className="relative z-10">
        {/* ---------- Hero ---------- */}
        <header className="relative overflow-hidden">
          {/* Photo that melts into the white page */}
          <div className="relative h-[62vh] min-h-[420px]">
            <motion.img
              src={island.image.replace("w=600", "w=1600")}
              alt={displayName}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFCFD] via-[#FAFCFD]/30 to-black/20" />
          </div>

          {/* Title block overlapping the fade */}
          <div className="relative mx-auto -mt-44 max-w-6xl px-4 pb-10 sm:px-6">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#0891B2] bg-clip-text text-xs font-bold uppercase tracking-[0.35em] text-transparent"
            >
              {island.tagline}
            </motion.p>

            {/* Letter-by-letter island name */}
            <h1 className="mt-4 font-display text-6xl font-bold leading-none tracking-tight text-slate-900 sm:text-8xl lg:text-9xl">
              {displayName.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 1.1 + i * 0.045,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {island.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3 }}
              className="mt-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400"
            >
              <ChevronDown className="h-4 w-4 animate-bounce" />
              Scroll to begin the story
            </motion.div>
          </div>
        </header>

        {/* ---------- Facts strip ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: CalendarDays, label: "Best time", value: facts.bestTime },
              { icon: Compass, label: "Known for", value: facts.knownFor },
              { icon: Route, label: "Getting there", value: facts.gettingThere },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="rounded-3xl bg-white p-6 shadow-[0_15px_50px_-20px_rgba(2,6,23,0.15)] ring-1 ring-slate-200/70"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#60A5FA] to-[#22D3EE] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {label}
                </p>
                <p className="mt-1.5 text-sm font-semibold leading-relaxed text-slate-800">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------- Chapters ---------- */}
        {island.story.chapters.map((ch, i) => (
          <Chapter key={i} chapter={ch} index={i} flip={i % 2 === 1} />
        ))}

        {/* ---------- Highlights ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
              Don&apos;t miss
            </span>
            {island.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE]" />
                {h}
              </span>
            ))}
          </motion.div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#7C3AED] via-[#2563EB] to-[#22D3EE] p-10 text-center text-white shadow-[0_40px_100px_-30px_rgba(37,99,235,0.5)] sm:p-16"
          >
            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Ready to live this story?
            </h3>
            <p className="mx-auto mt-4 max-w-md text-white/85">
              Handcrafted {displayName} itineraries with stays, ferries, and
              every detail taken care of.
            </p>
            <Link
              to="/packages"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Explore Packages
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>

        {/* ---------- Next island ---------- */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <motion.button
            onClick={() => navigate(`/islands/${next.id}`)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative block w-full overflow-hidden rounded-[2.5rem] text-left shadow-[0_30px_80px_-25px_rgba(2,6,23,0.35)]"
          >
            <img
              src={next.image.replace("w=600", "w=1200")}
              alt={next.name}
              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                <Plane className="h-4 w-4" />
                Continue the journey
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {next.name.split(" (")[0]}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-300">
                {next.tagline}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                Fly there
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </div>
          </motion.button>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the map
          </Link>
        </section>
      </div>

      {/* ---------- Arrival splash ---------- */}
      <AnimatePresence>
        {splash && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-gradient-to-br from-[#7C3AED] via-[#2563EB] to-[#22D3EE]"
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 120, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              >
                <Plane className="mx-auto mb-4 h-10 w-10" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80"
              >
                Welcome to
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-6xl"
              >
                {displayName}
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
