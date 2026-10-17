import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import { HEADER_H } from "@/components/Navbar";
import SplitChars from "@/components/motion/SplitChars";
import {
  submitLeadForm,
  type LeadSubmissionPayload,
  type LeadSubmissionResult,
} from "@/lib/leads";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/usePageMeta";

const TOPICS: LeadSubmissionPayload["topic"][] = [
  "I'm an agent",
  "Buying",
  "Selling",
  "General",
];

function parseInitialTopic(
  raw: string | null,
  serviceParam?: string
): LeadSubmissionPayload["topic"] {
  if (serviceParam === "mortgage" || serviceParam === "title") {
    return "Buying";
  }
  if (!raw) return "General";
  const lower = raw.toLowerCase();
  if (lower.includes("agent")) return "I'm an agent";
  if (lower.includes("buy")) return "Buying";
  if (lower.includes("sell")) return "Selling";
  return "General";
}

export default function Contact() {
  usePageMeta("Contact Us", `Visit our ${activeBrokerage.contact.officeName} or send a direct message.`);
  const [searchParams] = useSearchParams();
  const { service } = useParams<{ service?: string }>();
  const { contact, externalLinks } = activeBrokerage;

  const [topic, setTopic] = useState<LeadSubmissionPayload["topic"]>(() =>
    parseInitialTopic(
      searchParams.get("topic") ?? searchParams.get("intent"),
      service
    )
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentBrokerage, setCurrentBrokerage] = useState("");
  const [yearsLicensed, setYearsLicensed] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LeadSubmissionResult | null>(null);

  const isAgentTopic = topic === "I'm an agent";

  const activeRouteInfo = isAgentTopic
    ? contact.routing.agentInquiry
    : topic === "Buying" || topic === "Selling"
      ? contact.routing.buyingSelling
      : contact.routing.general;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || submitting) return;
    setSubmitting(true);
    const res = await submitLeadForm({
      topic,
      name,
      email,
      phone,
      currentBrokerage: isAgentTopic ? currentBrokerage : undefined,
      yearsLicensed: isAgentTopic ? yearsLicensed : undefined,
      message,
      sourcePage: service ? `/contact/${service}` : "/contact",
      honeypot,
    });
    setSubmitting(false);
    setResult(res);
  };

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-ink-deep px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-stone-dark focus:border-kw-red";

  return (
    <>
      {/* §11 Hero (Dark Slate) */}
      <section
        className="relative flex min-h-[48dvh] items-center overflow-hidden bg-ink-deep pb-14 pt-[150px] text-snow"
        style={{ marginTop: -HEADER_H }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,23,26,0.98) 0%, rgba(31,35,38,0.88) 60%, rgba(180,1,1,0.2) 100%)",
          }}
        />
        <div className="container-kw relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-kw-red-bright" />
              <span className="type-label text-kw-red-bright">
                Contact KW Success
              </span>
            </div>

            <h1 className="type-display-xl mt-6 text-white">
              <SplitChars
                text="START A CONVERSATION."
                delay={0.15}
                stagger={0.02}
              />
            </h1>
            <p className="type-lead mt-4 text-stone-dark">
              Visit our {contact.officeName} or send a direct message below.
            </p>
          </div>
        </div>
      </section>

      {/* §11 Contact Info + Form + Map (Cool Sky Mist + Dark Slate Form Card) */}
      <section className="bg-mist py-20 text-ink md:py-28">
        <div className="container-kw">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left Column: Layton Market Center Details + Map Embed */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-card">
                <span className="type-label text-kw-red">
                  {contact.officeName}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-ink">
                  {activeBrokerage.name}
                </h2>

                <div className="mt-6 space-y-4 text-sm text-charcoal">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-kw-red" />
                    <div>
                      <p className="font-semibold text-ink">
                        {contact.addressLine1}
                      </p>
                      <p>{contact.addressLine2}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-kw-red" />
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
                      className="font-semibold text-ink hover:text-kw-red"
                    >
                      {contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-kw-red" />
                    <span>{contact.hours}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-kw-red" />
                    <a
                      href={`mailto:${contact.generalEmail}`}
                      className="font-medium text-ink hover:text-kw-red"
                    >
                      {contact.generalEmail}
                    </a>
                  </div>
                </div>

                {/* Socials */}
                <div className="mt-6 flex items-center gap-2.5 border-t border-ink/10 pt-5">
                  <a
                    href={externalLinks.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-kw-red hover:bg-kw-red hover:text-white"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={externalLinks.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-kw-red hover:bg-kw-red hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={externalLinks.socials.googleReviews}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Reviews"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-kw-red hover:bg-kw-red hover:text-white"
                  >
                    <Star className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Map Embed (§11) */}
              <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
                <iframe
                  title={`${activeBrokerage.shortName} ${contact.officeName} Map`}
                  src={contact.mapsEmbedUrl}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column: §11 Topic-Routed Form (Dark Slate Card) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-ink p-8 text-snow shadow-lift md:p-11">
                {result?.ok ? (
                  <div className="py-16 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-kw-red-bright" />
                    <h3 className="mt-5 text-2xl font-bold text-white">
                      Message Received
                    </h3>
                    <p className="mt-3 text-sm text-stone-dark">
                      Your inquiry has been routed to{" "}
                      <span className="font-semibold text-white">
                        {result.routedToName} ({result.routedToEmail})
                      </span>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setResult(null)}
                      className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-snow hover:border-kw-red"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : result ? (
                  <div className="py-16 text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-kw-red-bright" />
                    <h3 className="mt-5 text-2xl font-bold text-white">
                      {result.reason === "rate-limited"
                        ? "Please Wait a Moment"
                        : "We Couldn't Send This Right Now"}
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-sm text-stone-dark">
                      {result.reason === "rate-limited"
                        ? "You just sent a message. Give it about 30 seconds before trying again, or "
                        : "Your message was not delivered. Please "}
                      email{" "}
                      <a
                        href={result.mailtoHref}
                        className="font-semibold text-white underline decoration-kw-red underline-offset-4 hover:text-kw-red-bright"
                      >
                        {result.routedToName} ({result.routedToEmail})
                      </a>{" "}
                      or call{" "}
                      <a
                        href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
                        className="font-semibold text-white hover:text-kw-red-bright"
                      >
                        {contact.phone}
                      </a>
                      . The email link opens with your message already filled
                      in.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={result.mailtoHref}
                        className="inline-flex items-center gap-2 rounded-full bg-kw-red px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-kw-red-bright"
                      >
                        <Mail className="h-4 w-4" />
                        Email Instead
                      </a>
                      <button
                        type="button"
                        onClick={() => setResult(null)}
                        className="rounded-full border border-white/20 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-snow hover:border-kw-red"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-stone-dark">
                        1. Select a Topic
                      </label>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {TOPICS.map((t) => {
                          const active = topic === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTopic(t)}
                              className={cn(
                                "rounded-xl border px-3.5 py-3 text-xs font-bold uppercase tracking-wider transition-all",
                                active
                                  ? "border-kw-red bg-kw-red text-white shadow-sm"
                                  : "border-white/15 bg-ink-deep text-stone-dark hover:border-white/30 hover:text-white"
                              )}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-2.5 text-xs text-stone-dark">
                        Direct routing:{" "}
                        <span className="font-semibold text-snow">
                          {activeRouteInfo.name} ({activeRouteInfo.email})
                        </span>
                      </p>
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="company_website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Full Name *
                        </label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(801) 555-0199"
                          className={inputCls}
                        />
                      </div>

                      {isAgentTopic && (
                        <div>
                          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                            Current Brokerage (Optional)
                          </label>
                          <input
                            value={currentBrokerage}
                            onChange={(e) =>
                              setCurrentBrokerage(e.target.value)
                            }
                            placeholder="Optional"
                            className={inputCls}
                          />
                        </div>
                      )}
                    </div>

                    {isAgentTopic && (
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                          Years Licensed
                        </label>
                        <select
                          value={yearsLicensed}
                          onChange={(e) => setYearsLicensed(e.target.value)}
                          className={inputCls}
                        >
                          <option value="">Select stage</option>
                          <option value="Pre-licensing / New">
                            Pre-licensing / Brand New
                          </option>
                          <option value="1–2 years">1–2 years</option>
                          <option value="3–5 years">3–5 years</option>
                          <option value="5–10 years">5–10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can our team help you?"
                        className={inputCls}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright disabled:opacity-50"
                    >
                      <span>{submitting ? "Sending…" : "Send Message"}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
