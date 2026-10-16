import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import { cn } from "@/lib/utils";

export const TOPBAR_H = 40;
export const NAV_H = 76;
export const HEADER_H = TOPBAR_H + NAV_H; // 116 — Layout offset

/**
 * §4 Navigation for KW Success:
 * - Utility bar: Join Our Team · Unity Home Loans · Amicus Title · Search Homes · Agent Login
 * - Main nav: For Agents · Buy & Sell · About · Areas Served · Contact Us (button)
 * - Keller Williams link: "Keller Williams Realty ▸" opens a small dropdown with links to kw.com and KW Utah (light link-through only)
 */

function TopBar() {
  const [kwOpen, setKwOpen] = useState(false);
  const { externalLinks, flags } = activeBrokerage;

  return (
    <div className="hidden h-10 items-center justify-between gap-6 bg-kw-ink px-6 text-white/80 md:flex">
      {/* Left: Keller Williams Realty dropdown (§4) */}
      <div className="flex items-center gap-5 whitespace-nowrap">
        <div
          className="relative"
          onMouseEnter={() => setKwOpen(true)}
          onMouseLeave={() => setKwOpen(false)}
        >
          <button
            type="button"
            aria-expanded={kwOpen}
            onClick={() => setKwOpen((o) => !o)}
            className="flex items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-white"
          >
            Keller Williams Realty
            <ChevronDown className="h-3.5 w-3.5 text-kw-red" strokeWidth={2} />
          </button>
          <AnimatePresence>
            {kwOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 top-full z-[60] w-64 border hairline-light bg-white py-2 text-charcoal shadow-lift-lg"
              >
                <a
                  href={externalLinks.kwMainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setKwOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-[0.82rem] font-medium text-kw-ink transition-colors hover:bg-mist hover:text-kw-red"
                >
                  <span>Keller Williams (kw.com)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-kw-red" />
                </a>
                <a
                  href={externalLinks.kwRegionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setKwOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-[0.82rem] font-medium text-kw-ink transition-colors hover:bg-mist hover:text-kw-red"
                >
                  <span>{externalLinks.kwRegionLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-kw-red" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="h-3.5 w-px bg-white/20" aria-hidden />
        <span className="text-[0.72rem] tracking-[0.14em] text-white/65">
          Layton, Utah · Est. {activeBrokerage.foundedYear}
        </span>
      </div>

      {/* Right Utility Bar: Join Our Team · Unity Home Loans · Amicus Title · Search Homes · Agent Login */}
      <div className="flex items-center gap-4 whitespace-nowrap xl:gap-5">
        <Link
          to="/agents"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-kw-red-bright"
        >
          Join Our Team
        </Link>
        <span className="text-white/30" aria-hidden>
          ·
        </span>
        <Link
          to="/services/mortgage"
          className="text-[0.76rem] text-white/80 transition-colors hover:text-white"
        >
          Unity Home Loans
        </Link>
        <span className="text-white/30" aria-hidden>
          ·
        </span>
        <Link
          to="/services/title"
          className="text-[0.76rem] text-white/80 transition-colors hover:text-white"
        >
          Amicus Title
        </Link>
        {flags.showInsurancePartner && (
          <>
            <span className="text-white/30" aria-hidden>
              ·
            </span>
            <Link
              to="/services/insurance"
              className="text-[0.76rem] text-white/80 transition-colors hover:text-white"
            >
              Insurance
            </Link>
          </>
        )}
        <span className="text-white/30" aria-hidden>
          ·
        </span>
        <a
          href={externalLinks.searchHomesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[0.76rem] text-white/80 transition-colors hover:text-white"
        >
          Search Homes
          <ArrowUpRight className="h-3 w-3 text-kw-red" />
        </a>
        <span className="h-3.5 w-px bg-white/20" aria-hidden />
        <Link
          to="/login/agent"
          className="text-[0.76rem] font-medium text-white/90 transition-colors hover:text-kw-red-bright"
        >
          Agent Login
        </Link>
      </div>
    </div>
  );
}

const MAIN_NAV_LINKS = [
  { label: "For Agents", to: "/agents" },
  { label: "Buy & Sell", to: "/clients" },
  { label: "About", to: "/about" },
  { label: "Areas Served", to: "/areas-served" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [topbarVisible, setTopbarVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();
  const { logos, name, externalLinks } = activeBrokerage;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 80 && y > lastY.current) setTopbarVisible(false);
      else if (y < lastY.current || y <= 80) setTopbarVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top utility bar */}
        <div
          className={cn(
            "overflow-visible transition-[height] duration-300",
            topbarVisible ? "md:h-10" : "h-0"
          )}
        >
          <div className={cn(!topbarVisible && "hidden")}>
            <TopBar />
          </div>
        </div>

        {/* Main nav — light and inviting per §3.1, with official KW Success logo */}
        <nav
          className={cn(
            "relative flex h-[76px] items-center justify-between border-b px-5 transition-all duration-300 md:px-10",
            scrolled
              ? "border-charcoal/10 bg-white/95 shadow-sm backdrop-blur-md"
              : "border-charcoal/10 bg-snow/95 backdrop-blur-sm"
          )}
        >
          {/* Left: Official KW Success Full Color Logo (§3.3, §3.6) */}
          <Link
            to="/"
            className="flex shrink-0 items-center py-2"
            aria-label={name}
          >
            <img
              src={logos.fullColor}
              alt={name}
              className="h-10 w-auto object-contain md:h-11"
            />
          </Link>

          {/* Center/Right: Main Nav Links */}
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            {MAIN_NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "nav-link-line text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-kw-ink transition-colors hover:text-kw-red",
                    isActive && "active text-kw-red"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Far right: Contact Us button + Mobile Hamburger */}
          <div className="ml-6 flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden items-center justify-center bg-kw-red px-6 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-kw-red-bright sm:inline-flex"
            >
              Contact Us
            </Link>
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              className="p-1 text-kw-ink transition-colors hover:text-kw-red lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-snow text-charcoal"
          >
            <div className="flex h-[76px] shrink-0 items-center justify-between border-b hairline-light bg-white px-5">
              <img
                src={logos.fullColor}
                alt={name}
                className="h-10 w-auto object-contain"
              />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
                className="p-1 text-kw-ink hover:text-kw-red"
              >
                <X className="h-7 w-7" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-between px-6 py-8">
              <div className="flex flex-col">
                {[
                  { label: "Home", to: "/" },
                  ...MAIN_NAV_LINKS,
                  { label: "Unity Home Loans", to: "/services/mortgage" },
                  { label: "Amicus Title", to: "/services/title" },
                  { label: "Contact Us", to: "/contact" },
                ].map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b hairline-light py-4 text-[1.15rem] font-semibold uppercase tracking-[0.14em] text-kw-ink transition-colors hover:text-kw-red"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <a
                  href={externalLinks.searchHomesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b hairline-light py-4 text-[1.15rem] font-semibold uppercase tracking-[0.14em] text-kw-red"
                >
                  <span>Search Homes</span>
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t hairline-light pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/login/agent"
                    onClick={() => setMobileOpen(false)}
                    className="type-label text-kw-ink hover:text-kw-red"
                  >
                    Agent Login →
                  </Link>
                  <div className="flex items-center gap-4 text-[0.78rem] text-kw-gray">
                    <a
                      href={externalLinks.kwMainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-kw-red"
                    >
                      kw.com ↗
                    </a>
                    <a
                      href={externalLinks.kwRegionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-kw-red"
                    >
                      {externalLinks.kwRegionLabel} ↗
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
