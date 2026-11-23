import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar, { HEADER_H } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackPageView } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function Layout() {
  const location = useLocation();

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

  useEffect(() => {
    // Handle hash navigation (e.g., /about#leadership)
    if (location.hash) {
      // Wait for the page to render, then scroll to the hash target
      const timer = window.setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          if (window.__lenis) {
            window.__lenis.scrollTo(element, { offset: -HEADER_H, duration: 1.2 });
          } else {
            const top = element.getBoundingClientRect().top + window.pageYOffset - HEADER_H;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 100);
      return () => window.clearTimeout(timer);
    } else {
      // No hash - scroll to top
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
    // Pages set their own <title> in an effect; defer so the title is current.
    const t = window.setTimeout(() => trackPageView(location.pathname), 0);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-ink-deep text-snow">
      <Navbar />
      <main style={{ paddingTop: HEADER_H }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
