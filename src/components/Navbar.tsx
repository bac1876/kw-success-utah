import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, Menu, Search, X } from "lucide-react";
import { brokerage } from "@/brokerages";
import FlyLabel from "@/components/motion/FlyLabel";
import Magnetic from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

const UTIL_H = 40;
const MAIN_H = 72;
export const HEADER_H = UTIL_H + MAIN_H;

const DROPDOWN_MENUS: Record<
  string,
  {
    heading: string;
    accent: string;
    ctaTo: string;
    ctaLabel: string;
    links: { label: string; sub?: string; to: string; external?: boolean }[];
  }
> = {
  "KELLER WILLIAMS REALTY": {
    heading: "Our Brokerage & Reach",
    accent: "Rooted in Layton. Serving the Wasatch Front.",
    ctaTo: "/areas-served",
    ctaLabel: "Interactive Network Map →",
    links: [
      {
        label: "Layton Market Center",
        sub: "Davis, Weber & Morgan Counties",
        to: "/about#market-center",
      },
      {
        label: "Areas Served",
        sub: "37+ Northern Utah Communities",
        to: "/areas-served",
      },
      {
        label: "Keller Williams International",
        sub: "kw.com",
        to: "https://kw.com",
        external: true,
      },
      {
        label: "KW Utah Region",
        sub: "Regional Network",
        to: "https://kwsuccessutah.kw.com",
        external: true,
      },
    ],
  },
  SERVICES: {
    heading: "Around the Life of the Home",
    accent: "Everyone at one table. Every step.",
    ctaTo: "/clients",
    ctaLabel: "Buy & Sell Guide →",
    links: [
      {
        label: "Buy & Sell Real Estate",
        sub: "KW Success Advisors",
        to: "/clients",
      },
      {
        label: "Mortgage Solutions",
        sub: "Unity Home Loans",
        to: "/services/mortgage",
      },
      {
        label: "Title & Escrow",
        sub: "Amicus Title",
        to: "/services/title",
      },
      {
        label: "Search Utah Homes",
        sub: "MLS & Active Listings",
        to: brokerage.search.buyUrl,
        external: true,
      },
    ],
  },
};

const NAV_LINKS = [
  { label: "FOR AGENTS", to: "/agents" },
  { label: "BUY & SELL", to: "/clients" },
  { label: "ABOUT", to: "/about" },
  { label: "AREAS SERVED", to: "/areas-served" },
];

