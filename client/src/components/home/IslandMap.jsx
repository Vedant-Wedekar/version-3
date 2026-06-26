import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Ship } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ISLANDS } from "../../data/islands";
import { cn } from "../../utils/cn";
import TravelOverlay, { routeSvgPath } from "./TravelOverlay";

export default function IslandMap() {
  const [flight, setFlight] = useState(null);
  const [departing, setDeparting] = useState(null);
  const navigate = useNavigate();

  // Where the vehicle currently "lives" — starts at Port Blair (the gateway)
  const lastStop = useRef(
    ISLANDS.find((i) => i.id === "port-blair") || ISLANDS[0]
  );

  // Cinematic takeover -> navigate to the island's story page
  const goToStory = (island) => {
    setDeparting(island);
    setTimeout(() => navigate(`/islands/${island.id}`), 1100);
  };

  // Safety net: if the 3D layer ever fails to report arrival,
  // force-land so the map can never lock up.
  useEffect(() => {
    if (!flight) return;
    const timer = setTimeout(() => {
      lastStop.current = flight.to;
      const dest = flight.to;
      setFlight(null);
      goToStory(dest);
    }, flight.duration * 1000 + 1200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flight]);

  // Build a smooth route path connecting the islands in order (top -> bottom)
  const ordered = [...ISLANDS].sort((a, b) => a.y - b.y);
  const routePath = ordered
    .map((isl, i) => `${i === 0 ? "M" : "L"} ${isl.x} ${isl.y}`)
    .join(" ");

  const handlePinClick = (island) => {
    if (flight || departing) return; // ignore clicks mid-journey

    const from = lastStop.current;
    if (from.id === island.id) {
      // Already docked here — go straight into the story
      goToStory(island);
      return;
    }

    const dist = Math.hypot(island.x - from.x, island.y - from.y);

    setFlight({
      key: Date.now(),
      from,
      to: island,
      // Short hops get the ferry, long hauls get the seaplane
      type: dist > 22 ? "plane" : "boat",
      duration: Math.min(1.1 + dist * 0.045, 3.4),
    });
  };

  const handleArrive = () => {
    if (!flight) return;
    lastStop.current = flight.to;
    const dest = flight.to;
    setFlight(null);
    goToStory(dest);
  };

  return (
    <div className="relative mx-auto h-[550px] w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20">
      <img
        src="https://res.cloudinary.com/dduri4zfq/image/upload/v1780139110/Gemini_Generated_Image_3b1tbz3b1tbz3b1t-removebg-preview_gans9a.png"
        alt="Island map"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Theme tint — deepens the ocean and helps pins + vehicle pop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-950/25 via-transparent to-slate-950/35" />

      {/* Archipelago badge */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-slate-900/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-200 shadow-lg backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        Andaman Archipelago · {ISLANDS.length} stories
      </div>

      {/* Static route line connecting all islands */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d={routePath}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="2 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Live journey route — draws in sync with the vehicle */}
        {flight && (
          <motion.path
            key={flight.key}
            d={routeSvgPath(flight.from, flight.to)}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="1.5 1.5"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: flight.duration, ease: "easeInOut" }}
          />
        )}
      </svg>

      {/* Pins */}
      {ISLANDS.map((island, i) => {
        const isDestination = flight?.to.id === island.id;

        return (
          <button
            key={island.id}
            onClick={() => handlePinClick(island)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${island.x}%`, top: `${island.y}%` }}
            aria-label={`Fly to ${island.name}`}
          >
            {/* Pulsing Ring — fast amber pulse on the destination while traveling */}
            <motion.span
              className={cn(
                "absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border",
                isDestination ? "border-amber-300" : "border-cyan-400/70"
              )}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: isDestination ? 1 : 2.8,
                delay: isDestination ? 0 : i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Pin Dot */}
            <span
              className={cn(
                "relative block h-4 w-4 rounded-full ring-2 shadow-md transition-all duration-300 group-hover:scale-125",
                isDestination
                  ? "scale-125 bg-amber-400 ring-amber-100"
                  : "bg-cyan-400 ring-white"
              )}
            />

            {/* Label */}
            <span
              className={cn(
                "absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-md backdrop-blur-sm transition-all duration-300",
                isDestination
                  ? "bg-amber-400 text-slate-900"
                  : "bg-slate-900/90 text-white"
              )}
            >
              {island.name.split(" ")[0]}
            </span>
          </button>
        );
      })}

      {/* 3D vehicle layer — seaplane / speedboat travels between islands */}
      <TravelOverlay flight={flight} onArrive={handleArrive} />

      {/* "En route" status chip */}
      <AnimatePresence>
        {flight && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-4 z-30 flex justify-center"
          >
            <span className="flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
              {flight.type === "plane" ? (
                <Plane className="h-3.5 w-3.5 text-cyan-300" />
              ) : (
                <Ship className="h-3.5 w-3.5 text-cyan-300" />
              )}
              {flight.type === "plane" ? "Flying" : "Sailing"} to{" "}
              {flight.to.name.split(" ")[0]}…
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!flight && !departing && (
        <motion.p
          className="absolute inset-x-0 bottom-4 text-center text-xs font-medium text-white/80"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          Tap a pin — fly into its story ✈️
        </motion.p>
      )}

      {/* Cinematic departure takeover -> story page */}
      <AnimatePresence>
        {departing && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(140% at 50% 50%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#7C3AED] via-[#2563EB] to-[#22D3EE]"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center text-white"
            >
              <motion.div
                animate={{ x: [0, 14, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <Plane className="mx-auto mb-4 h-9 w-9" />
              </motion.div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                Now arriving
              </p>
              <h3 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {departing.name.split(" (")[0]}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
