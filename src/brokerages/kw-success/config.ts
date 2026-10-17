import type { BrokerageConfig } from "../types";

export const kwSuccessConfig: BrokerageConfig = {
  id: "kw-success",
  name: "KW Success Keller Williams Realty",
  shortName: "KW Success",
  legalName: "KW Success Keller Williams Realty",
  tagline: "You define Success. The relationship is how we get there.",
  subTagline: "Serving Weber, Davis & Morgan Counties",
  foundedYear: 1997,
  designatedBroker: "Shawn Janke",
  logos: {
    fullColor: "/kw-success/logos/kw-success-rgb.png",
    reversed: "/kw-success/logos/kw-success-rgb-rev.png",
    grayscale: "/kw-success/logos/kw-success-gry.png",
  },
  theme: {
    mode: "light",
    accent: "#B40101", // kw-red
    accentBright: "#D11919",
    ink: "#1F2326", // proposed deep text / footer bg
    inkDeep: "#16191C",
    surface: "#FAFAF8", // snow
    surfaceAlt: "#EEF2F5", // mist (sky tones)
    card: "#FFFFFF", // white
    textPrimary: "#4D4D4D", // charcoal
    textSecondary: "#828282", // gray
    lineDark: "rgba(255, 255, 255, 0.14)",
    lineLight: "rgba(31, 35, 38, 0.12)",
    useSerifAccent: false,
  },
  flags: {
    showTestimonials: false, // §5.8 hidden until real quotes are collected with permission
    showAgentStories: false, // §6.7 hidden until real
    showInsurancePartner: false, // §4 hidden by flag; partner coming
    showOffices: false, // §4 single office
    showClientLogin: false, // §4 dropped for KW Success
    showHomeServices: false, // §4 dropped for KW Success
    showTableProviderLogos: false, // §5.2 v1 shows categories only
    showAgentPortalDemo: false, // demo portal is a mockup; Agent Login goes straight to KW Command
  },
  contact: {
    addressLine1: "1572 N Woodland Park Dr., Suite 500",
    addressLine2: "Layton, UT 84041",
    fullAddress: "1572 N Woodland Park Dr., Suite 500, Layton, UT 84041",
    cityStateZip: "Layton, UT 84041",
    phone: "801.475.9900",
    phoneIsPlaceholder: false,
    hours: "Monday – Friday · 9:00 AM – 5:00 PM",
    hoursIsPlaceholder: false,
    generalEmail: "dfisuccess@unitedagentservices.biz",
    routing: {
      agentInquiry: {
        name: "Russie Edwards, Team Leader",
        email: "russie@unitedagentservices.biz",
      },
      buyingSelling: {
        name: "Front Desk (Director of First Impressions)",
        email: "dfisuccess@unitedagentservices.biz",
      },
      general: {
        name: "Front Desk (Director of First Impressions)",
        email: "dfisuccess@unitedagentservices.biz",
      },
    },
  },
  externalLinks: {
    searchHomesUrl: "https://kwsuccessutah.kw.com/search/sale",
    findAgentUrl: "https://kwsuccessutah.kw.com/agents",
    findAgentIsPlaceholder: false,
    kwMainUrl: "https://kw.com",
    kwRegionUrl: "https://kwutah.com",
    kwRegionLabel: "KW Utah",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=100093128351645",
      instagram: "https://www.instagram.com/kwsuccess_utah/",
      googleReviews: "https://share.google/AqzDgvHM8kC33DFGq",
    },
    agentQuickLinks: [
      {
        label: "KW Command",
        description: "CRM, referrals, designs & smartplans",
        url: "https://agent.kw.com",
      },
      {
        label: "utahrealestate.com (MLS)",
        description: "Wasatch Front regional MLS login",
        url: "https://www.utahrealestate.com",
      },
      {
        label: "Suki",
        description: "Your AI broker assistant on demand",
        url: "/login/agent",
      },
      {
        label: "Canva",
        description: "Marketing templates & brand studio",
        url: "https://www.canva.com",
      },
      {
        label: "Thinkific",
        description: "KW Success training & on-demand courses",
        url: "https://www.thinkific.com",
      },
    ],
  },
  disclosures: {
    affiliatedBusinessDraft:
      "KW Success Keller Williams Realty and certain of its agents have an ownership interest in Unity Home Loans and Amicus Title, part of the same family of companies. You are not required to use any of these providers.",
    affiliatedBusinessFullCapitals:
      "YOU ARE NOT REQUIRED TO USE THE LISTED PROVIDER(S) AS A CONDITION FOR SETTLEMENT OF YOUR LOAN ON OR THE PURCHASE, SALE, OR REFINANCE OF THE SUBJECT PROPERTY. THERE ARE FREQUENTLY OTHER SETTLEMENT SERVICE PROVIDERS AVAILABLE WITH SIMILAR SERVICES. YOU ARE FREE TO SHOP AROUND TO DETERMINE THAT YOU ARE RECEIVING THE BEST SERVICES AND THE BEST RATE FOR THESE SERVICES.",
    affiliatedPdfUrl: "/affiliated-business-disclosure",
    bestOfStateBadge:
      "Keller Williams Utah · Utah Best of State, Real Estate Services · 8-time winner (2018–2026).",
    footerLegalLine:
      "© 2026 KW Success Keller Williams Realty · 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041 · Each Keller Williams office is independently owned and operated · Equal Housing Opportunity · REALTOR®",
    fairHousingNote:
      "We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation.",
  },
  home: {
    hero: {
      image: "/kw-success/hero-wasatch.jpg",
      imageAlt: "Morning light on snow-capped Wasatch mountains overlooking Ogden Valley in Northern Utah",
      isPlaceholderImage: false,
      headline: "You define Success. The relationship is how we get there.",
      subhead:
        "Since 1997, KW Success has helped agents build businesses and lives by design, and helped families across northern Utah find the home base for theirs.",
      primaryCta: { label: "I'm an Agent", to: "/agents" },
      secondaryCta: { label: "I'm Buying or Selling", to: "/clients" },
      cornerCaption: "Serving Weber, Davis & Morgan Counties",
    },
    oneTable: {
      eyebrow: "CONNECTED HOMEOWNERSHIP",
      headline: "ONE TRUSTED ADVISOR. EVERYTHING YOUR HOME NEEDS.",
      body: "Before, during, and long after the closing, your KW Success Trusted Advisor is your first call for anything your home needs. Need a lender, an inspector, an insurance quote, a contractor or a great painter? Your advisor brings the right people to the table and stays at it with you for as long as you own your home.",
      subhead: "Everyone at one table.",
      centerCardTitle: "Your KW Success Trusted Advisor & you.",
      centerCardCaption: "Your first call for anything your home needs.",
      seats: [
        {
          category: "Lending",
          icon: "Landmark",
          providers: [
            {
              name: "Unity Home Loans",
              logo: "/kw-success/logos/unity-home-loans.png",
              url: "/services/mortgage",
              affiliated: true,
            },
          ],
        },
        {
          category: "Title & Escrow",
          icon: "FileCheck2",
          providers: [
            {
              name: "Amicus Title",
              logo: "/kw-success/logos/amicus-title.png",
              url: "/services/title",
              affiliated: true,
            },
          ],
        },
        {
          category: "Insurance",
          icon: "ShieldCheck",
          providers: [],
        },
        {
          category: "Inspections",
          icon: "SearchCheck",
          providers: [],
        },
        {
          category: "Contractors & Repairs",
          icon: "Hammer",
          providers: [],
        },
        {
          category: "Moving",
          icon: "Truck",
          providers: [],
        },
        {
          category: "Home Maintenance",
          icon: "Wrench",
          providers: [],
        },
        {
          category: "Design & Remodel",
          icon: "Compass",
          providers: [],
        },
      ],
      journeySteps: [
        "Buying",
        "Moving",
        "Living",
        "Maintaining",
        "Growing",
        "Selling",
        "Beginning Again",
      ],
      journeyCaption: "Your advisor is with you for every chapter.",
    },
    successIdea: {
      eyebrow: "WHY SUCCESS?",
      headline: "SUCCESS IS MORE THAN A TRANSACTION.",
      body: "It's easy to hear \"success\" in real estate and think more transactions and more money. We believe success is personal. Every agent and every client defines it differently, and our job is to help each of them write their own success story.",
      forAgentsTitle: "For our agents",
      forAgentsBody:
        "Real estate is a way to build the life you want. Maybe success means picking your kids up from school. Owning your calendar. Your first investment property, or an investment club with friends. We help you build the business that funds your version of success.",
      forClientsTitle: "For our clients",
      forClientsBody:
        "Everyone sleeps somewhere. But a home isn't a hotel. It's home base for living out your dreams: raising your family, being close to the right school, coming home at night and finally sitting down. Your journey to success includes a home, and we help you find the right one.",
      chainSteps: [
        "KW Success invests in agents",
        "Agents invest in clients",
        "Everyone builds success by design.",
      ],
    },
    threePillars: {
      eyebrow: "HOW WE HELP YOU GROW",
      headline: "THREE PILLARS. ONE LIFE BY DESIGN.",
      forAgents: [
        {
          num: "I",
          title: "Grow Your Business.",
          body: "We're committed, and built, to help you do more than grow your business. We help you leverage it. Coaching that meets you where you are, proven models that bring clarity, and AI tools that take work off your plate, all so your business creates more opportunity and more freedom for the life you want.",
        },
        {
          num: "II",
          title: "Grow the Person.",
          body: "Behind every great agent is a great human being committed to growth. We invest in who you're becoming, not just what you produce: sharpening your skills, building your confidence, and helping you grow as a leader, a spouse, a parent and a professional.",
        },
        {
          num: "III",
          title: "Grow Long-Term Wealth.",
          body: "Income is only the beginning. We help you increase your gross commission income, protect your net income, and then sit down with you to strategize how to grow your net worth, so the business you build today becomes wealth that lasts.",
        },
      ],
      forClients: [
        {
          num: "I",
          title: "Make Your House a Home.",
          body: "Finding the right home takes more than a search. KW Success equips and coaches our agents to be trusted advisors, so you have a partner who understands what you're building and helps you find the home that fits it.",
        },
        {
          num: "II",
          title: "Build Stronger Communities.",
          body: "We don't just sell homes here; we live here too. We actively serve and invest in the communities where you live, raise your family and go to work, because a great home deserves a great place around it.",
        },
        {
          num: "III",
          title: "Grow Long-Term Wealth.",
          body: "Your home is one of your most important investments. We take an active approach to helping you protect and grow its value, and we're committed to helping Utah remain a great place to live for generations to come.",
        },
      ],
    },
    promise: {
      eyebrow: "OUR PROMISE",
      headline: "WE DON'T JUST HELP YOU CLOSE. WE HELP YOU BUILD.",
      body: "We help agents become trusted advisors, not just another agent. Those advisors walk with their clients long after the closing table. Your goals equal our goals.",
      timelineStart: "1997",
      timelineEnd: "today",
      timelineCaption: "Nearly three decades of success stories.",
    },
    stats: [
      {
        display: "20,000+",
        countTo: 20000,
        label: "Homes closed since 1997",
        sample: true,
      },
      {
        display: "$6 Billion+",
        label: "In real estate",
        sample: true,
      },
      {
        display: "Since 1997",
        label: "Serving Weber, Davis & Morgan",
      },
    ],
    search: {
      eyebrow: "WHEN YOU'RE READY",
      headline: "FIND THE HOME BASE FOR YOUR NEXT CHAPTER.",
      buttonLabel: "Begin Your Search",
    },
    closingCta: {
      headline: "YOUR SUCCESS STORY STARTS WITH ONE CONVERSATION.",
      primaryCta: { label: "Talk to Our Team", to: "/contact" },
      secondaryCta: { label: "Join KW Success", to: "/agents" },
    },
  },
  agentsPage: {
    hero: {
      eyebrow: "FOR AGENTS · JOIN KW SUCCESS",
      headline: "BUILD A BUSINESS THAT FUNDS YOUR LIFE BY DESIGN.",
      subhead:
        "Where agents are loved, coached and AI-empowered to grow their business, their personal development and their wealth.",
    },
    whyPromises: [
      {
        title: "A culture that loves you as a person.",
        body: "\"We Love Our Agents\" isn't a slogan; it's an operating standard.",
      },
      {
        title: "A clear growth path.",
        body: "Production, mindset and wealth, with coaching at every stage.",
      },
      {
        title: "AI tools you can actually use.",
        body: "Done-for-you, not just talked about.",
      },
      {
        title: "A tribe of like-minded agents.",
        body: "Hungry, humble and growth-minded people who want you to win.",
      },
    ],
    differences: [
      {
        bold: "Selective, not a bulk recruiter.",
        rest: "We'd rather grow the right people than collect licenses.",
      },
      {
        bold: "Community-first, not virtual.",
        rest: "A real office, real people, real relationships in Layton.",
      },
      {
        bold: "We build and deploy AI, not just talk about it.",
        rest: "",
      },
      {
        bold: "Agent care is a standard, not an afterthought.",
        rest: "",
      },
    ],
    trustedAdvisor: {
      eyebrow: "THE TRUSTED ADVISOR STANDARD",
      headline: "BECOME A TRUSTED ADVISOR.",
      body: "Clients don't need another agent. They need someone they trust with one of the biggest decisions of their life. We help you become that advisor, and give you the tools, coaching and partners to stay with your clients for life.",
    },
    whatEveryAgentGetsIntro:
      "Agents choose KW Success for our leadership, our energy, our support, our office and our education.",
    whatEveryAgentGets: [
      {
        title: "Leadership that invests in you.",
        body: "Russie and our leadership team coach, lead and support every agent, at every stage.",
      },
      {
        title: "A real home base.",
        body: "Office space in Layton, built for meetings, closings and collaboration.",
      },
      {
        title: "Energy and community.",
        body: "A culture that celebrates wins, shows up for each other and loves its agents.",
      },
      {
        title: "Ongoing education.",
        body: "Weekly training on production, mindset and the latest AI tools.",
      },
      {
        title: "Suki.",
        body: "Your AI broker assistant, with answers on demand.",
      },
      {
        title: "Your personal Brand DNA.",
        body: "Clarity on your own value proposition.",
      },
      {
        title: "Agent Concierge.",
        body: "Marketing support when you need it.",
      },
      {
        title: "Hands-on tech training.",
        body: "One-on-one help with every system.",
      },
      {
        title: "The KW Success Agent Portal.",
        body: "Every tool, link, AI assistant and resource in one integrated hub.",
      },
    ],
    newAgentsCallout: {
      label: "For new agents",
      title: "Launch productivity coaching.",
      body: "A structured program that takes you from your first day to your first closings and beyond.",
    },
    findYourPath: [
      {
        title: "New to real estate.",
        body: "Launch coaching from day one.",
      },
      {
        title: "Growing producer.",
        body: "Coaching, systems and leverage to break through.",
      },
      {
        title: "Top producer.",
        body: "Leadership, leverage and team-building support.",
      },
    ],
    cta: {
      headline: "HAVE A CONVERSATION ABOUT YOUR NEXT CHAPTER.",
      body: "Book a confidential conversation with Russie Edwards, our Team Leader.",
      leaderName: "Russie Edwards",
      leaderTitle: "General Manager / Team Leader",
      leaderEmail: "russie@unitedagentservices.biz",
      leaderPhone: "801.710.5075",
      leaderPhoto: "/kw-success/leadership/russie-edwards.jpg",
    },
  },
  clientsPage: {
    hero: {
      eyebrow: "BUY & SELL WITH KW SUCCESS",
      headline: "YOUR JOURNEY TO SUCCESS INCLUDES A HOME.",
      subhead:
        "A KW Success trusted advisor helps you find the home base for the life you're building.",
    },
    whyCards: [
      {
        title: "Better Equipped",
        body: "Backed by modern tools, market data, and a full family of companies so every step of your transaction is handled with care.",
      },
      {
        title: "Current on the Market",
        body: "Active, full-time professionals who study Northern Utah inventory, pricing trends, and contract strategy every week.",
      },
      {
        title: "Coached to Serve",
        body: "Trained to listen first, advise honestly, and put your long-term goals ahead of a quick closing.",
      },
      {
        title: "Rooted Locally",
        body: "Working and living right here across Weber, Davis, and Morgan counties since 1997.",
      },
    ],
  },
  aboutPage: {
    hero: {
      eyebrow: "ABOUT KW SUCCESS",
      headline: "OUR STORY.",
      subhead: "Locally led since 1997. Backed by Keller Williams.",
    },
    beliefs: {
      mission:
        "To love, develop, and empower real estate agents to grow their business, elevate their personal development, and build long-term wealth within a community that truly cares about them.",
      vision:
        "To be the most supportive, innovative, and growth-centered real estate community in Utah, where caring culture meets cutting-edge tools to help agents build a business and a life by design.",
      coreValues: [
        "Care & Connection",
        "Growth Mindset",
        "Innovation With Purpose",
        "Community & Collaboration",
        "Integrity & Responsibility",
      ],
      valuesLine: "God. Family. Then Business.",
    },
    timeline: [
      {
        year: "1997",
        body: "KW Success opens its doors in Layton with a commitment to local leadership, agent coaching, and lifelong client care.",
      },
      {
        year: "2000s",
        body: "Expanded across Davis, Weber, and Morgan counties, establishing the Layton Market Center as Northern Utah's premier coaching and production hub.",
        isPlaceholder: false,
      },
      {
        year: "2018–2026",
        body: "Keller Williams Utah Region recognized 8 consecutive times as Utah Best of State in Real Estate Services while KW Success launches its integrated One Table partner ecosystem.",
        isPlaceholder: false,
      },
      {
        year: "Today",
        body: "20,000+ homes closed and $6B+ in real estate across Weber, Davis & Morgan Counties — building lives by design.",
      },
    ],
    leadership: [
      {
        id: 1,
        name: "Marcus Green",
        title: "Operating Principal",
        email: "marcus@kwutah.com",
        phone: "801.643.3870",
        photo: "/kw-success/leadership/marcus-green.jpg",
        bio: "Marcus Green is an entrepreneur, investor, leadership coach, and lifelong student of what it means to live an extraordinary life. A Utah native with more than 25 years in real estate, Marcus has been involved in thousands of transactions and has built, owned, and partnered in companies across real estate, investing, property management, lending, title, and coaching. He hosts The Whole Enchilada Podcast, exploring what it takes to succeed not just in business, but in life. Marcus will tell you his most important roles are husband and father to four daughters. He's an adventurer, world traveler, and outdoor enthusiast, passionate about helping people close the gap between who they are today and who they're capable of becoming.",
      },
      {
        id: 2,
        name: "Russie Edwards",
        title: "General Manager / Team Leader",
        email: "russie@unitedagentservices.biz",
        phone: "801.710.5075",
        photo: "/kw-success/leadership/russie-edwards.jpg",
        bio: "With 19 years of real estate experience, including 10 in leadership, Russie Edwards brings knowledge, passion, and heart to her role as Team Leader at KW Success. She is dedicated to helping agents discover their potential, build confidence, overcome challenges, and grow successful businesses through coaching, collaboration, and a belief in what they can achieve. Known for her authentic leadership, positive energy, and genuine care for people, Russie finds her greatest fulfillment in helping others succeed personally and professionally. Outside of real estate, she enjoys time with her husband, their three children, and their dog.",
      },
      {
        id: 3,
        name: "Shawn Janke",
        title: "Principal Broker",
        email: "shawnj@unitedagentservices.biz",
        phone: "801.540.3447",
        photo: "/kw-success/leadership/shawn-janke.jpg",
        bio: "Shawn Janke is an award-winning Principal Broker and licensed contractor serving Utah's Wasatch Front, with more than 30 years as a licensed real estate professional. A past Realtor of the Year and Lifetime Achievement Award recipient, Shawn combines real estate expertise with hands-on construction knowledge to help buyers, sellers, and investors reach their goals. Shawn is a proud father of four great people, father-in-law to a wonderful son-in-law, and grandfather to an adorable little grandson. Outside of work, he loves skiing, boating, riding motorcycles, and spending time with his family.",
      },
      {
        id: 4,
        name: "Chris Bradford",
        title: "Market Center Administrator",
        email: "chrisb@unitedagentservices.biz",
        phone: "801.647.2047",
        photo: "/kw-success/leadership/chris-bradford.jpg",
        bio: "Chris brings over 30 years of financial and business experience and an MBA to his role as Market Center Administrator, including 25 years in corporate retail as a Financial Planning Director and Buyer and the past 7 years with Keller Williams. He takes pride in the numbers, but believes the people behind them are what truly matter. Born in Texas, Chris went to high school and college in Utah, built his career in Kansas and Ohio, and spent seven years in Latin America, experiences that shaped his appreciation for different people, cultures, and perspectives. His greatest joy is time with his three sons and their families, especially his grandchildren, and getting outdoors for life's adventures, big and small.",
      },
      {
        id: 5,
        name: "Bradley Green",
        title: "Market Center Tech Trainer",
        email: "bradley@unitedagentservices.biz",
        phone: "385.405.4082",
        photo: "/kw-success/leadership/bradley-green.jpg",
        bio: "Bradley Green is a real estate technology trainer, brokerage marketing director, and Realtor in Utah. Holding a degree in computational mathematics, he has spent the past three years helping agents adopt tools and systems to build leverage in their business. He has traveled to speak on using AI to be more human, sharing practical insights on how to leverage technology to deepen client connections and where the industry is heading next.",
        isPlaceholderBio: false,
      },
      {
        id: 6,
        name: "Vincie Edwards",
        title: "Agent Services Coordinator (ASC)",
        email: "ascsuccess@unitedagentservices.biz",
        phone: "801.866.1925",
        photo: "/kw-success/leadership/vincie-edwards.jpg",
        bio: "Vincie spent 19 years in retail management, including roles in Human Resources and as a Store Director, before making an exciting career change to real estate. As Agent Services Coordinator at KW Success, she loves learning the industry and being part of a great team. Outside of work, she enjoys family, friends, her chocolate lab Lucy, traveling (especially to the beach), reading, and her newest hobby: baking all things sourdough.",
      },
      {
        id: 7,
        name: "Kaileigh Hall",
        title: "Director of Agent Commissions",
        email: "commissions@unitedagentservices.biz",
        phone: "(480) 862-3189",
        photo: "/kw-success/leadership/kaileigh-hall.jpg",
        bio: "Kaileigh has been in the real estate industry since 2013 and brings that experience to her role as Director of Agent Commissions. She processes closing packets and makes sure commission payments land accurately in agents' accounts, and she takes pride in making the closing process as smooth and efficient as possible for every agent. Outside of work, she enjoys time with her family and expressing her creativity through crafting.",
      },
      {
        id: 8,
        name: "Xenia Alsup",
        title: "Director of First Impressions (DFI)",
        email: "dfisuccess@unitedagentservices.biz",
        phone: "801.866.1905",
        photo: "/kw-success/leadership/xenia-alsup.jpg",
        bio: "With 8 years in real estate, Xenia is passionate about building meaningful connections, strengthening community, and creating an environment where people feel supported, inspired, and equipped to achieve more. She believes in lifelong growth, embracing every season of life as a chance to learn and become a better version of herself, and encouraging others to do the same. Beyond work, she loves the outdoors, adventure, great food, and making memories with her children, the greatest joys of her life.",
      },
    ],
    community: {
      eyebrow: "COMMUNITY",
      headline: "GIVING BACK WHERE WE LIVE.",
      body: "KW Success Cares, KW Cares, RED Day and group service projects across Weber, Davis, and Morgan counties.",
      initiatives: [
        "KW Success Cares",
        "KW Cares",
        "RED Day (Renew, Energize, Donate)",
        "Local Group Service Projects",
      ],
      photosPlaceholder: false,
    },
    backedByKw: {
      eyebrow: "GLOBAL REACH, LOCAL HEART",
      headline: "BACKED BY KELLER WILLIAMS.",
      body: "While KW Success is locally led in Layton since 1997, our agents and clients are backed by the training, proprietary technology, and referral network of Keller Williams Realty — the world's largest real estate franchise by agent count.",
      linkLabel: "Explore Keller Williams at kw.com",
      linkUrl: "https://kw.com",
    },
  },
  areasServedPage: {
    eyebrow: "AREAS SERVED",
    headline: "ROOTED IN LAYTON. SERVING NORTHERN UTAH.",
    subhead: "1572 N Woodland Park Dr., Suite 500, Layton, UT 84041",
    counties: [
      {
        county: "Davis County",
        note: "Home to our Layton Market Center",
        communities: [
          "Bountiful",
          "Centerville",
          "Clearfield",
          "Clinton",
          "Farmington",
          "Fruit Heights",
          "Kaysville",
          "Layton",
          "North Salt Lake",
          "South Weber",
          "Sunset",
          "Syracuse",
          "West Bountiful",
          "West Point",
          "Woods Cross",
        ],
      },
      {
        county: "Weber County",
        note: "Ogden Metro & Ogden Valley",
        communities: [
          "Eden",
          "Farr West",
          "Harrisville",
          "Hooper",
          "Huntsville",
          "Liberty",
          "Marriott-Slaterville",
          "North Ogden",
          "Ogden",
          "Plain City",
          "Pleasant View",
          "Riverdale",
          "Roy",
          "South Ogden",
          "Uintah",
          "Washington Terrace",
          "West Haven",
        ],
      },
      {
        county: "Morgan County",
        note: "Wasatch Back",
        communities: ["Morgan", "Mountain Green", "Croydon"],
      },
    ],
  },
  partners: {
    mortgage: {
      slug: "mortgage",
      navLabel: "Unity Home Loans",
      companyName: "Unity Home Loans",
      roleLabel: "Lending Partner",
      logo: "/kw-success/logos/unity-home-loans.png",
      logoSquare: "/kw-success/logos/unity-square-color.png",
      heroHeadline: "Financing built around your goals, right at the same table.",
      introCopy:
        "Unity Home Loans works alongside your KW Success Trusted Advisor to deliver clear pre-approvals, responsive communication, and tailored loan options for buyers and homeowners across Northern Utah.",
      isPlaceholderCopy: false,
      whyItMattersHeadline: "WHY IT MATTERS AT THE TABLE",
      whyItMattersBody:
        "When your lender and your real estate advisor already know how to work together, pre-approvals move faster, contract deadlines are protected, and surprises at the closing table disappear.",
      highlights: [
        "Direct coordination with your KW Success Trusted Advisor",
        "Purchase, refinance, and new-construction lending across Utah",
        "Responsive local loan officers from pre-approval through closing",
      ],
      affiliated: true,
      contactTopic: "Buying",
    },
    title: {
      slug: "title",
      navLabel: "Amicus Title",
      companyName: "Amicus Title",
      roleLabel: "Title & Escrow Partner",
      logo: "/kw-success/logos/amicus-title.png",
      heroHeadline: "Smooth, accurate closings handled by people you trust.",
      introCopy:
        "Amicus Title provides title insurance, escrow, and settlement services across Northern Utah, working hand-in-hand with your KW Success Trusted Advisor so closing day feels effortless.",
      isPlaceholderCopy: false,
      whyItMattersHeadline: "WHY IT MATTERS AT THE TABLE",
      whyItMattersBody:
        "Every real estate transaction depends on clean title and timely escrow coordination. Having Amicus Title at the table means proactive communication, clear settlement statements, and a closing experience built around your schedule.",
      highlights: [
        "Full title search, title insurance, and escrow settlement",
        "Seamless document coordination with your KW Success advisor",
        "Convenient Layton & Northern Utah closing support",
      ],
      affiliated: true,
      contactTopic: "Selling",
    },
    insurance: {
      slug: "insurance",
      navLabel: "Insurance",
      companyName: "Insurance Partner",
      roleLabel: "Home & Auto Insurance",
      logo: "/kw-success/logos/kw-success-rgb.png",
      heroHeadline: "Protecting the home you've built.",
      introCopy:
        "Our trusted Northern Utah insurance specialists work alongside your KW Success Trusted Advisor to compare homeowners, auto, and umbrella policies—making sure the home and equity you've built stay protected through every season.",
      isPlaceholderCopy: false,
      whyItMattersHeadline: "WHY IT MATTERS AT THE TABLE",
      whyItMattersBody:
        "Connected homeownership includes reviewing coverage as your home and life evolve.",
      highlights: [
        "Comprehensive homeowners & dwelling coverage comparisons",
        "Bundled auto, recreational & personal umbrella protection",
        "Annual policy reviews coordinated around your home equity",
      ],
      affiliated: false,
      contactTopic: "General",
    },
  },
  agentLoginPage: {
    headline: "Agent Login.",
    body: "Sign in to your KW Success Agent Hub: every tool, link, AI assistant and resource you need to run your business, in one spot.",
  },
};
