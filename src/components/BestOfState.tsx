import { Award, ExternalLink } from "lucide-react";

interface BestOfStateProps {
  className?: string;
}

/**
 * Best of State recognition band - Item 10
 * Visually weighty section with years 2018-2026 prominent
 * Badge images pending from client - placeholder with documented path:
 * Expected path: /kw-success/badges/best-of-state-badge.png
 */

// Verified Recognition URL - to be provided by client
const VERIFIED_RECOGNITION_URL = "https://bestofstateutah.com";

export default function BestOfState({ className = "" }: BestOfStateProps) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="container-kw">
        <div className="rounded-3xl border border-ink/10 bg-white p-10 shadow-lift md:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left: Badge Placeholder - Visually Weighty */}
            <div className="flex flex-col items-center lg:col-span-4">
              <div className="relative">
                {/* Large badge placeholder with documented path */}
                <div className="flex h-56 w-56 items-center justify-center rounded-3xl border-4 border-kw-red bg-gradient-to-br from-kw-red/15 via-kw-red/8 to-transparent shadow-xl">
                  <Award className="h-28 w-28 text-kw-red" strokeWidth={1.5} />
                </div>
                {/* Placeholder note */}
                <div className="mt-4 rounded-lg border border-kw-red/20 bg-kw-red/5 px-4 py-2 text-center">
                  <p className="text-xs font-semibold text-kw-red">
                    Badge Image Placeholder
                  </p>
                  <p className="mt-0.5 font-mono text-[0.65rem] text-charcoal">
                    /kw-success/badges/<br/>best-of-state-badge.png
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Content with Prominent Years */}
            <div className="lg:col-span-8">
              {/* Years 2018-2026 - Very Prominent */}
              <div className="mb-8 flex flex-wrap items-center gap-2.5">
                {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year, idx) => (
                  <span
                    key={year}
                    className={`inline-flex h-14 w-20 items-center justify-center rounded-xl text-lg font-extrabold shadow-md transition-transform hover:scale-105 ${
                      idx < 8
                        ? "bg-kw-red text-white"
                        : "border-2 border-kw-gray/40 bg-mist text-kw-gray"
                    }`}
                  >
                    {year}
                  </span>
                ))}
              </div>

              {/* Exact Copy from Requirements */}
              <h3 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
                Proud part of Keller Williams Utah
              </h3>
              <p className="mt-3 text-xl font-semibold text-charcoal md:text-2xl">
                8-time Utah Best of State winner, Real Estate Services (2018–2026)
              </p>

              {/* Verified Recognition Link */}
              <a
                href={VERIFIED_RECOGNITION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border-2 border-kw-red bg-kw-red/5 px-6 py-3 text-base font-bold text-kw-red transition-all hover:bg-kw-red hover:text-white"
              >
                <span>Verified Recognition</span>
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
