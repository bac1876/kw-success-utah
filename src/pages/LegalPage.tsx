import { Link } from "react-router-dom";
import { activeBrokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import SampleChip from "@/components/SampleChip";
import { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";

export default function LegalPage({
  type,
}: {
  type: "disclosure" | "privacy" | "terms" | "accessibility";
}) {
  const { name, contact, designatedBroker } = activeBrokerage;

  const titles: Record<typeof type, string> = {
    disclosure: "Affiliated Business Arrangement Disclosure Statement",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    accessibility: "Accessibility Statement",
  };

  return (
    <>
      <section
        className="relative flex min-h-[38vh] flex-col items-center justify-center overflow-hidden bg-ink-deep text-snow"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="container-kw relative z-10 py-16 text-center">
          <span className="type-label text-kw-red-bright">{name}</span>
          <h1 className="type-display-md mx-auto mt-4 max-w-3xl text-white">
            <SplitWords text={titles[type]} stagger={0.04} delay={0.1} />
          </h1>
          <div className="mt-4">
            <SampleChip label="SHAWN REVIEW" variant="shawn-review" />
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 text-ink md:py-28">
        <div className="container-kw">
          <div className="mx-auto max-w-3xl rounded-3xl border border-ink/10 bg-white p-8 shadow-card md:p-12">
            {type === "disclosure" ? (
              <div className="space-y-6 text-charcoal">
                <p className="type-body">
                  This is to give you notice that{" "}
                  <strong className="text-ink">{name}</strong> and certain of
                  its agents have a business relationship and ownership interest
                  in <strong className="text-ink">Unity Home Loans</strong>{" "}
                  (mortgage lending) and{" "}
                  <strong className="text-ink">Amicus Title</strong> (title
                  insurance &amp; escrow settlement services), part of the same
                  family of companies. Because of this relationship, this
                  referral may provide {name} or its affiliated owners a
                  financial or other benefit.
                </p>

                <AffiliatedDisclosure tone="light" showFullLegal />

                <p className="type-body-sm text-kw-gray">
                  [PLACEHOLDER: Final signed Affiliated Business Disclosure
                  statement and estimated fee schedule PDF to be supplied by
                  Designated Broker {designatedBroker} prior to production
                  launch.]
                </p>
              </div>
            ) : type === "accessibility" ? (
              <div className="space-y-4 text-charcoal">
                <p className="type-body">
                  {name} is committed to ensuring digital accessibility for
                  people with disabilities. We continually improve the user
                  experience for everyone and apply the relevant accessibility
                  standards (WCAG 2.1 Level AA).
                </p>
                <p className="type-body">
                  If you experience any difficulty accessing content on this
                  website, please contact our Layton office at{" "}
                  <a
                    href={`mailto:${contact.generalEmail}`}
                    className="font-semibold text-kw-red underline"
                  >
                    {contact.generalEmail}
                  </a>{" "}
                  or visit us at {contact.fullAddress}.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-charcoal">
                <p className="type-body">
                  This page contains the draft {titles[type]} for {name} (
                  {contact.fullAddress}). Each Keller Williams office is
                  independently owned and operated.
                </p>
                <p className="type-body-sm text-kw-gray">
                  [SHAWN REVIEW: Final legal text to be confirmed by Designated
                  Broker {designatedBroker} prior to production launch.]
                </p>
              </div>
            )}

            <div className="mt-10 border-t border-ink/10 pt-6">
              <Link
                to="/"
                className="text-xs font-bold uppercase tracking-wider text-kw-red transition-colors hover:text-ink"
              >
                ← Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
