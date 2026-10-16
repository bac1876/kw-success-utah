import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import SampleChip from "@/components/SampleChip";
import SplitChars from "@/components/motion/SplitChars";
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

  return (
    <section
      className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-ink-deep py-20 text-snow"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H + 32 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-kw-red/20 blur-3xl"
      />

      <div className="container-kw relative z-10">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-ink p-8 shadow-lift-dark md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-kw-red px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Lock className="h-3.5 w-3.5" />
              KW Success Agent Hub
            </span>
            <SampleChip label="PORTAL COMING SOON" variant="review" />
          </div>

          <h1 className="type-display-md mt-6 text-white">
            <SplitChars
              text={agentLoginPage.headline}
              delay={0.15}
              stagger={0.025}
            />
          </h1>

          <p className="type-body mt-4 text-stone-dark">
            {agentLoginPage.body}
          </p>

          {/* §12 Interim Quick Links (KW Command, utahrealestate.com MLS, Suki, Canva, Thinkific) */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-kw-red-bright" />
              <span className="type-label text-kw-red-bright">
                Interim Quick Links
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-slate-card/80 p-4 transition-all hover:border-kw-red/60 hover:bg-slate-card"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-kw-red-bright">
                          {item.label}
                        </span>
                        {isPlaceholder && <SampleChip label="SOON" />}
                      </div>
                      <span className="mt-0.5 block text-xs text-stone-dark">
                        {item.description}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-kw-red-bright transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-stone-dark">
            <span>Need help accessing a system?</span>
            <Link
              to="/contact?topic=agent"
              className="font-bold uppercase tracking-wider text-kw-red-bright hover:text-white"
            >
              Contact Agent Services →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
