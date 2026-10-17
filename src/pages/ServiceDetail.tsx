import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import Reveal, { SplitWords } from "@/components/Reveal";
import SplitChars from "@/components/motion/SplitChars";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

const ROMAN = ["I.", "II.", "III.", "IV."] as const;

const PARTNER_METRICS = {
  mortgage: [
    { value: "Same-Day", label: "Pre-Approval Letters" },
    { value: "4 Seats", label: "Coordinated at One Table" },
    { value: "3 Counties", label: "Weber · Davis · Morgan" },
    { value: "In-House", label: "Layton Lending Desk" },
  ],
  title: [
    { value: "3 Counties", label: "Weber · Davis · Morgan" },
    { value: "100%", label: "Wire-Shield Verified" },
    { value: "Same-Day", label: "Recording & Disbursement" },
    { value: "In-House", label: "Layton Closing Suites" },
  ],
  insurance: [
    { value: "3 Counties", label: "Weber · Davis · Morgan" },
    { value: "Multi-Carrier", label: "Coverage Comparisons" },
    { value: "Annual", label: "Policy Stewardship" },
    { value: "In-House", label: "Layton Advisory Desk" },
  ],
} as const;

const LOAN_PROGRAMS = [
  {
    name: "Conventional & Move-Up",
    tag: "Primary & Second Homes",
    summary:
      "Fixed and adjustable-rate structures tailored for Northern Utah move-up buyers, custom builds, and long-term holds.",
    specs: [
      "Down payment structures from 3% to 20%+",
      "Bridge & contingent-sale equity coordination",
      "2-1 temporary & permanent seller rate buydowns",
    ],
  },
  {
    name: "VA & Hill AFB",
    tag: "Military & Veterans",
    summary:
      "Dedicated VA lending for active-duty families stationed at Hill Air Force Base, reservists, and Utah veterans.",
    specs: [
      "$0 down payment with zero private mortgage insurance",
      "Direct Certificate of Eligibility (COE) & VA appraisal management",
      "VA IRRRL streamline refinancing when rates shift",
    ],
  },
  {
    name: "First-Time & FHA",
    tag: "Low Down Payment",
    summary:
      "Clear, step-by-step financing pathways designed to transition Wasatch Front renters into confident homeowners.",
    specs: [
      "3.5% down FHA guidelines with flexible credit modeling",
      "Utah Housing & down-payment assistance pairing",
      "Side-by-side total cash-to-close comparisons",
    ],
  },
  {
    name: "Investment & Refi",
    tag: "Portfolio & Equity",
    summary:
      "Strategic capital for acquiring 1–4 unit Wasatch Front rentals, restructuring debt, or funding renovations.",
    specs: [
      "Cash-flow & cap-rate modeling with your KW Success advisor",
      "Rate-and-term or cash-out equity analysis",
      "Fast re-underwriting for repeat portfolio buyers",
    ],
  },
];

const TITLE_CAPABILITIES = [
  {
    name: "Title Examination",
    tag: "Chain of Title",
    summary:
      "Exhaustive examination of Weber, Davis, and Morgan County land records to guarantee marketable, unencumbered ownership.",
    specs: [
      "Full historical deed, easement & plat map verification",
      "Proactive curative work on prior liens and releases",
      "Owner's & Lender's policies with simultaneous-issue savings",
    ],
  },
  {
    name: "Escrow & Settlement",
    tag: "Neutral Fiduciary",
    summary:
      "Seasoned local escrow officers who balance every proration, payoff, and signature from earnest money to keys.",
    specs: [
      "Exact Utah property tax, HOA & special assessment proration",
      "Direct mortgage payoff & county recording coordination",
      "Private, unhurried signing appointments in Layton",
    ],
  },
  {
    name: "Wire Fraud Shield",
    tag: "Multi-Factor Security",
    summary:
      "Strict identity and routing verification protocols that guard your earnest money, down payment, and net proceeds.",
    specs: [
      "Mandatory verbal phone confirmation for all wire routing",
      "Identity & notary verification against deed fraud",
      "Same-day disbursement upon county recording confirmation",
    ],
  },
  {
    name: "1031 & Commercial",
    tag: "Complex Closings",
    summary:
      "Structured settlement precision for Utah investors, custom builders, family trusts, and multi-parcel exchanges.",
    specs: [
      "Qualified Intermediary (QI) coordination for 1031 Exchanges",
      "Construction draw endorsements & mechanic's lien protection",
      "LLC, partnership, and family trust entity closings",
    ],
  },
];

