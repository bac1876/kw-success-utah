import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import SampleChip from "@/components/SampleChip";
import { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

/**
 * §9 Areas Served (/areas-served)
 * - Copy Monogram's page pattern: interactive map with dots per town, hover by county, and a list by county.
 * - Headline: ROOTED IN LAYTON. SERVING NORTHERN UTAH.
 * - Office: 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041
 * - Counties and communities:
 *   - Davis County (15 towns)
 *   - Weber County (17 towns)
 *   - Morgan County (3 towns)
 * - Town dots: link each dot to the kw.com search for that town where possible.
 * - Fair housing [SHAWN REVIEW]: list towns only. No descriptions of neighborhoods or demographics.
 */

interface TownPoint {
  name: string;
  county: string;
  x: number;
  y: number;
  isOffice?: boolean;
}

const NORTHERN_UTAH_TOWNS: TownPoint[] = [
  // Weber County (North / West & Ogden Valley East)
  { name: "Pleasant View", county: "Weber County", x: 145, y: 58 },
  { name: "North Ogden", county: "Weber County", x: 175, y: 66 },
  { name: "Farr West", county: "Weber County", x: 118, y: 78 },
  { name: "Plain City", county: "Weber County", x: 88, y: 92 },
  { name: "Harrisville", county: "Weber County", x: 152, y: 94 },
  { name: "Marriott-Slaterville", county: "Weber County", x: 122, y: 110 },
  { name: "Ogden", county: "Weber County", x: 176, y: 122 },
  { name: "West Haven", county: "Weber County", x: 112, y: 134 },
  { name: "Hooper", county: "Weber County", x: 78, y: 152 },
  { name: "Roy", county: "Weber County", x: 126, y: 156 },
  { name: "Riverdale", county: "Weber County", x: 158, y: 152 },
  { name: "South Ogden", county: "Weber County", x: 184, y: 148 },
  { name: "Washington Terrace", county: "Weber County", x: 172, y: 164 },
  { name: "Uintah", county: "Weber County", x: 204, y: 172 },
  // Ogden Valley (East of Wasatch ridge)
  { name: "Liberty", county: "Weber County", x: 268, y: 64 },
  { name: "Eden", county: "Weber County", x: 292, y: 86 },
  { name: "Huntsville", county: "Weber County", x: 312, y: 118 },

  // Davis County (Central / South)
  { name: "Sunset", county: "Davis County", x: 134, y: 184 },
  { name: "Clinton", county: "Davis County", x: 114, y: 192 },
  { name: "South Weber", county: "Davis County", x: 196, y: 188 },
  { name: "Clearfield", county: "Davis County", x: 138, y: 206 },
  { name: "West Point", county: "Davis County", x: 96, y: 206 },
  { name: "Syracuse", county: "Davis County", x: 104, y: 226 },
  { name: "Layton", county: "Davis County", x: 168, y: 222, isOffice: true },
  { name: "Kaysville", county: "Davis County", x: 178, y: 248 },
  { name: "Fruit Heights", county: "Davis County", x: 202, y: 244 },
  { name: "Farmington", county: "Davis County", x: 188, y: 274 },
  { name: "Centerville", county: "Davis County", x: 192, y: 300 },
  { name: "West Bountiful", county: "Davis County", x: 168, y: 318 },
  { name: "Bountiful", county: "Davis County", x: 198, y: 324 },
  { name: "Woods Cross", county: "Davis County", x: 172, y: 338 },
  { name: "North Salt Lake", county: "Davis County", x: 180, y: 358 },

  // Morgan County (Southeast / Wasatch Back)
  { name: "Mountain Green", county: "Morgan County", x: 274, y: 186 },
  { name: "Morgan", county: "Morgan County", x: 316, y: 226 },
  { name: "Croydon", county: "Morgan County", x: 368, y: 204 },
];

function buildTownSearchUrl(baseUrl: string, town: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("q", `${town}, UT`);
  return url.toString();
}

export default function AreasServed() {
  const { areasServedPage, contact, externalLinks } = activeBrokerage;
  const [activeCounty, setActiveCounty] = useState<string | null>(null);
  const [hoveredTown, setHoveredTown] = useState<TownPoint | null>(null);

  return (
    <>
      {/* §9 Hero */}
      <section
        className="relative flex min-h-[48vh] flex-col items-center justify-center overflow-hidden bg-kw-ink text-white"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className="h-0.5 w-10 bg-kw-red" />
            <span className="type-label text-kw-red-bright">
              {areasServedPage.eyebrow}
            </span>
            <span className="h-0.5 w-10 bg-kw-red" />
          </motion.div>

          <h1 className="type-display-lg mt-7 max-w-4xl text-white text-balance">
            <SplitWords
              text={areasServedPage.headline}
              stagger={0.04}
              delay={0.3}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6 flex items-center gap-2 text-[0.95rem] text-white/85"
          >
            <MapPin className="h-4 w-4 text-kw-red-bright" />
            <span>Office: {contact.fullAddress}</span>
          </motion.p>
        </div>
      </section>

      {/* Interactive Northern Utah Map + County List (§9) */}
      <section className="bg-snow py-24 md:py-32">
        <div className="container-monogram">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1.3fr] lg:gap-16">
            {/* Left: Interactive County & Town Map */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="border hairline-light bg-white p-6 shadow-lift md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="type-label text-kw-red">
                      INTERACTIVE COVERAGE MAP
                    </span>
                    <h2 className="mt-1 text-[1.2rem] font-semibold text-kw-ink">
                      Weber, Davis &amp; Morgan Counties
                    </h2>
                  </div>
                  {activeCounty && (
                    <button
                      type="button"
                      onClick={() => setActiveCounty(null)}
                      className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-kw-red underline"
                    >
                      Show All
                    </button>
                  )}
                </div>

                {/* County filter pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {areasServedPage.counties.map((c) => {
                    const isSelected = activeCounty === c.county;
                    return (
                      <button
                        key={c.county}
                        type="button"
                        onMouseEnter={() => setActiveCounty(c.county)}
                        onClick={() =>
                          setActiveCounty(isSelected ? null : c.county)
                        }
                        className={cn(
                          "border px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors",
                          isSelected
                            ? "border-kw-red bg-kw-red text-white"
                            : "border-charcoal/20 bg-mist text-kw-ink hover:border-kw-red"
                        )}
                      >
                        {c.county}
                      </button>
                    );
                  })}
                </div>

                {/* SVG Stylized Map of Weber, Davis & Morgan Counties */}
                <div className="relative mt-6 overflow-hidden border hairline-light bg-mist/60 p-3">
                  <svg
                    viewBox="0 0 420 390"
                    className="h-auto w-full select-none"
                    role="img"
                    aria-label="Interactive map of Weber, Davis, and Morgan Counties in Northern Utah"
                  >
                    {/* Great Salt Lake shoreline (West) */}
                    <path
                      d="M 0 0 L 72 0 Q 65 110 52 175 Q 72 245 128 390 L 0 390 Z"
                      fill="#DCE6EE"
                    />
                    <text
                      x="18"
                      y="290"
                      fill="#7A8B99"
                      fontSize="8"
                      fontWeight="600"
                      letterSpacing="2"
                    >
                      GREAT SALT LAKE
                    </text>

                    {/* Weber County polygon */}
                    <path
                      d="M 72 30 L 350 30 L 350 155 L 235 175 L 60 175 Z"
                      fill={
                        activeCounty === "Weber County"
                          ? "rgba(180, 1, 1, 0.10)"
                          : "rgba(255, 255, 255, 0.75)"
                      }
                      stroke="#1F2326"
                      strokeOpacity="0.18"
                      strokeWidth="1.2"
                      className="cursor-pointer transition-colors"
                      onMouseEnter={() => setActiveCounty("Weber County")}
                    />
                    <text
                      x="92"
                      y="48"
                      fill="#828282"
                      fontSize="8.5"
                      fontWeight="600"
                      letterSpacing="2"
                    >
                      WEBER COUNTY
                    </text>

                    {/* Davis County polygon */}
                    <path
                      d="M 60 175 L 235 175 L 235 375 L 128 375 Q 76 245 60 175 Z"
                      fill={
                        activeCounty === "Davis County"
                          ? "rgba(180, 1, 1, 0.10)"
                          : "rgba(255, 255, 255, 0.85)"
                      }
                      stroke="#1F2326"
                      strokeOpacity="0.18"
                      strokeWidth="1.2"
                      className="cursor-pointer transition-colors"
                      onMouseEnter={() => setActiveCounty("Davis County")}
                    />
                    <text
                      x="85"
                      y="265"
                      fill="#828282"
                      fontSize="8.5"
                      fontWeight="600"
                      letterSpacing="2"
                    >
                      DAVIS COUNTY
                    </text>

                    {/* Morgan County polygon */}
                    <path
                      d="M 235 155 L 400 155 L 400 320 L 235 320 Z"
                      fill={
                        activeCounty === "Morgan County"
                          ? "rgba(180, 1, 1, 0.10)"
                          : "rgba(255, 255, 255, 0.75)"
                      }
                      stroke="#1F2326"
                      strokeOpacity="0.18"
                      strokeWidth="1.2"
                      className="cursor-pointer transition-colors"
                      onMouseEnter={() => setActiveCounty("Morgan County")}
                    />
                    <text
                      x="285"
                      y="285"
                      fill="#828282"
                      fontSize="8.5"
                      fontWeight="600"
                      letterSpacing="2"
                    >
                      MORGAN COUNTY
                    </text>

                    {/* Wasatch Front Ridgeline contour */}
                    <path
                      d="M 215 30 L 222 95 L 230 165 L 228 245 L 224 355"
                      fill="none"
                      stroke="#1F2326"
                      strokeOpacity="0.22"
                      strokeDasharray="3 3"
                      strokeWidth="1.5"
                    />

                    {/* Town dots — clicking opens kw.com search for that town (§9) */}
                    {NORTHERN_UTAH_TOWNS.map((pt) => {
                      const dimmed =
                        activeCounty !== null && activeCounty !== pt.county;
                      const isHovered = hoveredTown?.name === pt.name;
                      const searchHref = buildTownSearchUrl(
                        externalLinks.searchHomesUrl,
                        pt.name
                      );

                      return (
                        <a
                          key={pt.name}
                          href={searchHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Search homes in ${pt.name}, ${pt.county}`}
                          onMouseEnter={() => {
                            setHoveredTown(pt);
                            setActiveCounty(pt.county);
                          }}
                          onFocus={() => {
                            setHoveredTown(pt);
                            setActiveCounty(pt.county);
                          }}
                          onMouseLeave={() => setHoveredTown(null)}
                        >
                          <g
                            className="cursor-pointer transition-opacity duration-200"
                            style={{ opacity: dimmed ? 0.25 : 1 }}
                          >
                            {pt.isOffice && (
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={9}
                                fill="rgba(180, 1, 1, 0.22)"
                              />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={pt.isOffice || isHovered ? 5.2 : 3.6}
                              fill={
                                pt.isOffice || isHovered ? "#B40101" : "#1F2326"
                              }
                              stroke="#FFFFFF"
                              strokeWidth="1.4"
                            />
                            {(pt.isOffice ||
                              isHovered ||
                              pt.name === "Ogden" ||
                              pt.name === "Bountiful" ||
                              pt.name === "Morgan" ||
                              pt.name === "Huntsville") && (
                              <text
                                x={pt.x + 7}
                                y={pt.y + 3}
                                fill={pt.isOffice ? "#B40101" : "#1F2326"}
                                fontSize={pt.isOffice ? "9.5" : "8.5"}
                                fontWeight={pt.isOffice ? "700" : "600"}
                              >
                                {pt.name}
                                {pt.isOffice ? " ★" : ""}
                              </text>
                            )}
                          </g>
                        </a>
                      );
                    })}
                  </svg>

                  {/* Active town status bar */}
                  <div className="mt-3 flex items-center justify-between border-t hairline-light pt-3 text-[0.78rem]">
                    {hoveredTown ? (
                      <span className="font-semibold text-kw-ink">
                        {hoveredTown.name} ·{" "}
                        <span className="text-kw-red">{hoveredTown.county}</span>{" "}
                        — Click dot to search homes ↗
                      </span>
                    ) : (
                      <span className="text-kw-gray">
                        Hover or click any town dot to search homes on kw.com
                      </span>
                    )}
                    <span className="font-semibold text-kw-red">
                      ★ Layton Office
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Communities List by County (§9) */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className="h-0.5 w-10 bg-kw-red" />
                    <span className="type-label text-kw-red">
                      COMMUNITIES BY COUNTY
                    </span>
                  </div>
                  <SampleChip
                    label="SHAWN REVIEW: Towns Only (Fair Housing)"
                    variant="shawn-review"
                  />
                </div>

                <h2 className="type-display-md mt-5 text-kw-ink">
                  35 Communities Across Davis, Weber &amp; Morgan Counties.
                </h2>

                <div className="mt-10 flex flex-col gap-12">
                  {areasServedPage.counties.map((group) => {
                    const isHighlighted = activeCounty === group.county;
                    return (
                      <div
                        key={group.county}
                        onMouseEnter={() => setActiveCounty(group.county)}
                        onMouseLeave={() => setActiveCounty(null)}
                        className={cn(
                          "border hairline-light bg-white p-7 shadow-sm transition-colors md:p-9",
                          isHighlighted && "border-kw-red"
                        )}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b hairline-light pb-4">
                          <h3 className="text-[1.2rem] font-semibold text-kw-ink">
                            {group.county}
                          </h3>
                          {group.note && (
                            <span className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-kw-red">
                              {group.note}
                            </span>
                          )}
                        </div>

                        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                          {group.communities.map((town) => {
                            const townSearchUrl = buildTownSearchUrl(
                              externalLinks.searchHomesUrl,
                              town
                            );
                            return (
                              <li key={town}>
                                <a
                                  href={townSearchUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onMouseEnter={() => {
                                    const found = NORTHERN_UTAH_TOWNS.find(
                                      (t) => t.name === town
                                    );
                                    if (found) setHoveredTown(found);
                                  }}
                                  onMouseLeave={() => setHoveredTown(null)}
                                  className="group inline-flex items-center gap-1.5 text-[0.92rem] text-charcoal transition-colors hover:font-medium hover:text-kw-red"
                                >
                                  <span>{town}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-kw-red" />
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Contact Callout */}
              <div className="mt-12 border hairline-light bg-mist p-8">
                <h3 className="text-[1.1rem] font-semibold text-kw-ink">
                  Looking for a Trusted Advisor in Northern Utah?
                </h3>
                <p className="type-body-sm mt-2 text-charcoal">
                  Visit us at {contact.fullAddress} or connect with our team online.
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-kw-red px-7 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-kw-red-bright"
                  >
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/clients"
                    className="inline-flex items-center gap-2 border border-kw-ink bg-white px-7 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-kw-ink transition-colors hover:bg-kw-ink hover:text-white"
                  >
                    Buy &amp; Sell With Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
