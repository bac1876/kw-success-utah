import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Laptop,
  LayoutGrid,
  Mail,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import ThreePillars from "@/components/ThreePillars";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { submitLeadForm } from "@/lib/leads";

/**
 * §6 For Agents (/agents) — Primary audience.
 * - §6.1 Hero: BUILD A BUSINESS THAT FUNDS YOUR LIFE BY DESIGN.
 * - §6.2 Why KW Success (four promises): four cards
 * - §6.3 What makes us different: four comparison lines
 * - §5.4 reuse: Three Pillars in Agent terms only (mode="agents")
 * - §6.4 Become a Trusted Advisor
 * - §6.5 What every agent gets: 9 tiles + Launch productivity coaching callout for new agents
 * - §6.6 Find your path: 3 columns
 * - §6.7 Agent stories: hidden by flag showAgentStories=false
 * - §6.8 CTA: Talk to Russie (confidential conversation form with name, email, phone, current brokerage (optional), years licensed, message)
 * - Rule: No economics anywhere on the public site: no splits, caps or fees.
 */

const TILE_ICONS = [
  Users,
  Building2,
  HeartHandshake,
  GraduationCap,
  Bot,
  Compass,
  Sparkles,
  Laptop,
  LayoutGrid,
];

export default function Agents() {
  const { agentsPage, flags } = activeBrokerage;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentBrokerage, setCurrentBrokerage] = useState("");
  const [yearsLicensed, setYearsLicensed] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || submitting) return;
    setSubmitting(true);
    await submitLeadForm({
      topic: "I'm an agent",
      name,
      email,
      phone,
      currentBrokerage,
      yearsLicensed,
      message,
      sourcePage: "/agents",
      honeypot,
    });
    setSubmitting(false);
    setDone(true);
  };

  const scrollToForm = () => {
    document
      .getElementById("talk-to-russie")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const inputCls =
    "w-full border hairline-light bg-snow px-4 py-3.5 text-[0.95rem] text-kw-ink outline-none transition-colors placeholder:text-kw-gray focus:border-kw-red";

  return (
    <>
      {/* §6.1 Hero */}
      <section
        className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-kw-ink text-white"
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
              {agentsPage.hero.eyebrow}
            </span>
            <span className="h-0.5 w-10 bg-kw-red" />
          </motion.div>

          <h1 className="type-display-lg mt-7 max-w-4xl text-white text-balance">
            <SplitWords
              text={agentsPage.hero.headline}
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
            {agentsPage.hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.65 }}
            className="mt-10"
          >
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2.5 bg-kw-red px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-kw-red-bright"
            >
              Talk to Russie <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* §6.2 Why KW Success (four promises) */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-0.5 w-10 bg-kw-red" />
              <span className="type-label text-kw-red">WHY KW SUCCESS</span>
            </div>
          </Reveal>
          <h2 className="type-display-md mt-5 text-kw-ink">
            Four Promises to Every Agent.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agentsPage.whyPromises.map((card, i) => (
              <Reveal key={card.title} delay={0.08 * i} y={28}>
                <div className="flex h-full flex-col justify-between border hairline-light bg-white p-8 shadow-sm transition-shadow hover:shadow-lift">
                  <div>
                    <span className="inline-flex h-8 w-8 items-center justify-center bg-kw-red text-[0.75rem] font-semibold text-white">
                      0{i + 1}
                    </span>
                    <h3 className="mt-6 text-[1.1rem] font-semibold leading-snug text-kw-ink">
                      {card.title}
                    </h3>
                    <p className="type-body-sm mt-3 text-charcoal">
                      {card.body}
                    </p>
                  </div>
                  <span className="mt-6 block h-0.5 w-10 bg-kw-red" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §6.3 What makes us different */}
      <section className="border-y hairline-light bg-mist py-24 md:py-32">
        <div className="container-monogram">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-0.5 w-10 bg-kw-red" />
                  <span className="type-label text-kw-red">
                    OUR OPERATING STANDARD
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-md mt-5 text-kw-ink">
                What Makes Us Different.
              </h2>
              <Reveal delay={0.15}>
                <p className="type-body mt-5 text-charcoal">
                  Built in Layton for Northern Utah agents who want real coaching, real community, and real leverage.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col divide-y hairline-light border hairline-light bg-white px-6 shadow-sm md:px-10">
              {agentsPage.differences.map((d, i) => (
                <Reveal key={d.bold} delay={0.08 * i} y={16}>
                  <div className="flex items-start gap-4 py-6">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-kw-red"
                      strokeWidth={1.75}
                    />
                    <p className="type-body text-charcoal">
                      <strong className="font-semibold text-kw-ink">
                        {d.bold}
                      </strong>{" "}
                      {d.rest}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §5.4 Reuse: Three Pillars in Agent terms only */}
      <ThreePillars mode="agents" />

      {/* §6.4 Become a Trusted Advisor */}
      <section className="bg-kw-ink py-24 text-white md:py-32">
        <div className="container-monogram text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-0.5 w-10 bg-kw-red" />
              <span className="type-label text-kw-red-bright">
                {agentsPage.trustedAdvisor.eyebrow}
              </span>
              <span className="h-0.5 w-10 bg-kw-red" />
            </div>
          </Reveal>
          <h2 className="type-display-lg mx-auto mt-7 max-w-3xl text-white">
            <SplitWords text={agentsPage.trustedAdvisor.headline} />
          </h2>
          <Reveal delay={0.2}>
            <p className="type-lead mx-auto mt-8 max-w-3xl text-white/85 text-balance">
              {agentsPage.trustedAdvisor.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* §6.5 What every agent gets */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red">
                  WHAT EVERY AGENT GETS
                </span>
              </div>
            </Reveal>
            <h2 className="type-display-md mt-5 text-kw-ink">
              Tools, Leadership, and Support Built Around You.
            </h2>
            <Reveal delay={0.15}>
              <p className="type-lead mt-4 text-charcoal">
                {agentsPage.whatEveryAgentGetsIntro}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agentsPage.whatEveryAgentGets.map((tile, i) => {
              const Icon = TILE_ICONS[i % TILE_ICONS.length];
              return (
                <Reveal key={tile.title} delay={0.05 * i} y={20}>
                  <div className="flex h-full flex-col border hairline-light bg-white p-7 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-mist text-kw-red">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                      {tile.badge && (
                        <span className="border border-kw-red/40 bg-kw-red/5 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-kw-red">
                          {tile.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-5 text-[1.02rem] font-semibold text-kw-ink">
                      {tile.title}
                    </h3>
                    <p className="type-body-sm mt-2 text-charcoal">
                      {tile.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* For new agents callout (§6.5) */}
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col justify-between gap-6 border-l-4 border-kw-red bg-mist p-8 md:flex-row md:items-center md:p-10">
              <div>
                <span className="type-label text-kw-red">
                  {agentsPage.newAgentsCallout.label}
                </span>
                <h3 className="mt-2 text-[1.2rem] font-semibold text-kw-ink">
                  {agentsPage.newAgentsCallout.title}
                </h3>
                <p className="type-body mt-1 text-charcoal">
                  {agentsPage.newAgentsCallout.body}
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToForm}
                className="shrink-0 bg-kw-red px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-kw-red-bright"
              >
                Ask About Launch Coaching
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §6.6 Find your path */}
      <section className="border-t hairline-light bg-mist py-24 md:py-32">
        <div className="container-monogram">
          <div className="text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red">FIND YOUR PATH</span>
                <span className="h-0.5 w-10 bg-kw-red" />
              </div>
            </Reveal>
            <h2 className="type-display-md mt-5 text-kw-ink">
              Wherever You Are in Your Career, We Meet You There.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {agentsPage.findYourPath.map((stage, i) => (
              <Reveal key={stage.title} delay={0.1 * i} y={24}>
                <div className="flex h-full flex-col justify-between border hairline-light bg-white p-8 shadow-sm md:p-10">
                  <div>
                    <TrendingUp
                      className="h-6 w-6 text-kw-red"
                      strokeWidth={1.75}
                    />
                    <h3 className="type-display-md mt-6 text-kw-ink">
                      {stage.title}
                    </h3>
                    <p className="type-body mt-3 text-charcoal">{stage.body}</p>
                  </div>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="type-label mt-8 inline-flex items-center gap-2 text-kw-red transition-colors hover:text-kw-ink"
                  >
                    Start the Conversation <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §6.7 Agent stories (hidden by flag showAgentStories=false until real) */}
      {flags.showAgentStories && (
        <section className="bg-snow py-20">
          <div className="container-monogram text-center">
            <p className="type-label text-kw-red">Agent Stories</p>
          </div>
        </section>
      )}

      {/* §6.8 CTA: Talk to Russie */}
      <section
        id="talk-to-russie"
        className="scroll-mt-24 border-t hairline-light bg-snow py-24 md:py-32"
      >
        <div className="container-monogram grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red">TALK TO RUSSIE</span>
              </div>
            </Reveal>

            <h2 className="type-display-md mt-6 text-kw-ink">
              <SplitWords text={agentsPage.cta.headline} />
            </h2>

            <Reveal delay={0.15}>
              <p className="type-lead mt-5 text-charcoal">
                {agentsPage.cta.body}
              </p>
            </Reveal>

            {/* Russie Edwards card */}
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-col gap-5 border hairline-light bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <img
                  src={agentsPage.cta.leaderPhoto}
                  alt={agentsPage.cta.leaderName}
                  className="h-24 w-24 shrink-0 object-cover object-top"
                />
                <div>
                  <h3 className="text-[1.1rem] font-semibold text-kw-ink">
                    {agentsPage.cta.leaderName}
                  </h3>
                  <p className="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-kw-red">
                    {agentsPage.cta.leaderTitle}
                  </p>
                  <div className="mt-3 flex flex-col gap-1.5 text-[0.86rem] text-charcoal">
                    <a
                      href={`mailto:${agentsPage.cta.leaderEmail}`}
                      className="inline-flex items-center gap-2 hover:text-kw-red"
                    >
                      <Mail className="h-3.5 w-3.5 text-kw-red" />
                      {agentsPage.cta.leaderEmail}
                    </a>
                    <a
                      href={`tel:${agentsPage.cta.leaderPhone.replace(/\D/g, "")}`}
                      className="inline-flex items-center gap-2 hover:text-kw-red"
                    >
                      <Phone className="h-3.5 w-3.5 text-kw-red" />
                      {agentsPage.cta.leaderPhone}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form fields (§6.8): name, email, phone, current brokerage (optional), years licensed, message */}
          <Reveal delay={0.2} y={24}>
            <div className="border hairline-light bg-white p-8 shadow-lift md:p-12">
              {done ? (
                <div className="py-12 text-center">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-kw-red text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h3 className="type-display-md mt-6 text-kw-ink">
                    Thank you, {name.trim().split(" ")[0]}.
                  </h3>
                  <p className="type-body mx-auto mt-3 max-w-md text-charcoal">
                    Your confidential message has been routed directly to{" "}
                    <strong>{agentsPage.cta.leaderName}</strong> (
                    {agentsPage.cta.leaderEmail}). She will reach out to you personally.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Honeypot spam protection (§11) */}
                  <input
                    type="text"
                    name="website_url_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Name *
                      </label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(801) 555-0199"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Current Brokerage
                      </label>
                      <input
                        value={currentBrokerage}
                        onChange={(e) => setCurrentBrokerage(e.target.value)}
                        placeholder="Optional"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Years Licensed
                      </label>
                      <select
                        value={yearsLicensed}
                        onChange={(e) => setYearsLicensed(e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select…</option>
                        <option value="New / Getting Licensed">
                          New / Getting Licensed
                        </option>
                        <option value="1–2 years">1–2 years</option>
                        <option value="3–5 years">3–5 years</option>
                        <option value="6–10 years">6–10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="type-label mb-2 block text-kw-ink">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What does your next chapter look like?"
                      className={inputCls}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-kw-red px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-kw-red-bright disabled:opacity-60"
                    >
                      {submitting
                        ? "Sending…"
                        : "Book a Confidential Conversation"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <span className="text-[0.76rem] text-kw-gray">
                      100% confidential · Routes directly to Russie Edwards
                    </span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
