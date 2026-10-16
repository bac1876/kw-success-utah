import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";

/**
 * §12 Agent Login (/login/agent)
 * - Headline: Agent Login.
 * - Body: Your KW Success agent portal is on its way: every tool, link, AI assistant and resource you need to run your business, in one spot.
 * - Interim quick links (configurable list):
 *   - KW Command
 *   - utahrealestate.com (MLS)
 *   - Suki
 *   - Canva
 *   - Thinkific
 * - Note for the build: the portal will be a separate app behind authentication. Leave a clean route for it, and do not build auth now.
 */

export default function Login() {
  const { kind = "agent" } = useParams();
  const { agentLoginPage, externalLinks, flags } = activeBrokerage;

  if (kind === "client" && !flags.showClientLogin) {
    return <Navigate to="/login/agent" replace />;
  }

  return (
    <section
      className="relative flex min-h-[82vh] flex-col items-center justify-center overflow-hidden bg-snow py-20"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H + 40 }}
    >
      <div className="container-monogram">
        <div className="mx-auto max-w-3xl border hairline-light bg-white p-8 text-center shadow-lift md:p-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mist text-kw-red"
          >
            <Lock className="h-6 w-6" strokeWidth={1.75} />
          </motion.div>

          <h1 className="type-display-md mt-6 text-kw-ink">
            <SplitWords
              text={agentLoginPage.headline}
              stagger={0.05}
              delay={0.2}
            />
          </h1>

          <Reveal delay={0.25}>
            <p className="type-lead mx-auto mt-5 max-w-xl text-charcoal">
              {agentLoginPage.body}
            </p>
          </Reveal>

          {/* §12 Interim quick links (configurable list) */}
          <Reveal delay={0.35}>
            <div className="mt-10 border-t hairline-light pt-8 text-left">
              <p className="type-label text-center text-kw-red">
                Interim Quick Links for Agents
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {externalLinks.agentQuickLinks.map((item) => {
                  const isPlaceholder = item.url.startsWith("#");
                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target={isPlaceholder ? undefined : "_blank"}
                      rel={isPlaceholder ? undefined : "noopener noreferrer"}
                      onClick={
                        isPlaceholder ? (e) => e.preventDefault() : undefined
                      }
                      className="group flex items-center justify-between border hairline-light bg-snow p-4 transition-all hover:border-kw-red hover:bg-white hover:shadow-sm"
                    >
                      <div>
                        <span className="block text-[0.95rem] font-semibold text-kw-ink group-hover:text-kw-red">
                          {item.label}
                        </span>
                        <span className="text-[0.78rem] text-kw-gray">
                          {item.description}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-kw-red transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t hairline-light pt-8">
              <Link
                to="/contact?topic=agent"
                className="inline-block bg-kw-red px-8 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-kw-red-bright"
              >
                Need Help? Contact Agent Services
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
