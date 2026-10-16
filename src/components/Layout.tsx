import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { activeBrokerage } from "@/brokerages";
import Navbar, { HEADER_H } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SearchOverlayProvider } from "@/components/SearchOverlay";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title:
      "KW Success Keller Williams Realty — Layton & Northern Utah Real Estate",
    description:
      "You define Success. The relationship is how we get there. Since 1997, KW Success has helped agents build businesses by design and helped families across Weber, Davis & Morgan Counties find their home base.",
  },
  "/agents": {
    title:
      "For Agents · Join KW Success — KW Success Keller Williams Realty",
    description:
      "Build a business that funds your life by design. Where Northern Utah agents are loved, coached and AI-empowered to grow their business, personal development, and wealth.",
  },
  "/clients": {
    title: "Buy & Sell With a Trusted Advisor — KW Success Keller Williams Realty",
    description:
      "Your journey to success includes a home. Connect with a KW Success Trusted Advisor serving Weber, Davis, and Morgan Counties.",
  },
  "/about": {
    title: "Our Story & Leadership Team — KW Success Keller Williams Realty",
    description:
      "Locally led in Layton since 1997 and backed by Keller Williams. Meet our leadership team: Marcus Green, Russie Edwards, Shawn Janke, Chris Bradford, and more.",
  },
  "/areas-served": {
    title:
      "Areas Served · Weber, Davis & Morgan Counties — KW Success Keller Williams Realty",
    description:
      "Rooted in Layton at 1572 N Woodland Park Dr., Suite 500. Serving 35 communities across Davis, Weber, and Morgan Counties in Northern Utah.",
  },
  "/services/mortgage": {
    title:
      "Unity Home Loans · Lending Partner — KW Success Keller Williams Realty",
    description:
      "Unity Home Loans works at the same table as your KW Success Trusted Advisor for seamless mortgage pre-approvals and lending across Northern Utah.",
  },
  "/services/title": {
    title:
      "Amicus Title · Title & Escrow Partner — KW Success Keller Williams Realty",
    description:
      "Amicus Title provides title search, insurance, and escrow settlement services alongside your KW Success Trusted Advisor.",
  },
  "/contact": {
    title: "Contact Us · Layton Office — KW Success Keller Williams Realty",
    description:
      "Start a conversation with KW Success Keller Williams Realty at 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041.",
  },
  "/login/agent": {
    title: "Agent Login & Quick Links — KW Success Keller Williams Realty",
    description:
      "Access KW Command, utahrealestate.com MLS, Suki AI, Canva, and Thinkific resources for KW Success agents.",
  },
};

export default function Layout() {
  const location = useLocation();

  // Lenis smooth scroll
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, duration: 1.1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Scroll to top & update page title + meta description on route change (§14 SEO)
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const meta = PAGE_META[location.pathname] ?? PAGE_META["/"];
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.description);
  }, [location.pathname]);

  // Inject LocalBusiness / RealEstateAgent JSON-LD structured data (§14 SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: activeBrokerage.name,
    description: activeBrokerage.tagline,
    foundingDate: String(activeBrokerage.foundedYear),
    url: "https://kw-success-utah.vercel.app",
    logo: `https://kw-success-utah.vercel.app${activeBrokerage.logos.fullColor}`,
    telephone: activeBrokerage.contact.phone,
    email: activeBrokerage.contact.generalEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: activeBrokerage.contact.addressLine1,
      addressLocality: "Layton",
      addressRegion: "UT",
      postalCode: "84041",
      addressCountry: "US",
    },
    areaServed: ["Davis County, UT", "Weber County, UT", "Morgan County, UT"],
    sameAs: [
      activeBrokerage.externalLinks.socials.facebook,
      activeBrokerage.externalLinks.socials.instagram,
    ],
  };

  return (
    <SearchOverlayProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ paddingTop: HEADER_H }}>
        <Outlet />
      </main>
      <Footer />
    </SearchOverlayProvider>
  );
}
