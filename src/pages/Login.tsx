import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FolderKanban,
  GraduationCap,
  Home,
  KeyRound,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Palette,
  Play,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import SpotlightCard from "@/components/motion/SpotlightCard";
import SplitChars from "@/components/motion/SplitChars";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const STORAGE_KEY = "kw_success_agent_auth_v1";

type PortalTab =
  | "overview"
  | "command"
  | "mls"
  | "suki"
  | "canva"
  | "thinkific";

interface PortalToolDef {
  id: PortalTab;
  label: string;
  badge: string;
  shortDesc: string;
  externalUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PORTAL_TOOLS: PortalToolDef[] = [
  {
    id: "overview",
    label: "Agent Hub",
    badge: "Dashboard",
    shortDesc: "Daily briefing, GCI cap tracker & quick launchpad",
    icon: LayoutDashboard,
  },
  {
    id: "command",
    label: "KW Command",
    badge: "CRM & Pipeline",
    shortDesc: "Active deals, SmartPlans, contacts & referrals",
    externalUrl: "https://console.command.kw.com",
    icon: FolderKanban,
  },
  {
    id: "mls",
    label: "utahrealestate.com",
    badge: "Wasatch MLS",
    shortDesc: "Weber, Davis & Morgan County hot sheets & CMAs",
    externalUrl: "https://www.utahrealestate.com",
    icon: Building2,
  },
  {
    id: "suki",
    label: "Suki AI",
    badge: "AI Assistant",
    shortDesc: "Listing copy, client scripts & Utah market briefs",
    icon: Bot,
  },
  {
    id: "canva",
    label: "Canva Studio",
    badge: "Brand Kit",
    shortDesc: "KW Success social templates, flyers & presentations",
    externalUrl: "https://www.canva.com",
    icon: Palette,
  },
  {
    id: "thinkific",
    label: "Thinkific",
    badge: "Training & Coaching",
    shortDesc: "On-demand courses, scripts & mastery playbooks",
    icon: GraduationCap,
  },
];

/* ------------------------------------------------------------------ */
/* Mock Data for the 5 Interactive Tool Mockups                        */
/* ------------------------------------------------------------------ */

const COMMAND_DEALS = [
  {
    stage: "Active Listing",
    address: "1482 E Oak Hills Dr, Layton",
    client: "The Henderson Family",
    price: "$749,000",
    seatStatus: "Amicus Title + Staging Complete",
    nextAction: "Weekend Open House SmartPlan",
  },
  {
    stage: "Under Contract",
    address: "890 S Country Hills Dr, Ogden",
    client: "Capt. Ryan & Elena Brooks (Hill AFB)",
    price: "$565,000",
    seatStatus: "Unity Home Loans · Clear to Close",
    nextAction: "Final Walkthrough · Thu 2:00 PM",
  },
  {
    stage: "Under Contract",
    address: "412 N Main St, Kaysville",
    client: "David & Sarah Miller",
    price: "$685,000",
    seatStatus: "Inspection + Radon Complete",
    nextAction: "Settlement at Amicus Title",
  },
  {
    stage: "Buyer Pre-Approval",
    address: "Searching: Bountiful / Centerville",
    client: "Dr. Nate & Lauren Vance",
    price: "$920,000 Budget",
    seatStatus: "Pre-Approved w/ Unity Home Loans",
    nextAction: "3 East Bench Showings Scheduled",
  },
];

const MLS_LISTINGS = [
  {
    mls: "2049182",
    county: "Davis",
    city: "Layton",
    address: "2190 E Crestwood Rd",
    price: "$725,000",
    beds: 5,
    baths: 3.5,
    sqft: "3,840",
    dom: "4 days",
    status: "New · Hot Sheet",
  },
  {
    mls: "2048910",
    county: "Davis",
    city: "Kaysville",
    address: "645 S Angel St",
    price: "$639,900",
    beds: 4,
    baths: 3,
    sqft: "3,210",
    dom: "6 days",
    status: "Active",
  },
  {
    mls: "2049304",
    county: "Weber",
    city: "Ogden",
    address: "1840 E Shadow Valley Dr",
    price: "$815,000",
    beds: 5,
    baths: 4,
    sqft: "4,450",
    dom: "2 days",
    status: "New · East Bench",
  },
  {
    mls: "2048775",
    county: "Weber",
    city: "Huntsville",
    address: "7120 E 900 S (Ogden Valley)",
    price: "$1,195,000",
    beds: 5,
    baths: 4.5,
    sqft: "4,980",
    dom: "11 days",
    status: "Active · Resort",
  },
  {
    mls: "2049012",
    county: "Morgan",
    city: "Mountain Green",
    address: "5820 W Silverleaf Way",
    price: "$889,000",
    beds: 6,
    baths: 4,
    sqft: "4,620",
    dom: "8 days",
    status: "Active",
  },
];

const SUKI_PROMPTS = [
  {
    title: "East Layton Listing Description",
    prompt:
      "Write a compelling MLS & social listing description for a 5-bed East Layton home with panoramic Wasatch mountain views and a finished basement.",
    response: `**MLS Public Remarks — East Layton Bench Residence**

Tucked against the East Layton bench with unobstructed Wasatch Mountain and Great Salt Lake sunset views, this 5-bedroom, 3.5-bath residence is designed for effortless Northern Utah living. Flooded with natural alpine light, the main level features vaulted ceilings, a chef's kitchen with quartz waterfall island, and seamless walk-out access to a covered composite deck built for four-season entertaining.

Downstairs, the fully finished daylight basement includes a private media lounge, wet bar, and dedicated gym/guest suite. Located 8 minutes from Hill AFB, top-rated Davis School District schools, and Adams Canyon trailheads.

**Coordinated at One Table:** Pre-inspected, clear preliminary title via Amicus Title, and preferred rate buy-down options available through Unity Home Loans.`,
  },
  {
    title: "One Table Client Follow-Up Script",
    prompt:
      "Draft a warm 1-year homeiversary check-in message for past clients in Kaysville reminding them of our vetted contractor & insurance bench.",
    response: `**Subject / Text:** Happy 1-Year Homeiversary in Kaysville! 🏡

Hi [Client Name] — Happy 1-year anniversary in your Kaysville home! I hope this first year across all four Utah seasons has been incredible for your family.

As your KW Success Trusted Advisor, remember that my job didn't end at the closing table. With spring arriving along the Wasatch Front, let me know if you need:
• **Annual Insurance & Tax Assessment Check:** A quick comparison to make sure your coverage and county valuation are dialed in.
• **Vetted Local Trades:** Our trusted sprinkler, HVAC, roof, or landscaping pros across Davis County.
• **Updated Equity Snapshot:** A no-pressure look at what Kaysville neighborhood values have done over the past 12 months.

Reply anytime—everyone at our table is here for you!
— **Marcus Green**, KW Success Keller Williams Realty`,
  },
  {
    title: "Hill AFB Relocation Briefing",
    prompt:
      "Create a quick neighborhood comparison guide for a military family PCSing to Hill Air Force Base with a $550K–$650K budget.",
    response: `**Hill AFB PCS Relocation Guide ($550K–$650K Range)**

1. **Layton (East & Northgate) — 5 to 12 mins to South/West Gates**
   • *Vibe:* Established neighborhoods, immediate commuter access, vibrant dining & parks.
   • *What $550K–$650K buys:* 4–5 bed single-family home (2,600–3,400 sq ft) with 2–3 car garage.

2. **Syracuse & West Point — 12 to 18 mins via new West Davis Corridor**
   • *Vibe:* Newer construction, spacious lots, modern elementary & high schools, family-focused cul-de-sacs.
   • *What $550K–$650K buys:* Newer 2018–2026 build with open floorplan and 3-car garage.

3. **South Weber & Uintah Highlands — 10 to 15 mins to East Gate**
   • *Vibe:* Tucked into the mouth of Weber Canyon with dramatic mountain views and quick ski access to Snowbasin.

*Next Step:* Unity Home Loans VA Loan specialist + Amicus Title remote closing ready on your timeline.`,
  },
];

const CANVA_TEMPLATES = [
  {
    id: "just-listed",
    title: "Just Listed · Wasatch Editorial",
    category: "Instagram & Facebook Carousel",
    dimensions: "1080 × 1350 px",
    accent: "KW Red + Deep Slate",
    headlinePreview: "JUST LISTED IN LAYTON",
    subPreview: "1482 E Oak Hills Dr · 5 Bed · 3.5 Bath · $749,000",
  },
  {
    id: "one-table-guide",
    title: "Everyone at One Table · Client Guide",
    category: "12-Page Buyer & Seller Presentation",
    dimensions: "1920 × 1080 px (Deck)",
    accent: "High-Contrast Slate & Sky Mist",
    headlinePreview: "ONE TRUSTED ADVISOR.",
    subPreview: "Lending · Title · Insurance · Inspections · Trades",
  },
  {
    id: "market-report",
    title: "Weber, Davis & Morgan Market Pulse",
    category: "Monthly Neighborhood Postcard & Reel",
    dimensions: "6 × 9 in + 1080 × 1920 px",
    accent: "KW Red Data Bento",
    headlinePreview: "NORTHERN UTAH MARKET REPORT",
    subPreview: "20,000+ Families Served Since 1997 · KW Success",
  },
  {
    id: "open-house",
    title: "Modern Open House Sign-In & Flyer",
    category: "Print Flyer + QR Digital Check-In",
    dimensions: "8.5 × 11 in (Print Ready)",
    accent: "Clean Architectural Grid",
    headlinePreview: "OPEN HOUSE THIS SATURDAY",
    subPreview: "Hosted by Marcus Green · KW Success Keller Williams",
  },
];

const THINKIFIC_COURSES = [
  {
    id: "life-by-design",
    title: "Build a Business & Life by Design",
    instructor: "Shawn · KW Success Leadership",
    modules: 8,
    duration: "4h 20m",
    progress: 85,
    status: "In Progress · Module 7",
    lessons: [
      "The Economic Model: From GCI to Net Worth",
      "Time Blocking for Family & Freedom First",
      "Building Your 36-Touch Northern Utah Database",
      "Leveraging AI & Transaction Coordination",
    ],
  },
  {
    id: "one-table-mastery",
    title: "Mastering the 'One Table' Advisor Model",
    instructor: "KW Success + Unity Home Loans + Amicus Title",
    modules: 6,
    duration: "2h 45m",
    progress: 100,
    status: "Completed · Certified",
    lessons: [
      "Positioning Yourself as a Lifetime Trusted Advisor",
      "Seamless Lending Handoffs with Unity Home Loans",
      "Protecting Closings with Amicus Title",
      "Staying First-Call for Contractors, Insurance & Remodels",
    ],
  },
  {
    id: "ai-leverage",
    title: "AI Leverage & Suki Prompt Engineering for Agents",
    instructor: "KW Success Tech & Growth Lab",
    modules: 5,
    duration: "2h 10m",
    progress: 40,
    status: "In Progress · Module 3",
    lessons: [
      "Automating Listing Descriptions & Social Campaigns",
      "AI Market Absorption Briefs for Seller Appointments",
      "SmartPlan Personalization at Scale",
      "Voice-to-CRM Follow-Up Workflows",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Main Login & Agent Portal Component                                 */
/* ------------------------------------------------------------------ */

export default function Login() {
  const { kind = "agent" } = useParams<{ kind?: string }>();
  const { agentLoginPage, flags } = activeBrokerage;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [email, setEmail] = useState("marcusgreen@kw.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<PortalTab>("overview");

  // Interactive states inside the mockups
  const [mlsCounty, setMlsCounty] = useState<"All" | "Davis" | "Weber" | "Morgan">("All");
  const [mlsSearch, setMlsSearch] = useState("");
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [customSukiInput, setCustomSukiInput] = useState("");
  const [customSukiReply, setCustomSukiReply] = useState<string | null>(null);
  const [copiedSuki, setCopiedSuki] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(CANVA_TEMPLATES[0].id);
  const [selectedCourseId, setSelectedCourseId] = useState(THINKIFIC_COURSES[0].id);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: false,
    task3: false,
  });

  if (kind === "client" && !flags.showClientLogin) {
    return <Navigate to="/login/agent" replace />;
  }

  if (kind !== "client" && kind !== "agent") {
    return <Navigate to="/login/agent" replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === "marcusgreen@kw.com" && password === "pass1234") {
      setError(null);
      setIsAuthenticated(true);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore storage errors
      }
    } else {
      setError(
        "Invalid credentials. Use marcusgreen@kw.com and password pass1234."
      );
    }
  };

  const handleQuickFillAndSignIn = () => {
    setEmail("marcusgreen@kw.com");
    setPassword("pass1234");
    setError(null);
    setIsAuthenticated(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setActiveTab("overview");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  /* ---------------------------------------------------------------- */
  /* Unauthenticated View: Sleek Login Form + Clickable Preview Cards  */
  /* ---------------------------------------------------------------- */
  if (!isAuthenticated) {
    return (
      <section
        className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-ink-deep py-20 text-snow"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H + 40 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-kw-red/25 blur-3xl"
        />

        <div className="container-kw relative z-10">
          <div className="mx-auto grid max-w-5xl items-stretch gap-8 lg:grid-cols-12">
            {/* Left Column: Actual Login Form */}
            <SpotlightCard
              spotlightColor="rgba(209, 25, 25, 0.22)"
              borderGlowColor="rgba(255, 80, 80, 0.9)"
              className="rounded-3xl border border-white/10 bg-ink p-8 shadow-lift-dark lg:col-span-6 md:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-kw-red px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  <Lock className="h-3.5 w-3.5" />
                  KW Success Agent Hub
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold text-stone-dark">
                  Layton Market Center
                </span>
              </div>

              <h1 className="type-display-md mt-6 text-white">
                <SplitChars
                  text={agentLoginPage.headline}
                  delay={0.1}
                  stagger={0.02}
                />
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                {agentLoginPage.body}
              </p>

              <form onSubmit={handleLogin} className="mt-7 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-snow/80">
                    KW Agent Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-dark" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcusgreen@kw.com"
                      className="w-full rounded-xl border border-white/15 bg-ink-deep py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-kw-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-snow/80">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-dark" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter pass1234"
                      className="w-full rounded-xl border border-white/15 bg-ink-deep py-3 pl-10 pr-11 text-sm text-white outline-none transition-colors focus:border-kw-red"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-dark hover:text-white"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-kw-red/50 bg-kw-red/15 px-4 py-2.5 text-xs font-medium text-kw-red-bright">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-kw-red py-3.5 pl-6 pr-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_32px_-8px_rgba(180,1,1,0.75)] transition-all hover:bg-kw-red-bright"
                >
                  <span>Sign In to Agent Portal</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </form>

              {/* Demo Credentials Helper Box */}
              <div className="mt-6 rounded-2xl border border-kw-red/35 bg-kw-red/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-kw-red-bright">
                      Interactive Demo Login
                    </span>
                    <p className="mt-1 font-mono text-xs text-snow/90">
                      User: <strong>marcusgreen@kw.com</strong> · Pass:{" "}
                      <strong>pass1234</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickFillAndSignIn}
                    className="rounded-full bg-white px-3.5 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-wider text-ink transition-colors hover:bg-kw-red hover:text-white"
                  >
                    Instant Demo Sign-In →
                  </button>
                </div>
              </div>
            </SpotlightCard>

            {/* Right Column: Clickable Tool Preview Cards (Sign in directly to any tool mockup) */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-ink/70 p-8 backdrop-blur-md lg:col-span-6 md:p-10">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-kw-red-bright" />
                  <span className="type-label text-kw-red-bright">
                    Included Inside Your Portal
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-white">
                  Click any tool below to sign in &amp; preview its interactive
                  workspace
                </h2>
                <p className="mt-1 text-xs text-stone-dark">
                  Sign in with Marcus Green’s demo account to test interactive
                  mockups of all five agent systems.
                </p>

                <div className="mt-6 space-y-3">
                  {PORTAL_TOOLS.filter((t) => t.id !== "overview").map(
                    (tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(tool.id);
                            handleQuickFillAndSignIn();
                          }}
                          className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-card/80 p-4 text-left transition-all hover:border-kw-red hover:bg-slate-card"
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-deep text-kw-red-bright transition-colors group-hover:bg-kw-red group-hover:text-white">
                              <Icon className="h-5 w-5" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">
                                  {tool.label}
                                </span>
                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-snow/80">
                                  {tool.badge}
                                </span>
                              </div>
                              <span className="mt-0.5 block text-xs text-stone-dark">
                                {tool.shortDesc}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-kw-red-bright transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-stone-dark">
                <span>Need help with your KW Success credentials?</span>
                <Link
                  to="/contact?topic=agent"
                  className="font-bold uppercase tracking-wider text-kw-red-bright hover:text-white"
                >
                  Contact Agent Services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Authenticated View: Full Interactive KW Success Agent Portal      */
  /* ---------------------------------------------------------------- */
  const filteredMls = MLS_LISTINGS.filter((item) => {
    const matchesCounty = mlsCounty === "All" || item.county === mlsCounty;
    const matchesSearch =
      !mlsSearch.trim() ||
      item.city.toLowerCase().includes(mlsSearch.toLowerCase()) ||
      item.address.toLowerCase().includes(mlsSearch.toLowerCase()) ||
      item.mls.includes(mlsSearch);
    return matchesCounty && matchesSearch;
  });

  const activePrompt = SUKI_PROMPTS[selectedPromptIdx] ?? SUKI_PROMPTS[0];
  const activeCanva =
    CANVA_TEMPLATES.find((t) => t.id === selectedTemplateId) ??
    CANVA_TEMPLATES[0];
  const activeCourse =
    THINKIFIC_COURSES.find((c) => c.id === selectedCourseId) ??
    THINKIFIC_COURSES[0];

  const handleCustomSukiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSukiInput.trim()) return;
    setCustomSukiReply(
      `**Suki AI · Custom KW Success Draft for "${customSukiInput.trim()}"**\n\nHere is a tailored Northern Utah response prepared for **Marcus Green (Layton Market Center)**:\n\n• **Key Positioning:** Frame the conversation around the *One Table* model—connecting financing (Unity Home Loans), title protection (Amicus Title), and vetted Weber/Davis/Morgan county specialists.\n• **Suggested Action:** Send as a personalized video text or schedule a 15-minute strategy call at the Layton Market Center.\n• **Compliance Note:** Includes standard KW Success Keller Williams Realty brokerage identification.`
    );
  };

  const handleCopySuki = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedSuki(true);
    window.setTimeout(() => setCopiedSuki(false), 2000);
  };

  return (
    <section
      className="min-h-screen bg-ink-deep pb-24 text-snow"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H + 28 }}
    >
      <div className="container-kw">
        {/* Top Authenticated Agent Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-ink p-6 shadow-lift-dark">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-kw-red bg-kw-red/20 text-lg font-extrabold text-white shadow-[0_0_24px_rgba(180,1,1,0.5)]">
              MG
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold text-white md:text-2xl">
                  Welcome back, Marcus Green
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-kw-red px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  <UserCheck className="h-3 w-3" />
                  KW Success Trusted Advisor
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-dark">
                marcusgreen@kw.com · Layton Market Center · License #849201-SA00
                · Weber, Davis &amp; Morgan Counties
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact?topic=agent"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-snow hover:border-white/30 hover:text-white"
            >
              Leadership Support
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-kw-red-bright transition-colors hover:bg-kw-red hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Interactive 6-Tab Workspace Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-ink/80 p-2 backdrop-blur-md">
          {PORTAL_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const active = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTab(tool.id)}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all",
                  active
                    ? "bg-kw-red text-white shadow-[0_6px_20px_-4px_rgba(180,1,1,0.75)]"
                    : "text-stone-dark hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tool.label}</span>
                <span
                  className={cn(
                    "hidden rounded-md px-1.5 py-0.5 text-[0.58rem] uppercase tracking-wider sm:inline-block",
                    active
                      ? "bg-black/25 text-white"
                      : "bg-white/5 text-stone-dark"
                  )}
                >
                  {tool.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Workspace Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="mt-8"
          >
            {/* ======================================================== */}
            {/* TAB 0: OVERVIEW / AGENT HUB                              */}
            {/* ======================================================== */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* 4 KPI Cards */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      label: "YTD Gross Commission (GCI)",
                      value: "$248,500",
                      sub: "100% Capped · +24% vs Last Year",
                      icon: TrendingUp,
                    },
                    {
                      label: "Active Escrows (One Table)",
                      value: "6 Deals",
                      sub: "$3.84M Volume · 5 w/ Amicus Title",
                      icon: FolderKanban,
                    },
                    {
                      label: "Active Northern Utah Listings",
                      value: "4 Homes",
                      sub: "Layton, Kaysville, Ogden & Morgan",
                      icon: Home,
                    },
                    {
                      label: "Next Coaching Session",
                      value: "Thu 10:00 AM",
                      sub: "1-on-1 Business & Wealth Review",
                      icon: GraduationCap,
                    },
                  ].map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <SpotlightCard
                        key={kpi.label}
                        className="rounded-3xl border border-white/10 bg-ink p-6"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-dark">
                            {kpi.label}
                          </span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-kw-red/15 text-kw-red-bright">
                            <Icon className="h-4 w-4" />
                          </span>
                        </div>
                        <p className="mt-4 text-3xl font-extrabold tracking-tight text-white">
                          {kpi.value}
                        </p>
                        <p className="mt-1.5 text-xs font-medium text-kw-red-bright">
                          {kpi.sub}
                        </p>
                      </SpotlightCard>
                    );
                  })}
                </div>

                {/* Clickable 5 Tool Launchpad Grid */}
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Your Integrated KW Success Systems
                      </h2>
                      <p className="mt-1 text-xs text-stone-dark">
                        Click any system card below to open its interactive
                        mockup inside the portal
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {PORTAL_TOOLS.filter((t) => t.id !== "overview").map(
                      (tool) => {
                        const Icon = tool.icon;
                        return (
                          <SpotlightCard
                            key={tool.id}
                            enableTilt
                            maxTilt={3}
                            onClick={() => setActiveTab(tool.id)}
                            className="group cursor-pointer rounded-3xl border border-white/10 bg-ink p-7 transition-all hover:border-kw-red"
                          >
                            <div className="flex items-start justify-between">
                              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-kw-red/30 bg-kw-red/15 text-kw-red-bright transition-colors group-hover:bg-kw-red group-hover:text-white">
                                <Icon className="h-6 w-6" />
                              </span>
                              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-snow/80">
                                {tool.badge}
                              </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-white">
                              {tool.label}
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-stone-dark">
                              {tool.shortDesc}
                            </p>

                            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                              <span className="text-xs font-bold uppercase tracking-wider text-kw-red-bright">
                                Open Interactive Mockup
                              </span>
                              <ArrowRight className="h-4 w-4 text-kw-red-bright transition-transform group-hover:translate-x-1" />
                            </div>
                          </SpotlightCard>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 1: KW COMMAND MOCKUP                                 */}
            {/* ======================================================== */}
            {activeTab === "command" && (
              <div className="rounded-3xl border border-white/10 bg-ink p-6 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-kw-red/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright">
                      <FolderKanban className="h-3.5 w-3.5" />
                      KW Command · Pipeline &amp; SmartPlans Mockup
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Marcus Green’s Active Opportunities &amp; One Table Sync
                    </h2>
                  </div>
                  <a
                    href="https://console.command.kw.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-kw-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-kw-red-bright"
                  >
                    <span>Launch Live KW Command</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-12">
                  {/* Pipeline Deals */}
                  <div className="space-y-4 lg:col-span-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-dark">
                      Active Wasatch Front Pipeline ({COMMAND_DEALS.length})
                    </h3>
                    {COMMAND_DEALS.map((deal) => (
                      <div
                        key={deal.address}
                        className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-slate-card/80 p-5 sm:flex-row sm:items-center"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-kw-red px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white">
                              {deal.stage}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {deal.address}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-stone-dark">
                            Client: <strong className="text-snow">{deal.client}</strong> ·{" "}
                            {deal.seatStatus}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="block text-base font-extrabold text-white">
                            {deal.price}
                          </span>
                          <span className="mt-1 inline-block rounded-lg border border-white/10 bg-ink-deep px-2.5 py-1 text-[0.65rem] text-kw-red-bright">
                            Next: {deal.nextAction}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Daily Command Tasks Checklist */}
                  <div className="rounded-2xl border border-white/10 bg-ink-deep p-6 lg:col-span-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Today’s SmartPlan Tasks
                    </h3>
                    <p className="mt-1 text-xs text-stone-dark">
                      Click to check off your daily client touchpoints
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        {
                          id: "task1",
                          text: "Send Unity Home Loans rate-drop update to 4 Kaysville buyers",
                        },
                        {
                          id: "task2",
                          text: "Confirm Amicus Title settlement time for 890 S Country Hills Dr",
                        },
                        {
                          id: "task3",
                          text: "Trigger 1-Year Homeiversary SmartPlan for the Jensen family",
                        },
                      ].map((t) => {
                        const done = !!completedTasks[t.id];
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() =>
                              setCompletedTasks((prev) => ({
                                ...prev,
                                [t.id]: !prev[t.id],
                              }))
                            }
                            className={cn(
                              "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all",
                              done
                                ? "border-kw-red/40 bg-kw-red/10 text-snow/60 line-through"
                                : "border-white/10 bg-slate-card/60 text-white hover:border-kw-red/50"
                            )}
                          >
                            <CheckCircle2
                              className={cn(
                                "mt-0.5 h-4 w-4 shrink-0",
                                done ? "text-kw-red-bright" : "text-stone-dark"
                              )}
                            />
                            <span className="text-xs leading-relaxed">
                              {t.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: UTAHREALESTATE.COM (MLS) MOCKUP                   */}
            {/* ======================================================== */}
            {activeTab === "mls" && (
              <div className="rounded-3xl border border-white/10 bg-ink p-6 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-kw-red/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright">
                      <Building2 className="h-3.5 w-3.5" />
                      utahrealestate.com · Northern Utah MLS Hot Sheet Mockup
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Weber, Davis &amp; Morgan County Live Inventory Feed
                    </h2>
                  </div>
                  <a
                    href="https://www.utahrealestate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-kw-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-kw-red-bright"
                  >
                    <span>Open Live UtahRealEstate.com</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Filter Bar */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {(["All", "Davis", "Weber", "Morgan"] as const).map(
                      (county) => (
                        <button
                          key={county}
                          type="button"
                          onClick={() => setMlsCounty(county)}
                          className={cn(
                            "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all",
                            mlsCounty === county
                              ? "bg-kw-red text-white"
                              : "border border-white/15 bg-ink-deep text-stone-dark hover:text-white"
                          )}
                        >
                          {county === "All"
                            ? "All 3 Counties"
                            : `${county} County`}
                        </button>
                      )
                    )}
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-dark" />
                    <input
                      value={mlsSearch}
                      onChange={(e) => setMlsSearch(e.target.value)}
                      placeholder="Filter by city, address, or MLS#…"
                      className="w-full rounded-full border border-white/15 bg-ink-deep py-2 pl-10 pr-4 text-xs text-white outline-none focus:border-kw-red"
                    />
                  </div>
                </div>

                {/* MLS Listings Table */}
                <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-ink-deep">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-white/10 bg-white/[0.03] text-[0.65rem] font-bold uppercase tracking-wider text-stone-dark">
                      <tr>
                        <th className="px-4 py-3.5">MLS #</th>
                        <th className="px-4 py-3.5">County / City</th>
                        <th className="px-4 py-3.5">Property Address</th>
                        <th className="px-4 py-3.5">List Price</th>
                        <th className="px-4 py-3.5">Beds / Baths / SqFt</th>
                        <th className="px-4 py-3.5">DOM</th>
                        <th className="px-4 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredMls.map((row) => (
                        <tr
                          key={row.mls}
                          className="transition-colors hover:bg-white/[0.04]"
                        >
                          <td className="px-4 py-4 font-mono font-bold text-kw-red-bright">
                            #{row.mls}
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-bold text-white">
                              {row.city}
                            </span>{" "}
                            <span className="text-stone-dark">
                              ({row.county})
                            </span>
                          </td>
                          <td className="px-4 py-4 font-semibold text-snow">
                            {row.address}
                          </td>
                          <td className="px-4 py-4 text-sm font-extrabold text-white">
                            {row.price}
                          </td>
                          <td className="px-4 py-4 text-stone-dark">
                            {row.beds} bd · {row.baths} ba · {row.sqft} sf
                          </td>
                          <td className="px-4 py-4 text-stone-dark">
                            {row.dom}
                          </td>
                          <td className="px-4 py-4">
                            <span className="rounded-full border border-kw-red/40 bg-kw-red/15 px-2.5 py-0.5 text-[0.62rem] font-bold text-kw-red-bright">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: SUKI AI ASSISTANT MOCKUP                          */}
            {/* ======================================================== */}
            {activeTab === "suki" && (
              <div className="rounded-3xl border border-white/10 bg-ink p-6 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-kw-red/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright">
                      <Bot className="h-3.5 w-3.5" />
                      Suki AI · KW Success Agent Copilot Mockup
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Instant Listing Copy, Client Scripts &amp; Wasatch Market
                      Briefs
                    </h2>
                  </div>
                  <span className="rounded-full border border-kw-red/40 bg-kw-red/15 px-3.5 py-1 text-xs font-bold text-kw-red-bright">
                    Trained on KW Success Voice &amp; One Table Model
                  </span>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-12">
                  {/* Prompt Selector */}
                  <div className="space-y-3 lg:col-span-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-dark">
                      Select a Northern Utah Agent Prompt
                    </span>
                    {SUKI_PROMPTS.map((item, idx) => {
                      const active =
                        selectedPromptIdx === idx && !customSukiReply;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => {
                            setCustomSukiReply(null);
                            setSelectedPromptIdx(idx);
                          }}
                          className={cn(
                            "w-full rounded-2xl border p-4 text-left transition-all",
                            active
                              ? "border-kw-red bg-kw-red/15 text-white shadow-[0_0_25px_rgba(180,1,1,0.35)]"
                              : "border-white/10 bg-slate-card/70 text-snow/85 hover:border-kw-red/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">
                              {item.title}
                            </span>
                            <Sparkles className="h-4 w-4 text-kw-red-bright" />
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-stone-dark">
                            {item.prompt}
                          </p>
                        </button>
                      );
                    })}

                    {/* Custom Prompt Input */}
                    <form
                      onSubmit={handleCustomSukiSubmit}
                      className="mt-4 rounded-2xl border border-white/10 bg-ink-deep p-4"
                    >
                      <label className="block text-xs font-bold uppercase tracking-wider text-snow/80">
                        Or Ask Suki Anything
                      </label>
                      <div className="mt-2 flex gap-2">
                        <input
                          value={customSukiInput}
                          onChange={(e) => setCustomSukiInput(e.target.value)}
                          placeholder="e.g., Write an offer cover letter in Morgan…"
                          className="flex-1 rounded-xl border border-white/15 bg-ink px-3.5 py-2.5 text-xs text-white outline-none focus:border-kw-red"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-kw-red px-4 py-2.5 text-xs font-bold text-white hover:bg-kw-red-bright"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Generated Output Window */}
                  <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-ink-deep p-6 lg:col-span-7">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-kw-red text-white">
                            <Bot className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            Suki AI Generated Output
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopySuki(
                              customSukiReply ?? activePrompt.response
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-snow hover:border-kw-red hover:text-white"
                        >
                          {copiedSuki ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-kw-red-bright" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-snow/90">
                        {customSukiReply ?? activePrompt.response}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-stone-dark">
                      <span>Prepared for Marcus Green · KW Success Utah</span>
                      <span>Model: Suki Real Estate Advisor v2.4</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: CANVA STUDIO MOCKUP                               */}
            {/* ======================================================== */}
            {activeTab === "canva" && (
              <div className="rounded-3xl border border-white/10 bg-ink p-6 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-kw-red/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright">
                      <Palette className="h-3.5 w-3.5" />
                      Canva Brand Studio · KW Success Utah Templates Mockup
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Ready-to-Publish Social, Print &amp; Listing Decks
                    </h2>
                  </div>
                  <a
                    href="https://www.canva.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-kw-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-kw-red-bright"
                  >
                    <span>Open Canva Brand Hub</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-12">
                  {/* Template Picker */}
                  <div className="space-y-3 lg:col-span-5">
                    {CANVA_TEMPLATES.map((tpl) => {
                      const active = tpl.id === selectedTemplateId;
                      return (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => setSelectedTemplateId(tpl.id)}
                          className={cn(
                            "w-full rounded-2xl border p-4 text-left transition-all",
                            active
                              ? "border-kw-red bg-kw-red/15 text-white"
                              : "border-white/10 bg-slate-card/70 text-snow hover:border-kw-red/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">
                              {tpl.title}
                            </span>
                            <span className="rounded-md bg-white/10 px-2 py-0.5 text-[0.6rem] font-semibold text-snow/80">
                              {tpl.dimensions}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-stone-dark">
                            {tpl.category} · Palette: {tpl.accent}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Live Artboard Preview Mockup */}
                  <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-ink-deep p-6 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-2xl border border-kw-red/40 bg-gradient-to-br from-ink via-ink-deep to-slate-card p-8 shadow-lift-dark">
                      <div className="flex items-center justify-between">
                        <img
                          src={activeBrokerage.logos.reversed}
                          alt={activeBrokerage.name}
                          className="h-8 w-auto object-contain"
                        />
                        <span className="rounded-full bg-kw-red px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-white">
                          KW Success Brand Kit
                        </span>
                      </div>

                      <div className="my-10">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-kw-red-bright">
                          {activeCanva.category}
                        </span>
                        <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white">
                          {activeCanva.headlinePreview}
                        </h3>
                        <p className="mt-2 text-sm text-snow/85">
                          {activeCanva.subPreview}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-stone-dark">
                        <span>Advisor: Marcus Green · (801) 555-0197</span>
                        <span>Weber · Davis · Morgan Counties</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-kw-red border border-white/20" />
                        <span className="h-5 w-5 rounded-full bg-ink border border-white/20" />
                        <span className="h-5 w-5 rounded-full bg-mist border border-white/20" />
                        <span className="text-xs text-stone-dark">
                          Official KW Success Brand Tokens Locked
                        </span>
                      </div>
                      <a
                        href="https://www.canva.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-kw-red-bright hover:text-white"
                      >
                        <span>Customize Template in Canva</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: THINKIFIC TRAINING HUB MOCKUP                     */}
            {/* ======================================================== */}
            {activeTab === "thinkific" && (
              <div className="rounded-3xl border border-white/10 bg-ink p-6 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-kw-red/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Thinkific · KW Success On-Demand Coaching &amp; Playbooks
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Grow Your Business, Grow the Person, Grow Long-Term Wealth
                    </h2>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold text-snow">
                    Marcus Green · 2 of 3 Core Tracks Active
                  </span>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-12">
                  {/* Course List */}
                  <div className="space-y-3 lg:col-span-5">
                    {THINKIFIC_COURSES.map((course) => {
                      const active = course.id === selectedCourseId;
                      return (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => setSelectedCourseId(course.id)}
                          className={cn(
                            "w-full rounded-2xl border p-4 text-left transition-all",
                            active
                              ? "border-kw-red bg-kw-red/15 text-white"
                              : "border-white/10 bg-slate-card/70 text-snow hover:border-kw-red/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-kw-red-bright">
                              {course.status}
                            </span>
                            <span className="text-xs text-stone-dark">
                              {course.duration}
                            </span>
                          </div>
                          <h3 className="mt-1.5 text-sm font-bold text-white">
                            {course.title}
                          </h3>
                          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full bg-kw-red"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Course Player & Curriculum Preview */}
                  <div className="rounded-2xl border border-white/10 bg-ink-deep p-6 lg:col-span-7">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-kw-red-bright">
                          {activeCourse.instructor}
                        </span>
                        <h3 className="mt-1 text-xl font-bold text-white">
                          {activeCourse.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-kw-red px-3.5 py-1 text-xs font-bold text-white">
                        {activeCourse.progress}% Complete
                      </span>
                    </div>

                    {/* Video Player Mockup */}
                    <div className="mt-5 flex aspect-video flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-slate-card via-ink to-ink-deep p-6 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-kw-red text-white shadow-[0_0_30px_rgba(180,1,1,0.8)]">
                        <Play className="ml-1 h-7 w-7" />
                      </span>
                      <p className="mt-4 text-sm font-bold text-white">
                        Resume Lesson: {activeCourse.lessons[0]}
                      </p>
                      <p className="mt-1 text-xs text-stone-dark">
                        Includes downloadable PDF workbook, scripts &amp; Layton
                        Market Center mastermind notes
                      </p>
                    </div>

                    {/* Curriculum Lessons */}
                    <div className="mt-6 space-y-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-dark">
                        Course Modules ({activeCourse.modules} Total)
                      </span>
                      {activeCourse.lessons.map((lesson, idx) => (
                        <div
                          key={lesson}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-card/50 px-4 py-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-kw-red-bright">
                              0{idx + 1}
                            </span>
                            <span className="font-semibold text-white">
                              {lesson}
                            </span>
                          </div>
                          <CheckCircle2 className="h-4 w-4 text-kw-red-bright" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
