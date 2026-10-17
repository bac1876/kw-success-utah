export type BrokerageId = "kw-success" | "monogram";

export interface ThemeTokens {
  mode: "light" | "dark";
  accent: string;
  accentBright: string;
  ink: string;
  inkDeep: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  lineDark: string;
  lineLight: string;
  useSerifAccent: boolean;
}

export interface TableProvider {
  name: string;
  logo?: string;
  url?: string;
  affiliated?: boolean;
}

export interface TableSeat {
  category: string;
  icon: string;
  providers: TableProvider[];
}

export interface PillarItem {
  num: string;
  title: string;
  body: string;
}

export interface StatEntry {
  display: string;
  countTo?: number;
  format?: (n: number) => string;
  label: string;
  note?: string;
  sample?: boolean;
}

export interface LeadershipMember {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  isPlaceholderContact?: boolean;
  isPlaceholderBio?: boolean;
}

export interface AreaCounty {
  county: string;
  note?: string;
  communities: string[];
  /** Approximate relative map center for interactive county/town map */
  mapRegion?: {
    labelX: number;
    labelY: number;
    townCoords: Record<string, [number, number]>;
  };
}

export interface PartnerServiceConfig {
  slug: "mortgage" | "title" | "insurance";
  navLabel: string;
  companyName: string;
  roleLabel: string;
  logo: string;
  logoSquare?: string;
  heroHeadline: string;
  introCopy: string;
  isPlaceholderCopy?: boolean;
  whyItMattersHeadline: string;
  whyItMattersBody: string;
  highlights: string[];
  affiliated: boolean;
  externalUrl?: string;
  contactTopic: string;
}

export interface FeatureFlags {
  showTestimonials: boolean;
  showAgentStories: boolean;
  showInsurancePartner: boolean;
  showOffices: boolean;
  showClientLogin: boolean;
  showHomeServices: boolean;
  showTableProviderLogos: boolean;
  /** Interactive agent-portal mockup at /login/agent (demo credentials, fake AI chat). Off for real brokerages. */
  showAgentPortalDemo: boolean;
}

export interface BrokerageConfig {
  id: BrokerageId;
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  subTagline: string;
  foundedYear: number;
  designatedBroker: string;
  logos: {
    fullColor: string;
    reversed: string;
    grayscale: string;
    markOnly?: string;
  };
  theme: ThemeTokens;
  flags: FeatureFlags;
  contact: {
    /** Short office name used in the utility bar, footer and contact page, e.g. "Layton Market Center" */
    officeName: string;
    addressLine1: string;
    addressLine2: string;
    fullAddress: string;
    cityStateZip: string;
    city: string;
    state: string;
    zip: string;
    /** Google Maps embed URL for the office (contact page iframe) */
    mapsEmbedUrl: string;
    phone: string;
    phoneIsPlaceholder?: boolean;
    hours: string;
    hoursIsPlaceholder?: boolean;
    generalEmail: string;
    routing: {
      agentInquiry: { name: string; email: string };
      buyingSelling: { name: string; email: string };
      general: { name: string; email: string };
    };
  };
  externalLinks: {
    searchHomesUrl: string;
    /** Label for the external home-search link, e.g. "Search Utah Homes" */
    searchHomesLabel: string;
    findAgentUrl: string;
    findAgentIsPlaceholder?: boolean;
    kwMainUrl: string;
    kwRegionUrl: string;
    kwRegionLabel: string;
    socials: {
      facebook: string;
      instagram: string;
      googleReviews: string;
    };
    agentQuickLinks: {
      label: string;
      description: string;
      url: string;
    }[];
  };
  disclosures: {
    affiliatedBusinessDraft: string;
    affiliatedBusinessFullCapitals: string;
    affiliatedPdfUrl: string;
    bestOfStateBadge: string;
    footerLegalLine: string;
    fairHousingNote: string;
  };
  home: {
    hero: {
      image: string;
      imageAlt: string;
      isPlaceholderImage?: boolean;
      headline: string;
      subhead: string;
      primaryCta: { label: string; to: string };
      secondaryCta: { label: string; to: string };
      cornerCaption: string;
    };
    oneTable: {
      eyebrow: string;
      headline: string;
      body: string;
      subhead: string;
      centerCardTitle: string;
      centerCardCaption: string;
      seats: TableSeat[];
      journeySteps: string[];
      journeyCaption: string;
    };
    successIdea: {
      eyebrow: string;
      headline: string;
      body: string;
      forAgentsTitle: string;
      forAgentsBody: string;
      forClientsTitle: string;
      forClientsBody: string;
      chainSteps: string[];
    };
    threePillars: {
      eyebrow: string;
      headline: string;
      forAgents: PillarItem[];
      forClients: PillarItem[];
    };
    promise: {
      eyebrow: string;
      headline: string;
      body: string;
      timelineStart: string;
      timelineEnd: string;
      timelineCaption: string;
    };
    stats: StatEntry[];
    search: {
      eyebrow: string;
      headline: string;
      buttonLabel: string;
    };
    closingCta: {
      headline: string;
      primaryCta: { label: string; to: string };
      secondaryCta: { label: string; to: string };
    };
  };
  agentsPage: {
    hero: {
      eyebrow: string;
      headline: string;
      subhead: string;
    };
    whyPromises: {
      title: string;
      body: string;
    }[];
    differences: {
      bold: string;
      rest: string;
    }[];
    trustedAdvisor: {
      eyebrow: string;
      headline: string;
      body: string;
    };
    whatEveryAgentGetsIntro: string;
    whatEveryAgentGets: {
      title: string;
      body: string;
      badge?: string;
    }[];
    newAgentsCallout: {
      label: string;
      title: string;
      body: string;
    };
    findYourPath: {
      title: string;
      body: string;
    }[];
    cta: {
      headline: string;
      body: string;
      leaderName: string;
      leaderTitle: string;
      leaderEmail: string;
      leaderPhone: string;
      leaderPhoto: string;
    };
  };
  clientsPage: {
    hero: {
      eyebrow: string;
      headline: string;
      subhead: string;
    };
    whyCards: {
      title: string;
      body: string;
    }[];
  };
  aboutPage: {
    hero: {
      eyebrow: string;
      headline: string;
      subhead: string;
    };
    beliefs: {
      mission: string;
      vision: string;
      coreValues: string[];
      valuesLine: string;
    };
    timeline: {
      year: string;
      body: string;
      isPlaceholder?: boolean;
    }[];
    leadership: LeadershipMember[];
    community: {
      eyebrow: string;
      headline: string;
      body: string;
      initiatives: string[];
      photosPlaceholder: boolean;
    };
    backedByKw: {
      eyebrow: string;
      headline: string;
      body: string;
      linkLabel: string;
      linkUrl: string;
    };
  };
  areasServedPage: {
    eyebrow: string;
    headline: string;
    subhead: string;
    counties: AreaCounty[];
  };
  partners: Record<"mortgage" | "title" | "insurance", PartnerServiceConfig>;
  agentLoginPage: {
    headline: string;
    body: string;
  };
}
