import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ExternalLink, Menu, Search, X } from "lucide-react";
import { activeBrokerage, brokerage } from "@/brokerages";
import { cn } from "@/lib/utils";

const UTIL_H = 38;
const MAIN_H = 74;
export const HEADER_H = UTIL_H + MAIN_H;

/** Real KW Command sign-in; used whenever the demo portal is flagged off. */
export const AGENT_LOGIN_URL = activeBrokerage.externalLinks.agentQuickLinks[0].url;

/** Light theme shows the full-colour mark; dark keeps the reversed one. */
const NAV_LOGO =
  activeBrokerage.theme.mode === "light"
    ? activeBrokerage.logos.fullColor
    : activeBrokerage.logos.reversed;

const NAV_LINKS = [
  { label: "For Agents", to: "/agents" },
  { label: "Buy & Sell", to: "/clients" },
  { label: "About", to: "/about" },
  { label: "Areas Served", to: "/areas-served" },
];

function UtilityBar() {
  const [openKw, setOpenKw] = useState(false);

  return (
    <div className="hidden h-[38px] items-center justify-between border-b border-white/10 bg-ink-deep px-6 text-[0.75rem] text-stone-dark md:flex lg:px-10">
      {/* Left: Keller Williams Realty ▸ light link-through dropdown (§4) */}
      <div className="flex items-center gap-4">
        <div
          className="relative"
          onMouseEnter={() => setOpenKw(true)}
          onMouseLeave={() => setOpenKw(false)}
        >
          <button
            type="button"
            aria-expanded={openKw}
            onClick={() => setOpenKw((v) => !v)}
            className="flex items-center gap-1.5 font-medium tracking-wide text-snow/80 transition-colors hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-kw-red" />
            <span>Keller Williams Realty</span>
            <ChevronDown className="h-3.5 w-3.5 text-kw-red" strokeWidth={2} />
          </button>

          <AnimatePresence>
            {openKw && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
                className="absolute left-0 top-full z-[60] mt-1 w-64 rounded-xl border border-white/15 bg-ink p-1.5 shadow-lift-dark"
              >
                <a
                  href={activeBrokerage.externalLinks.kwMainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenKw(false)}
                  className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[0.8rem] font-medium text-snow transition-colors hover:bg-white/10"
                >
                  <span>Keller Williams (kw.com)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-kw-red" />
                </a>
                <a
                  href={activeBrokerage.externalLinks.kwRegionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenKw(false)}
                  className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[0.8rem] font-medium text-snow transition-colors hover:bg-white/10"
                >
                  <span>{activeBrokerage.externalLinks.kwRegionLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-kw-red" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="hidden h-3.5 w-px bg-white/15 lg:inline-block" />
        <span className="hidden text-[0.72rem] text-stone-dark lg:inline-block">
          {activeBrokerage.contact.officeName} · {activeBrokerage.subTagline}
        </span>
      </div>

      {/* Right: Utility bar links per §4 */}
      <div className="flex items-center gap-5 whitespace-nowrap">
        <Link
          to="/agents"
          className="font-semibold uppercase tracking-[0.14em] text-kw-red-bright transition-colors hover:text-white"
        >
          Join Our Team
        </Link>
        <span className="h-3 w-px bg-white/15" aria-hidden />
        {brokerage.partnerLinks.map((p) => (
          <Link
            key={p.to}
            to={p.to}
            className="text-snow/80 transition-colors hover:text-white"
          >
            {p.label}
          </Link>
        ))}
        <span className="h-3 w-px bg-white/15" aria-hidden />
        <a
          href={brokerage.search.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-snow/80 transition-colors hover:text-white"
        >
          Search Homes
          <ArrowUpRight className="h-3 w-3 text-kw-red" />
        </a>
        {activeBrokerage.flags.showAgentPortalDemo ? (
          <Link
            to="/login/agent"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-[0.7rem] font-medium text-snow transition-colors hover:border-kw-red hover:bg-kw-red hover:text-white"
          >
            Agent Login
          </Link>
        ) : (
          <a
            href={AGENT_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-[0.7rem] font-medium text-snow transition-colors hover:border-kw-red hover:bg-kw-red hover:text-white"
          >
            Agent Login
          </a>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showUtil, setShowUtil] = useState(true);
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const lastY = useRef(0);
  const location = useLocation();
  // The menu is open only on the route where it was opened, so navigating closes it without an effect.
  const mobileOpen = mobileOpenPath === location.pathname;
  const setMobileOpen = (open: boolean) =>
    setMobileOpenPath(open ? location.pathname : null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "overflow-visible transition-[height] duration-300",
            showUtil ? "h-0 md:h-[38px]" : "h-0"
          )}
        >
          <div className={cn(!showUtil && "hidden")}>
            <UtilityBar />
          </div>
        </div>

        <nav
          className={cn(
            "relative flex h-[74px] items-center justify-between px-5 transition-all duration-300 md:px-10",
            scrolled
              ? "border-b border-white/10 bg-ink-deep/95 shadow-lift-dark backdrop-blur-xl"
              : "border-b border-white/10 bg-ink/85 backdrop-blur-md"
          )}
        >
          {/* Official KW Success Reversed Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={NAV_LOGO}
              alt={brokerage.brand.name}
              className="h-9 w-auto object-contain md:h-11"
            />
          </Link>

          {/* Center-Right Main Nav (§4: For Agents · Buy & Sell · About · Areas Served) */}
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 lg:flex">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-5 py-2 text-[0.78rem] font-semibold tracking-[0.06em] transition-all duration-200",
                    isActive
                      ? "bg-kw-red text-white shadow-sm"
                      : "text-snow/85 hover:bg-white/10 hover:text-white"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions: Search + Contact Us Pill Button */}
          <div className="flex items-center gap-3">
            <a
              href={brokerage.search.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={brokerage.search.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow transition-colors hover:border-kw-red hover:bg-kw-red hover:text-white"
            >
              <Search className="h-4 w-4" strokeWidth={1.75} />
            </a>

            <Link
              to="/contact"
              className="group hidden items-center gap-3 rounded-full bg-kw-red py-1.5 pl-5 pr-1.5 text-[0.78rem] font-semibold tracking-[0.08em] text-white transition-all duration-300 hover:bg-kw-red-bright sm:inline-flex"
            >
              <span>Contact Us</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4 text-kw-red" strokeWidth={2.25} />
              </span>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow transition-colors hover:border-kw-red lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {/* Modern Mobile Sheet Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink-deep/98 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <img
                src={NAV_LOGO}
                alt={brokerage.brand.name}
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow hover:border-kw-red"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-2 py-8">
              {[
                { label: "Home", to: "/" },
                { label: "For Agents", to: "/agents" },
                { label: "Buy & Sell", to: "/clients" },
                { label: "About & Leadership", to: "/about" },
                { label: "Areas Served", to: "/areas-served" },
                ...brokerage.partnerLinks.map((p) => ({
                  label: p.label,
                  to: p.to,
                })),
                { label: "Contact Us", to: "/contact" },
              ]
                .map((item, i) => ({
                  ...item,
                  num: String(i + 1).padStart(2, "0"),
                }))
                .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-xl font-semibold text-snow transition-all hover:border-white/10 hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold tracking-widest text-kw-red">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-stone-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-kw-red" />
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm">
              <a
                href={brokerage.search.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-kw-red-bright"
              >
                {brokerage.search.label} <ExternalLink className="h-4 w-4" />
              </a>
              {activeBrokerage.flags.showAgentPortalDemo ? (
                <Link
                  to="/login/agent"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-snow"
                >
                  Agent Login
                </Link>
              ) : (
                <a
                  href={AGENT_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-snow"
                >
                  Agent Login
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
