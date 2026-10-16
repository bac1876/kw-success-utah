import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Compass,
  Home as HomeIcon,
  Landmark,
  Shield,
  Users,
} from "lucide-react";
import Reveal, { SplitWords } from "@/components/Reveal";
import SampleChip from "@/components/SampleChip";
import { HEADER_H } from "@/components/Navbar";
import { LEAD_ROUTING, offices } from "@/data/network";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Join the Network (round two).
 *
 * Maria: a "Join Us" button in the top bar, left of Home Services, leading
 * to an information capture that filters by how someone wants to join —
 * title, mortgage, insurance, or as an agent. Service leads route by email
 * to their monogram.network mailbox; agent leads should sync to KW Command
 * (method pending). Pete: a leadership path and an agent path, plus what
 * our agents and leaders are saying. Testimonials are SAMPLE until real
 * quotes arrive.
 */

type PathKey = "agent" | "leadership" | "title" | "mortgage" | "insurance";

const PATHS: {
  key: PathKey;
  label: string;
  icon: typeof HomeIcon;
  line: string;
  routesTo: string;
}[] = [
  {
    key: "agent",
    label: "Agent Path",
    icon: HomeIcon,
    line: "Practice real estate inside a network built around the life of the home.",
    routesTo: LEAD_ROUTING.agent,
  },
  {
    key: "leadership",
    label: "Leadership Path",
    icon: Compass,
    line: "Lead a market center, a team, or a service line — and build what comes next.",
    routesTo: LEAD_ROUTING.agent,
  },
  {
    key: "title",
    label: "Title",
    icon: Landmark,
    line: "Join Summit Title — closings that feel like milestones.",
    routesTo: LEAD_ROUTING.title,
  },
  {
    key: "mortgage",
    label: "Mortgage",
    icon: Briefcase,
    line: "Join Mutual of Omaha Mortgage — financing with a human on the phone.",
    routesTo: LEAD_ROUTING.mortgage,
  },
  {
    key: "insurance",
    label: "Insurance",
    icon: Shield,
    line: "Join Prairie Home & Auto — protection from advisors who know the story.",
    routesTo: LEAD_ROUTING.insurance,
  },
];

/** SAMPLE quotes — replaced the day real ones arrive. */
const VOICES = {
  agents: [
    {
      quote:
        "I stopped counting transactions the year I joined. I count families now, and the number keeps growing.",
      name: "Sample Agent",
      meta: "KW Innovate · Aurora",
    },
    {
      quote:
        "Title, lending, insurance — one table. My clients feel it, and my referrals show it.",
      name: "Sample Agent",
      meta: "KW Infinity · Naperville",
    },
  ],
  leaders: [
    {
      quote:
        "We built Monogram so the relationship outlasts the closing. Leading here means protecting that.",
      name: "Sample Leader",
      meta: "Monogram Network",
    },
    {
      quote:
        "Seven locations, one standard: the honest answer and the returned call.",
      name: "Sample Leader",
      meta: "KW Experience · Downers Grove",
    },
  ],
};

