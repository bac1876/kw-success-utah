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
 * Enriched brokerage config view exposing both canonical BrokerageConfig
 * fields and ergonomic page/component helpers.
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
      name: `${cfg.shortName} — Layton Market Center`,
      street: cfg.contact.addressLine1,
      city: "Layton",
      state: "UT",
      zip: "84041",
      phone: cfg.contact.phone,
      phonePlaceholder: Boolean(cfg.contact.phoneIsPlaceholder),
      hours: cfg.contact.hours,
      hoursPlaceholder: Boolean(cfg.contact.hoursIsPlaceholder),
      generalEmail: cfg.contact.generalEmail,
      googleMapsEmbedUrl:
        "https://www.google.com/maps?q=1572+N+Woodland+Park+Dr+Suite+500+Layton+UT+84041&output=embed",
    },
    social: {
      facebook: cfg.externalLinks.socials.facebook,
      instagram: cfg.externalLinks.socials.instagram,
      googleReviews: cfg.externalLinks.socials.googleReviews,
      bestOfStatePost: cfg.externalLinks.socials.instagram,
    },
    search: {
      buyUrl: cfg.externalLinks.searchHomesUrl,
      rentUrl: cfg.externalLinks.searchHomesUrl,
      findAgentUrl: cfg.externalLinks.findAgentUrl,
    },
    utilityBar: {
      kwDropdownLinks: [
        {
          label: "Keller Williams International (kw.com)",
          href: cfg.externalLinks.kwMainUrl,
        },
        {
          label: cfg.externalLinks.kwRegionLabel,
          href: cfg.externalLinks.kwRegionUrl,
        },
      ],
    },
    hero: {
      eyebrow: cfg.home.hero.cornerCaption,
      headline: cfg.home.hero.headline,
      subheadline: cfg.home.hero.subhead,
      primaryCta: cfg.home.hero.primaryCta,
      secondaryCta: cfg.home.hero.secondaryCta,
    },
    oneTable: {
      eyebrow: cfg.home.oneTable.eyebrow,
      headline: cfg.home.oneTable.headline,
      subheadline: cfg.home.oneTable.body,
      centerLabel: cfg.home.oneTable.centerCardCaption,
      seats: cfg.home.oneTable.seats.map((s) => ({
        title: s.category,
        descriptor:
          s.providers.length > 0
            ? s.providers.map((p) => p.name).join(" · ")
            : "Vetted local Wasatch Front partners",
      })),
      journeySteps: cfg.home.oneTable.journeySteps,
    },
    pillars: {
      eyebrow: cfg.home.threePillars.eyebrow,
      headline: cfg.home.threePillars.headline,
      subheadline:
        "Whether you are building a real estate career or buying and selling along the Wasatch Front, our foundation is built on three enduring pillars.",
      forAgents: cfg.home.threePillars.forAgents.map((p) => ({
        numeral: p.num,
        title: p.title,
        body: p.body,
      })),
      forClients: cfg.home.threePillars.forClients.map((p) => ({
        numeral: p.num,
        title: p.title,
        body: p.body,
      })),
    },
    agentCta: {
      eyebrow: "For Real Estate Agents",
      headline: cfg.home.successIdea.forAgentsTitle,
      body: cfg.home.successIdea.forAgentsBody,
      primaryCta: { label: "Explore Agent Careers", to: "/agents" },
      secondaryCta: { label: "Talk to Russie", to: "/contact?topic=agent" },
    },
    clientCta: {
      eyebrow: "For Buyers & Sellers",
      headline: cfg.home.successIdea.forClientsTitle,
      body: cfg.home.successIdea.forClientsBody,
      primaryCta: {
        label: "Search Utah Homes",
        to: cfg.externalLinks.searchHomesUrl,
      },
      secondaryCta: { label: "Buy & Sell Guide", to: "/clients" },
    },
    leadership: cfg.aboutPage.leadership.map((member) => ({
      ...member,
      role: member.title,
      headshot: member.photo,
      bioPlaceholder: Boolean(member.isPlaceholderBio),
      bio: [member.bio],
    })),
    about: {
      heroEyebrow: cfg.aboutPage.hero.eyebrow,
      heroHeadline: cfg.aboutPage.hero.headline,
      valuesHeadline: "Our Beliefs — WI4C2TES",
      originHeadline: "Built on the Wasatch Front Since 1997.",
      originBody: [
        cfg.aboutPage.hero.subhead,
        `Mission: ${cfg.aboutPage.beliefs.mission} Vision: ${cfg.aboutPage.beliefs.vision}`,
      ],
    },
    agentsPage: {
      ...cfg.agentsPage,
      heroEyebrow: cfg.agentsPage.hero.eyebrow,
      heroHeadline: cfg.agentsPage.hero.headline,
      heroSubheadline: cfg.agentsPage.hero.subhead,
      cultureHeadline: "What Every Agent Gets",
      cultureSubheadline: "Systems, Coaching & Tools That Compound.",
      cultureCards: cfg.agentsPage.whatEveryAgentGets,
      familyHeadline: "Real Estate, Lending & Title Under One Roof.",
      familyBody: cfg.agentsPage.trustedAdvisor.body,
      formHeadline: cfg.agentsPage.cta.headline,
      formSubheadline: cfg.agentsPage.cta.body,
    },
    clientsPage: {
      ...cfg.clientsPage,
      heroEyebrow: cfg.clientsPage.hero.eyebrow,
      heroHeadline: cfg.clientsPage.hero.headline,
      heroSubheadline: cfg.clientsPage.hero.subhead,
      buyingSteps: cfg.clientsPage.whyCards.map((c) => `${c.title}: ${c.body}`),
      sellingSteps: [
        "Strategic pricing and staging tailored to Davis, Weber & Morgan micro-markets",
        "Coordinated in-house title & lending through Amicus Title and Unity Home Loans",
      ],
    },
    partners: {
      mortgage: {
        ...cfg.partners.mortgage,
        name: cfg.partners.mortgage.companyName,
        role: cfg.partners.mortgage.roleLabel,
        body: cfg.partners.mortgage.introCopy,
      },
      title: {
        ...cfg.partners.title,
        name: cfg.partners.title.companyName,
        role: cfg.partners.title.roleLabel,
        body: cfg.partners.title.introCopy,
      },
      insurance: {
        ...cfg.partners.insurance,
        name: cfg.partners.insurance.companyName,
        role: cfg.partners.insurance.roleLabel,
        body: cfg.partners.insurance.introCopy,
      },
    },
    disclosures: {
      ...cfg.disclosures,
      legalFooterText: cfg.disclosures.footerLegalLine,
    },
  };
}

export const brokerage = buildEnrichedBrokerage(activeBrokerage);
