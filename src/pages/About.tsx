import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  HeartHandshake,
  Mail,
  Phone,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import type { LeadershipMember } from "@/brokerages/types";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";

/**
 * §8 About (/about)
 * - §8.1 Hero: OUR STORY. | Locally led since 1997. Backed by Keller Williams.
 * - §8.2 What we believe: Mission, Vision, Core Values, and small quiet line "God. Family. Then Business."
 * - §8.3 Timeline: 1997 · KW Success opens in Layton + config milestones with [PLACEHOLDER]
 * - §8.4 Leadership team: 9 members in exact table order, uniform aspect ratio & framing, expandable bio, email/phone, [PLACEHOLDER] tags where needed
 * - §8.5 Community: GIVING BACK WHERE WE LIVE. (KW Success Cares, KW Cares, RED Day, group service projects + [PLACEHOLDER] event photos)
 * - §8.6 Backed by Keller Williams: short paragraph + link to kw.com
 * - §8.7 CTA: Find Your Agent · Join KW Success
 */

function LeaderCard({ member, index }: { member: LeadershipMember; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Reveal delay={0.05 * index} y={24}>
      <div className="group flex h-full flex-col border hairline-light bg-white shadow-sm transition-shadow duration-300 hover:shadow-lift">
        {/* Uniform 4:5 portrait crop so all 9 headshots (including non-KW bg) match cleanly (§8.4) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist">
          <img
            src={member.photo}
            alt={`${member.name} — ${member.title}, KW Success Keller Williams Realty`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-kw-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
          <div>
            <h3 className="text-[1.18rem] font-semibold text-kw-ink">
              {member.name}
            </h3>
            <p className="mt-1 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-kw-red">
              {member.title}
            </p>

            {/* Contact info */}
            <div className="mt-4 flex flex-col gap-1.5 border-t hairline-light pt-3.5 text-[0.84rem] text-charcoal">
              {member.isPlaceholderContact ? (
                <div className="flex flex-wrap items-center gap-2 py-1">
                  <SampleChip label="PLACEHOLDER: Email & Phone Coming" />
                </div>
              ) : (
                <>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 truncate transition-colors hover:text-kw-red"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-kw-red" />
                    <span className="truncate">{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-kw-red"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-kw-red" />
                    <span>{member.phone}</span>
                  </a>
                </>
              )}
            </div>

            {/* Bio preview / expandable (§8.4) */}
            <div className="mt-4">
              {member.isPlaceholderBio ? (
                <div className="py-1">
                  <SampleChip label="PLACEHOLDER: Bio Coming" />
                </div>
              ) : (
                <>
                  <p className="type-body-sm text-charcoal">
                    {expanded
                      ? member.bio
                      : `${member.bio.slice(0, 145).trim()}…`}
                  </p>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>

          {!member.isPlaceholderBio && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="mt-4 inline-flex items-center gap-1.5 self-start text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-kw-ink transition-colors hover:text-kw-red"
            >
              <span>{expanded ? "Read Less" : "Read Full Bio"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-kw-red transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  const { aboutPage, externalLinks } = activeBrokerage;

  return (
    <>
      {/* §8.1 Hero */}
      <section
        className="relative flex min-h-[52vh] flex-col items-center justify-center overflow-hidden bg-kw-ink text-white"
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
              {aboutPage.hero.eyebrow}
            </span>
            <span className="h-0.5 w-10 bg-kw-red" />
          </motion.div>

          <h1 className="type-display-lg mt-7 max-w-4xl text-white">
            <SplitWords
              text={aboutPage.hero.headline}
              stagger={0.05}
              delay={0.3}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.75 }}
            className="type-lead mt-6 max-w-2xl text-white/85"
          >
            {aboutPage.hero.subhead}
          </motion.p>
        </div>
      </section>

      {/* §8.2 What we believe */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram">
          <div className="text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red">WHAT WE BELIEVE</span>
                <span className="h-0.5 w-10 bg-kw-red" />
              </div>
            </Reveal>
            <h2 className="type-display-md mt-5 text-kw-ink">
              Mission, Vision &amp; Core Values.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <Reveal delay={0.1} y={24}>
              <div className="flex h-full flex-col border hairline-light bg-white p-8 shadow-sm md:p-12">
                <span className="type-label text-kw-red">Our Mission</span>
                <span className="mt-3 block h-0.5 w-12 bg-kw-red" />
                <p className="type-lead mt-6 text-kw-ink">
                  {aboutPage.beliefs.mission}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} y={24}>
              <div className="flex h-full flex-col border hairline-light bg-white p-8 shadow-sm md:p-12">
                <span className="type-label text-kw-red">Our Vision</span>
                <span className="mt-3 block h-0.5 w-12 bg-kw-red" />
                <p className="type-lead mt-6 text-kw-ink">
                  {aboutPage.beliefs.vision}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Core values bar */}
          <Reveal delay={0.25}>
            <div className="mt-10 border hairline-light bg-mist p-8 text-center md:p-10">
              <p className="type-label text-kw-red">Core Values</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {aboutPage.beliefs.coreValues.map((val, i) => (
                  <span
                    key={val}
                    className="flex items-center gap-6 text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-kw-ink"
                  >
                    {i > 0 && (
                      <span className="text-kw-red" aria-hidden>
                        ·
                      </span>
                    )}
                    <span>{val}</span>
                  </span>
                ))}
              </div>

              {/* §8.2 Values line (small, quiet): God. Family. Then Business. */}
              <p className="mt-8 text-[0.78rem] font-normal tracking-[0.18em] text-kw-gray">
                {aboutPage.beliefs.valuesLine}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §8.4 Leadership Team (9 members in exact table order) */}
      <section id="leadership" className="border-t hairline-light bg-mist py-24 md:py-32">
        <div className="container-monogram">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red">LEADERSHIP TEAM</span>
              </div>
            </Reveal>
            <h2 className="type-display-md mt-5 text-kw-ink">
              The People Behind Our Agents.
            </h2>
            <Reveal delay={0.15}>
              <p className="type-body mt-4 text-charcoal">
                Locally led in Layton by leaders who coach, support, and invest in every agent at every stage.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.leadership.map((member, i) => (
              <LeaderCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* §8.3 Timeline */}
      <section className="bg-kw-ink py-24 text-white md:py-32">
        <div className="container-monogram">
          <div className="text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red-bright">TIMELINE</span>
                <span className="h-0.5 w-10 bg-kw-red" />
              </div>
            </Reveal>
            <h2 className="type-display-md mt-5 text-white">
              Nearly Three Decades in Northern Utah.
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl divide-y divide-white/15 border-y border-white/15">
            {aboutPage.timeline.map((item, i) => (
              <Reveal key={item.year} delay={0.08 * i} y={18}>
                <div className="grid gap-4 py-8 sm:grid-cols-[150px_1fr] sm:items-baseline sm:gap-8">
                  <span className="text-[1.45rem] font-semibold tracking-[0.04em] text-kw-red-bright">
                    {item.year}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="type-body text-white/90">{item.body}</p>
                    {item.isPlaceholder && (
                      <SampleChip
                        label="PLACEHOLDER"
                        className="border-white/40 bg-white/10 text-white"
                      />
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §8.5 Community: Giving Back Where We Live */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-0.5 w-10 bg-kw-red" />
                  <span className="type-label text-kw-red">
                    {aboutPage.community.eyebrow}
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-md mt-5 text-kw-ink">
                <SplitWords text={aboutPage.community.headline} />
              </h2>
              <Reveal delay={0.15}>
                <p className="type-lead mt-5 text-charcoal">
                  {aboutPage.community.body}
                </p>
              </Reveal>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {aboutPage.community.initiatives.map((init) => (
                  <div
                    key={init}
                    className="flex items-center gap-3 border hairline-light bg-white p-4 shadow-sm"
                  >
                    <HeartHandshake
                      className="h-5 w-5 shrink-0 text-kw-red"
                      strokeWidth={1.6}
                    />
                    <span className="text-[0.88rem] font-semibold text-kw-ink">
                      {init}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event photos placeholder grid (§8.5) */}
            <Reveal delay={0.2} y={24}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "RED Day Service Project",
                  "KW Success Cares Event",
                  "Community Food & Coat Drive",
                  "Northern Utah Group Service",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex aspect-[4/3] flex-col items-center justify-center border border-dashed border-charcoal/25 bg-mist p-5 text-center"
                  >
                    <SampleChip label="PLACEHOLDER" />
                    <span className="mt-3 text-[0.78rem] font-medium text-charcoal">
                      {label}
                    </span>
                    <span className="mt-1 text-[0.7rem] text-kw-gray">
                      Event photo coming
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* §8.6 Backed by Keller Williams */}
      <section className="border-t hairline-light bg-mist py-20">
        <div className="container-monogram mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="type-label text-kw-red">
              {aboutPage.backedByKw.eyebrow}
            </span>
            <h2 className="type-display-md mt-4 text-kw-ink">
              {aboutPage.backedByKw.headline}
            </h2>
            <p className="type-body mx-auto mt-4 max-w-2xl text-charcoal">
              {aboutPage.backedByKw.body}
            </p>
            <a
              href={aboutPage.backedByKw.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="type-label mt-6 inline-flex items-center gap-2 text-kw-red transition-colors hover:text-kw-ink"
            >
              {aboutPage.backedByKw.linkLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* §8.7 CTA: Find Your Agent · Join KW Success */}
      <section className="border-t hairline-light bg-white py-24">
        <div className="container-monogram text-center">
          <h2 className="type-display-md text-kw-ink">
            Start Your Relationship With KW Success.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={externalLinks.findAgentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-kw-red px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-kw-red-bright"
            >
              Find Your Agent <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/agents"
              className="inline-flex items-center gap-2 border-2 border-kw-ink bg-white px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-kw-ink transition-colors hover:bg-kw-ink hover:text-white"
            >
              Join KW Success <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
