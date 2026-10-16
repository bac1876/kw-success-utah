import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  Handshake,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";
import { brokerage } from "@/brokerages";
import ThreePillars from "@/components/ThreePillars";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AGENT_PATHS = [
  {
    key: "Experienced Agent",
    label: "Experienced Agent",
    icon: TrendingUp,
    line: "Keep more of what you earn, plug into in-house mortgage & title, and scale with proven systems.",
    routesTo: "Russie Edwards · Team Leader (russie@unitedagentservices.biz)",
  },
  {
    key: "Team / Group",
    label: "Producing Team",
    icon: Users,
    line: "Leverage leadership coaching, recruiting support, and a full family of companies at one table.",
    routesTo: "Russie Edwards & Marcus Green · Leadership Team",
  },
  {
    key: "New / Newly Licensed",
    label: "New or Aspiring Agent",
    icon: Compass,
    line: "Launch your business with structured mentorship, contract mastery, and daily accountability.",
    routesTo: "Russie Edwards · Team Leader (russie@unitedagentservices.biz)",
  },
];

const FIVE_ADVANTAGES = [
  { icon: BookOpen, title: "Technology & KW Command" },
  { icon: TrendingUp, title: "Wealth-Building & Profit Share" },
  { icon: Users, title: "Masterminds & Collaboration" },
  { icon: Award, title: "Daily Coaching & Accountability" },
  { icon: Handshake, title: "In-House Mortgage & Title" },
];

