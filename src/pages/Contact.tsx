import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
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
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { submitLeadForm, type LeadSubmissionPayload } from "@/lib/leads";
import { cn } from "@/lib/utils";

/**
 * §11 Contact and forms (/contact)
 * - Contact page: office address, main office phone [PLACEHOLDER: Marcus to confirm], office hours [PLACEHOLDER], map embed, and a general form.
 * - Form topics: I'm an agent · Buying · Selling · General.
 * - Routing:
 *   - Agent inquiries -> Russie (russie@unitedagentservices.biz)
 *   - Buying/Selling -> front desk (dfisuccess@unitedagentservices.biz)
 *   - General -> front desk (dfisuccess@unitedagentservices.biz)
 * - Data ownership:
 *   - Store every submission in a database Marcus owns (Supabase), as well as sending the email.
 *   - Add spam protection.
 *   - No passwords or credentials are ever collected.
 */

const TOPICS: LeadSubmissionPayload["topic"][] = [
  "I'm an agent",
  "Buying",
  "Selling",
  "General",
];

function parseInitialTopic(
  raw: string | null
): LeadSubmissionPayload["topic"] {
  if (!raw) return "General";
  const lower = raw.toLowerCase();
  if (lower.includes("agent")) return "I'm an agent";
  if (lower.includes("buy")) return "Buying";
  if (lower.includes("sell")) return "Selling";
  return "General";
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { contact, externalLinks } = activeBrokerage;

  const [topic, setTopic] = useState<LeadSubmissionPayload["topic"]>(() =>
    parseInitialTopic(searchParams.get("topic") ?? searchParams.get("intent"))
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentBrokerage, setCurrentBrokerage] = useState("");
  const [yearsLicensed, setYearsLicensed] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    routedToName: string;
    routedToEmail: string;
  } | null>(null);

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
      sourcePage: "/contact",
      honeypot,
    });
    setSubmitting(false);
    setResult({
      routedToName: res.routedToName,
      routedToEmail: res.routedToEmail,
    });
  };

  const inputCls =
    "w-full border hairline-light bg-snow px-4 py-3.5 text-[0.95rem] text-kw-ink outline-none transition-colors placeholder:text-kw-gray focus:border-kw-red";

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[45vh] flex-col items-center justify-center overflow-hidden bg-kw-ink text-white"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className="h-0.5 w-10 bg-kw-red" />
            <span className="type-label text-kw-red-bright">CONTACT US</span>
            <span className="h-0.5 w-10 bg-kw-red" />
          </motion.div>

          <h1 className="type-display-lg mt-7 max-w-4xl text-white text-balance">
            <SplitWords
              text="YOUR SUCCESS STORY STARTS WITH ONE CONVERSATION."
              stagger={0.04}
              delay={0.3}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="type-lead mt-6 max-w-2xl text-white/85"
          >
            Whether you are an agent exploring your next chapter or a homeowner buying or selling in Northern Utah, we are here to help.
          </motion.p>
        </div>
      </section>

      {/* Main Contact Section: Form + Office Info Sidebar */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* Left: Topic-routed General Form (§11) */}
          <Reveal y={24}>
            <div className="border hairline-light bg-white p-8 shadow-lift md:p-12">
              {result ? (
                <div className="py-12 text-center">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-kw-red text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h2 className="type-display-md mt-6 text-kw-ink">
                    Thank you, {name.trim().split(" ")[0]}.
                  </h2>
                  <p className="type-body mx-auto mt-3 max-w-md text-charcoal">
                    Your inquiry ({topic}) has been routed to{" "}
                    <strong>{result.routedToName}</strong> (
                    {result.routedToEmail}). We will be in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setMessage("");
                    }}
                    className="mt-8 border border-kw-ink px-6 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-kw-ink hover:bg-kw-ink hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Honeypot spam protection (§11) */}
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

                  {/* Form topics (§11): I'm an agent · Buying · Selling · General */}
                  <div>
                    <label className="type-label mb-3 block text-kw-ink">
                      What can we help you with?
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
                              "border px-4 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] transition-all",
                              active
                                ? "border-kw-red bg-kw-red text-white shadow-sm"
                                : "border-charcoal/20 bg-snow text-kw-ink hover:border-kw-red"
                            )}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2.5 text-[0.76rem] text-kw-gray">
                      Routes to:{" "}
                      <strong className="font-medium text-charcoal">
                        {activeRouteInfo.name} ({activeRouteInfo.email})
                      </strong>
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Name *
                      </label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Email *
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

                  <div
                    className={cn(
                      "grid gap-5",
                      isAgentTopic ? "sm:grid-cols-3" : "sm:grid-cols-1"
                    )}
                  >
                    <div>
                      <label className="type-label mb-2 block text-kw-ink">
                        Phone
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
                      <>
                        <div>
                          <label className="type-label mb-2 block text-kw-ink">
                            Current Brokerage
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
                        <div>
                          <label className="type-label mb-2 block text-kw-ink">
                            Years Licensed
                          </label>
                          <select
                            value={yearsLicensed}
                            onChange={(e) => setYearsLicensed(e.target.value)}
                            className={inputCls}
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
                      </>
                    )}
                  </div>

                  <div>
                    <label className="type-label mb-2 block text-kw-ink">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        isAgentTopic
                          ? "Tell Russie a little about your business and goals…"
                          : "How can our team help you?"
                      }
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-kw-red px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-kw-red-bright disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Send Message"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Right: Office Address, Phone [PLACEHOLDER], Hours [PLACEHOLDER], Socials */}
          <Reveal delay={0.15} y={24}>
            <div className="flex flex-col gap-6">
              <div className="border hairline-light bg-white p-8 shadow-sm md:p-10">
                <span className="type-label text-kw-red">LAYTON OFFICE</span>
                <h2 className="mt-2 text-[1.35rem] font-semibold text-kw-ink">
                  {activeBrokerage.name}
                </h2>

                <div className="mt-6 space-y-5 border-t hairline-light pt-6">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-kw-red" />
                    <div>
                      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-kw-gray">
                        Office Address
                      </p>
                      <p className="mt-1 text-[0.95rem] font-medium text-kw-ink">
                        {contact.addressLine1}
                      </p>
                      <p className="text-[0.95rem] text-charcoal">
                        {contact.addressLine2}
                      </p>
                    </div>
                  </div>

                  {/* Main Office Phone [PLACEHOLDER: Marcus to confirm] */}
                  <div className="flex items-start gap-3.5">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-kw-red" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-kw-gray">
                          Main Office Phone
                        </p>
                        {contact.phoneIsPlaceholder && (
                          <SampleChip label="PLACEHOLDER: Marcus to confirm" />
                        )}
                      </div>
                      <a
                        href={`tel:${contact.phone.replace(/\D/g, "")}`}
                        className="mt-1 inline-block text-[0.95rem] font-medium text-kw-ink hover:text-kw-red"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Office Hours [PLACEHOLDER] */}
                  <div className="flex items-start gap-3.5">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-kw-red" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-kw-gray">
                          Office Hours
                        </p>
                        {contact.hoursIsPlaceholder && (
                          <SampleChip label="PLACEHOLDER" />
                        )}
                      </div>
                      <p className="mt-1 text-[0.95rem] text-charcoal">
                        {contact.hours}
                      </p>
                    </div>
                  </div>

                  {/* Front Desk Email */}
                  <div className="flex items-start gap-3.5">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-kw-red" />
                    <div>
                      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-kw-gray">
                        Email
                      </p>
                      <a
                        href={`mailto:${contact.generalEmail}`}
                        className="mt-1 inline-block text-[0.95rem] font-medium text-kw-ink hover:text-kw-red"
                      >
                        {contact.generalEmail}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Connect links */}
                <div className="mt-8 border-t hairline-light pt-6">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-kw-gray">
                    Connect With Us
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={externalLinks.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border hairline-light bg-snow px-4 py-2 text-[0.78rem] font-medium text-kw-ink transition-colors hover:border-kw-red hover:text-kw-red"
                    >
                      <Facebook className="h-4 w-4 text-kw-red" />
                      Facebook
                    </a>
                    <a
                      href={externalLinks.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border hairline-light bg-snow px-4 py-2 text-[0.78rem] font-medium text-kw-ink transition-colors hover:border-kw-red hover:text-kw-red"
                    >
                      <Instagram className="h-4 w-4 text-kw-red" />
                      Instagram
                    </a>
                    <a
                      href={externalLinks.socials.googleReviews}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border hairline-light bg-snow px-4 py-2 text-[0.78rem] font-medium text-kw-ink transition-colors hover:border-kw-red hover:text-kw-red"
                    >
                      <Star className="h-4 w-4 text-kw-red" />
                      Google Reviews <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §11 Map Embed for 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041 */}
      <section className="border-t hairline-light bg-mist">
        <div className="h-[420px] w-full">
          <iframe
            title="KW Success Keller Williams Realty — 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041"
            src="https://www.google.com/maps?q=1572+N+Woodland+Park+Dr+Suite+500+Layton+UT+84041&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
