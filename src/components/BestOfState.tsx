import { Award, ExternalLink } from "lucide-react";
import { activeBrokerage } from "@/brokerages";

interface BestOfStateProps {
  className?: string;
}

/**
 * Best of State recognition band
 * Shows 8-time Utah Best of State winner badge (2018-2026)
 * Badge images pending - using placeholder for now
 */
export default function BestOfState({ className = "" }: BestOfStateProps) {
  const { disclosures } = activeBrokerage;
  
  // Placeholder URL - client will provide actual link
  const verifiedRecognitionUrl = "https://bestofstateutah.com";

  return (
    <section className={`py-16 ${className}`}>
      <div className="container-monogram">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-12 md:text-left">
          {/* Badge placeholder - actual image coming from client */}
          <div className="flex-shrink-0">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-kw-red bg-gradient-to-br from-kw-red/20 to-kw-red/5 md:h-40 md:w-40">
              <Award className="h-16 w-16 text-kw-red md:h-20 md:w-20" strokeWidth={1.5} />
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-kw-gray">
              Badge Image<br />Coming Soon
            </p>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year, idx) => (
                <span
                  key={year}
                  className={`inline-flex h-8 w-14 items-center justify-center rounded-md text-xs font-bold ${
                    idx < 8
                      ? "bg-kw-red text-white"
                      : "border border-kw-gray/30 text-kw-gray"
                  }`}
                >
                  {year}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold leading-tight text-ink md:text-3xl">
              Proud part of Keller Williams Utah
            </h3>
            <p className="mt-2 text-base text-charcoal md:text-lg">
              8-time Utah Best of State winner, Real Estate Services (2018–2026)
            </p>

            <a
              href={verifiedRecognitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-kw-red transition-colors hover:text-kw-red-bright"
            >
              <span>Verified Recognition</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
