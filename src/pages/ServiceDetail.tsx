import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, ShieldCheck } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import SplitChars from "@/components/motion/SplitChars";
import { HEADER_H } from "@/components/Navbar";

export default function ServiceDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { partners, flags, contact } = activeBrokerage;

  if (slug === "insurance" && !flags.showInsurancePartner) {
    return <Navigate to="/" replace />;
  }

  if (slug !== "mortgage" && slug !== "title" && slug !== "insurance") {
    return <Navigate to="/" replace />;
  }

  const partner = partners[slug];

  return (
    <>
      {/* §10 Partner Hero (Dark Slate) */}
      <section
        className="relative flex min-h-[55dvh] items-center overflow-hidden bg-ink-deep pb-16 pt-[150px] text-snow"
        style={{ marginTop: -HEADER_H }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,23,26,0.98) 0%, rgba(31,35,38,0.9) 60%, rgba(180,1,1,0.22) 100%)",
          }}
        />

        <div className="container-kw relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-kw-red-bright" />
              <span className="type-label text-kw-red-bright">
                {partner.roleLabel} · Family of Companies
              </span>
            </div>

            <h1 className="type-display-xl mt-6 text-white">
              <SplitChars
                text={partner.companyName}
                delay={0.15}
                stagger={0.02}
              />
            </h1>

            <p className="type-lead mt-5 text-stone-dark">
              {partner.heroHeadline}
            </p>
          </div>
        </div>
      </section>

      {/* §10 Partner Content + Why It Matters at the Table (Cool Sky Mist) */}
      <section className="bg-mist py-24 text-ink md:py-32">
        <div className="container-kw">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left Column: Partner Logo + Intro + Highlights */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-card md:p-12">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-8">
                  <img
                    src={partner.logo}
                    alt={`${partner.companyName} logo`}
                    className="h-14 w-auto max-w-[240px] object-contain"
                  />
                  {partner.isPlaceholderCopy && (
                    <SampleChip label="PLACEHOLDER: Final Partner Copy Pending" />
                  )}
                </div>

                <h2 className="type-display-md mt-8 text-ink">
                  <SplitWords text="COORDINATED AROUND YOUR TABLE." />
                </h2>

                <p className="type-body mt-4 leading-relaxed text-charcoal">
                  {partner.introCopy}
                </p>

                <div className="mt-8 space-y-3">
                  {partner.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-mist/60 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-kw-red" />
                      <span className="text-sm font-medium text-ink">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Why It Matters at the Table (Dark Slate Card) + Contact CTA */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-ink p-8 text-snow shadow-lift md:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-kw-red px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {partner.whyItMattersHeadline}
                  </span>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    Everyone at One Table.
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-stone-dark">
                    {partner.whyItMattersBody}
                  </p>

                  <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs text-stone-dark">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-kw-red-bright" />
                      <span>{contact.fullAddress}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-kw-red-bright" />
                      <a
                        href={`mailto:${contact.generalEmail}`}
                        className="text-snow hover:text-kw-red-bright"
                      >
                        {contact.generalEmail}
                      </a>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={`/contact/${slug}`}
                      className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
                    >
                      <span>Connect With {partner.companyName}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* §10 Full Affiliated Business Disclosure in capitals [SHAWN REVIEW] */}
          {partner.affiliated && (
            <div className="mt-10">
              <AffiliatedDisclosure tone="light" showFullLegal />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
