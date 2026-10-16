import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { useSearchOverlay } from "@/components/SearchOverlay";
import StatsBand, { type StatItem } from "@/components/StatsBand";
import { FEATURED_PRICE_FLOOR, getOfficeBySlug, offices } from "@/data/network";
import { listingsByOffice } from "@/data/listings";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Brokerage landing page (spec P1) — one per office, Monogram-branded,
 * carrying that office's buy / sell / search entry points and its own
 * featured listings. The KW co-brand is accurate here (unlike the
 * umbrella pages, spec G4).
 *
 * Round two (R2-Q15 / Pete): compliance applies one click in, so this page
 * shows the brokerage name, designated managing broker and street address
 * near the top — and again in the contact band. Both fields are flagged
 * until the client sends them.
 */

/** Compliance line — name · broker · address, shown high on the page. */
function ComplianceLine({
  office,
  tone,
}: {
  office: NonNullable<ReturnType<typeof getOfficeBySlug>>;
  tone: "dark" | "light";
}) {
  const muted = tone === "dark" ? "text-stone-dark" : "text-stone";
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.72rem] font-light tracking-[0.04em] ${muted}`}
    >
      <MapPin className="h-3.5 w-3.5 text-copper" strokeWidth={1.5} />
      <span>{office.name}, Keller Williams Realty</span>
      <span className="text-copper/50">·</span>
      {office.broker ? (
        <span>{office.broker}, Designated Managing Broker</span>
      ) : (
        <span className="flex items-center gap-2">
          Designated Managing Broker <SampleChip label="Name pending" />
        </span>
      )}
      <span className="text-copper/50">·</span>
      {office.address && office.address.length > 0 ? (
        <span>{office.address.join(", ")}</span>
      ) : (
        <span className="flex items-center gap-2">
          Office address <SampleChip label="Address pending" />
        </span>
      )}
    </div>
  );
}
export default function Office() {
  const { slug = "" } = useParams();
  const office = getOfficeBySlug(slug);
  const { openSearch } = useSearchOverlay();
  const reduced = useReducedMotion();

  if (!office) return <Navigate to="/offices" replace />;

  // R2-Q5: only listings at or above the $550K floor are featured; if an
  // office has fewer than three above the floor, show what it has.
  const all = listingsByOffice(office.slug);
  const aboveFloor = all.filter((l) => l.price >= FEATURED_PRICE_FLOOR);
  const officeListings = (aboveFloor.length >= 3 ? aboveFloor : all).slice(0, 6);
  const others = offices.filter((o) => o.slug !== office.slug);

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-ink"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/aurora-aerial.jpg"
            alt={`${office.localities} aerial view`}
            className={`h-full w-full object-cover ${office.imgClass}`}
          />
          <div className="overlay-hero absolute inset-0" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="type-body-sm text-stone-dark"
          >
            <span className="font-semibold lowercase text-ivory">kw</span>{" "}
            KELLERWILLIAMS. · A Monogram Network Brokerage
          </motion.p>
          <h1 className="type-display-lg mt-6 text-ivory">
            <SplitWords text={office.name} stagger={0.06} delay={0.4} />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="type-label mt-4 text-copper"
          >
            {office.localities}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="type-serif-accent mt-6 max-w-2xl text-ivory/85"
          >
            {office.tagline}
          </motion.p>

          {/* R2-Q15: brokerage name · managing broker · address, near the top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-6"
          >
            <ComplianceLine office={office} tone="dark" />
          </motion.div>

          {/* Buy / Sell / Search live at the office level (spec G6) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              to={`/buy?office=${office.slug}`}
              className="inline-block rounded-full bg-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
            >
              Buy
            </Link>
            <Link
              to={`/sell?office=${office.slug}`}
              className="inline-block rounded-full border border-white/50 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              Sell
            </Link>
            <button
              type="button"
              onClick={openSearch}
              className="inline-block rounded-full border border-white/50 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              Search Homes
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lifetime record — client's Market Center Stats doc (Oct 2026) */}
      {office.units && office.volume && (
        <StatsBand
          stats={
            [
              {
                display: office.units.toLocaleString("en-US"),
                label: "Families Served",
              },
              {
                display: office.volume,
                label: "Lifetime Volume",
              },
            ] satisfies StatItem[]
          }
        />
      )}

      {/* Featured listings for this office (spec H6) */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="type-label text-copper">
                  Currently Representing
                </span>
              </div>
              <h2 className="type-display-md mt-5 text-ink">
                <SplitWords text="Featured Residences" />
              </h2>
              <p className="type-body-sm mt-3 text-stone">
                Sample listings shown — the live IDX feed for all four offices
                is being connected.
              </p>
            </div>
            <Reveal delay={0.2}>
              <Link
                to={`/buy?office=${office.slug}`}
                className="nav-link-line type-label text-ink transition-colors hover:text-copper"
              >
                View All Homes →
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {officeListings.map((l, i) => (
              <Reveal key={l.slug} delay={0.1 * i} y={50}>
                <ListingCard listing={l} tone="light" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office contact band */}
      <section className="border-t bg-ink py-24 hairline-dark md:py-32">
        <div className="container-monogram flex flex-col items-center text-center">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="h-px w-24 origin-left bg-copper"
          />
          <h2 className="type-display-md mt-8 max-w-3xl text-ivory">
            <SplitWords text={`Begin Your Next Chapter With ${office.name}.`} />
          </h2>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <ComplianceLine office={office} tone="dark" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to={`/contact/real-estate?office=${office.slug}`}
                className="btn-sweep inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
              >
                Contact This Office
              </Link>
              <a
                href={office.siteUrl ?? "#"}
                onClick={(e) => {
                  if (!office.siteUrl) e.preventDefault();
                }}
                target={office.siteUrl ? "_blank" : undefined}
                rel={office.siteUrl ? "noopener noreferrer" : undefined}
                className="type-label flex items-center gap-2 text-stone-dark transition-colors hover:text-copper"
                title={
                  office.siteUrl ? undefined : "Office site link coming soon"
                }
              >
                Office Website
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other offices */}
      <section className="bg-ivory py-20 md:py-24">
        <div className="container-monogram">
          <p className="type-label text-copper">Also in the Network</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o, i) => (
              <motion.div
                key={o.slug}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.08 * i, duration: 0.6, ease: EASE }}
              >
                <Link
                  to={`/offices/${o.slug}`}
                  className="group flex items-center justify-between border-t hairline-light py-5"
                >
                  <span>
                    <span className="block text-[0.95rem] font-medium text-ink transition-colors group-hover:text-copper">
                      {o.name}
                    </span>
                    <span className="type-body-sm text-stone">
                      {o.localities}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-copper transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
