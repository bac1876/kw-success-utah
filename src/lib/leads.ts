import { activeBrokerage } from "@/brokerages";

export interface LeadSubmissionPayload {
  topic:
    | "I'm an agent"
    | "Joining KW Success (Agent)"
    | "Buying"
    | "Selling"
    | "General";
  name: string;
  email: string;
  phone?: string;
  currentBrokerage?: string;
  yearsLicensed?: string;
  licenseStatus?: string;
  message?: string;
  sourcePage?: string;
  honeypot?: string;
}

export type LeadFailureReason =
  | "not-configured"
  | "delivery-failed"
  | "rate-limited";

export interface LeadSubmissionResult {
  /** True only when the lead was actually accepted by a configured delivery path. */
  ok: boolean;
  routedToName: string;
  routedToEmail: string;
  storedInSupabase: boolean;
  /** Pre-filled mailto: link so the visitor can still reach the right inbox when ok is false. */
  mailtoHref: string;
  reason?: LeadFailureReason;
}

const RATE_LIMIT_KEY = "kw_success_lead_last_submit";
const RATE_LIMIT_MS = 30_000;

/** Simple client-side rate limit: one submit per 30 seconds per browser. */
function isRateLimited(): boolean {
  try {
    const last = Number(window.localStorage.getItem(RATE_LIMIT_KEY) ?? 0);
    return Number.isFinite(last) && Date.now() - last < RATE_LIMIT_MS;
  } catch {
    return false;
  }
}

function markSubmitted() {
  try {
    window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  } catch {
    /* storage unavailable (private mode etc.) — fall through */
  }
}

/** Builds a mailto: link that carries the form contents into the visitor's mail client. */
export function buildLeadMailto(
  to: string,
  payload: LeadSubmissionPayload
): string {
  const subject = `${activeBrokerage.shortName} website inquiry — ${payload.topic}`;
  const lines = [
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    payload.phone?.trim() ? `Phone: ${payload.phone.trim()}` : null,
    payload.currentBrokerage?.trim()
      ? `Current brokerage: ${payload.currentBrokerage.trim()}`
      : null,
    payload.yearsLicensed?.trim()
      ? `Years licensed: ${payload.yearsLicensed.trim()}`
      : null,
    payload.licenseStatus?.trim()
      ? `License status: ${payload.licenseStatus.trim()}`
      : null,
    "",
    payload.message?.trim() || "",
  ].filter((l): l is string => l !== null);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * §11 Contact and forms handler:
 * - Routes:
 *   - Agent inquiries -> Leadership Team (admin@unitedagentservices.biz)
 *   - Buying/Selling -> admin@unitedagentservices.biz
 *   - General -> admin@unitedagentservices.biz
 * - Spam protection: honeypot check + one submit per 30s (localStorage)
 * - Email delivery: posts to /api/submit-lead serverless function which uses
 *   Resend to email admin@unitedagentservices.biz
 * - When no delivery path is configured, or the POST fails, returns ok:false
 *   so the UI can offer the visitor a direct email/phone fallback instead of
 *   claiming the message was delivered.
 */
export async function submitLeadForm(
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResult> {
  const { routing } = activeBrokerage.contact;

  const routeTarget =
    payload.topic === "I'm an agent" ||
    payload.topic === "Joining KW Success (Agent)"
      ? routing.agentInquiry
      : payload.topic === "Buying" || payload.topic === "Selling"
        ? routing.buyingSelling
        : routing.general;

  const mailtoHref = buildLeadMailto(routeTarget.email, payload);

  // Spam protection: silently "accept" if the hidden honeypot field is filled
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      ok: true,
      routedToName: routing.general.name,
      routedToEmail: routing.general.email,
      storedInSupabase: false,
      mailtoHref,
    };
  }

  if (isRateLimited()) {
    return {
      ok: false,
      reason: "rate-limited",
      routedToName: routeTarget.name,
      routedToEmail: routeTarget.email,
      storedInSupabase: false,
      mailtoHref,
    };
  }

  let emailSent = false;
  try {
    const res = await fetch("/api/submit-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        sourcePage: payload.sourcePage ?? window.location.pathname,
      }),
    });
    
    if (res.ok) {
      emailSent = true;
      markSubmitted();
    } else {
      const errorData = await res.json();
      console.warn("[kw-success] Email submission failed:", errorData);
    }
  } catch (err) {
    console.warn("[kw-success] Email submission error:", err);
  }

  return {
    ok: emailSent,
    reason: emailSent ? undefined : "delivery-failed",
    routedToName: routeTarget.name,
    routedToEmail: routeTarget.email,
    storedInSupabase: emailSent,
    mailtoHref,
  };
}

export const submitLead = submitLeadForm;