export default function Join() {
  const [path, setPath] = useState<PathKey | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [office, setOffice] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const active = PATHS.find((p) => p.key === path);
  const askOffice = path === "agent" || path === "leadership";

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden bg-ink"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <img
          src="/logomark.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-[0.05]"
        />
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">Join the Network</span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>
          <h1 className="type-display-lg mt-8 max-w-4xl text-ivory text-balance">
            <SplitWords text="Build Something That Outlasts the Closing." stagger={0.05} delay={0.4} />
          </h1>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="type-lead mt-8 max-w-2xl text-white/80 text-balance"
          >
            Agents, leaders, and the people behind title, lending, and
            insurance — one mark, one table, one relationship at a time.
          </motion.p>
        </div>
      </section>

      {/* Two paths (Pete) */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">Two Ways In</span>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {PATHS.slice(0, 2).map((p, i) => (
              <Reveal key={p.key} delay={0.1 * i} y={40}>
                <button
                  type="button"
                  onClick={() => {
                    setPath(p.key);
                    document
                      .getElementById("join-form")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="group flex h-full w-full flex-col items-start border bg-white p-10 text-left transition-colors hairline-light hover:border-copper md:p-12"
                >
                  <p.icon className="h-8 w-8 text-copper" strokeWidth={1} />
                  <h2 className="type-display-md mt-8 text-ink">{p.label}</h2>
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
          <Reveal delay={0.25}>
            <p className="type-body-sm mt-8 text-stone">
              Looking for the agent story in full?{" "}
              <Link to="/careers" className="text-copper transition-colors hover:text-copper-bright">
                Visit Careers →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Voices (Pete) — SAMPLE until real quotes arrive */}
      <section className="border-t bg-ink py-24 hairline-dark md:py-32">
        <div className="container-monogram grid gap-16 lg:grid-cols-2 lg:gap-24">
          {(
            [
              ["What Our Agents Are Saying", VOICES.agents],
              ["What Our Leaders Are Saying", VOICES.leaders],
            ] as const
          ).map(([heading, list], gi) => (
            <div key={heading}>
              <Reveal delay={0.1 * gi}>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-copper" />
                  <span className="type-label flex items-center gap-2 text-copper">
                    {heading} <SampleChip />
                  </span>
                </div>
              </Reveal>
              <div className="mt-10 flex flex-col gap-10">
                {list.map((v, i) => (
                  <Reveal key={v.quote} delay={0.1 * gi + 0.1 * i} y={24}>
                    <blockquote className="border-l border-copper/60 pl-6">
                      <p className="type-serif-accent text-ivory/90">“{v.quote}”</p>
                      <footer className="mt-4">
                        <span className="block text-[0.85rem] font-medium text-ivory">{v.name}</span>
                        <span className="type-body-sm text-stone-dark">{v.meta}</span>
                      </footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capture (Maria) */}
      <section id="join-form" className="scroll-mt-28 bg-ivory py-24 md:py-32">
        <div className="container-monogram grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="type-label text-copper">Join Our Network</span>
              </div>
            </Reveal>
            <h2 className="type-display-md mt-6 text-ink">
              <SplitWords text="Where Are You Looking to Join?" />
            </h2>
            <Reveal delay={0.15}>
              <p className="type-body mt-6 max-w-md text-stone">
                Pick a path and tell us a little about yourself. Your note goes
                straight to the right people — a person, not a pipeline, will
                reach out.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3">
              {PATHS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPath(p.key)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
                    path === p.key
                      ? "border-copper bg-copper text-ink"
                      : "border-ink/30 text-ink hover:border-copper hover:text-copper"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {active && (
                <motion.p
                  key={active.key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="type-body-sm mt-6 text-stone"
                >
                  {active.line}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Reveal delay={0.2} y={30}>
            {done ? (
              <div className="flex h-full flex-col items-start justify-center">
                <img src="/logomark.svg" alt="" className="h-12 w-12" />
                <p className="type-display-md mt-6 text-ink">
                  Thank you{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
                </p>
                <p className="type-body mt-4 max-w-md text-stone">
                  Your note is on its way to the {active?.label.toLowerCase()} team.
                  We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (path && name.trim() && email.trim()) setDone(true);
                }}
                className="flex flex-col gap-6"
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
                {askOffice && (
                  <select
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                    aria-label="Preferred office"
                    className="appearance-none border-b hairline-light bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors focus:border-copper"
                  >
                    <option value="">Preferred office (optional)</option>
                    {offices.map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {o.name} — {o.localities}
                      </option>
                    ))}
                  </select>
                )}
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="A little about you and what you're looking for"
                  aria-label="Your note"
                  rows={3}
                  className="border-b hairline-light bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper"
                />
                <motion.button
                  type="submit"
                  disabled={!path}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="mt-2 self-start rounded-full bg-copper px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {path ? "Send My Note" : "Choose a Path First"}
                </motion.button>
                {active && (
                  <p className="type-body-sm text-stone/80">
                    Routes to: {active.routesTo}
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Closing band */}
      <section className="bg-black py-24 md:py-32">
        <div className="container-monogram flex flex-col items-center text-center">
          <Users className="h-8 w-8 text-copper" strokeWidth={1} />
          <h2 className="type-display-md mx-auto mt-8 max-w-3xl text-ivory">
            <SplitWords text="Seven Locations. One Table. Room for You." />
          </h2>
        </div>
      </section>
    </>
  );
}
