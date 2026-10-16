import { useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { submitLeadForm, type LeadSubmissionPayload } from "@/lib/leads";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ASKS = [
  "I'd like a Northern Utah home valuation",
  "Keep me posted on Wasatch Front listings",
  "Connect me with Unity Home Loans (lending)",
  "Connect me with Amicus Title (title & escrow)",
  "Schedule a confidential agent career conversation",
];

type ServiceConfig = {
  chip: string;
  question: string;
  intents: string[];
  asks: string[];
};

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  "real-estate": {
    chip: "Real Estate",
    question: "Where are you in the journey?",
    intents: ["I'm an agent", "Buying", "Selling", "Both", "General"],
    asks: ASKS,
  },
  title: {
    chip: "Amicus Title",
    question: "How can Amicus Title help you?",
    intents: ["Buying", "Selling", "General"],
    asks: ASKS.filter((s) => !s.includes("Amicus Title")),
  },
  mortgage: {
    chip: "Unity Home Loans",
    question: "Where are you in the financing journey?",
    intents: ["Buying", "Selling", "Refinance", "General"],
    asks: ASKS.filter((s) => !s.includes("Unity Home Loans")),
  },
  network: {
    chip: "",
    question: "What brings you to the table?",
    intents: ["I'm an agent", "Buying", "Selling", "Title", "Lending", "General"],
    asks: ASKS,
  },
};

function normalizeService(raw?: string): string {
  if (raw === "real-estate" || raw === "title" || raw === "mortgage") {
    return raw;
  }
  return "network";
}

function mapIntentToTopic(
  intent: string | null,
  service: string
): LeadSubmissionPayload["topic"] {
  const lower = (intent ?? "").toLowerCase();
  if (lower.includes("agent")) return "I'm an agent";
  if (lower.includes("buy")) return "Buying";
  if (lower.includes("sell")) return "Selling";
  if (service === "mortgage" || service === "title") return "Buying";
  return "General";
}

