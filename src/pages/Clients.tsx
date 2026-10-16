import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Compass,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import FourSeats from "@/components/FourSeats";
import ThreePillars from "@/components/ThreePillars";
import { HomeSearchBox } from "@/pages/Home";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";

/**
 * §7 Buy & Sell (/clients) — Secondary audience.
 * - Hero: YOUR JOURNEY TO SUCCESS INCLUDES A HOME.
 * - Subhead: A KW Success trusted advisor helps you find the home base for the life you're building.
 * - Three Pillars in client terms: reuse the §5.4 client lines (mode="clients").
 * - Why a KW Success agent: better equipped, current on the market, coached, and local. Four short cards.
 * - Everyone at One Table: the §5.2 Trusted Advisor diagram again (categories only, config-driven).
 * - Buttons:
 *   - Search Homes -> the kw.com search link
 *   - Find an Agent -> the KW Success agent roster on kw.com (Marcus to confirm URL)
 *   - Talk to Us -> /contact
 * - [SHAWN REVIEW] Fair housing: consumer copy must never describe neighborhoods, schools or people in ways that steer.
 */

const CARD_ICONS = [ShieldCheck, Compass, Award, MapPin];

export default function Clients() {
  const { clientsPage, externalLinks, home } = activeBrokerage;

  return (
    <>
      {/* §7 Hero */}
      <section
        className="relative flex min-h-[58vh] flex-col items-center justify-center overflow-hidden bg-kw-ink text-white"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className="h-0.5 w-10 bg-kw-red" />
            <span className="type-label text-kw-red-bright">
              {clientsPage.hero.eyebrow}
            </span>
            <span className="h-0.5 w-10 bg-kw-red" />
          </motion.div>

          <h1 className="type-display-lg mt-7 max-w-4xl text-white text-balance">
            <SplitWords
              text={clientsPage.hero.headline}
              stagger={0.04}
              delay={0.3}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.75 }}
            className="type-lead mt-7 max-w-2xl text-white/85 text-balance"
          >
            {clientsPage.hero.subhead}
          </motion.p>

          {/* §7 Three CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.65 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={externalLinks.searchHomesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-kw-red px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-kw-red-bright"
            >
              Search Homes <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href={externalLinks.findAgentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white bg-kw-ink/40 px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white hover:text-kw-ink"
            >
              Find an Agent <ArrowUpRight className="h-4 w-4" />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/40 px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Talk to Us <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {externalLinks.findAgentIsPlaceholder && (
            <div className="mt-4">
              <SampleChip
                label="PLACEHOLDER: Find-an-Agent Roster URL (Marcus to confirm)"
                className="border-white/40 bg-white/10 text-white"
              />
            </div>
          )}
        </div>
      </section>

      {/* §7 Three Pillars in client terms (reusing §5.4 client lines) */}
      <ThreePillars mode="clients" />

      {/* §7 Why a KW Success agent: four short cards */}
      <section className="border-y hairline-light bg-mist py-24 md:py-32">
        <div className="container-monogram">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-0.5 w-10 bg-kw-red" />
                  <span className="type-label text-kw-red">
                    THE KW SUCCESS ADVANTAGE
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-md mt-5 text-kw-ink">
                Why Work With a KW Success Agent.
              </h2>
            </div>
            <SampleChip
              label="SHAWN REVIEW: Fair Housing Checked"
              variant="shawn-review"
            />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientsPage.whyCards.map((card, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length];
              return (
                <Reveal key={card.title} delay={0.08 * i} y={24}>
                  <div className="flex h-full flex-col justify-between border hairline-light bg-white p-8 shadow-sm">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center bg-mist text-kw-red">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                      <h3 className="mt-6 text-[1.1rem] font-semibold text-kw-ink">
                        {card.title}
                      </h3>
                      <p className="type-body-sm mt-3 text-charcoal">
                        {card.body}
                      </p>
                    </div>
                    <span className="mt-6 block h-0.5 w-10 bg-kw-red" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* §7 Everyone at One Table: the §5.2 Trusted Advisor diagram again */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram">
          <div className="text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red">
                  {home.oneTable.eyebrow}
                </span>
                <span className="h-0.5 w-10 bg-kw-red" />
              </div>
            </Reveal>
            <h2 className="type-display-lg mx-auto mt-7 max-w-4xl text-kw-ink text-balance">
              <SplitWords text={home.oneTable.headline} />
            </h2>
            <Reveal delay={0.2}>
              <p className="type-lead mx-auto mt-8 max-w-3xl text-charcoal text-balance">
                {home.oneTable.body}
              </p>
            </Reveal>
          </div>

          <div className="mt-14">
            <FourSeats tone="light" />
          </div>
        </div>
      </section>

      {/* Search Strip + Closing Buttons */}
      <section className="border-t hairline-light bg-mist py-24 md:py-32">
        <div className="container-monogram">
          <div className="text-center">
            <h2 className="type-display-md text-kw-ink">
              Ready to Begin Your Search or Sell Your Home?
            </h2>
          </div>

          <div className="mt-10">
            <HomeSearchBox />
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={externalLinks.searchHomesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-kw-red px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-kw-red-bright"
            >
              Search Homes <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={externalLinks.findAgentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-kw-ink bg-white px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-kw-ink transition-colors hover:bg-kw-ink hover:text-white"
            >
              Find an Agent <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-charcoal/40 bg-white px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-kw-ink transition-colors hover:border-kw-red hover:text-kw-red"
            >
              Talk to Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
