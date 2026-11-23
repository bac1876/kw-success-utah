import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { activeBrokerage } from "@/brokerages";
import { cn } from "@/lib/utils";

interface Chapter {
  name: string;
  advisorHelps: string;
  services: string[];
}

const CHAPTERS: Chapter[] = [
  {
    name: "Buying",
    advisorHelps: "Your advisor aligns financing, inspections, title examination, and homeowner coverage so you can make confident offers and close without surprises.",
    services: ["Lending", "Title & Escrow", "Insurance", "Inspections"],
  },
  {
    name: "Moving",
    advisorHelps: "From coordinating settlement dates to connecting you with vetted movers, your advisor ensures a smooth transition to your new home.",
    services: ["Title & Escrow", "Contractors & Repairs", "Moving"],
  },
  {
    name: "Living",
    advisorHelps: "Your advisor remains your trusted resource for home protection, maintenance referrals, and community connections long after closing.",
    services: ["Insurance", "Home Maintenance", "Design & Remodel"],
  },
  {
    name: "Maintaining",
    advisorHelps: "When something needs attention, your advisor connects you with reliable local contractors and service providers who show up and deliver quality work.",
    services: ["Insurance", "Contractors & Repairs", "Home Maintenance"],
  },
  {
    name: "Growing",
    advisorHelps: "Whether expanding, investing, or upgrading, your advisor helps you strategize your next move with market insights and lending solutions.",
    services: ["Lending", "Contractors & Repairs", "Design & Remodel"],
  },
  {
    name: "Selling",
    advisorHelps: "Your advisor coordinates inspections, contractors for repairs, and title work to maximize value and ensure a smooth listing-to-closing experience.",
    services: ["Title & Escrow", "Inspections", "Contractors & Repairs", "Design & Remodel"],
  },
  {
    name: "Beginning Again",
    advisorHelps: "Starting a new chapter? Your advisor brings the same comprehensive support—financing, insurance, moving, and trusted local pros—for your next home.",
    services: ["Lending", "Title & Escrow", "Insurance", "Moving"],
  },
];

interface SevenChaptersProps {
  className?: string;
}

export default function SevenChapters({ className = "" }: SevenChaptersProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const { oneTable } = activeBrokerage.home;

  const chapter = CHAPTERS[activeChapter];

  return (
    <section className={cn("py-16", className)}>
      <div className="container-kw">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/35 bg-kw-red/10 px-3.5 py-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
              01
            </span>
            <span className="type-label text-kw-red-bright">
              {oneTable.eyebrow}
            </span>
          </div>

          <h2 className="type-display-lg mt-6 text-ink">
            {oneTable.headline}
          </h2>

          <p className="type-body mt-6 text-charcoal leading-relaxed">
            {oneTable.body}
          </p>
        </div>

        {/* Chapter Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.name}
              onClick={() => setActiveChapter(idx)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-semibold transition-all",
                activeChapter === idx
                  ? "bg-kw-red text-white shadow-md"
                  : "border border-ink/20 text-ink hover:border-kw-red hover:text-kw-red"
              )}
            >
              {ch.name}
            </button>
          ))}
        </div>

        {/* Chapter Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-card md:p-12">
              {/* Chapter Name */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kw-red/10 text-lg font-bold text-kw-red">
                  {activeChapter + 1}
                </span>
                <h3 className="text-2xl font-bold text-ink">{chapter.name}</h3>
              </div>

              {/* How Your Advisor Helps */}
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-kw-gray">
                  How Your Advisor Helps
                </h4>
                <p className="mt-2 text-base leading-relaxed text-charcoal">
                  {chapter.advisorHelps}
                </p>
              </div>

              {/* Related Services */}
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-kw-gray">
                  Related Services
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {chapter.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-mist px-3 py-1.5 text-sm font-medium text-ink"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-kw-red" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-kw-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-kw-red-bright"
                >
                  <span>Talk to an Advisor</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Journey Caption */}
        <p className="mt-8 text-center text-sm text-kw-gray">
          {oneTable.journeyCaption}
        </p>
      </div>
    </section>
  );
}
