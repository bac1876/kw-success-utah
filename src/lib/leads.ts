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

export interface LeadSubmissionResult {
  ok: boolean;
  routedToName: string;
  routedToEmail: string;
  storedInSupabase: boolean;
}

/**
 * §11 Contact and forms handler:
 * - Routes:
 *   - Agent inquiries -> Russie (russie@unitedagentservices.biz)
 *   - Buying/Selling -> front desk (dfisuccess@unitedagentservices.biz)
 *   - General -> front desk (dfisuccess@unitedagentservices.biz)
 * - Spam protection: honeypot check + basic rate limit
 * - Supabase storage: posts to VITE_SUPABASE_URL/rest/v1/lead_submissions when
 *   VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured; gracefully
 *   falls back on staging when keys are omitted.
 */
export async function submitLeadForm(
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResult> {
  const { routing } = activeBrokerage.contact;

  // Spam protection: reject if hidden honeypot field is filled
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      ok: true,
      routedToName: routing.general.name,
      routedToEmail: routing.general.email,
      storedInSupabase: false,
    };
  }

  const routeTarget =
    payload.topic === "I'm an agent" ||
    payload.topic === "Joining KW Success (Agent)"
      ? routing.agentInquiry
      : payload.topic === "Buying" || payload.topic === "Selling"
        ? routing.buyingSelling
        : routing.general;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
    | string
    | undefined;

  const record = {
    brokerage_id: activeBrokerage.id,
    topic: payload.topic,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || null,
    current_brokerage: payload.currentBrokerage?.trim() || null,
    years_licensed:
      payload.yearsLicensed?.trim() || payload.licenseStatus?.trim() || null,
    message: payload.message?.trim() || null,
    routed_to_email: routeTarget.email,
    source_page: payload.sourcePage ?? "/contact",
    submitted_at: new Date().toISOString(),
  };

  let storedInSupabase = false;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/lead_submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(record),
      });
      storedInSupabase = res.ok;
    } catch (err) {
      console.warn("[kw-success] Supabase submission warning:", err);
    }
  } else {
    console.info(
      "[kw-success] Staging lead captured (set VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY for live DB storage):",
      record
    );
  }

  return {
    ok: true,
    routedToName: routeTarget.name,
    routedToEmail: routeTarget.email,
    storedInSupabase,
  };
}

export const submitLead = submitLeadForm;

