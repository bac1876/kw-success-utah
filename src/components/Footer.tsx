import { Link } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Star } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import SampleChip from "@/components/SampleChip";

/**
 * §13 Footer:
 * - KW Success logo (reversed) with the line "You define Success. The relationship is how we get there."
 * - Columns:
 *   - Explore: For Agents · Buy & Sell · About · Areas Served · Contact
 *   - Family of Companies: Unity Home Loans · Amicus Title
 *   - Connect: Facebook · Instagram · Google Reviews
 * - Affiliated Business Disclosure automatically shown because Unity Home Loans & Amicus Title
 *   (affiliated: true) are displayed by name in the footer (§5.2).
 * - Legal line [SHAWN REVIEW]: © 2026 KW Success Keller Williams Realty · 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041 · Each Keller Williams office is independently owned and operated · Equal Housing Opportunity · REALTOR®
 * - Links: Privacy · Terms · Affiliated Business Disclosure · Accessibility
 */

const EXPLORE_LINKS = [
  { label: "For Agents", to: "/agents" },
  { label: "Buy & Sell", to: "/clients" },
  { label: "About", to: "/about" },
  { label: "Areas Served", to: "/areas-served" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const { logos, name, tagline, externalLinks, disclosures, flags } =
    activeBrokerage;

  const familyLinks = [
    { label: "Unity Home Loans", to: "/services/mortgage" },
    { label: "Amicus Title", to: "/services/title" },
    ...(flags.showInsurancePartner
      ? [{ label: "Insurance", to: "/services/insurance" }]
      : []),
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: externalLinks.socials.facebook,
      icon: Facebook,
    },
    {
      label: "Instagram",
      href: externalLinks.socials.instagram,
      icon: Instagram,
    },
    {
      label: "Google Reviews",
      href: externalLinks.socials.googleReviews,
      icon: Star,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t hairline-dark bg-kw-ink text-white">
      <div className="container-monogram relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Reversed KW Success Logo + Tagline (§13) */}
        <div className="lg:col-span-1">
          <Link to="/" className="inline-block">
            <img
              src={logos.reversed}
              alt={name}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="type-body-sm mt-6 max-w-xs text-white/85">
            {tagline}
          </p>
          <p className="mt-3 text-[0.78rem] text-stone-dark">
            {activeBrokerage.contact.fullAddress}
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <p className="type-label text-kw-red-bright">Explore</p>
          <ul className="mt-6 space-y-3.5">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="type-body-sm text-white/80 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login/agent"
                className="type-body-sm text-white/70 transition-colors hover:text-white"
              >
                Agent Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Family of Companies */}
        <div>
          <p className="type-label text-kw-red-bright">Family of Companies</p>
          <ul className="mt-6 space-y-3.5">
            {familyLinks.map((f) => (
              <li key={f.to}>
                <Link
                  to={f.to}
                  className="type-body-sm text-white/80 transition-colors hover:text-white"
                >
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div>
          <p className="type-label text-kw-red-bright">Connect</p>
          <ul className="mt-6 space-y-3.5">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-body-sm inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                >
                  <s.icon className="h-4 w-4 text-kw-red-bright" strokeWidth={1.6} />
                  <span>{s.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/50" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Link
              to="/contact"
              className="inline-block border border-white/30 px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-kw-red hover:bg-kw-red"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* §5.2 Affiliated Business Disclosure automatically displayed because Unity Home Loans & Amicus Title are named in the footer */}
      <div className="container-monogram pb-10">
        <AffiliatedDisclosure tone="dark" />
      </div>

      {/* Legal crawl (§13) */}
      <div className="border-t hairline-dark bg-ink-deep">
        <div className="container-monogram flex flex-col items-center justify-between gap-4 py-6 text-center lg:flex-row lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[0.74rem] text-stone-dark lg:justify-start">
            <span>{disclosures.footerLegalLine}</span>
            <SampleChip label="SHAWN REVIEW" variant="shawn-review" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[0.74rem] text-stone-dark">
            <Link
              to="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              to={disclosures.affiliatedPdfUrl}
              className="transition-colors hover:text-white"
            >
              Affiliated Business Disclosure
            </Link>
            <Link
              to="/accessibility"
              className="transition-colors hover:text-white"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
