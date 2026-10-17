/**
 * §14 Analytics. Loads Google Analytics 4 when VITE_GA4_ID is set and/or
 * Plausible when VITE_PLAUSIBLE_DOMAIN is set. Nothing loads when both are
 * empty, so local development and staging stay untracked.
 *
 * Call initAnalytics() once at startup and trackPageView() on each route
 * change (this is a single-page app, so the providers' automatic page view
 * only fires on the first load).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: Record<string, unknown>) => void;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as
  | string
  | undefined;

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof document === "undefined") return;
  initialized = true;

  if (GA4_ID) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    // send_page_view false: we send page views ourselves on route change
    window.gtag("config", GA4_ID, { send_page_view: false });
  }

  if (PLAUSIBLE_DOMAIN) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = PLAUSIBLE_DOMAIN;
    // manual.js: page views are sent explicitly from trackPageView
    script.src = "https://plausible.io/js/script.manual.js";
    document.head.appendChild(script);
    window.plausible =
      window.plausible ??
      function plausible(...args: unknown[]) {
        const w = window as Window & { plausible?: { q?: unknown[] } };
        ((w.plausible!.q = w.plausible!.q ?? []) as unknown[]).push(args);
      };
  }
}

export function trackPageView(path: string) {
  if (GA4_ID && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  if (PLAUSIBLE_DOMAIN && window.plausible) {
    window.plausible("pageview");
  }
}
