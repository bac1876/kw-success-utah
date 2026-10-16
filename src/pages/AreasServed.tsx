import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal, { SplitWords } from "@/components/Reveal";
import SampleChip from "@/components/SampleChip";
import { HEADER_H } from "@/components/Navbar";
import NetworkMap, {
  UTAH_AREA_COUNT,
  UTAH_AREA_GROUPS,
} from "@/components/motion/NetworkMap";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CORRIDOR_STRIPS = [
  {
    name: "Layton Market Center",
    localities: "Davis County HQ · 1572 Woodland Park Dr",
    to: "/about#market-center",
  },
  {
    name: "Weber & Ogden Valley",
    localities: "Ogden · North Ogden · Huntsville · Eden",
    to: "/clients",
  },
  {
    name: "Unity Home Loans",
    localities: "In-House Mortgage Solutions",
    to: "/services/mortgage",
  },
  {
    name: "Amicus Title",
    localities: "In-House Title & Escrow Services",
    to: "/services/title",
  },
];

export default function AreasServed() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-ink"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">Areas Served</span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>

          <h1 className="type-display-lg mt-8 max-w-4xl text-ivory text-balance">
            <SplitWords
              text="Rooted in Layton. Serving All of Northern Utah."
              stagger={0.05}
              delay={0.4}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="type-lead mt-8 max-w-2xl text-white/80 text-balance"
          >
            From the shores of the Great Salt Lake to the peaks of the Wasatch
            Back — our advisors serve {UTAH_AREA_COUNT}+ communities across
            Davis, Weber, and Morgan Counties alongside the greater Salt Lake
            Metro.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="type-body-sm mt-6 flex items-center gap-2 text-stone-dark"
          >
            Northern Utah coverage map <SampleChip label="Interactive" />
          </motion.p>

          <motion.a
            href="#network-map"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("network-map");
              if (!el) return;
              if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: -HEADER_H + 8 });
              } else {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="group mt-12 inline-flex items-center gap-4 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-ivory transition-colors hover:text-copper"
            data-cursor="Explore"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-copper/60 transition-colors group-hover:border-copper">
              <ArrowDown
                className="h-4 w-4 animate-bounce text-copper"
                strokeWidth={1.5}
              />
            </span>
            See the network map — every town, to scale
          </motion.a>
        </div>
      </section>

      {/* Interactive Network Map */}
      <section
        id="network-map"
        className="bg-ink pb-20 pt-12 md:pb-24 md:pt-14"
      >
        <div className="container-monogram">
          <NetworkMap />
        </div>
      </section>

      {/* Corridors & Partners Strip */}
      <section className="border-b bg-ivory hairline-light">
        <div className="container-monogram grid divide-y hairline-light md:grid-cols-4 md:divide-x md:divide-y-0">
          {CORRIDOR_STRIPS.map((item, idx) => (
            <Reveal key={item.name} delay={0.08 * idx}>
              <Link
                to={item.to}
                className="group flex items-center justify-between px-2 py-7 md:px-6"
              >
                <span>
                  <span className="block text-[0.9rem] font-medium text-ink transition-colors group-hover:text-copper">
                    {item.name}
                  </span>
                  <span className="type-body-sm text-stone">
                    {item.localities}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 text-copper transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Communities by County */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="type-label text-copper">
                  Communities We Serve
                </span>
              </div>
              <h2 className="type-display-md mt-6 text-ink">
                <SplitWords text="One Relationship, Every Utah Address." />
              </h2>
              <Reveal delay={0.2}>
                <p className="type-body mt-6 max-w-md text-stone">
                  Our Market Center sits in Layton, but the relationship
                  travels across the entire Wasatch Front. Buying, selling,
                  title, or lending — your KW Success advisor serves every
                  community below.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  to="/contact"
                  className="btn-sweep mt-10 inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
                >
                  Talk to an Advisor
                </Link>
              </Reveal>
            </div>

            <div className="flex flex-col gap-14">
              {UTAH_AREA_GROUPS.map((group, gIdx) => (
                <Reveal key={group.county} delay={0.05 * gIdx} y={24}>
                  <div className="border-t pt-6 hairline-light">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[1.05rem] font-medium tracking-[0.02em] text-ink">
                        {group.county}
                      </h3>
                      {group.note && (
                        <span className="type-body-sm text-copper">
                          {group.note}
                        </span>
                      )}
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                      {group.communities.map((comm, cIdx) => (
                        <motion.li
                          key={comm}
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.015 * cIdx,
                            duration: 0.4,
                            ease: EASE,
                          }}
                          className="text-[0.92rem] font-light text-ink/85"
                        >
                          {comm}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24 md:py-32">
        <div className="container-monogram text-center">
          <h2 className="type-display-md mx-auto max-w-3xl text-ivory">
            <SplitWords text="Don't See Your Utah Town? We Likely Serve It." />
          </h2>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="mt-10 inline-block rounded-full bg-copper px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
            >
              Ask Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
