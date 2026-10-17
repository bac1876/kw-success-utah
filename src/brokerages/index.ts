import type { BrokerageConfig, BrokerageId } from "./types";
import { kwSuccessConfig } from "./kw-success/config";
import { AREA_GROUPS } from "@/data/areas";

/**
 * Monogram Network config preserved in the same schema so switching
 * VITE_BROKERAGE=monogram or adding brokerage #3 is purely a config change.
 */
export const monogramConfig: BrokerageConfig = {
  ...kwSuccessConfig,
  id: "monogram",
  name: "Monogram Network",
  shortName: "Monogram",
  legalName: "Onward Management, LLC",
  tagline: "Trusted Relationships Around the Life of the Home.",
  subTagline: "Serving the Chicagoland Area",
  foundedYear: 2010,
  designatedBroker: "Pete Economos",
  logos: {
    fullColor: "/logo-stacked.svg",
    reversed: "/logo-stacked.svg",
    grayscale: "/logo-mono-white.svg",
    markOnly: "/logomark.svg",
  },
  theme: {
    mode: "dark",
    accent: "#B87333",
    accentBright: "#D09454",
    ink: "#121413",
    inkDeep: "#0C0D0C",
    surface: "#F5F1EA",
    surfaceAlt: "#EAE3D6",
    card: "#FFFFFF",
    textPrimary: "#121413",
    textSecondary: "#8A857C",
    lineDark: "rgba(184, 115, 51, 0.28)",
    lineLight: "rgba(18, 20, 19, 0.12)",
    useSerifAccent: true,
  },
  flags: {
    showTestimonials: true,
    showAgentStories: true,
    showInsurancePartner: true,
    showOffices: true,
    showClientLogin: true,
    showHomeServices: true,
    showTableProviderLogos: false,
    showAgentPortalDemo: true,
  },
  areasServedPage: {
    eyebrow: "AREAS SERVED",
    headline: "ROOTED IN THE WESTERN SUBURBS. SERVING ALL OF CHICAGOLAND.",
    subhead: "Seven locations, four brokerages across Chicagoland",
    counties: AREA_GROUPS,
  },
};

const BROKERAGES: Record<BrokerageId, BrokerageConfig> = {
  "kw-success": kwSuccessConfig,
  monogram: monogramConfig,
};

const activeId =
  (import.meta.env.VITE_BROKERAGE as BrokerageId) || "kw-success";

export const activeBrokerage: BrokerageConfig =
  BROKERAGES[activeId] ?? kwSuccessConfig;

export const getBrokerageConfig = (id?: BrokerageId): BrokerageConfig =>
  id ? BROKERAGES[id] : activeBrokerage;

/**
 * Small set of ergonomic helpers over BrokerageConfig used by the site shell
 * (Navbar, Footer, NetworkMap). Everything here is derived from config so a
 * new brokerage only edits its config file.
 */
function buildEnrichedBrokerage(cfg: BrokerageConfig) {
  return {
    ...cfg,
    brand: {
      name: cfg.name,
      shortName: cfg.shortName,
      legalName: cfg.legalName,
      tagline: cfg.tagline,
      foundedYear: cfg.foundedYear,
      designatedBroker: cfg.designatedBroker,
      logos: cfg.logos,
    },
    office: {
      name: cfg.contact.officeName,
      street: cfg.contact.addressLine1,
      city: cfg.contact.city,
      state: cfg.contact.state,
      zip: cfg.contact.zip,
      phone: cfg.contact.phone,
      phonePlaceholder: Boolean(cfg.contact.phoneIsPlaceholder),
      hours: cfg.contact.hours,
      hoursPlaceholder: Boolean(cfg.contact.hoursIsPlaceholder),
      generalEmail: cfg.contact.generalEmail,
      googleMapsEmbedUrl: cfg.contact.mapsEmbedUrl,
    },
    social: {
      facebook: cfg.externalLinks.socials.facebook,
      instagram: cfg.externalLinks.socials.instagram,
      googleReviews: cfg.externalLinks.socials.googleReviews,
    },
    search: {
      buyUrl: cfg.externalLinks.searchHomesUrl,
      label: cfg.externalLinks.searchHomesLabel,
      findAgentUrl: cfg.externalLinks.findAgentUrl,
    },
    /** Partner services shown in the utility bar, mobile menu and footer, in display order. */
    partnerLinks: [
      cfg.partners.mortgage,
      cfg.partners.title,
      ...(cfg.flags.showInsurancePartner ? [cfg.partners.insurance] : []),
    ].map((p) => ({
      label: p.navLabel,
      name: p.companyName,
      role: p.roleLabel,
      to: `/services/${p.slug}`,
    })),
    disclosures: {
      ...cfg.disclosures,
      legalFooterText: cfg.disclosures.footerLegalLine,
    },
  };
}

export const brokerage = buildEnrichedBrokerage(activeBrokerage);
