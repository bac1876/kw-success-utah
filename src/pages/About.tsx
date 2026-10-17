import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Heart,
  Mail,
  Phone,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import SplitChars from "@/components/motion/SplitChars";
import SpotlightCard from "@/components/motion/SpotlightCard";
import OfficeTourShowcase from "@/components/OfficeTourShowcase";
import CultureGallery from "@/components/CultureGallery";
import { SUPPORT_STAFF } from "@/data/kwSuccessMedia";

const COMMUNITY_CARDS = [
  {
    title: "KW Success Cares",
    subtitle: "Weber, Davis & Morgan Counties",
    detail:
      "Locally funded outreach supporting Northern Utah families, school pantries, and neighbors experiencing unexpected hardship.",
  },
  {
    title: "KW Cares",
    subtitle: "501(c)(3) Agent & Family Relief",
    detail:
      "Emergency grants and heart-led support for Keller Williams associates and their families during times of crisis.",
  },
  {
    title: "RED Day Service",
    subtitle: "Renew · Energize · Donate",
    detail:
      "Every May, our entire Layton Market Center steps away from business to spend the day serving local parks, shelters, and nonprofits.",
  },
];

export default function About() {
  const { aboutPage, externalLinks } = activeBrokerage;
  const [expandedBio, setExpandedBio] = useState<Record<string, boolean>>({});

  const toggleBio = (name: string) =>
    setExpandedBio((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <>
      {/* §8.1 Hero (Dark Architectural Slate + Wasatch Backdrop) */}
      <section
        className="relative flex min-h-[70dvh] items-center overflow-hidden bg-ink-deep pb-20 pt-[160px] text-snow"
        style={{ marginTop: -HEADER_H }}
      >
        <img
          src={activeBrokerage.home.hero.image}
          alt={activeBrokerage.home.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,23,26,0.95) 0%, rgba(31,35,38,0.82) 55%, rgba(180,1,1,0.2) 100%)",
          }}
        />

        <div className="container-kw relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-kw-red-bright" />
              <span className="type-label text-kw-red-bright">
                {aboutPage.hero.eyebrow}
              </span>
            </div>

            <h1 className="type-display-xl mt-6 text-white">
              <SplitChars
                text={aboutPage.hero.headline}
                delay={0.15}
                stagger={0.025}
              />
            </h1>

            <p className="type-lead mt-5 text-stone-dark">
              {aboutPage.hero.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* §8.2 What We Believe (Cool Sky Mist + High-Contrast Mission/Vision Bento) */}
      <section className="bg-mist py-24 text-ink md:py-32">
        <div className="container-kw">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    01
                  </span>
                  <span className="type-label text-kw-red">What We Believe</span>
                </div>
              </Reveal>
              <h2 className="type-display-lg mt-5 text-ink">
                <SplitWords text="MISSION, VISION & CORE VALUES." />
              </h2>
            </div>

            {/* Quiet values line: God. Family. Then Business. (§8.2) */}
            <Reveal delay={0.15}>
              <div className="rounded-full border border-ink/15 bg-white px-5 py-2 text-xs font-semibold tracking-[0.16em] text-charcoal shadow-sm">
                {aboutPage.beliefs.valuesLine}
              </div>
            </Reveal>
          </div>

          {/* Mission & Vision Split Cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.1} y={20}>
              <SpotlightCard
                enableTilt
                maxTilt={3}
                className="flex h-full flex-col justify-between rounded-3xl bg-ink p-8 text-snow shadow-lift md:p-12"
              >
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-kw-red px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    <Target className="h-3.5 w-3.5" />
                    Our Mission
                  </span>
                  <p className="mt-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
                    {aboutPage.beliefs.mission}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.18} y={20}>
              <SpotlightCard
                enableTilt
                maxTilt={3}
                spotlightColor="rgba(180, 1, 1, 0.1)"
                borderGlowColor="rgba(180, 1, 1, 0.6)"
                className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-8 text-ink shadow-lift md:p-12"
              >
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-kw-red">
                    <Sparkles className="h-3.5 w-3.5" />
                    Our Vision
                  </span>
                  <p className="mt-6 text-xl font-semibold leading-relaxed text-ink md:text-2xl">
                    {aboutPage.beliefs.vision}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* 5 Core Values Strip */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {aboutPage.beliefs.coreValues.map((val, idx) => (
              <Reveal key={val} delay={0.05 * idx} y={16}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
                  <span className="text-xs font-bold text-kw-red">
                    0{idx + 1}
                  </span>
                  <p className="mt-4 text-base font-bold text-ink">{val}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §8.3 Timeline (Dark Slate Section) */}
      <section className="bg-ink py-24 text-snow md:py-32">
        <div className="container-kw">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/35 bg-kw-red/10 px-3.5 py-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                02
              </span>
              <span className="type-label text-kw-red-bright">Our History</span>
            </div>
          </Reveal>
          <h2 className="type-display-lg mt-5 text-white">
            <SplitWords text="ROOTED IN LAYTON SINCE 1997." />
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aboutPage.timeline.map((item, idx) => (
              <Reveal key={item.year} delay={0.08 * idx} y={20}>
                <SpotlightCard className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-card/80 p-7">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-kw-red px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                        {item.year}
                      </span>
                      <span className="font-mono text-xs font-bold text-stone-dark">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-snow/90">
                      {item.body}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §8.4 Leadership Team (Cool Sky Mist Section — All 9 Leaders in Spec Order) */}
      <section id="leadership" className="bg-mist py-24 text-ink md:py-32">
        <div className="container-kw">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    03
                  </span>
                  <span className="type-label text-kw-red">
                    Leadership Team
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-lg mt-5 text-ink">
                <SplitWords text="THE LEADERS WHO SERVE OUR AGENTS." />
              </h2>
            </div>

            <Reveal delay={0.15}>
              <p className="type-body max-w-md text-charcoal">
                Real people in our Layton Market Center dedicated to coaching,
                supporting, and championing every agent and client.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.leadership.map((leader, idx) => {
              const isOpen = Boolean(expandedBio[leader.name]);
              return (
                <Reveal key={leader.name} delay={0.05 * idx} y={24}>
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card transition-all duration-300 hover:border-kw-red/50">
                    {/* Consistent 4:5 Portrait Framing (§8.4) */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-103"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/40 to-transparent p-6 pt-16 text-snow">
                        <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-kw-red-bright">
                          {leader.title}
                        </span>
                        <h3 className="mt-1 text-2xl font-bold text-white">
                          {leader.name}
                        </h3>
                      </div>
                    </div>

                    {/* Bio & Contact Details */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p
                          className={
                            isOpen
                              ? "text-sm leading-relaxed text-charcoal"
                              : "line-clamp-3 text-sm leading-relaxed text-charcoal"
                          }
                        >
                          {leader.bio}
                        </p>
                        <button
                          type="button"
                          onClick={() => toggleBio(leader.name)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-kw-red hover:text-ink"
                        >
                          <span>{isOpen ? "Read Less" : "Read Bio"}</span>
                          {isOpen ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-xs">
                        {leader.email && (
                          <a
                            href={`mailto:${leader.email}`}
                            className="flex items-center gap-2 font-medium text-ink transition-colors hover:text-kw-red"
                          >
                            <Mail className="h-3.5 w-3.5 text-kw-red" />
                            <span className="truncate">{leader.email}</span>
                          </a>
                        )}

                        {leader.phone && (
                          <a
                            href={`tel:${leader.phone.replace(/[^0-9]/g, "")}`}
                            className="flex items-center gap-2 font-medium text-charcoal transition-colors hover:text-kw-red"
                          >
                            <Phone className="h-3.5 w-3.5 text-kw-red" />
                            <span>{leader.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Market Center Operations & Agent Support Team (from Updated Leadership Bio Doc) */}
          <div className="mt-16 rounded-3xl border border-ink/10 bg-white p-8 shadow-card md:p-10">
            <div className="flex flex-col justify-between gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-end">
              <div>
                <span className="type-label text-kw-red">
                  Operations &amp; Agent Services
                </span>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Market Center Support Team
                </h3>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-charcoal">
                From compliance review to front-desk hospitality and virtual
                leverage, our support staff keeps every transaction moving
                smoothly.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUPPORT_STAFF.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-mist/55 p-5 transition-colors hover:border-kw-red/40"
                >
                  <div>
                    <span className="block text-[0.64rem] font-bold uppercase tracking-[0.16em] text-kw-red">
                      {member.title}
                    </span>
                    <h4 className="mt-1 text-base font-bold text-ink">
                      {member.name}
                    </h4>
                  </div>
                  <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-3 text-xs">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 font-medium text-ink transition-colors hover:text-kw-red"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-kw-red" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a
                      href={`tel:${member.phone.replace(/[^0-9]/g, "")}`}
                      className="flex items-center gap-2 font-medium text-charcoal transition-colors hover:text-kw-red"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-kw-red" />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §8.4b Inside Our Layton Market Center (10 New Office Photos) */}
      <OfficeTourShowcase tone="dark" />

      {/* §8.4c Life, Awards & Community Stories Gallery (Awards Breakfast, Team Meetings, Santa, Trunk or Treat, Office Parties) */}
      <CultureGallery tone="light" />

      {/* §8.5 Community + §8.6 Backed by Keller Williams (Dark Slate Section) */}
      <section className="bg-ink py-24 text-snow md:py-32">
        <div className="container-kw">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* §8.5 Community: Giving Back Where We Live */}
            <SpotlightCard className="rounded-3xl border border-white/10 bg-slate-card p-8 md:p-12 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-kw-red px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  <Heart className="h-3.5 w-3.5" />
                  Community Impact
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold text-stone-dark">
                  Weber · Davis · Morgan Counties
                </span>
              </div>

              <h2 className="type-display-md mt-6 text-white">
                {aboutPage.community.headline}
              </h2>
              <p className="type-body mt-4 leading-relaxed text-stone-dark">
                {aboutPage.community.body}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {COMMUNITY_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-ink-deep p-5"
                  >
                    <div>
                      <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-kw-red-bright">
                        {card.subtitle}
                      </span>
                      <h3 className="mt-1 text-sm font-bold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-dark">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            {/* §8.6 Backed by Keller Williams */}
            <SpotlightCard className="flex flex-col justify-between rounded-3xl border border-white/10 bg-ink-deep p-8 md:p-12 lg:col-span-5">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-stone-dark">
                  <Shield className="h-3.5 w-3.5 text-kw-red-bright" />
                  Global Reach, Local Ownership
                </span>
                <h3 className="type-display-md mt-6 text-white">
                  {aboutPage.backedByKw.headline}
                </h3>
                <p className="type-body mt-4 leading-relaxed text-stone-dark">
                  {aboutPage.backedByKw.body}
                </p>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href={aboutPage.backedByKw.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-kw-red-bright transition-colors hover:text-white"
                >
                  <span>{aboutPage.backedByKw.linkLabel}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </SpotlightCard>
          </div>

          {/* §8.7 CTA: Find Your Agent · Join KW Success */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-ink-deep via-slate-card to-ink-deep p-10 text-center md:p-14">
            <h2 className="type-display-md text-white">
              READY TO WRITE YOUR SUCCESS STORY?
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={externalLinks.findAgentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
              >
                <span>Find Your Agent</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </a>

              <Link
                to="/agents"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-ink"
              >
                <Users className="h-4 w-4 text-kw-red-bright" />
                <span>Join KW Success</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
