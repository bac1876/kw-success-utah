import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { usePageMeta } from "@/lib/usePageMeta";

export default function NotFound() {
  usePageMeta("Page Not Found");
  const { name } = activeBrokerage;

  return (
    <section
      className="relative flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden bg-ink-deep text-snow"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #eef2f5 60%, rgba(180,1,1,0.10) 100%)",
        }}
      />
      <div className="container-kw relative z-10 py-24 text-center">
        <span className="type-label text-kw-red-bright">404 · {name}</span>
        <h1 className="type-display-md mx-auto mt-4 max-w-3xl text-white">
          <SplitWords
            text="We couldn't find that page."
            stagger={0.04}
            delay={0.1}
          />
        </h1>
        <p className="type-body mx-auto mt-6 max-w-md text-stone-dark">
          The link may be out of date or the address mistyped. Head back home
          or reach out and we'll point you in the right direction.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-kw-red-bright"
          >
            <span>Back Home</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-snow transition-colors hover:border-kw-red"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
