import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Layers,
  Mail,
  Phone,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import ThreePillars from "@/components/ThreePillars";
import FourPromisesShowcase from "@/components/FourPromisesShowcase";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import SplitChars from "@/components/motion/SplitChars";
import CultureGallery from "@/components/CultureGallery";
import { submitLeadForm } from "@/lib/leads";

const TILE_ICONS = [
  Users,
  Building2,
  HeartHandshake,
  GraduationCap,
  Bot,
  Sparkles,
  Compass,
  Laptop,
  Layers,
];

export default function Agents() {
  const { agentsPage } = activeBrokerage;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentBrokerage, setCurrentBrokerage] = useState("");
  const [yearsLicensed, setYearsLicensed] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedTo, setSubmittedTo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    const res = await submitLeadForm({
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
    if (res.ok) {
      setSubmittedTo(`${res.routedToName} (${res.routedToEmail})`);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("talk-to-russie");
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -HEADER_H });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-ink-deep px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-stone-dark focus:border-kw-red";

  return (
    <>
      {/* §6.1 Hero (Dark Architectural Slate + Wasatch Backdrop) */}
      <section
        className="relative flex min-h-[78dvh] items-center overflow-hidden bg-ink-deep pb-20 pt-[160px] text-snow"
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
              "linear-gradient(135deg, rgba(20,23,26,0.96) 0%, rgba(31,35,38,0.82) 55%, rgba(180,1,1,0.22) 100%)",
          }}
        />

        <div className="container-kw relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-kw-red-bright" />
              <span className="type-label text-kw-red-bright">
                {agentsPage.hero.eyebrow}
              </span>
            </div>

            <h1 className="type-display-xl mt-6 text-white text-balance">
              <SplitChars
                text={agentsPage.hero.headline}
                delay={0.15}
                stagger={0.015}
              />
            </h1>

            <p className="type-lead mt-6 max-w-2xl text-stone-dark">
              {agentsPage.hero.subhead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lift-dark transition-all hover:bg-kw-red-bright"
              >
                <span>Talk to Russie</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>

              <Link
                to="/about#leadership"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-ink"
              >
                Meet Our Leadership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §6.2 Why KW Success (Four Promises — Interactive Moving Graphic Interface) */}
      <FourPromisesShowcase />

      {/* §6.3 What Makes Us Different + §6.4 Become a Trusted Advisor (Dark Slate) */}
      <section className="bg-ink py-24 text-snow md:py-32">
        <div className="container-kw">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: §6.3 Four Comparison Lines */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/35 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    02
                  </span>
                  <span className="type-label text-kw-red-bright">
                    What Makes Us Different
                  </span>
                </div>
              </Reveal>

              <h2 className="type-display-lg mt-5 text-white">
                <SplitWords text="BUILT FOR DEPTH, NOT VOLUME." />
              </h2>

              <div className="mt-10 space-y-4">
                {agentsPage.differences.map((diff, idx) => (
                  <Reveal key={diff.bold} delay={0.06 * idx} y={16}>
                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-card/70 p-6 transition-colors hover:border-kw-red/60">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kw-red text-xs font-extrabold text-white">
                        0{idx + 1}
                      </span>
                      <p className="text-base leading-relaxed text-stone-dark">
                        <strong className="font-bold text-white">
                          {diff.bold}
                        </strong>{" "}
                        {diff.rest}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right: §6.4 Become a Trusted Advisor Card */}
            <div className="lg:col-span-5 lg:self-center">
              <Reveal delay={0.2}>
                <div className="relative overflow-hidden rounded-3xl border-2 border-kw-red bg-gradient-to-b from-slate-card to-ink-deep p-8 shadow-lift-dark md:p-10">
                  <span className="type-label text-kw-red-bright">
                    {agentsPage.trustedAdvisor.eyebrow}
                  </span>
                  <h3 className="type-display-md mt-4 text-white">
                    {agentsPage.trustedAdvisor.headline}
                  </h3>
                  <p className="type-body mt-5 leading-relaxed text-stone-dark">
                    {agentsPage.trustedAdvisor.body}
                  </p>
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-kw-red-bright"
                    >
                      <span>Start the Conversation</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kw-red text-white transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* §5.4 Agent Three Pillars (Cool Sky Mist Section — Agent Pillars Only) */}
      <ThreePillars mode="agents" tone="light" />

      {/* §6.5 What Every Agent Gets (Deep Slate 9-Tile Bento Grid + Launch Coaching) */}
      <section className="bg-ink-deep py-24 text-snow md:py-32">
        <div className="container-kw">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/35 bg-kw-red/10 px-3.5 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                  04
                </span>
                <span className="type-label text-kw-red-bright">
                  Tools, Coaching &amp; Support
                </span>
              </div>
            </Reveal>

            <h2 className="type-display-lg mt-5 text-white">
              <SplitWords text="WHAT EVERY AGENT GETS." />
            </h2>
            <p className="type-lead mt-4 text-stone-dark">
              {agentsPage.whatEveryAgentGetsIntro}
            </p>
          </div>

          {/* 9 Tiles Grid */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agentsPage.whatEveryAgentGets.map((tile, idx) => {
              const Icon = TILE_ICONS[idx % TILE_ICONS.length];
              return (
                <Reveal key={tile.title} delay={0.04 * idx} y={20}>
                  <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-ink p-7 transition-all duration-300 hover:border-kw-red/60 hover:bg-slate-card">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-kw-red/15 text-kw-red-bright group-hover:bg-kw-red group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        {tile.badge && (
                          <span className="rounded-full border border-kw-red/40 bg-kw-red/15 px-3 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-kw-red-bright">
                            {tile.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-white">
                        {tile.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-dark">
                        {tile.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* §6.5 New Agents Callout: Launch Productivity Coaching */}
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl border border-kw-red/50 bg-gradient-to-r from-kw-red/20 via-ink to-ink p-8 sm:flex-row sm:items-center md:p-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-kw-red text-white">
                  <Rocket className="h-6 w-6" />
                </span>
                <div>
                  <span className="type-label text-kw-red-bright">
                    {agentsPage.newAgentsCallout.label}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    {agentsPage.newAgentsCallout.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-dark">
                    {agentsPage.newAgentsCallout.body}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={scrollToForm}
                className="shrink-0 rounded-full bg-kw-red px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-kw-red-bright"
              >
                Ask About Launch Coaching
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §6.6 Find Your Path (Cool Sky Mist 3-Column Section) */}
      <section className="bg-mist py-24 text-ink md:py-32">
        <div className="container-kw">
          <div className="text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                  05
                </span>
                <span className="type-label text-kw-red">Find Your Path</span>
              </div>
            </Reveal>
            <h2 className="type-display-lg mx-auto mt-5 max-w-3xl text-ink">
              <SplitWords text="WHEREVER YOU ARE IN YOUR CAREER." />
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {agentsPage.findYourPath.map((stage, idx) => (
              <Reveal key={stage.title} delay={0.08 * idx} y={24}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-8 shadow-card md:p-10">
                  <div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-xs font-bold text-white">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-6 text-2xl font-bold text-ink">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-base text-charcoal">{stage.body}</p>
                  </div>
                  <div className="mt-8 border-t border-ink/10 pt-5">
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-kw-red transition-colors hover:text-ink"
                    >
                      <span>Talk to Russie About This Path</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §6.7 Culture, Awards & Training in Action */}
      <CultureGallery
        tone="dark"
        eyebrow="06 · Culture, Recognition & Training"
        headline="SEE OUR MARKET CENTER IN ACTION."
        subhead="Real moments from our annual Awards Breakfast, mastermind Team Meetings, and family events in Layton."
      />

      {/* §6.8 CTA: Talk to Russie (Dark Slate Split Form) */}
      <section
        id="talk-to-russie"
        className="bg-ink py-24 text-snow md:py-32"
      >
        <div className="container-kw">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Left: Russie Edwards Card */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/35 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    07
                  </span>
                  <span className="type-label text-kw-red-bright">
                    Confidential Conversation
                  </span>
                </div>
              </Reveal>

              <h2 className="type-display-md mt-5 text-white text-balance">
                {agentsPage.cta.headline}
              </h2>
              <p className="type-body mt-4 text-stone-dark">
                {agentsPage.cta.body}
              </p>

              {/* Russie Edwards Profile Card */}
              <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-ink-deep p-6 shadow-lift-dark">
                <div className="flex items-center gap-5">
                  <img
                    src={agentsPage.cta.leaderPhoto}
                    alt={agentsPage.cta.leaderName}
                    className="h-24 w-24 rounded-2xl object-cover object-top"
                  />
                  <div>
                    <span className="type-label text-kw-red-bright">
                      Your Point of Contact
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-white">
                      {agentsPage.cta.leaderName}
                    </h3>
                    <p className="text-sm text-stone-dark">
                      {agentsPage.cta.leaderTitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                  <a
                    href={`mailto:${agentsPage.cta.leaderEmail}`}
                    className="flex items-center gap-2.5 text-snow transition-colors hover:text-kw-red-bright"
                  >
                    <Mail className="h-4 w-4 text-kw-red" />
                    <span>{agentsPage.cta.leaderEmail}</span>
                  </a>
                  <a
                    href={`tel:${agentsPage.cta.leaderPhone.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-2.5 text-snow transition-colors hover:text-kw-red-bright"
                  >
                    <Phone className="h-4 w-4 text-kw-red" />
                    <span>{agentsPage.cta.leaderPhone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: §6.8 Form (name, email, phone, current brokerage, years licensed, message) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-slate-card p-8 shadow-lift-dark md:p-10">
                {submittedTo ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-kw-red-bright" />
                    <h3 className="mt-5 text-2xl font-bold text-white">
                      Thank You — Your Message Is on Its Way
                    </h3>
                    <p className="mt-3 text-sm text-stone-dark">
                      Routed directly to{" "}
                      <span className="font-semibold text-white">
                        {submittedTo}
                      </span>
                      . Russie will reach out shortly for a confidential
                      conversation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="company_website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Full Name *
                        </label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Email Address *
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
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(801) 555-0199"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Current Brokerage (Optional)
                        </label>
                        <input
                          value={currentBrokerage}
                          onChange={(e) => setCurrentBrokerage(e.target.value)}
                          placeholder="Optional"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Years Licensed
                        </label>
                        <select
                          value={yearsLicensed}
                          onChange={(e) => setYearsLicensed(e.target.value)}
                          className={inputCls}
                        >
                          <option value="">Select stage</option>
                          <option value="Pre-licensing / New">
                            Pre-licensing / Brand New
                          </option>
                          <option value="1–2 years">1–2 years</option>
                          <option value="3–5 years">3–5 years</option>
                          <option value="5–10 years">5–10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                        How Can We Help You Grow?
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell Russie a bit about your goals…"
                        className={inputCls}
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-stone-dark">
                        100% confidential · Routed directly to Russie Edwards
                      </span>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright disabled:opacity-50"
                      >
                        <span>
                          {submitting
                            ? "Sending…"
                            : "Book Confidential Conversation"}
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
