import { Link } from "react-router-dom";
import { activeBrokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
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
                  For a printed copy of our full Affiliated Business Arrangement
                  Disclosure Statement and current range of settlement service
                  charges, please contact our Layton Market Center at{" "}
                  {contact.phone} or Designated Broker {designatedBroker} at{" "}
                  {contact.fullAddress}.
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
            ) : type === "privacy" ? (
              <div className="space-y-4 text-charcoal">
                <p className="type-body">
                  <strong className="text-ink">{name}</strong> respects your
                  privacy and is committed to protecting the personal
                  information you share with us. Information submitted through
                  our website forms—such as your name, email address, phone
                  number, and real estate goals—is used solely to connect you
                  with a KW Success Trusted Advisor or leadership team member at
                  our Layton Market Center ({contact.fullAddress}).
                </p>
                <p className="type-body">
                  We do not sell your personal contact information to
                  unaffiliated third-party marketers. If you request connected
                  services across our table (such as mortgage pre-approval
                  through Unity Home Loans or escrow services through Amicus
                  Title), your advisor will coordinate that introduction with
                  your permission.
                </p>
                <p className="type-body-sm text-kw-gray">
                  Questions regarding privacy or data requests may be directed
                  to {contact.generalEmail} or {contact.phone}. Each Keller
                  Williams office is independently owned and operated.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-charcoal">
                <p className="type-body">
                  Welcome to the website of{" "}
                  <strong className="text-ink">{name}</strong> (
                  {contact.fullAddress}). By accessing or using this site, you
                  agree to use its content and search tools for lawful personal
                  or professional real estate inquiries across Weber, Davis, and
                  Morgan counties.
                </p>
                <p className="type-body">
                  All property information, market statistics, and educational
                  resources are provided for informational purposes and are
                  subject to change without notice. Each Keller Williams office
                  is independently owned and operated.
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
