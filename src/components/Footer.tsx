import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Facebook, Instagram, MapPin, Phone, Star } from "lucide-react";
import { activeBrokerage, brokerage } from "@/brokerages";
import { AGENT_LOGIN_URL } from "@/components/Navbar";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";

export default function Footer() {
  const { brand, office, partnerLinks, social, disclosures } = brokerage;

  return (
    <footer className="keep-dark relative overflow-hidden border-t border-white/10 bg-ink-deep text-snow">
      {/* Top KW Red Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-kw-red via-kw-red-bright to-kw-red-deep" />

      <div className="container-kw relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12">
        {/* Column 1 — Brand (§13) */}
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center">
            <img
              src={brand.logos.reversed}
              alt={brand.name}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-6 max-w-sm text-lg font-semibold leading-snug text-snow">
            {brand.tagline}
          </p>
          <p className="type-body-sm mt-3 max-w-sm text-stone-dark">
            {activeBrokerage.subTagline} from our {office.name} since{" "}
            {brand.foundedYear}.
          </p>

          <div className="mt-6 flex items-center gap-2.5">
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow transition-all hover:border-kw-red hover:bg-kw-red hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow transition-all hover:border-kw-red hover:bg-kw-red hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={social.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow transition-all hover:border-kw-red hover:bg-kw-red hover:text-white"
            >
              <Star className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2 — Explore (§13: For Agents · Buy & Sell · About · Areas Served · Contact) */}
        <div className="lg:col-span-2">
          <p className="type-label text-kw-red-bright">Explore</p>
          <ul className="mt-5 space-y-3">
            {[
              { label: "For Agents", to: "/agents" },
              { label: "Buy & Sell", to: "/clients" },
              { label: "About", to: "/about" },
              { label: "Areas Served", to: "/areas-served" },
              { label: "Contact", to: "/contact" },
              ...(activeBrokerage.flags.showAgentPortalDemo
                ? [{ label: "Agent Login", to: "/login/agent" }]
                : []),
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="type-body-sm inline-flex items-center gap-1.5 text-stone-dark transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {!activeBrokerage.flags.showAgentPortalDemo && (
              <li>
                <a
                  href={AGENT_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-body-sm inline-flex items-center gap-1.5 text-stone-dark transition-colors hover:text-white"
                >
                  Agent Login
                  <ExternalLink className="h-3.5 w-3.5 text-kw-red" />
                </a>
              </li>
            )}
            <li>
              <a
                href={brokerage.search.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="type-body-sm inline-flex items-center gap-1.5 font-medium text-snow transition-colors hover:text-kw-red-bright"
              >
                Search Homes
                <ExternalLink className="h-3.5 w-3.5 text-kw-red" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Family of Companies (§13: Unity Home Loans · Amicus Title) */}
        <div className="lg:col-span-3">
          <p className="type-label text-kw-red-bright">Family of Companies</p>
          <div className="mt-5 space-y-3.5">
            {partnerLinks.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="group block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-kw-red/50 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-snow group-hover:text-white">
                    {p.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-kw-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span className="mt-1 block text-xs text-stone-dark">
                  {p.role}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4 — Connect (§13) */}
        <div className="lg:col-span-3">
          <p className="type-label text-kw-red-bright">{office.name}</p>
          <div className="type-body-sm mt-5 space-y-3 text-stone-dark">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-kw-red" />
              <div>
                <p className="font-medium text-snow">{office.street}</p>
                <p>
                  {office.city}, {office.state} {office.zip}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-kw-red" />
              <a
                href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                className="font-medium text-snow transition-colors hover:text-kw-red-bright"
              >
                {office.phone}
              </a>
            </div>

            <p className="text-xs text-stone-dark">
              <a
                href={`mailto:${office.generalEmail}`}
                className="transition-colors hover:text-white"
              >
                {office.generalEmail}
              </a>
            </p>
          </div>

          <Link
            to="/contact"
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-kw-red py-2 pl-5 pr-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-kw-red-bright"
          >
            <span>Start a Conversation</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </Link>
        </div>
      </div>

      {/* Affiliated Business Disclosure (§5.2 & §13) */}
      <div className="container-kw pb-10">
        <AffiliatedDisclosure tone="dark" />
      </div>

      {/* Legal Bar (§13) */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="container-kw flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
          <p className="max-w-3xl text-xs text-stone-dark">
            {disclosures.legalFooterText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <Link
              to="/privacy"
              className="text-stone-dark transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-stone-dark transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              to="/affiliated-business-disclosure"
              className="text-stone-dark transition-colors hover:text-white"
            >
              Affiliated Business Disclosure
            </Link>
            <Link
              to="/accessibility"
              className="text-stone-dark transition-colors hover:text-white"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
