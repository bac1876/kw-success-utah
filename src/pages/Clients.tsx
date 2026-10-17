import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Compass,
  ExternalLink,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import FourSeats from "@/components/FourSeats";
import ThreePillars from "@/components/ThreePillars";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import SplitChars from "@/components/motion/SplitChars";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/usePageMeta";

const WHY_ICONS = [ShieldCheck, Compass, Award, MapPin];

export default function Clients() {
  usePageMeta("Buy & Sell", activeBrokerage.clientsPage.hero.subhead);
  const { clientsPage, externalLinks, disclosures } = activeBrokerage;
  const { oneTable } = activeBrokerage.home;

  return (
    <>
      {/* §7 Hero (Dark Architectural Slate + Wasatch Backdrop) */}
      <section
        className="keep-dark relative flex min-h-[76dvh] items-center overflow-hidden bg-ink-deep pb-20 pt-[160px] text-snow"
        style={{ marginTop: -HEADER_H }}
      >
        <img
          src={activeBrokerage.home.hero.image}
          alt={activeBrokerage.home.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,23,26,0.62) 0%, rgba(31,35,38,0.38) 55%, rgba(180,1,1,0.16) 100%)",
          }}
        />

        <div className="container-kw relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-kw-red-bright" />
              <span className="type-label text-kw-red-bright">
                {clientsPage.hero.eyebrow}
              </span>
            </div>

            <h1 className="type-display-xl mt-6 text-white text-balance">
              <SplitChars
                text={clientsPage.hero.headline}
                delay={0.15}
                stagger={0.015}
              />
            </h1>

            <p className="type-lead mt-6 max-w-2xl text-stone-dark">
              {clientsPage.hero.subhead}
            </p>

            {/* §7 Three Action Buttons: Search Homes · Find an Agent · Talk to Us */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={externalLinks.searchHomesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lift-dark transition-all hover:bg-kw-red-bright"
              >
                <Search className="h-4 w-4" />
                <span>Search Homes</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </a>

              <a
                href={externalLinks.findAgentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-ink"
              >
                <span>Find an Agent</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-snow transition-all hover:border-kw-red hover:text-white"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §7 Three Pillars in Client Terms (Cool Sky Mist Section) */}
      <ThreePillars mode="clients" tone="light" />

      {/* §7 Why a KW Success Agent (Dark Slate 4-Card Bento Grid) */}
      <section className="bg-ink py-24 text-snow md:py-32">
        <div className="container-kw">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/35 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    02
                  </span>
                  <span className="type-label text-kw-red-bright">
                    The Advisor Advantage
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-lg mt-5 text-white">
                <SplitWords text="WHY A KW SUCCESS AGENT." />
              </h2>
            </div>

            <Reveal delay={0.15}>
              <p className="type-body max-w-md text-stone-dark">
                Better equipped, current on the market, coached to serve, and
                deeply rooted across Weber, Davis, and Morgan Counties.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientsPage.whyCards.map((card, idx) => {
              const Icon = WHY_ICONS[idx % WHY_ICONS.length];
              return (
                <Reveal key={card.title} delay={0.07 * idx} y={24}>
                  <div
                    className={cn(
                      "group flex h-full flex-col justify-between rounded-3xl border p-8 transition-all duration-300",
                      idx === 0
                        ? "border-kw-red/60 bg-gradient-to-b from-kw-red/20 via-slate-card to-ink-deep"
                        : "border-white/10 bg-slate-card/80 hover:border-kw-red/50"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-kw-red text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-dark">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="mt-7 text-xl font-bold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                        {card.body}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-kw-red-bright">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Trusted Advisor Standard</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* §7 Everyone at One Table (Cool Sky Mist Section) */}
      <section className="bg-mist py-24 text-ink md:py-32">
        <div className="container-kw">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    03
                  </span>
                  <span className="type-label text-kw-red">
                    {oneTable.eyebrow}
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-lg mt-5 text-ink text-balance">
                <SplitWords text={oneTable.headline} />
              </h2>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <p className="type-body text-charcoal">{oneTable.body}</p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14">
            <FourSeats tone="light" showJourney />
          </div>
        </div>
      </section>

      {/* §7 Closing CTA + Fair Housing Commitment (Dark Slate) */}
      <section className="bg-ink-deep py-24 text-snow md:py-28">
        <div className="container-kw">
          <div className="rounded-3xl border border-white/10 bg-ink p-8 text-center shadow-lift-dark md:p-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-kw-red-bright">
              <Users className="h-3.5 w-3.5" />
              Ready When You Are
            </span>

            <h2 className="type-display-lg mx-auto mt-6 max-w-3xl text-white text-balance">
              LET&apos;S FIND THE HOME BASE FOR YOUR NEXT CHAPTER.
            </h2>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={externalLinks.searchHomesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
              >
                <span>Search Homes</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </a>

              <a
                href={externalLinks.findAgentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-ink"
              >
                <span>Find an Agent</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <Link
                to="/contact?topic=buying"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-snow transition-all hover:border-kw-red hover:text-white"
              >
                Talk to Us
              </Link>
            </div>

            {/* §7 Fair Housing Note */}
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-6 text-xs text-stone-dark">
              <span>{disclosures.fairHousingNote}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
