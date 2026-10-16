import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  meta: string;
}

export const defaultTestimonials: Testimonial[] = [
  {
    quote: "They didn't sell us a house. They walked us home.",
    name: "The Okafor Family",
    meta: "Sold in Aurora",
  },
  {
    quote: "Three homes in eleven years. One advisor. That's Monogram.",
    name: "Dan & Melissa R.",
    meta: "Sold in Naperville",
  },
  {
    quote:
      "Every question, every document, every worry — handled before we asked.",
    name: "Sarah T.",
    meta: "Sold in Geneva",
  },
  {
    quote: "We came for a transaction. We stayed for the relationship.",
    name: "The Alvarez Family",
    meta: "Sold in St. Charles",
  },
];

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  className?: string;
}

export default function TestimonialCarousel({
  testimonials = defaultTestimonials,
  className,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setDir(next > index ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index, testimonials.length]
  );

  useEffect(() => {
    if (paused) return;
    timer.current = window.setTimeout(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, testimonials.length]);

  const t = testimonials[index];

  return (
    <div
      className={cn("relative mx-auto max-w-4xl text-center", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-12 flex items-center justify-center gap-6">
        <span className="h-px w-16 bg-copper" />
        <span className="type-label text-copper">What Our Clients Say</span>
        <span className="h-px w-16 bg-copper" />
      </div>

      <div className="relative min-h-[220px] md:min-h-[180px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={index}
            initial={{ opacity: 0, filter: "blur(8px)", x: 24 * dir }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", x: -24 * dir }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            <blockquote className="type-serif-accent text-ivory">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <span className="type-body-sm text-ivory">{t.name}</span>
              <span className="type-body-sm text-stone-dark"> · {t.meta}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(index - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-copper text-copper transition-colors hover:bg-copper hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "h-1 w-6 transition-colors",
                i === index ? "bg-copper" : "bg-ivory/20"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(index + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-copper text-copper transition-colors hover:bg-copper hover:text-ink"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
