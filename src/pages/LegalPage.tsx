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
        className="relative flex min-h-[38vh] flex-col items-center justify-center overflow-hidden bg-ink"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">{name}</span>
            <span className="h-px w-10 bg-copper" />
          </div>
          <h1 className="type-display-md mt-6 max-w-3xl text-ivory">
            <SplitWords text={titles[type]} stagger={0.04} delay={0.2} />
          </h1>
          <div className="mt-4">
            <SampleChip label="SHAWN REVIEW" variant="shawn-review" />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-monogram">
          <div className="mx-auto max-w-3xl border hairline-light bg-white p-8 md:p-12">
            {type === "disclosure" ? (
              <div className="space-y-6 text-ink/85">
                <p className="type-body">
                  This is to give you notice that <strong>{name}</strong> and
                  certain of its agents have a business relationship and
                  ownership interest in <strong>Unity Home Loans</strong>{" "}
                  (mortgage lending) and <strong>Amicus Title</strong> (title
                  insurance &amp; escrow settlement services), part of the same
                  family of companies. Because of this relationship, this
                  referral may provide {name} or its affiliated owners a
                  financial or other benefit.
                </p>

                <AffiliatedDisclosure tone="light" showFullLegal />

                <p className="type-body-sm text-stone">
                  [PLACEHOLDER: Final signed Affiliated Business Disclosure
                  statement and estimated fee schedule PDF to be supplied by
                  Designated Broker {designatedBroker} prior to production
                  launch.]
                </p>
              </div>
            ) : type === "accessibility" ? (
              <div className="space-y-4 text-ink/85">
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
                    className="text-copper underline"
                  >
                    {contact.generalEmail}
                  </a>{" "}
                  or visit us at {contact.fullAddress}.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-ink/85">
                <p className="type-body">
                  This page contains the draft {titles[type]} for {name} (
                  {contact.fullAddress}). Each Keller Williams office is
                  independently owned and operated.
                </p>
                <p className="type-body-sm text-stone">
                  [SHAWN REVIEW: Final legal text to be confirmed by Designated
                  Broker {designatedBroker} prior to production launch.]
                </p>
              </div>
            )}

            <div className="mt-10 border-t hairline-light pt-6">
              <Link
                to="/"
                className="type-label text-copper transition-colors hover:text-ink"
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
