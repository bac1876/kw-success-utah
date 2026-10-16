import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Home Services holding page (spec S8/P4): a Monogram-branded coming-soon
 * page with an email capture so interest is collected before launch.
 */
export default function HomeServices() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <section
        className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-ink"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        {/* Slow-breathing logomark backdrop */}
        <motion.img
          src="/logomark.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
          animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">Coming Soon</span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>

          <h1 className="type-display-lg mt-8 text-ivory">
            <SplitWords text="Monogram Home Services." stagger={0.06} delay={0.4} />
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="type-serif-accent mt-6 max-w-2xl text-stone-dark"
          >
            A fifth seat at the table — care for the home itself, for the life
            of the home.
          </motion.p>

          <Reveal delay={0.3}>
            <p className="type-body mt-8 max-w-xl text-ivory/70">
              We're building a full home-services program to stand alongside
              real estate, title, insurance, and lending. Leave your email and
              you'll be the first to know when the doors open.
            </p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
            className="mt-10 w-full max-w-md"
          >
            {done ? (
              <p className="type-body text-copper-bright">
                Thank you — you're on the list.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setDone(true);
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address"
                  className="flex-1 border hairline-dark bg-ink/60 px-5 py-3.5 text-[0.92rem] font-light text-ivory outline-none transition-colors placeholder:text-stone-dark focus:border-copper"
                />
                <button
                  type="submit"
                  className="rounded-full bg-copper px-8 py-3.5 text-[0.74rem] font-medium uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-copper-bright"
                >
                  Notify Me
                </button>
              </form>
            )}
          </motion.div>

          <Reveal delay={0.5}>
            <Link
              to="/services"
              className="type-label mt-12 inline-block text-stone-dark transition-colors hover:text-copper"
            >
              ← Explore Today's Services
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
