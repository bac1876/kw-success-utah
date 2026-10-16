import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import MotionNotice from "./components/motion/MotionNotice.tsx";

const MOTION_KEY = "mn-motion";

function initMotionPreference() {
  const param = new URLSearchParams(window.location.search).get("motion");
  if (param === "on") localStorage.setItem(MOTION_KEY, "on");
  if (param === "off") localStorage.removeItem(MOTION_KEY);

  const origMatchMedia = window.matchMedia.bind(window);
  const nativeReduced = origMatchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const forced = localStorage.getItem(MOTION_KEY) === "on";

  if (forced) {
    window.matchMedia = ((query: string) =>
      /prefers-reduced-motion/.test(query)
        ? ({
            matches: !/reduce/.test(query),
            media: query,
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
          } as MediaQueryList)
        : origMatchMedia(query)) as typeof window.matchMedia;
  }

  document.documentElement.classList.toggle("mn-reduce", nativeReduced && !forced);
  return { nativeReduced, forced };
}

const motionState = initMotionPreference();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <MotionNotice {...motionState} />
    </BrowserRouter>
  </StrictMode>
);
