import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { OFFICE_TOUR_PHOTOS } from "@/data/kwSuccessMedia";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { cn } from "@/lib/utils";

export default function OfficeTourShowcase({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dark = tone === "dark";
  const current = OFFICE_TOUR_PHOTOS[activeIndex] ?? OFFICE_TOUR_PHOTOS[0];

  const handlePrev = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + OFFICE_TOUR_PHOTOS.length) % OFFICE_TOUR_PHOTOS.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % OFFICE_TOUR_PHOTOS.length);
  };

  return (
    <section
      className={cn(
        "py-20 md:py-28",
        dark ? "bg-ink-deep text-snow" : "bg-mist text-ink",
        className
      )}
    >
      <div className="container-kw">
        <SpotlightCard
          spotlightColor="rgba(209, 25, 25, 0.22)"
        borderGlowColor="rgba(255, 80, 80, 0.85)"
        className={cn(
          "overflow-hidden rounded-3xl border p-6 md:p-10",
          dark
            ? "border-white/10 bg-slate-card/90 text-snow shadow-lift-dark"
            : "border-ink/10 bg-white text-ink shadow-card"
        )}
      >
        {/* Top Header + Room Selector Pills */}
        <div className="flex flex-col justify-between gap-6 border-b pb-6 lg:flex-row lg:items-end"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(31,35,38,0.1)",
          }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-kw-red/40 bg-kw-red/15 px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-kw-red-bright">
              <Building2 className="h-3.5 w-3.5" />
              Inside the Layton Market Center
            </div>
            <h3
              className={cn(
                "mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl",
                dark ? "text-white" : "text-ink"
              )}
            >
              Tour Our Home Base in Layton.
            </h3>
            <p
              className={cn(
                "mt-1 flex items-center gap-1.5 text-xs",
                dark ? "text-stone-dark" : "text-charcoal"
              )}
            >
              <MapPin className="h-3.5 w-3.5 text-kw-red" />
              1572 N Woodland Park Dr, Suite 505, Layton, UT 84041
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous room"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-all",
                dark
                  ? "border-white/15 bg-ink-deep text-snow hover:border-kw-red hover:bg-kw-red hover:text-white"
                  : "border-ink/15 bg-mist text-ink hover:border-kw-red hover:bg-kw-red hover:text-white"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span
              className={cn(
                "px-3 text-xs font-bold uppercase tracking-widest",
                dark ? "text-stone-dark" : "text-charcoal"
              )}
            >
              0{activeIndex + 1} / 0{OFFICE_TOUR_PHOTOS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next room"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-all",
                dark
                  ? "border-white/15 bg-ink-deep text-snow hover:border-kw-red hover:bg-kw-red hover:text-white"
                  : "border-ink/15 bg-mist text-ink hover:border-kw-red hover:bg-kw-red hover:text-white"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Featured Photo Stage */}
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-deep lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/30 to-transparent p-5">
              <span className="inline-block rounded-full bg-kw-red px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white">
                {current.tag}
              </span>
              <p className="mt-2 text-lg font-bold text-white md:text-xl">
                {current.title}
              </p>
            </div>
          </div>

          {/* Right Room Selector List */}
          <div className="flex flex-col justify-between gap-2.5 lg:col-span-4">
            {OFFICE_TOUR_PHOTOS.map((room, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "flex items-center gap-3.5 rounded-2xl border p-3 text-left transition-all",
                    active
                      ? "border-kw-red bg-kw-red/15 shadow-[0_8px_24px_-8px_rgba(180,1,1,0.45)]"
                      : dark
                        ? "border-white/10 bg-ink-deep/60 hover:border-white/25"
                        : "border-ink/10 bg-mist/60 hover:border-ink/25"
                  )}
                >
                  <img
                    src={room.image}
                    alt={room.title}
                    className="h-12 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[0.6rem] font-bold uppercase tracking-[0.16em] text-kw-red-bright">
                      {room.tag}
                    </span>
                    <span
                      className={cn(
                        "block truncate text-xs font-bold",
                        dark ? "text-white" : "text-ink"
                      )}
                    >
                      {room.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Room Caption */}
        <p
          className={cn(
            "mt-5 text-sm leading-relaxed",
            dark ? "text-stone-dark" : "text-charcoal"
          )}
        >
          {current.caption}
        </p>
      </SpotlightCard>
      </div>
    </section>
  );
}
