import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";

/**
 * §10 Partner pages (/services/mortgage, /services/title)
 * - Use Monogram's service-page pattern with a logo, a short intro, "why it matters at the table," and a contact button.
 * - Unity Home Loans (lending): logo plus 2–3 sentences. Marcus/Unity to supply final copy [PLACEHOLDER].
 * - Amicus Title (title & escrow): logo plus 2–3 sentences. Marcus/Amicus to supply final copy [PLACEHOLDER].
 * - Insurance (/services/insurance): hidden by flag showInsurancePartner=false; redirects to / when flag is off.
 * - Each page shows the Affiliated Business Disclosure in full [SHAWN REVIEW], including the required statement in capitals:
 *   "YOU ARE NOT REQUIRED TO USE THE LISTED PROVIDER(S)…"
 */

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
      {/* Hero */}
      <section
        className="relative flex min-h-[48vh] flex-col items-center justify-center overflow-hidden bg-kw-ink text-white"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className="h-0.5 w-10 bg-kw-red" />
            <span className="type-label text-kw-red-bright">
              {partner.roleLabel}
            </span>
            <span className="h-0.5 w-10 bg-kw-red" />
          </motion.div>

          <h1 className="type-display-lg mt-7 max-w-4xl text-white">
            <SplitWords
              text={partner.companyName}
              stagger={0.05}
              delay={0.3}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.75 }}
            className="type-lead mt-6 max-w-2xl text-white/85 text-balance"
          >
            {partner.heroHeadline}
          </motion.p>
        </div>
      </section>

      {/* Main Content: Logo + Short Intro + Why It Matters at the Table + Contact Button */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
            {/* Left: Partner Logo + Intro + Highlights */}
            <div>
              <Reveal>
                <div className="inline-flex items-center border hairline-light bg-white p-6 shadow-sm">
                  <img
                    src={partner.logo}
                    alt={`${partner.companyName} logo`}
                    className="h-16 w-auto max-w-[260px] object-contain"
                  />
                </div>
              </Reveal>

              {partner.isPlaceholderCopy && (
                <div className="mt-6">
                  <SampleChip label="PLACEHOLDER: Final Partner Copy Pending from Marcus / Partner" />
                </div>
              )}

              <Reveal delay={0.1}>
                <p className="type-lead mt-6 text-kw-ink">
                  {partner.introCopy}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="type-body-sm mt-6 flex items-center gap-2 text-charcoal">
                  <MapPin className="h-4 w-4 text-kw-red" strokeWidth={1.75} />
                  <span>
                    Serving clients across Weber, Davis &amp; Morgan Counties ·{" "}
                    {contact.cityStateZip}
                  </span>
                </p>
              </Reveal>

              <div className="mt-8 divide-y hairline-light border-y hairline-light bg-white px-6">
                {partner.highlights.map((item, i) => (
                  <Reveal key={item} delay={0.1 + 0.06 * i} y={14}>
                    <div className="flex items-center gap-3.5 py-4">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-kw-red"
                        strokeWidth={1.75}
                      />
                      <span className="type-body-sm font-medium text-kw-ink">
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right: "Why It Matters at the Table" + Contact CTA */}
            <div className="flex flex-col gap-8">
              <Reveal delay={0.15} y={24}>
                <div className="border hairline-light bg-white p-8 shadow-lift md:p-10">
                  <div className="flex items-center gap-3">
                    <span className="h-0.5 w-8 bg-kw-red" />
                    <span className="type-label text-kw-red">
                      {partner.whyItMattersHeadline}
                    </span>
                  </div>
                  <h2 className="type-display-md mt-5 text-kw-ink">
                    Everyone at One Table.
                  </h2>
                  <p className="type-body mt-4 text-charcoal">
                    {partner.whyItMattersBody}
                  </p>

                  <div className="mt-8 border-t hairline-light pt-6">
                    <Link
                      to={`/contact?topic=${encodeURIComponent(partner.contactTopic.toLowerCase())}`}
                      className="inline-flex items-center gap-2.5 bg-kw-red px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-kw-red-bright"
                    >
                      Connect With Us <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* §10 Full Affiliated Business Disclosure in capitals [SHAWN REVIEW] */}
              {partner.affiliated && (
                <Reveal delay={0.25} y={20}>
                  <AffiliatedDisclosure tone="light" showFullLegal />
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
