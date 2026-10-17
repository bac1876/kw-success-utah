import { useEffect } from "react";
import { activeBrokerage } from "@/brokerages";

const DEFAULT_DESCRIPTION =
  "KW Success Keller Williams Realty — Your Real Estate Partner in Northern Utah. Serving Davis, Weber, and Morgan Counties alongside the greater Salt Lake Metro since 1997.";

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Per-route <title> and meta description for this single-page app.
 * Pass the page's own title; the brokerage name is appended automatically.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} · ${activeBrokerage.name}`
      : activeBrokerage.name;
    document.title = fullTitle;
    setMeta("description", description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