export default function Agents() {
  const [selectedPath, setSelectedPath] = useState<string | null>(
    "Experienced Agent"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("Licensed in Utah");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activePath = AGENT_PATHS.find((p) => p.key === selectedPath);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || submitting) return;
    setSubmitting(true);
    await submitLead({
      topic: "Joining KW Success (Agent)",
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      licenseStatus: `${selectedPath ?? "Agent"} — ${licenseStatus}`,
      message: message.trim(),
      sourcePage: "/agents",
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[58vh] flex-col items-center justify-center overflow-hidden bg-ink"
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
            <span className="type-label text-copper">
              {brokerage.agentsPage.heroEyebrow}
            </span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>

          <h1 className="type-display-lg mt-8 max-w-4xl text-ivory text-balance">
            <SplitWords
              text={brokerage.agentsPage.heroHeadline}
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
            {brokerage.agentsPage.heroSubheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
            className="mt-10"
          >
            <a
              href="#join-form"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("join-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block rounded-full bg-copper px-9 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
            >
              Talk to Russie Edwards
            </a>
          </motion.div>
        </div>
      </section>

      {/* Three Ways In (Career Paths) */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">Your Path Here</span>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {AGENT_PATHS.map((p, idx) => (
              <Reveal key={p.key} delay={0.1 * idx} y={40}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPath(p.key);
                    document
                      .getElementById("join-form")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="group flex h-full w-full flex-col items-start border bg-white p-10 text-left transition-colors hairline-light hover:border-copper md:p-12"
                >
                  <p.icon className="h-8 w-8 text-copper" strokeWidth={1} />
                  <h2 className="type-display-md !text-[1.6rem] mt-8 text-ink">
                    {p.label}
                  </h2>
                  <p className="type-body mt-4 max-w-md text-stone">{p.line}</p>
                  <span className="type-label mt-8 flex items-center gap-2 text-copper">
                    Start here
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Three Pillars (Pinned GSAP) */}
      <ThreePillars defaultAudience="agents" allowToggle={false} pinned />

      {/* Culture & Training Cards + 5-Column Strip */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">
                {brokerage.agentsPage.cultureHeadline}
              </span>
            </div>
          </Reveal>
          <h2 className="type-display-md mt-6 max-w-2xl text-ink">
            <SplitWords text={brokerage.agentsPage.cultureSubheadline} />
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {brokerage.agentsPage.cultureCards.map((card, idx) => (
              <Reveal key={card.title} delay={0.08 * idx} y={28}>
                <div className="flex h-full flex-col border hairline-light bg-white p-8 md:p-10">
                  <Layers className="h-6 w-6 text-copper" strokeWidth={1.25} />
                  <h3 className="type-label mt-6 text-ink">{card.title}</h3>
                  <p className="type-body mt-4 text-stone">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-px border hairline-light bg-ivory-deep sm:grid-cols-2 lg:grid-cols-5">
            {FIVE_ADVANTAGES.map((item, idx) => (
              <Reveal key={item.title} delay={0.08 * idx} y={24}>
                <div className="flex h-full flex-col gap-5 bg-ivory p-7">
                  <item.icon className="h-6 w-6 text-copper" strokeWidth={1} />
                  <p className="type-label text-ink">{item.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Family of Companies Advantage */}
      <section className="border-t hairline-dark bg-ink py-24 md:py-32">
        <div className="container-monogram">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-copper" />
                  <span className="type-label text-copper">
                    In-House Partner Advantage
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-md mt-6 text-ivory">
                {brokerage.agentsPage.familyHeadline}
              </h2>
              <Reveal delay={0.15}>
                <p className="type-body mt-6 max-w-xl text-stone-dark">
                  {brokerage.agentsPage.familyBody}
                </p>
              </Reveal>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                to="/services/mortgage"
                data-cursor="Explore"
                className="group border hairline-dark bg-ink-deep p-8 transition-colors hover:border-copper"
              >
                <span className="type-label text-copper">Lending Partner</span>
                <h3 className="type-display-md !text-[1.4rem] mt-4 text-ivory group-hover:text-copper">
                  Unity Home Loans
                </h3>
                <p className="type-body-sm mt-3 text-stone-dark">
                  In-house loan officers who sit in your Market Center and help
                  your buyers win offers.
                </p>
              </Link>

              <Link
                to="/services/title"
                data-cursor="Explore"
                className="group border hairline-dark bg-ink-deep p-8 transition-colors hover:border-copper"
              >
                <span className="type-label text-copper">Title &amp; Escrow</span>
                <h3 className="type-display-md !text-[1.4rem] mt-4 text-ivory group-hover:text-copper">
                  Amicus Title
                </h3>
                <p className="type-body-sm mt-3 text-stone-dark">
                  Proactive title search, escrow, and smooth settlement
                  coordinated directly with your team.
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <AffiliatedDisclosure tone="dark" />
          </div>
        </div>
      </section>

      {/* Interactive Join / Talk to Russie Form */}
      <section
        id="join-form"
        className="scroll-mt-28 bg-ivory py-24 md:py-32"
      >
        <div className="container-monogram grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="type-label text-copper">
                  Confidential Inquiry
                </span>
              </div>
            </Reveal>
            <h2 className="type-display-md mt-6 text-ink">
              <SplitWords text={brokerage.agentsPage.formHeadline} />
            </h2>
            <Reveal delay={0.15}>
              <p className="type-body mt-6 max-w-md text-stone">
                {brokerage.agentsPage.formSubheadline}
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3">
              {AGENT_PATHS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setSelectedPath(p.key)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
                    selectedPath === p.key
                      ? "border-copper bg-copper text-ink"
                      : "border-ink/30 text-ink hover:border-copper hover:text-copper"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activePath && (
                <motion.p
                  key={activePath.key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="type-body-sm mt-6 text-stone"
                >
                  {activePath.line}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Reveal delay={0.2} y={30}>
            {submitted ? (
              <div className="flex h-full flex-col items-start justify-center border hairline-light bg-white p-10">
                <span className="inline-block h-4 w-4 rotate-45 bg-copper" />
                <p className="type-display-md mt-6 text-ink">
                  Thank you
                  {name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
                </p>
                <p className="type-body mt-4 max-w-md text-stone">
                  Your confidential note is on its way to Russie Edwards. We
                  will reach out personally to schedule a conversation.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-6 border hairline-light bg-white p-8 md:p-12"
              >
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  aria-label="Full name"
                  className="border-b hairline-light bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  aria-label="Email"
                  className="border-b hairline-light bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (optional)"
                  aria-label="Phone"
                  className="border-b hairline-light bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper"
                />
                <select
                  value={licenseStatus}
                  onChange={(e) => setLicenseStatus(e.target.value)}
                  aria-label="License status"
                  className="appearance-none border-b hairline-light bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors focus:border-copper"
                >
                  <option value="Licensed in Utah">Licensed in Utah</option>
                  <option value="In Real Estate School">
                    Currently in Real Estate School
                  </option>
                  <option value="Licensed in Another State">
                    Licensed in Another State
                  </option>
                  <option value="Exploring a Career in Real Estate">
                    Exploring a Career in Real Estate
                  </option>
                </select>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell Russie a little about your business goals and what you're looking for"
                  aria-label="Your note"
                  rows={3}
                  className="border-b hairline-light bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper"
                />
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="mt-2 self-start rounded-full bg-copper px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright disabled:opacity-40"
                >
                  {submitting ? "Sending…" : "Send Confidential Note"}
                </motion.button>
                {activePath && (
                  <p className="type-body-sm text-stone/80">
                    Routes to: {activePath.routesTo}
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