const CLOSING_PROTOCOL = {
  buyer: [
    {
      step: "01",
      title: "Earnest Money & Title Commitment",
      detail:
        "Deposit verified into escrow; full county title search delivered to you and your KW Success advisor.",
    },
    {
      step: "02",
      title: "Lender Balancing & CD Review",
      detail:
        "Amicus balances every line item directly with Unity Home Loans 72+ hours before signing.",
    },
    {
      step: "03",
      title: "Wire-Shield Phone Verification",
      detail:
        "Confirm final cash-to-close instructions verbally with our Layton desk before initiating transfer.",
    },
    {
      step: "04",
      title: "Signing, Recording & Keys",
      detail:
        "Sign in our Layton suites (or via mobile notary) with same-day county recording.",
    },
  ],
  seller: [
    {
      step: "01",
      title: "Preliminary Title & Payoff Audit",
      detail:
        "Existing mortgages, HELOCs, and HOA statuses ordered early so nothing delays buyer underwriting.",
    },
    {
      step: "02",
      title: "Net Sheet & Proration Balancing",
      detail:
        "Exact Utah county tax prorations, credits, and net proceeds calculated down to the dollar.",
    },
    {
      step: "03",
      title: "Deed Execution & Identity Check",
      detail:
        "Warranty deed notarized in our Layton office with verified government photo identification.",
    },
    {
      step: "04",
      title: "Same-Day Proceeds Wire",
      detail:
        "Upon county recording confirmation, net proceeds are wired directly to your verified account.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Aura-Inspired Isometric 3-Layer Table Stack (Left of Dark Section) */
/* ------------------------------------------------------------------ */

function IsometricTableStack({ activeSlug }: { activeSlug: string }) {
  const layers = [
    {
      id: "advisory",
      num: "01",
      label: "KW Success Advisor",
      sub: "Contract · Strategy · Negotiation",
      active: false,
      offsetClass: "-translate-y-14 hover:-translate-y-16 z-30",
      side: "left" as const,
    },
    {
      id: "mortgage",
      num: "02",
      label: "Unity Home Loans",
      sub: "Underwriting · Rate Structure",
      active: activeSlug === "mortgage",
      offsetClass: "translate-y-0 hover:-translate-y-2 z-20",
      side: "right" as const,
    },
    {
      id: "title",
      num: "03",
      label: "Amicus Title",
      sub: "Title Search · Escrow · Recording",
      active: activeSlug === "title",
      offsetClass: "translate-y-14 hover:translate-y-16 z-10",
      side: "left" as const,
    },
  ];

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center py-8">
      {/* Vertical dashed architectural axis */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 top-4 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-white/20"
      />

      <div className="relative h-52 w-52 sm:h-60 sm:w-60">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={cn(
              "group absolute inset-0 transition-transform duration-700",
              layer.offsetClass
            )}
          >
            {/* Isometric Diamond Plane */}
            <div
              className={cn(
                "h-full w-full rotate-45 scale-y-50 border backdrop-blur-[2px] transition-all duration-500",
                layer.active
                  ? "border-kw-red-bright bg-kw-red/20 shadow-[0_0_40px_rgba(209,25,25,0.28)]"
                  : "border-white/15 bg-white/[0.04] group-hover:border-white/35"
              )}
            />

            {/* Floating Technical Callout Badge */}
            <div
              className={cn(
                " absolute top-1/2 flex -translate-y-1/2 items-center gap-2.5",
                layer.side === "left"
                  ? "-left-6 sm:-left-16 flex-row-reverse"
                  : "-right-6 sm:-right-16"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 shadow-2xl backdrop-blur-md transition-colors",
                  layer.active
                    ? "border-kw-red/60 bg-[#14171A] text-white"
                    : "border-white/10 bg-[#0D0F12]/90 text-stone-dark"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    layer.active ? "bg-kw-red-bright animate-pulse" : "bg-white/30"
                  )}
                />
                <div className="text-left">
                  <span className="block font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white">
                    {layer.num}. {layer.label}
                  </span>
                  <span className="hidden text-[0.6rem] text-stone-dark sm:block">
                    {layer.sub}
                  </span>
                </div>
              </div>
              <div className="hidden h-px w-8 bg-white/20 sm:block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aura-Style Architectural Mortgage Simulator                         */
/* ------------------------------------------------------------------ */

function MortgageSimulator() {
  const [homePrice, setHomePrice] = useState(550000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.25);

  const downPayment = Math.round((homePrice * downPct) / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numPayments = 360;
  const principalAndInterest =
    monthlyRate > 0
      ? Math.round(
          (loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
            (Math.pow(1 + monthlyRate, numPayments) - 1)
        )
      : Math.round(loanAmount / numPayments);
  const estTaxesAndIns = Math.round((homePrice * 0.0072) / 12);
  const totalMonthly = principalAndInterest + estTaxesAndIns;
  const piShare = Math.round((principalAndInterest / totalMonthly) * 100);

  return (
    <div className="border border-white/12 bg-[#111418] p-8 md:p-12">
      {/* Header Row */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-kw-red-bright">
            SIMULATOR // 30-YEAR FIXED
          </span>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Run the Numbers Before You Offer.
          </h3>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-stone-dark">
          Utah County Tax Model
        </span>
      </div>

      {/* Live Output Display + Stacked Proportion Bar */}
      <div className="mt-8 grid gap-6 border-b border-white/10 pb-8 sm:grid-cols-2 sm:items-end">
        <div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-stone-dark">
            Estimated Monthly Total
          </span>
          <div className="mt-2 font-display text-5xl font-extrabold tracking-tight text-white tabular-nums">
            ${totalMonthly.toLocaleString()}
            <span className="ml-1 text-base font-normal text-stone-dark">
              /mo
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex justify-between font-mono text-[0.68rem] uppercase tracking-wider">
            <span className="text-white">
              P&amp;I · ${principalAndInterest.toLocaleString()}
            </span>
            <span className="text-stone-dark">
              Tax &amp; Ins · ${estTaxesAndIns.toLocaleString()}
            </span>
          </div>
          <div className="flex h-2 w-full overflow-hidden bg-white/10">
            <div
              className="bg-kw-red transition-all duration-300"
              style={{ width: `${piShare}%` }}
            />
            <div
              className="bg-white/35 transition-all duration-300"
              style={{ width: `${100 - piShare}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[0.62rem] text-stone-dark">
            <span>Loan Amount: ${loanAmount.toLocaleString()}</span>
            <span>Down: ${downPayment.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 space-y-7">
        {/* Price Slider */}
        <div>
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="aura-price-range"
              className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-stone-dark"
            >
              01 / Purchase Price
            </label>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              ${homePrice.toLocaleString()}
            </span>
          </div>
          <input
            id="aura-price-range"
            type="range"
            min={300000}
            max={1250000}
            step={10000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none bg-white/15 accent-kw-red"
          />
        </div>

        {/* Down Payment & Rate Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <span className="block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-stone-dark">
              02 / Down Payment
            </span>
            <div className="mt-3 grid grid-cols-4 border border-white/12 divide-x divide-white/12">
              {[5, 10, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPct(pct)}
                  className={cn(
                    "py-2.5 font-mono text-xs font-bold transition-colors",
                    downPct === pct
                      ? "bg-kw-red text-white"
                      : "bg-transparent text-stone-dark hover:bg-white/5 hover:text-white"
                  )}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-stone-dark">
              03 / Sample Rate
            </span>
            <div className="mt-3 grid grid-cols-4 border border-white/12 divide-x divide-white/12">
              {[5.75, 6.25, 6.5, 6.85].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRate(r)}
                  className={cn(
                    "py-2.5 font-mono text-xs font-bold transition-colors",
                    rate === r
                      ? "bg-kw-red text-white"
                      : "bg-transparent text-stone-dark hover:bg-white/5 hover:text-white"
                  )}
                >
                  {r.toFixed(2)}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-9 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
        <p className="max-w-xs text-xs leading-relaxed text-stone-dark">
          For planning only. Connect with Unity Home Loans in Layton for a
          same-day personalized loan worksheet.
        </p>
        <Link
          to="/contact/mortgage"
          className="group inline-flex shrink-0 items-center gap-3 bg-kw-red px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
        >
          <span>Get Pre-Approved</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aura-Style Architectural Closing Protocol Console                  */
/* ------------------------------------------------------------------ */

function TitleClosingConsole() {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [activeStep, setActiveStep] = useState(0);

  const steps = CLOSING_PROTOCOL[role];

  return (
    <div className="border border-white/12 bg-[#111418] p-8 md:p-12">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-kw-red-bright">
            SETTLEMENT SEQUENCE // LAYTON ESCROW DESK
          </span>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            From Earnest Money to Recorded Deed.
          </h3>
        </div>

        {/* Hairline Role Switcher */}
        <div className="inline-grid grid-cols-2 border border-white/15 divide-x divide-white/15">
          {(["buyer", "seller"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                setActiveStep(0);
              }}
              className={cn(
                "px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-colors",
                role === r
                  ? "bg-kw-red text-white"
                  : "bg-transparent text-stone-dark hover:text-white"
              )}
            >
              {r === "buyer" ? "Buyer Path" : "Seller Path"}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Step Architectural Ledger */}
      <div className="mt-6 divide-y divide-white/10 border-b border-white/10">
        {steps.map((item, idx) => {
          const isOpen = activeStep === idx;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className="group block w-full py-5 text-left transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold transition-colors",
                      isOpen ? "text-kw-red-bright" : "text-stone-dark"
                    )}
                  >
                    {item.step}
                  </span>
                  <span
                    className={cn(
                      "text-base font-bold transition-colors",
                      isOpen
                        ? "text-white"
                        : "text-snow/75 group-hover:text-white"
                    )}
                  >
                    {item.title}
                  </span>
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-stone-dark">
                  {isOpen ? "Active" : "Inspect"}
                </span>
              </div>

              {isOpen && (
                <p className="mt-3 pl-8 text-sm leading-relaxed text-stone-dark">
                  {item.detail}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-xs text-xs leading-relaxed text-stone-dark">
          <strong className="text-white">Wire-Shield Standard:</strong> Amicus
          Title never alters wire routing via email. Always verify by phone.
        </p>
        <Link
          to="/contact/title"
          className="group inline-flex shrink-0 items-center gap-3 bg-kw-red px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
        >
          <span>Open Escrow With Amicus</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main ServiceDetail Page (/services/mortgage & /services/title)      */
/* ------------------------------------------------------------------ */

export default function ServiceDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { partners, flags, contact } = activeBrokerage;
  const [selectedProgram, setSelectedProgram] = useState(0);

  if (slug === "insurance" && !flags.showInsurancePartner) {
    return <Navigate to="/" replace />;
  }

  if (slug !== "mortgage" && slug !== "title" && slug !== "insurance") {
    return <Navigate to="/" replace />;
  }

  const partner = partners[slug];
  const metrics = PARTNER_METRICS[slug];
  const programs = slug === "mortgage" ? LOAN_PROGRAMS : TITLE_CAPABILITIES;
  const sisterPartner =
    slug === "mortgage" ? partners.title : partners.mortgage;

  return (
    <>
      {/* ============================================================
         SECTION 1 — AURA ARCHITECTURAL HERO (Dark Monolith + Blueprint Grid)
         ============================================================ */}
      <section
        className="relative flex min-h-[68dvh] items-center overflow-hidden bg-[#0D0F12] pb-20 pt-[160px] text-snow"
        style={{ marginTop: -HEADER_H }}
      >
        {/* Subtle Architectural Grid & Radial Spotlight (No cheesy stock photo) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 22% 25%, rgba(209, 25, 25, 0.16), transparent 48%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.04), transparent 45%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="container-kw relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left (7 cols): Editorial Positioning */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-kw-red-bright" />
                <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-kw-red-bright">
                  {partner.roleLabel} // Family of Companies
                </span>
              </div>

              <h1 className="type-display-xl mt-6 text-white">
                <SplitChars
                  key={partner.companyName}
                  text={partner.companyName}
                  delay={0.1}
                  stagger={0.02}
                />
              </h1>

              <p className="type-lead mt-6 max-w-2xl text-stone-dark">
                {partner.heroHeadline}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to={`/contact/${slug}`}
                  className="group inline-flex items-center gap-3.5 bg-kw-red px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
                >
                  <span>Connect With {partner.companyName}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  to={`/services/${sisterPartner.slug}`}
                  className="group inline-flex items-center gap-2 border border-white/15 bg-white/[0.03] px-6 py-4 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-snow/85 transition-colors hover:border-white/40 hover:text-white"
                >
                  <span>Also at the Table: {sisterPartner.companyName}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right (5 cols): Architectural Partner Spec Plate (Zero CheckCircle icons) */}
            <div className="lg:col-span-5">
              <div className="border border-white/12 bg-[#12151A]/90 backdrop-blur-md">
                {/* Partner Logo Bar */}
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white px-7 py-5">
                  <img
                    src={partner.logo}
                    alt={`${partner.companyName} logo`}
                    className="h-11 w-auto max-w-[200px] object-contain"
                  />
                  <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink/70">
                    In-House Desk
                  </span>
                </div>

                {/* 3 Architectural Ledger Rows */}
                <div className="divide-y divide-white/10 px-7">
                  {partner.highlights.map((item, idx) => (
                    <div
                      key={item}
                      className="flex items-baseline gap-4 py-4.5"
                    >
                      <span className="font-mono text-[0.68rem] font-bold text-kw-red-bright">
                        0{idx + 1}
                      </span>
                      <span className="text-xs leading-relaxed text-snow/90">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Location Footer Line */}
                <div className="flex items-center justify-between border-t border-white/10 bg-[#0D0F12] px-7 py-3.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-dark">
                  <span>1572 Woodland Park Dr</span>
                  <span className="text-kw-red-bright">Layton, UT 84041</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 2 — FULL-WIDTH ARCHITECTURAL METRIC LEDGER
         ============================================================ */}
      <section className="border-y border-white/10 bg-[#121519] text-snow">
        <div className="container-kw">
          <div className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {metrics.map((m) => (
              <div key={m.label} className="px-4 py-8 text-center sm:px-6">
                <div className="font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-stone-dark">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 3 — EDITORIAL PRINCIPLE + 4-COLUMN ROMAN NUMERAL GRID
         ============================================================ */}
      <section className="bg-mist py-24 text-ink md:py-32">
        <div className="container-kw">
          {/* Editorial Principle Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto mb-6 h-px w-16 bg-kw-red" />
              <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.25em] text-kw-red">
                {slug === "mortgage"
                  ? "THE LENDING ARCHITECTURE"
                  : "THE SETTLEMENT ARCHITECTURE"}
              </span>
            </Reveal>

            <h2 className="type-display-md mt-4 text-ink">
              <SplitWords text="COORDINATED AROUND YOUR TABLE." />
            </h2>

            <Reveal delay={0.1}>
              <p className="type-body mt-6 leading-relaxed text-charcoal">
                {partner.introCopy}
              </p>
            </Reveal>
          </div>

          {/* 4-Column Roman Numeral Architectural Grid (Aura Club des Lys style) */}
          <div className="mt-16 grid border border-ink/15 bg-white md:grid-cols-2 lg:grid-cols-4">
            {programs.map((prog, idx) => {
              const isSelected = selectedProgram === idx;
              return (
                <div
                  key={prog.name}
                  onMouseEnter={() => setSelectedProgram(idx)}
                  onClick={() => setSelectedProgram(idx)}
                  className={cn(
                    "relative flex cursor-pointer flex-col justify-between border-b border-ink/12 p-8 transition-colors duration-300 lg:border-b-0 lg:border-r last:border-b-0 last:border-r-0",
                    isSelected ? "bg-white" : "bg-mist/25 hover:bg-white"
                  )}
                >
                  {/* Animated Top Accent Line */}
                  {isSelected && (
                    <motion.div
                      layoutId="aura-program-line"
                      className="absolute inset-x-0 top-0 h-1 bg-kw-red"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-xl italic text-kw-red">
                        {ROMAN[idx]}
                      </span>
                      <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal/60">
                        {prog.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
                      {prog.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-charcoal">
                      {prog.summary}
                    </p>
                  </div>

                  <div className="mt-8 space-y-2.5 border-t border-ink/10 pt-5">
                    {prog.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-ink/85"
                      >
                        <span className="font-mono text-kw-red">—</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 4 — DARK ARCHITECTURAL SIMULATOR + ISOMETRIC STACK
         ============================================================ */}
      <section className="relative overflow-hidden bg-[#0D0F12] py-24 text-snow md:py-32">
        {/* Subtle dot matrix background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container-kw relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* Left (5 cols): Why It Matters + Isometric 3-Layer Stack */}
            <div className="lg:col-span-5">
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-kw-red-bright">
                02 // {partner.whyItMattersHeadline}
              </span>

              <h2 className="type-display-md mt-4 text-white">
                Everyone at One Table.
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-stone-dark">
                {partner.whyItMattersBody}
              </p>

              {/* Aura/Novus-inspired Isometric 3-Layer Stack */}
              <div className="mt-6">
                <IsometricTableStack activeSlug={slug} />
              </div>

              <div className="mt-6 border-t border-white/10 pt-6 font-mono text-xs text-stone-dark">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>{contact.fullAddress}</span>
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
                    className="text-white transition-colors hover:text-kw-red-bright"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right (7 cols): Dedicated Interactive Simulator / Console */}
            <div className="lg:col-span-7">
              {slug === "mortgage" ? (
                <MortgageSimulator />
              ) : (
                <TitleClosingConsole />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 5 — AFFILIATED BUSINESS DISCLOSURE (Clean Mist Footer Band)
         ============================================================ */}
      {partner.affiliated && (
        <section className="bg-mist py-16 text-ink">
          <div className="container-kw">
            <AffiliatedDisclosure tone="light" showFullLegal />
          </div>
        </section>
      )}
    </>
  );
}
