import { Link } from "react-router-dom";
import { ExternalLink, Facebook, Instagram, Star } from "lucide-react";
import { brokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import SampleChip from "@/components/SampleChip";
import Watermark from "@/components/motion/Watermark";

export default function Footer() {
  const { brand, office, partners, social, disclosures } = brokerage;

  return (
    <footer className="relative overflow-hidden border-t hairline-dark bg-black">
      <div className="container-monogram relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1 — Brand */}
        <div>
          <Link to="/" className="inline-flex flex-col items-start gap-3">
            <img
              src={brand.logos.reversed}
              alt={brand.name}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="type-serif-accent !text-[1.2rem] mt-6 max-w-xs text-ivory/90">
            {brand.tagline}
          </p>
          <p className="type-body-sm mt-3 max-w-xs text-stone-dark">
            Serving Davis, Weber, and Morgan Counties alongside the greater Salt
            Lake Metro since {brand.foundedYear}.
          </p>
        </div>

        {/* Column 2 — Explore */}
        <div>
          <p className="type-label text-copper">Explore</p>
          <ul className="mt-6 space-y-3">
            {[
              { label: "For Agents", to: "/agents" },
              { label: "Buy & Sell", to: "/clients" },
              { label: "About & Leadership", to: "/about" },
              { label: "Areas Served Map", to: "/areas-served" },
              { label: "Contact Us", to: "/contact" },
              { label: "Agent Login", to: "/login/agent" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="type-body-sm text-stone-dark transition-colors hover:text-copper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={brokerage.search.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="type-body-sm inline-flex items-center gap-1.5 text-stone-dark transition-colors hover:text-copper"
              >
                Search Utah Homes
                <ExternalLink className="h-3.5 w-3.5 text-copper" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Family of Companies */}
        <div>
          <p className="type-label text-copper">Family of Companies</p>
          <ul className="mt-6 space-y-4">
            <li>
              <Link to="/services/mortgage" className="group block">
                <span className="type-body-sm block text-ivory transition-colors group-hover:text-copper">
                  {partners.mortgage.name}
                </span>
                <span className="text-[0.78rem] font-light text-stone-dark/70 transition-colors group-hover:text-copper/80">
                  {partners.mortgage.role}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/services/title" className="group block">
                <span className="type-body-sm block text-ivory transition-colors group-hover:text-copper">
                  {partners.title.name}
                </span>
                <span className="text-[0.78rem] font-light text-stone-dark/70 transition-colors group-hover:text-copper/80">
                  {partners.title.role}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="group block">
                <span className="type-body-sm block text-ivory transition-colors group-hover:text-copper">
                  KW Success Keller Williams Realty
                </span>
                <span className="text-[0.78rem] font-light text-stone-dark/70 transition-colors group-hover:text-copper/80">
                  Real Estate · Layton Market Center
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 — Connect */}
        <div>
          <p className="type-label text-copper">Connect</p>
          <div className="type-body-sm mt-6 space-y-2 text-stone-dark">
            <p className="font-medium text-ivory">{office.name}</p>
            <p>{office.street}</p>
            <p>
              {office.city}, {office.state} {office.zip}
            </p>
            <p className="pt-1">
              <a
                href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                className="text-ivory transition-colors hover:text-copper"
              >
                {office.phone}
              </a>{" "}
              {office.phonePlaceholder && (
                <SampleChip label="Confirm #" className="ml-1" />
              )}
            </p>
          </div>

          <Link
            to="/contact"
            className="btn-sweep mt-6 inline-block rounded-full border border-copper px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-copper transition-colors hover:text-ink"
          >
            Contact Us
          </Link>

          <p className="type-body-sm mt-4">
            <a
              href={`mailto:${office.generalEmail}`}
              className="text-stone-dark transition-colors hover:text-copper"
            >
              {office.generalEmail}
            </a>
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-copper/50 text-copper transition-colors hover:bg-copper hover:text-ink"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.25} />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-copper/50 text-copper transition-colors hover:bg-copper hover:text-ink"
            >
              <Facebook className="h-4 w-4" strokeWidth={1.25} />
            </a>
            <a
              href={social.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Reviews"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-copper/50 text-copper transition-colors hover:bg-copper hover:text-ink"
            >
              <Star className="h-4 w-4" strokeWidth={1.25} />
            </a>
          </div>
        </div>
      </div>

      {/* Affiliated Business Disclosure */}
      <div className="container-monogram pb-8">
        <AffiliatedDisclosure tone="dark" />
      </div>

      {/* Giant SVG Watermark */}
      <div className="container-monogram -mb-2 mt-4">
        <Watermark word="KW SUCCESS" />
      </div>

      {/* Legal Bar */}
      <div className="border-t hairline-dark">
        <div className="container-monogram flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
          <p className="max-w-2xl text-[0.72rem] text-stone-dark">
            © {new Date().getFullYear()} {disclosures.legalFooterText}{" "}
            <SampleChip label="SHAWN REVIEW" variant="review" className="ml-1" />
          </p>
          <p className="text-[0.72rem] text-stone-dark">
            Equal Housing Opportunity · REALTOR®
          </p>
          <div className="flex gap-5 text-[0.72rem]">
            <Link
              to="/privacy"
              className="text-stone-dark transition-colors hover:text-copper"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-stone-dark transition-colors hover:text-copper"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
