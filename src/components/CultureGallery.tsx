import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  CULTURE_STORIES,
  type CultureStoryItem,
} from "@/data/kwSuccessMedia";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { cn } from "@/lib/utils";

const CATEGORIES: Array<"All" | CultureStoryItem["category"]> = [
  "All",
  "Awards Breakfast",
  "Team Meetings",
  "Cookies with Santa",
  "Trunk or Treat",
  "Office Parties",
];

export default function CultureGallery({
  tone = "dark",
  limit,
  defaultCategory = "All",
  eyebrow = "Culture, Awards & Community",
  headline = "LIFE AT KW SUCCESS.",
  subhead = "From our annual Awards Breakfast and mastermind Team Meetings to Cookies with Santa, Trunk or Treat, and Market Center celebrations in Layton.",
  className,
}: {
  tone?: "dark" | "light";
  limit?: number;
  defaultCategory?: "All" | CultureStoryItem["category"];
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  className?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | CultureStoryItem["category"]
  >(defaultCategory);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const dark = tone === "dark";

  const filtered =
    selectedCategory === "All"
      ? CULTURE_STORIES
      : CULTURE_STORIES.filter((item) => item.category === selectedCategory);

  const displayed = limit ? filtered.slice(0, limit) : filtered;
  const activeModalItem =
    lightboxIndex !== null ? displayed[lightboxIndex] : null;

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + displayed.length) % displayed.length
    );
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % displayed.length);
  };

  return (
    <section
      className={cn(
        "py-24 md:py-32",
        dark ? "bg-ink text-snow" : "bg-mist text-ink",
        className
      )}
    >
      <div className="container-kw">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div
              className={cn(
                "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5",
                dark
                  ? "border-kw-red/35 bg-kw-red/10 text-kw-red-bright"
                  : "border-kw-red/30 bg-kw-red/10 text-kw-red"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-kw-red" />
              <span className="type-label">{eyebrow}</span>
            </div>
            <h2
              className={cn(
                "type-display-lg mt-5",
                dark ? "text-white" : "text-ink"
              )}
            >
              {headline}
            </h2>
          </div>
          <p
            className={cn(
              "type-body max-w-md",
              dark ? "text-stone-dark" : "text-charcoal"
            )}
          >
            {subhead}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            const count =
              cat === "All"
                ? CULTURE_STORIES.length
                : CULTURE_STORIES.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all",
                  active
                    ? "border-kw-red bg-kw-red text-white shadow-[0_8px_24px_-6px_rgba(180,1,1,0.55)]"
                    : dark
                      ? "border-white/15 bg-ink-deep text-stone-dark hover:border-white/35 hover:text-white"
                      : "border-ink/15 bg-white text-charcoal hover:border-kw-red/40 hover:text-ink"
                )}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[0.62rem]",
                    active
                      ? "bg-white/20 text-white"
                      : dark
                        ? "bg-white/10 text-stone-dark"
                        : "bg-mist text-ink"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-2 text-xs font-medium",
            dark ? "text-stone-dark" : "text-charcoal"
          )}
        >
          <Camera className="h-3.5 w-3.5 text-kw-red-bright" />
          <span>Click any photo to view full screen</span>
        </div>
      </div>

      {/* Photo Grid */}
      <motion.div
        layout
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {displayed.map((story, idx) => (
            <motion.div
              key={story.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.28 }}
            >
              <SpotlightCard
                enableTilt
                maxTilt={3}
                onClick={() => setLightboxIndex(idx)}
                className={cn(
                  "group cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300",
                  dark
                    ? "border-white/10 bg-slate-card hover:border-kw-red/60 shadow-lift-dark"
                    : "border-ink/10 bg-white hover:border-kw-red/50 shadow-card"
                )}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-deep">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/95 via-ink-deep/25 to-transparent" />

                  {/* Top Category Pill + Expand Icon */}
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ink-deep/80 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-snow backdrop-blur-md">
                      {story.category === "Awards Breakfast" ? (
                        <Award className="h-3 w-3 text-kw-red-bright" />
                      ) : story.category === "Team Meetings" ? (
                        <Users className="h-3 w-3 text-kw-red-bright" />
                      ) : (
                        <Sparkles className="h-3 w-3 text-kw-red-bright" />
                      )}
                      {story.category}
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-ink-deep/75 text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                      <Expand className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* Bottom Title + Subtitle */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-kw-red-bright">
                      {story.year}
                    </span>
                    <h4 className="mt-1 text-base font-bold leading-snug text-white">
                      {story.title}
                    </h4>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-dark">
                      {story.subtitle}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-ink-deep text-snow shadow-2xl md:flex-row"
            >
              {/* Image column */}
              <div className="relative flex max-h-[65vh] flex-1 items-center justify-center bg-black md:max-h-[85vh]">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="max-h-[65vh] w-auto object-contain md:max-h-[85vh]"
                />
              </div>

              {/* Caption sidebar */}
              <div className="flex w-full flex-col justify-between p-6 md:w-80 md:p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-kw-red px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white">
                      {activeModalItem.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(null)}
                      aria-label="Close lightbox"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-kw-red"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-kw-red-bright">
                    {activeModalItem.year}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {activeModalItem.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                    {activeModalItem.subtitle}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={prevLightbox}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:border-kw-red hover:bg-kw-red"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>
                  <span className="text-xs font-bold text-stone-dark">
                    {(lightboxIndex ?? 0) + 1} / {displayed.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextLightbox}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:border-kw-red hover:bg-kw-red"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
