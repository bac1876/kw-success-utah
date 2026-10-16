import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { InfinityMark } from "@/components/InfinityMark";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MILESTONES = [
  {
    year: "1997",
    title: "KW Success Founded",
    body: "Marcus & Jenifer Arbuckle open the doors in Northern Utah with one conviction: put agents and families first.",
    image: "/interior-a.jpg",
  },
  {
    year: "Layton",
    title: "The Wasatch Front Hub",
    body: "Anchored in Layton at 1572 Woodland Park Drive — serving Davis, Weber, and Morgan Counties.",
    image: "/kw-success/hero-wasatch.jpg",
  },
  {
    year: "20K+",
    title: "Families Guided Home",
    body: "More than 20,000 Northern Utah households served across nearly three decades of market cycles.",
    image: "/interior-b.jpg",
  },
  {
    year: "Unity",
    title: "Unity Home Loans",
    body: "In-house mortgage advisors sitting at the same table — honest numbers and pre-approval with a human on the phone.",
    image: "/service-mortgage.jpg",
  },
  {
    year: "Amicus",
    title: "Amicus Title",
    body: "Escrow, title search, and settlement handled under one roof so closing day feels like a milestone, not a hurdle.",
    image: "/service-title.jpg",
  },
  {
    year: "$6B+",
    title: "Closed Sales Volume",
    body: "Over $6 billion in real estate volume closed across the Wasatch Front and greater Salt Lake Metro.",
    image: "/interior-c.jpg",
  },
  {
    year: "8x",
    title: "Utah Best of State",
    body: "Recognized 8 out of 9 years inside the Keller Williams Utah Region for excellence, culture, and service.",
    image: "/luxe-estate.jpg",
  },
  {
    year: "2026",
    title: "Everyone at One Table",
    body: "Trusted advisor, mortgage, title, and home services — one relationship for the life of the home.",
    image: "/hero-about.jpg",
  },
];

export default function JourneyRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      if (reduced || !wide || !trackRef.current) {
        if (barRef.current) gsap.set(barRef.current, { scaleX: 1 });
        return;
      }
      const dist = () => trackRef.current!.scrollWidth - window.innerWidth;
      gsap.to(trackRef.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              gsap.set(barRef.current, { scaleX: self.progress });
            }
          },
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-deep"
    >
      <div className="container-monogram pt-24 md:pt-32 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-10 lg:pt-14">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-copper" />
          <span className="type-label text-copper">
            Since 1997 · One Table
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-16 px-6 py-16 will-change-transform lg:h-[100vh] lg:flex-row lg:items-center lg:gap-[7vw] lg:px-[8vw] lg:py-0"
      >
        {MILESTONES.map((m, idx) => (
          <article
            key={m.year}
            className="relative shrink-0 lg:w-[34vw] lg:max-w-[30rem]"
          >
            <span className="block text-[clamp(3.5rem,9vw,8rem)] font-light leading-none tracking-[-0.02em] text-copper/90">
              {m.year}
            </span>
            <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-6">
              <div>
                <h3 className="type-display-md !text-[1.6rem] text-ivory">
                  {m.title}
                </h3>
                <p className="type-body mt-3 max-w-sm text-ivory/65">
                  {m.body}
                </p>
              </div>
              <div className="h-28 w-24 overflow-hidden border border-copper/30">
                <img
                  src={m.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {idx === MILESTONES.length - 1 && (
              <div className="mt-8 flex items-center gap-4 text-copper">
                <span className="h-px w-10 bg-copper" />
                <InfinityMark className="h-7" />
                <span className="type-label">and the life of the home</span>
              </div>
            )}
          </article>
        ))}
        <div className="hidden shrink-0 lg:block lg:w-[10vw]" />
      </div>

      <div className="absolute inset-x-0 bottom-10 hidden px-[8vw] lg:block">
        <div className="relative h-px w-full bg-copper/25">
          <span
            ref={barRef}
            className="absolute inset-0 origin-left bg-copper"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
