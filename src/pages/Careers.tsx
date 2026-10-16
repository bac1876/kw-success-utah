import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Compass,
  Cpu,
  HeartHandshake,
  Landmark,
  Target,
  Users,
} from "lucide-react";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { EXPLORE_KW_URL, offices } from "@/data/network";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Owned recruiting page (spec P5/N2/A6) — replaces thrive.kw.com so the
 * recruiting lead stays with Monogram. Will live at
 * careers.monogram.network once DNS is pointed (R2-Q16).
 *
 * Round two (Pete): the five things an agent finds here; (Maria): a low-key
 * "Explore Keller Williams" link further down — we capture first.
 */

/** Pete's list, verbatim, for the careers page. */
const WHAT_YOU_FIND = [
  { icon: Cpu, title: "Technology and Training" },
  { icon: Landmark, title: "Wealth-Building Opportunities" },
  { icon: Users, title: "Masterminds and Collaboration" },
  { icon: Target, title: "Training and Accountability" },
  { icon: BarChart3, title: "Market Updates and Coaching" },
];

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "The Relationship Is the Product",
    body: "Build a practice measured in decades-long relationships, not transaction counts.",
  },
  {
    icon: Compass,
    title: "Mentorship That Compounds",
    body: "Advisors are developed, not processed — training, coaching, and a network behind you.",
  },
  {
    icon: Users,
    title: "Seven Locations, One Table",
    body: "Real estate, title, insurance, and lending under one mark, across Chicagoland.",
  },
];

export default function Careers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [office, setOffice] = useState("");
  const [done, setDone] = useState(false);

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
            <span className="type-label text-copper">Careers</span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>
          <h1 className="type-display-lg mt-8 text-ivory">
            <SplitWords text="Build Your Practice Here." stagger={0.06} delay={0.4} />
          </h1>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="type-serif-accent mt-6 max-w-2xl text-stone-dark"
          >
            Grow with a network that believes the relationship is the product.
          </motion.p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram grid gap-10 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 * i} y={40}>
              <div className="flex h-full flex-col border hairline-light bg-white p-8 md:p-10">
                <p.icon className="h-7 w-7 text-copper" strokeWidth={1} />
                <h3 className="type-label mt-6 text-ink">{p.title}</h3>
                <p className="type-body-sm mt-4 text-stone">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What you'll find here (R2 / Pete) */}
      <section className="border-t bg-ivory pb-24 hairline-light md:pb-32">
        <div className="container-monogram">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">What You'll Find Here</span>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-px border hairline-light bg-ivory-deep sm:grid-cols-2 lg:grid-cols-5">
            {WHAT_YOU_FIND.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i} y={24}>
                <div className="flex h-full flex-col gap-5 bg-ivory p-7">
                  <item.icon className="h-6 w-6 text-copper" strokeWidth={1} />
                  <p className="type-label text-ink">{item.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capture */}
      <section className="border-t bg-ink py-24 hairline-dark md:py-32">
        <div className="container-monogram grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="type-display-md text-ivory">
              <SplitWords text="Start the Conversation." />
            </h2>
            <Reveal delay={0.15}>
              <p className="type-body mt-6 max-w-md text-stone-dark">
                Tell us who you are and where you'd like to practice. A person
                — not a pipeline — will reach out.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={30}>
            {done ? (
              <div className="flex h-full flex-col items-start justify-center">
                <img src="/logomark.svg" alt="" className="h-12 w-12" />
                <p className="type-display-md mt-6 text-ivory">
                  Thank you{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
                </p>
                <p className="type-body mt-4 max-w-md text-stone-dark">
                  We'll be in touch soon to talk about your practice.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (name.trim() && email.trim()) setDone(true);
                }}
                className="flex flex-col gap-6"
              >
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  aria-label="Full name"
                  className="border-b hairline-dark bg-transparent pb-3 text-[0.95rem] font-light text-ivory outline-none transition-colors placeholder:text-stone-dark focus:border-copper"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  aria-label="Email"
                  className="border-b hairline-dark bg-transparent pb-3 text-[0.95rem] font-light text-ivory outline-none transition-colors placeholder:text-stone-dark focus:border-copper"
                />
                <select
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  aria-label="Preferred office"
                  className="appearance-none border-b hairline-dark bg-transparent pb-3 text-[0.95rem] font-light text-ivory outline-none transition-colors focus:border-copper"
                >
                  <option value="" className="bg-ink">
                    Preferred office (optional)
                  </option>
                  {offices.map((o) => (
                    <option key={o.slug} value={o.slug} className="bg-ink">
                      {o.name} — {o.localities}
                    </option>
                  ))}
                </select>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="mt-2 self-start rounded-full bg-copper px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
                >
                  Join the Network
                </motion.button>
              </form>
            )}
          </Reveal>
        </div>
        {/* R2-Q16: secondary, low-key — after we've captured their info */}
        <div className="container-monogram mt-20 border-t pt-8 hairline-dark">
          <a
            href={EXPLORE_KW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="type-body-sm inline-flex items-center gap-2 text-stone-dark transition-colors hover:text-copper"
          >
            Want more on Keller Williams itself? Explore KW
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </>
  );
}
