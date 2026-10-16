import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import AmbientGlow from "@/components/motion/AmbientGlow";
import Watermark from "@/components/motion/Watermark";
import SplitChars from "@/components/motion/SplitChars";
import Magnetic from "@/components/motion/Magnetic";
import { HEADER_H } from "@/components/Navbar";

export default function Login() {
  const { kind = "agent" } = useParams<{ kind?: string }>();
  const { agentLoginPage, externalLinks, flags } = activeBrokerage;

  if (kind === "client" && !flags.showClientLogin) {
    return <Navigate to="/login/agent" replace />;
  }

  if (kind !== "client" && kind !== "agent") {
    return <Navigate to="/login/agent" replace />;
  }

  const isClient = kind === "client";

  return (
    <section
      className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-ink py-20"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H + 32 }}
    >
      <AmbientGlow />

      <div className="container-monogram pointer-events-none absolute inset-x-0 bottom-0">
        <Watermark word={isClient ? "CLIENT" : "AGENT"} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(18px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-6 w-full max-w-xl border border-white/10 bg-white/[0.04] p-10 shadow-lift backdrop-blur-xl md:p-12"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-copper/20"
          style={{ margin: 6 }}
        />

        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-copper/50">
            <Lock className="h-5 w-5 text-copper" strokeWidth={1.25} />
          </div>
          <span className="type-label text-copper">
            {isClient ? "Client Portal" : "KW Success Agent Portal"}
          </span>
        </div>

        <h1 className="type-display-md mt-8 text-ivory">
          <SplitChars
            text={isClient ? "Welcome back." : agentLoginPage.headline}
            delay={0.3}
          />
        </h1>

        <p className="type-body-sm mt-4 text-ivory/70">
          {agentLoginPage.body}
        </p>

        {/* §12 Interim Quick Links for KW Success Agents */}
        <div className="mt-8 border-t hairline-dark pt-6">
          <p className="type-label text-copper">
            Interim Agent Quick Links
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
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
                  className="group flex items-center justify-between border hairline-dark bg-ink/60 px-4 py-3.5 transition-colors hover:border-copper"
                >
                  <div>
                    <span className="block text-[0.88rem] font-medium text-ivory transition-colors group-hover:text-copper">
                      {item.label}
                    </span>
                    <span className="block text-[0.72rem] text-stone-dark">
                      {item.description}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-copper transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Disabled preview portal login form */}
        <form
          className="mt-8 flex flex-col gap-4 border-t hairline-dark pt-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="type-label text-stone-dark">
            Unified Portal Email
            <input
              disabled
              placeholder="advisor@kwsuccessutah.com"
              className="mt-2 w-full border-b hairline-dark bg-transparent pb-2 text-[0.95rem] font-light text-ivory/80 placeholder:text-stone-dark/60 disabled:cursor-not-allowed"
            />
          </label>
          <button
            type="button"
            disabled
            className="mt-2 flex items-center justify-between rounded-full border border-copper/40 px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-copper/60"
          >
            <span>Unified SSO Sign In</span>
            <span className="text-[0.58rem] tracking-[0.2em] text-stone-dark">
              Opening soon
            </span>
          </button>
        </form>

        <div className="mt-8 border-t pt-6 hairline-dark">
          <Magnetic className="inline-block">
            <Link
              to="/contact?topic=agent"
              className="flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-ivory transition-colors hover:text-copper"
            >
              Contact Agent Services meanwhile{" "}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
