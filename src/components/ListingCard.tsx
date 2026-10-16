import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Listing, ListingStatus } from "@/data/listings";
import { formatPrice, formatBaths, listingDivision } from "@/data/listings";
import { cn } from "@/lib/utils";

const SAVED_KEY = "mn-saved-homes";

export function getSavedHomes(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function toggleSaved(slug: string): boolean {
  const saved = getSavedHomes();
  const idx = saved.indexOf(slug);
  if (idx >= 0) saved.splice(idx, 1);
  else saved.push(slug);
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  window.dispatchEvent(new Event("mn-saved-changed"));
  return idx < 0;
}

export const statusColor: Record<ListingStatus, string> = {
  "For Sale": "bg-copper text-ink",
  New: "bg-copper-bright text-ink",
  "Active Under Contract": "bg-sage text-ink",
  Sold: "bg-stone text-ink",
  "For Sale · LUXE": "bg-luxe-gold text-ink",
};

interface ListingCardProps {
  listing: Listing;
  /** dark = on ink backgrounds, light = on ivory backgrounds */
  tone?: "dark" | "light";
  compact?: boolean;
  className?: string;
}

export default function ListingCard({
  listing,
  tone = "dark",
  compact = false,
  className,
}: ListingCardProps) {
  const [saved, setSaved] = useState(() =>
    getSavedHomes().includes(listing.slug)
  );

  const onSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleSaved(listing.slug));
  };

  const textMain = tone === "dark" ? "text-ivory" : "text-ink";
  const textMuted = tone === "dark" ? "text-stone-dark" : "text-stone";
  const cardBg = tone === "dark" ? "bg-ink" : "bg-ivory";

  return (
    <Link
      to={`/listing/${listing.slug}`}
      className={cn(
        "group block overflow-hidden border",
        tone === "dark" ? "hairline-dark" : "hairline-light",
        cardBg,
        className
      )}
      data-cursor="View"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image}
          alt={`${listing.address}, ${listing.city}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <div className="overlay-card absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span
          className={cn(
            "absolute left-3 top-3 z-10 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.28em]",
            statusColor[listing.status]
          )}
        >
          {listing.status}
        </span>
        {/* KW Luxury / KW Commercial badge (R2-Q4) — Maria wants to see how far it pulls from the listing */}
        {listingDivision(listing) && (
          <span className="absolute left-3 top-11 z-10 flex items-center gap-1.5 border border-copper/70 bg-ink/70 px-2.5 py-1 text-[0.55rem] font-medium uppercase tracking-[0.26em] text-copper-bright backdrop-blur-sm">
            <span className="font-semibold lowercase tracking-normal text-white">kw</span>
            {listingDivision(listing)!.replace("KW ", "")}
          </span>
        )}
        {/* Mockup data marker — removed when the IDX feed lands (spec Q4/H14) */}
        <span
          className="absolute bottom-3 right-3 z-10 border border-white/40 bg-ink/50 px-2 py-0.5 text-[0.52rem] font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm"
          title="Sample listing — live IDX feed pending"
        >
          Sample
        </span>
        <motion.button
          type="button"
          aria-label={saved ? "Unsave home" : "Save home"}
          onClick={onSave}
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className={cn(
            "absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border border-white/30 bg-ink/40 backdrop-blur-sm transition-colors",
            saved ? "text-copper" : "text-white hover:text-copper"
          )}
        >
          <Heart
            className="h-4 w-4"
            fill={saved ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        </motion.button>
        <span className="absolute bottom-4 left-4 z-10 translate-y-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-copper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View Residence →
        </span>
      </div>
      <div className={cn("p-5", compact && "p-4")}>
        <p
          className={cn(
            "type-display-md",
            compact ? "!text-[1.35rem]" : "!text-[1.7rem]",
            textMain
          )}
        >
          {formatPrice(listing.price)}
        </p>
        <p className={cn("type-body mt-2", textMain)}>{listing.address}</p>
        <p className={cn("type-body-sm", textMuted)}>
          {listing.city}, {listing.state}
        </p>
        <div
          className={cn(
            "mt-4 flex items-center gap-3 border-t pt-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]",
            tone === "dark" ? "hairline-dark" : "hairline-light",
            textMuted
          )}
        >
          {listing.commercial ? (
            <span>{listing.type}</span>
          ) : (
            <>
              <span>{listing.beds} BD</span>
              <span className={tone === "dark" ? "text-copper/50" : "text-copper"}>
                ·
              </span>
              <span>{formatBaths(listing.baths)} BA</span>
            </>
          )}
          <span className={tone === "dark" ? "text-copper/50" : "text-copper"}>
            ·
          </span>
          <span>{listing.sqft.toLocaleString("en-US")} SQFT</span>
        </div>
      </div>
    </Link>
  );
}