function UtilityBar() {
  const [openKw, setOpenKw] = useState(false);

  return (
    <div className="hidden h-10 items-center justify-between gap-6 bg-ink-deep px-6 text-stone-dark md:flex">
      <div className="flex items-center gap-5 whitespace-nowrap">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 rotate-45 bg-copper" />
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.45em] text-ivory">
            KW Success
          </span>
        </Link>
        <span className="h-4 w-px bg-copper/30" aria-hidden />
        <div
          className="relative"
          onMouseEnter={() => setOpenKw(true)}
          onMouseLeave={() => setOpenKw(false)}
        >
          <button
            type="button"
            aria-expanded={openKw}
            onClick={() => setOpenKw((v) => !v)}
            className="type-body-sm flex items-center gap-1.5 transition-colors hover:text-copper"
          >
            A Keller Williams Realty Brokerage
            <ChevronDown className="h-3 w-3 text-copper" strokeWidth={1.5} />
          </button>
          <AnimatePresence>
            {openKw && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full z-[60] w-72 border hairline-dark bg-ink py-2 shadow-lift"
              >
                {brokerage.utilityBar.kwDropdownLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpenKw(false)}
                    className="flex items-center justify-between px-5 py-2.5 transition-colors hover:bg-copper/10"
                  >
                    <span className="block text-[0.82rem] font-medium text-ivory">
                      {item.label}
                    </span>
                    <ExternalLink
                      className="h-3.5 w-3.5 text-copper"
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
                <Link
                  to="/areas-served"
                  onClick={() => setOpenKw(false)}
                  className="mt-1 block border-t hairline-dark px-5 py-2.5 transition-colors hover:bg-copper/10"
                >
                  <span className="block text-[0.82rem] font-medium text-copper">
                    Areas Served Map
                  </span>
                  <span className="type-body-sm text-stone-dark">
                    Davis, Weber &amp; Morgan Counties
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-4 whitespace-nowrap xl:gap-5">
        <Link
          to="/agents"
          className="flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-copper transition-colors hover:text-copper-bright"
        >
          Join Our Team
        </Link>
        <span className="h-4 w-px bg-copper/30" aria-hidden />
        <Link
          to="/services/mortgage"
          className="type-body-sm transition-colors hover:text-copper"
        >
          Unity Home Loans
        </Link>
        <span className="text-copper/40">·</span>
        <Link
          to="/services/title"
          className="type-body-sm transition-colors hover:text-copper"
        >
          Amicus Title
        </Link>
        <span className="h-4 w-px bg-copper/30" aria-hidden />
        <a
          href={brokerage.search.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="type-body-sm transition-colors hover:text-copper"
        >
          Search Homes
        </a>
        <Link
          to="/login/agent"
          className="type-body-sm transition-colors hover:text-copper"
        >
          Agent Login
        </Link>
        <span className="hidden border border-copper/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-copper 2xl:inline-block">
          Equal Housing
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showUtil, setShowUtil] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > 80 && y > lastY.current) {
        setShowUtil(false);
      } else if (y < lastY.current || y <= 80) {
        setShowUtil(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "overflow-visible transition-[height] duration-300",
            showUtil ? "h-10" : "h-0"
          )}
        >
          <div className={cn(!showUtil && "hidden")}>
            <UtilityBar />
          </div>
        </div>

        <nav
          className={cn(
            "relative flex h-[72px] items-center justify-between px-5 transition-colors duration-500 md:px-10",
            scrolled
              ? "border-b bg-[rgba(18,20,19,0.92)] backdrop-blur-md hairline-dark"
              : "border-b border-transparent bg-ink/60 backdrop-blur-sm"
          )}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5">
            <img
              src={brokerage.brand.logos.reversed}
              alt={brokerage.brand.name}
              className="h-9 w-auto object-contain md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-auto hidden items-center gap-7 xl:flex">
            {Object.keys(DROPDOWN_MENUS).map((key) => {
              const menu = DROPDOWN_MENUS[key];
              return (
                <span
                  key={key}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === key ? null : key)
                    }
                    className={cn(
                      "nav-link-line text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory transition-colors hover:text-copper",
                      openDropdown === key && "text-copper"
                    )}
                  >
                    <FlyLabel text={key} />{" "}
                    <span className="text-copper">▸</span>
                  </button>

                  <AnimatePresence>
                    {openDropdown === key && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-4"
                      >
                        <div className="w-[24rem] border hairline-dark bg-ink py-2 shadow-lift">
                          {menu.links.map((item) =>
                            item.external ? (
                              <a
                                key={item.label}
                                href={item.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-baseline justify-between gap-4 px-5 py-2.5 transition-colors hover:bg-copper/10"
                              >
                                <span className="whitespace-nowrap text-[0.82rem] font-medium normal-case tracking-normal text-ivory">
                                  {item.label}
                                </span>
                                {item.sub && (
                                  <span className="type-body-sm text-right text-stone-dark">
                                    {item.sub}
                                  </span>
                                )}
                              </a>
                            ) : (
                              <Link
                                key={item.label}
                                to={item.to}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-baseline justify-between gap-4 px-5 py-2.5 transition-colors hover:bg-copper/10"
                              >
                                <span className="whitespace-nowrap text-[0.82rem] font-medium normal-case tracking-normal text-ivory">
                                  {item.label}
                                </span>
                                {item.sub && (
                                  <span className="type-body-sm text-right text-stone-dark">
                                    {item.sub}
                                  </span>
                                )}
                              </Link>
                            )
                          )}
                          <Link
                            to={menu.ctaTo}
                            onClick={() => setOpenDropdown(null)}
                            className="mt-1 block border-t px-5 py-2.5 text-[0.62rem] uppercase tracking-[0.24em] text-copper transition-colors hairline-dark hover:text-copper-bright"
                          >
                            {menu.ctaLabel}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
              );
            })}

            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onMouseEnter={() => setOpenDropdown(null)}
                className={({ isActive }) =>
                  cn(
                    "nav-link-line text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory transition-colors hover:text-copper",
                    isActive && "active text-copper"
                  )
                }
              >
                <FlyLabel text={item.label} />
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="ml-6 flex items-center gap-4">
            <a
              href={brokerage.search.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Search Utah Homes"
              className="relative text-ivory transition-colors hover:text-copper"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </a>

            <Magnetic radius={60} strength={0.25} className="hidden md:block">
              <Link
                to="/contact"
                className="btn-sweep flex items-center gap-2 rounded-full border border-copper px-6 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-copper transition-colors duration-300 hover:text-ink"
              >
                Contact Us
              </Link>
            </Magnetic>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="text-ivory transition-colors hover:text-copper xl:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Editorial Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
              <img
                src={brokerage.brand.logos.reversed}
                alt={brokerage.brand.name}
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-ivory hover:text-copper"
              >
                <X className="h-7 w-7" strokeWidth={1.25} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8 py-6">
              {[
                { label: "Home", to: "/" },
                { label: "For Agents", to: "/agents" },
                { label: "Buy & Sell", to: "/clients" },
                { label: "About & Leadership", to: "/about" },
                { label: "Areas Served (Network Map)", to: "/areas-served" },
                { label: "Unity Home Loans", to: "/services/mortgage" },
                { label: "Amicus Title", to: "/services/title" },
                { label: "Contact Us", to: "/contact" },
              ].map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.5 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b hairline-dark py-3.5 text-[1.35rem] font-light uppercase tracking-[0.12em] text-ivory transition-colors hover:text-copper"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between gap-5 px-8 pb-10">
              <a
                href={brokerage.search.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="type-label text-copper transition-colors hover:text-copper-bright"
              >
                Search Utah Homes →
              </a>
              <Link
                to="/login/agent"
                onClick={() => setMobileOpen(false)}
                className="type-label text-stone-dark transition-colors hover:text-copper"
              >
                Agent Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
