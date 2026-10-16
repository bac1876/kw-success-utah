import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, MapPin } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import SplitChars from "@/components/motion/SplitChars";
import NetworkMap, {
  UTAH_AREA_COUNT,
  UTAH_AREA_GROUPS,
} from "@/components/motion/NetworkMap";

export default function AreasServed() {
  const { areasServedPage, contact, externalLinks } = activeBrokerage;

  return (
    <>
      {/* §9 Hero (Dark Slate + Wasatch Backdrop) */}
      <section
        className="relative flex min-h-[58dvh] items-center overflow-hidden bg-ink-deep pb-16 pt-[150px] text-snow"
        style={{ marginTop: -HEADER_H }}
      >
        <img
          src={activeBrokerage.home.hero.image}
          alt={activeBrokerage.home.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,23,26,0.96) 0%, rgba(31,35,38,0.85) 60%, rgba(180,1,1,0.18) 100%)",
          }}
        />

        <div className="container-kw relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-kw-red-bright" />
              <span className="type-label text-kw-red-bright">
                {areasServedPage.eyebrow}
              </span>
            </div>

            <h1 className="type-display-xl mt-6 text-white text-balance">
              <SplitChars
                text={areasServedPage.headline}
                delay={0.15}
                stagger={0.015}
              />
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-stone-dark">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-snow">
                <MapPin className="h-4 w-4 text-kw-red-bright" />
                {contact.fullAddress}
              </span>
              <span>
                {UTAH_AREA_COUNT} Communities Across Davis, Weber &amp; Morgan
                Counties
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* §9 Interactive Wasatch Front Network Map (Dark Slate Section) */}
      <section id="network-map" className="bg-ink py-20 text-snow md:py-28">
        <div className="container-kw">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                01
              </span>
              <span className="type-label text-kw-red-bright">
                Interactive Wasatch Front Coverage Map
              </span>
            </div>
            <span className="text-xs text-stone-dark">
              Click any town dot to search active homes on kw.com
            </span>
          </div>

          <NetworkMap />
        </div>
      </section>

      {/* §9 Counties & Communities Directory (Cool Sky Mist Section) */}
      <section className="bg-mist py-24 text-ink md:py-32">
        <div className="container-kw">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    02
                  </span>
                  <span className="type-label text-kw-red">
                    Communities by County
                  </span>
                </div>
              </Reveal>
              <h2 className="type-display-lg mt-5 text-ink">
                <SplitWords text="WEBER, DAVIS & MORGAN COUNTIES." />
              </h2>
            </div>

            <Reveal delay={0.15}>
              <div className="flex items-center gap-2">
                <span className="text-xs text-charcoal">
                  Towns listed per Fair Housing standards
                </span>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {UTAH_AREA_GROUPS.map((group, gIdx) => (
              <Reveal key={group.county} delay={0.08 * gIdx} y={24}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-8 shadow-card">
                  <div>
                    <div className="flex items-center justify-between border-b border-ink/10 pb-5">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-kw-red">
                          0{gIdx + 1} · Northern Utah
                        </span>
                        <h3 className="mt-1 text-2xl font-bold text-ink">
                          {group.county}
                        </h3>
                      </div>
                      <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-ink">
                        {group.communities.length} Towns
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.communities.map((town) => {
                        const searchUrl = `${externalLinks.searchHomesUrl}?q=${encodeURIComponent(
                          `${town}, UT`
                        )}`;
                        return (
                          <a
                            key={town}
                            href={searchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-mist/60 px-3.5 py-1.5 text-xs font-semibold text-ink transition-all hover:border-kw-red hover:bg-kw-red hover:text-white"
                          >
                            <span>{town}</span>
                            <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {group.note && (
                    <p className="mt-8 border-t border-ink/10 pt-4 text-xs text-kw-gray">
                      {group.note}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA (Dark Slate) */}
      <section className="bg-ink-deep py-20 text-snow md:py-28">
        <div className="container-kw">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-ink p-8 text-center sm:flex-row sm:text-left md:p-12">
            <div>
              <span className="type-label text-kw-red-bright">
                Moving to or Within Northern Utah?
              </span>
              <h2 className="type-display-md mt-2 text-white">
                Connect With a Local KW Success Advisor.
              </h2>
            </div>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
            >
              <span>Talk to Us</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