function ContactHero({ chip }: { chip: string }) {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[42vh] flex-col items-center justify-center overflow-hidden bg-ink"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <motion.path
          d="M -60 360 Q 600 -140 1260 340"
          fill="none"
          stroke="#B87333"
          strokeWidth="1"
          opacity={0.55}
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-copper" />
          <span className="type-label text-copper">
            {chip ? `Contact — ${chip}` : "Contact Us"}
          </span>
          <span className="h-px w-10 bg-copper" />
        </motion.div>

        <h1 className="type-display-lg mt-8 max-w-4xl text-ivory">
          <SplitWords
            text="Every Relationship Begins With a Conversation."
            stagger={0.05}
            delay={0.4}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="type-serif-accent mt-6 max-w-xl text-stone-dark"
        >
          Tell us where you are in the journey — we'll meet you there.
        </motion.p>
      </div>
    </section>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  error,
  shakeKey,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  shakeKey: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <motion.div
      key={shakeKey}
      animate={shakeKey > 0 && error ? { x: [0, -4, 4, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      <label
        className={cn(
          "pointer-events-none absolute left-0 transition-all duration-300",
          active
            ? "top-0 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-copper"
            : "top-6 text-[0.95rem] font-light text-stone"
        )}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full border-b bg-transparent pb-3 pt-6 text-[0.95rem] font-light text-ink outline-none transition-colors",
          error || focused ? "border-copper" : "border-[rgba(18,20,19,0.18)]"
        )}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactWizard({ serviceKey }: { serviceKey: string }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const reduced = useReducedMotion();
  const { contact } = activeBrokerage;

  const cfg = SERVICE_CONFIGS[serviceKey] ?? SERVICE_CONFIGS.network;
  const totalSteps = 3;

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [intent, setIntent] = useState<string | null>(() => {
    const raw = searchParams.get("topic") ?? searchParams.get("intent");
    if (!raw) return null;
    const lower = raw.toLowerCase();
    if (lower.includes("agent")) return "I'm an agent";
    if (lower.includes("buy")) return "Buying";
    if (lower.includes("sell")) return "Selling";
    return (
      cfg.intents.find((i) => i.toLowerCase().startsWith(lower)) ?? null
    );
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentBrokerage, setCurrentBrokerage] = useState("");
  const [yearsLicensed, setYearsLicensed] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAsks, setSelectedAsks] = useState<string[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    routedToName: string;
    routedToEmail: string;
  } | null>(null);

  const topic = mapIntentToTopic(intent, serviceKey);
  const isAgentTopic = topic === "I'm an agent";
  const activeRouteInfo = isAgentTopic
    ? contact.routing.agentInquiry
    : topic === "Buying" || topic === "Selling"
      ? contact.routing.buyingSelling
      : contact.routing.general;

  const goStep = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const validateDetails = () => {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) errs.name = "We'd love to know your name";
    if (!email.trim()) {
      errs.email = "An email lets us reach you";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "That email looks incomplete";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setShakeKey((k) => k + 1);
      return false;
    }
    return true;
  };

  const handleFinish = async () => {
    if (submitting) return;
    setSubmitting(true);
    const fullMessage = [
      message.trim(),
      selectedAsks.length > 0 ? `Interests: ${selectedAsks.join("; ")}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const res = await submitLeadForm({
      topic,
      name,
      email,
      phone,
      currentBrokerage: isAgentTopic ? currentBrokerage : undefined,
      yearsLicensed: isAgentTopic ? yearsLicensed : undefined,
      message: fullMessage,
      sourcePage: location.pathname,
      honeypot,
    });
    setSubmitting(false);
    setSubmittedResult({
      routedToName: res.routedToName,
      routedToEmail: res.routedToEmail,
    });
  };

  const firstName = name.trim().split(" ")[0] || "friend";

  const stepVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: reduced ? 0 : 40 * d,
    }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({
      opacity: 0,
      x: reduced ? 0 : -40 * d,
    }),
  };

  const stepLabel =
    step === 0
      ? "01 — Where are you?"
      : step === 1
        ? "02 — How do we reach you?"
        : "03 — Your next chapter";

  return (
    <div className="relative border hairline-light bg-white">
      {/* Honeypot */}
      <input
        type="text"
        name="company_website_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Top progress bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-line-light">
        <motion.div
          className="h-full origin-left bg-copper"
          animate={{
            scaleX: submittedResult ? 1 : (step + 1) / totalSteps,
          }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>

      <AnimatePresence mode="wait">
        {submittedResult ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center px-8 py-16 text-center md:px-14"
          >
            <motion.img
              src="/logomark.svg"
              alt=""
              className="h-16 w-16"
              initial={reduced ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
              className="type-display-md mt-6 text-ink"
            >
              Thank you, {firstName}.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              className="type-body mt-4 max-w-md text-stone"
            >
              Your note has been routed to{" "}
              <span className="font-medium text-ink">
                {submittedResult.routedToName} ({submittedResult.routedToEmail})
              </span>
              . A trusted advisor — not an autoresponder — will reach out
              shortly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            >
              <Link
                to="/areas-served"
                className="type-label mt-8 inline-block text-copper transition-colors hover:text-copper-bright"
              >
                Explore our Wasatch Front communities while you wait →
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0 }}
            className="px-8 py-10 md:px-12"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="type-label text-copper">{stepLabel}</p>
              <span className="flex items-center gap-3">
                {cfg.chip && (
                  <span className="border border-copper/50 px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-copper">
                    {cfg.chip}
                  </span>
                )}
                <span className="type-body-sm text-stone">
                  {step + 1} / {totalSteps}
                </span>
              </span>
            </div>

            <div className="mt-8 overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                {step === 0 && (
                  <motion.div
                    key="step-intent"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p className="type-serif-accent !text-[1.5rem] text-ink/80">
                      {cfg.question}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {cfg.intents.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setIntent(item)}
                          className={cn(
                            "rounded-full border px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.22em] transition-all duration-300",
                            intent === item
                              ? "border-copper bg-copper text-ink"
                              : "border-[rgba(18,20,19,0.25)] text-ink hover:border-copper hover:text-copper"
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    {intent && (
                      <p className="type-body-sm mt-6 text-stone">
                        Routes directly to:{" "}
                        <span className="font-medium text-ink">
                          {activeRouteInfo.name} ({activeRouteInfo.email})
                        </span>
                      </p>
                    )}

                    <div className="mt-10 flex justify-end">
                      <button
                        type="button"
                        disabled={!intent}
                        onClick={() => goStep(1)}
                        className={cn(
                          "rounded-full px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] transition-all duration-300",
                          intent
                            ? "bg-copper text-ink hover:bg-copper-bright"
                            : "cursor-not-allowed bg-ivory-deep text-stone"
                        )}
                      >
                        Continue →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step-details"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="grid gap-8 sm:grid-cols-2">
                      <FloatingInput
                        label="Full name"
                        value={name}
                        onChange={setName}
                        error={errors.name}
                        shakeKey={shakeKey}
                      />
                      <FloatingInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                        shakeKey={shakeKey}
                      />
                      <FloatingInput
                        label="Phone (optional)"
                        type="tel"
                        value={phone}
                        onChange={setPhone}
                        shakeKey={shakeKey}
                      />
                      {isAgentTopic ? (
                        <div className="relative">
                          <label className="absolute left-0 top-0 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-copper">
                            Years Licensed
                          </label>
                          <select
                            value={yearsLicensed}
                            onChange={(e) => setYearsLicensed(e.target.value)}
                            className="w-full appearance-none border-b border-[rgba(18,20,19,0.18)] bg-transparent pb-3 pt-6 text-[0.95rem] font-light text-ink outline-none transition-colors focus:border-copper"
                          >
                            <option value="">Select…</option>
                            <option value="New / Getting Licensed">
                              New / Getting Licensed
                            </option>
                            <option value="1–2 years">1–2 years</option>
                            <option value="3–5 years">3–5 years</option>
                            <option value="6–10 years">6–10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>
                      ) : (
                        <div className="relative">
                          <label className="absolute left-0 top-0 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-copper">
                            Primary County
                          </label>
                          <select
                            value={currentBrokerage}
                            onChange={(e) =>
                              setCurrentBrokerage(e.target.value)
                            }
                            className="w-full appearance-none border-b border-[rgba(18,20,19,0.18)] bg-transparent pb-3 pt-6 text-[0.95rem] font-light text-ink outline-none transition-colors focus:border-copper"
                          >
                            <option value="">Select county…</option>
                            <option value="Davis County">
                              Davis County (Layton, Kaysville, Bountiful…)
                            </option>
                            <option value="Weber County">
                              Weber County (Ogden, South Ogden, Eden…)
                            </option>
                            <option value="Morgan County">
                              Morgan County (Morgan, Mountain Green…)
                            </option>
                            <option value="Salt Lake / Other">
                              Salt Lake / Other Wasatch Front
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => goStep(0)}
                        className="type-label text-stone transition-colors hover:text-copper"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => validateDetails() && goStep(2)}
                        className="rounded-full bg-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
                      >
                        Continue →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-message"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <label className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-copper">
                      Your message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder={
                        isAgentTopic
                          ? "Tell Russie about your real estate practice and goals…"
                          : "Tell us about your next chapter in Northern Utah…"
                      }
                      className="mt-3 w-full resize-none border-b border-[rgba(18,20,19,0.18)] bg-transparent pb-3 text-[0.95rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper"
                    />

                    <div className="mt-6 flex flex-col gap-3">
                      {cfg.asks.map((ask) => {
                        const checked = selectedAsks.includes(ask);
                        return (
                          <button
                            key={ask}
                            type="button"
                            onClick={() =>
                              setSelectedAsks(
                                checked
                                  ? selectedAsks.filter((a) => a !== ask)
                                  : [...selectedAsks, ask]
                              )
                            }
                            className="group flex items-center gap-3 text-left"
                          >
                            <span
                              className={cn(
                                "flex h-4 w-4 items-center justify-center border transition-colors duration-300",
                                checked
                                  ? "border-copper bg-copper"
                                  : "border-[rgba(18,20,19,0.3)] group-hover:border-copper"
                              )}
                            >
                              {checked && (
                                <svg
                                  viewBox="0 0 10 8"
                                  className="h-2.5 w-2.5 text-ink"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <path d="M1 4l2.5 2.5L9 1" />
                                </svg>
                              )}
                            </span>
                            <span className="type-body-sm text-ink/75">
                              {ask}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => goStep(1)}
                        className="type-label text-stone transition-colors hover:text-copper"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={handleFinish}
                        disabled={submitting}
                        className="relative flex items-center gap-3 rounded-full bg-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-copper-bright disabled:opacity-80"
                      >
                        {submitting && (
                          <motion.svg
                            viewBox="0 0 20 20"
                            className="h-4 w-4"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeDasharray="30 20"
                              strokeLinecap="round"
                            />
                          </motion.svg>
                        )}
                        {submitting ? "Sending…" : "Start the Conversation"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OfficeSidebar() {
  const { name, contact, externalLinks } = activeBrokerage;

  return (
    <Reveal y={40}>
      <div className="bg-ink p-8 md:p-10">
        <p className="type-label text-copper">{name}</p>
        <p className="type-body mt-5 text-white">
          One relationship for the life of the home — real estate, mortgage
          lending, and title &amp; escrow across Weber, Davis, and Morgan
          Counties.
        </p>

        <a
          href={`mailto:${contact.generalEmail}`}
          className="mt-6 flex items-center gap-2 text-[0.9rem] font-light text-ivory/85 transition-colors hover:text-copper"
        >
          <Mail className="h-4 w-4 text-copper" strokeWidth={1.5} />
          {contact.generalEmail}
        </a>

        <div className="mt-7 flex gap-3">
          <a
            href={externalLinks.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-copper/60 text-copper transition-all duration-300 hover:bg-copper hover:text-ink"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href={externalLinks.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-copper/60 text-copper transition-all duration-300 hover:bg-copper hover:text-ink"
          >
            <Facebook className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href={externalLinks.socials.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Reviews"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-copper/60 text-copper transition-all duration-300 hover:bg-copper hover:text-ink"
          >
            <Star className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        {/* Layton Market Center Details */}
        <div className="mt-8 border-t hairline-dark pt-6">
          <p className="type-label text-ivory/80">Layton Market Center</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-1 h-4 w-4 shrink-0 text-copper"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-[0.9rem] font-light text-white">
                  {contact.addressLine1}
                </p>
                <p className="type-body-sm text-stone-dark">
                  {contact.addressLine2}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t hairline-dark pt-4">
              <Phone
                className="mt-1 h-4 w-4 shrink-0 text-copper"
                strokeWidth={1.5}
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[0.72rem] uppercase tracking-[0.2em] text-stone-dark">
                    Main Office Phone
                  </span>
                  {contact.phoneIsPlaceholder && (
                    <SampleChip label="PLACEHOLDER" />
                  )}
                </div>
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="mt-1 block text-[0.9rem] font-light text-white transition-colors hover:text-copper"
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t hairline-dark pt-4">
              <Clock
                className="mt-1 h-4 w-4 shrink-0 text-copper"
                strokeWidth={1.5}
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[0.72rem] uppercase tracking-[0.2em] text-stone-dark">
                    Office Hours
                  </span>
                  {contact.hoursIsPlaceholder && (
                    <SampleChip label="PLACEHOLDER" />
                  )}
                </div>
                <p className="mt-1 text-[0.9rem] font-light text-stone-dark">
                  {contact.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function MapBand() {
  const reduced = useReducedMotion();
  const { contact } = activeBrokerage;

  return (
    <section className="relative bg-ink">
      <div className="relative h-[480px] overflow-hidden">
        <img
          src="/map-placeholder.jpg"
          alt="Stylized map of Northern Utah and the Wasatch Front"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />

        {/* Pulsing Copper Pin */}
        <motion.div
          initial={reduced ? false : { y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative flex items-center justify-center">
            <motion.span
              animate={
                reduced
                  ? undefined
                  : { scale: [1, 2.4], opacity: [0.7, 0] }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute h-10 w-10 rounded-full border border-copper"
            />
            <MapPin
              className="h-9 w-9 text-copper"
              strokeWidth={1.25}
              fill="#121413"
            />
          </span>
        </motion.div>

        {/* Floating Overlay Card */}
        <motion.div
          initial={reduced ? false : { x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute left-[clamp(20px,5vw,64px)] top-10 max-w-xs border hairline-dark bg-ink p-6"
        >
          <p className="type-label text-copper">Across the Wasatch Front</p>
          <p className="type-body-sm mt-4 text-ivory/85">
            {contact.fullAddress} — serving Davis, Weber, and Morgan Counties.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              to="/areas-served"
              className="type-label flex items-center gap-2 text-copper transition-colors hover:text-copper-bright"
            >
              Interactive Network Map{" "}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <a
              href="https://www.google.com/maps?q=1572+N+Woodland+Park+Dr+Suite+500+Layton+UT+84041"
              target="_blank"
              rel="noopener noreferrer"
              className="type-body-sm text-stone-dark underline transition-colors hover:text-ivory"
            >
              Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const REASSURANCES = [
  {
    icon: MessageSquare,
    title: "A human replies",
    note: "No bots. No drip campaigns. Russie or our front desk team.",
  },
  {
    icon: MapPin,
    title: "Your pace",
    note: "Exploring is a perfectly good reason to say hello.",
  },
  {
    icon: Lock,
    title: "Your data, respected",
    note: "Stored securely and shared only with your KW Success advisor.",
  },
];

function ReassuranceBand() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-ivory py-20 md:py-24">
      <div className="container-monogram grid gap-10 md:grid-cols-3 md:gap-0">
        {REASSURANCES.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "flex flex-col items-center px-8 text-center",
              i > 0 && "md:border-l hairline-light"
            )}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
            >
              <item.icon
                className="h-6 w-6 text-copper"
                strokeWidth={1.25}
              />
            </motion.div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                delay: 0.15 * i + 0.25,
                duration: 0.6,
                ease: EASE,
              }}
            >
              <p className="type-label mt-4 text-ink">{item.title}</p>
              <p className="type-body-sm mt-3 text-stone">{item.note}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Contact() {
  const { service } = useParams<{ service?: string }>();
  const serviceKey = normalizeService(service);
  const chip = SERVICE_CONFIGS[serviceKey]?.chip ?? "";

  return (
    <>
      <ContactHero chip={chip} />
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactWizard key={serviceKey} serviceKey={serviceKey} />
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <OfficeSidebar />
          </div>
        </div>
      </section>
      <MapBand />
      <ReassuranceBand />
    </>
  );
}
