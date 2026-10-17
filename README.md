# KW Success Keller Williams Realty — Multi-Brokerage Website Template

This repository powers the public website for **KW Success Keller Williams Realty** (Layton, Utah) and is built on a multi-brokerage configuration architecture (`src/brokerages/`) so that adding a new brokerage is a configuration job rather than a rebuild.

---

## 1. Local Development

```bash
# Install dependencies
npm install

# Start local dev server (defaults to VITE_BROKERAGE=kw-success)
npm run dev

# Type-check and build for production
npm run build

# Lint (ESLint 9 flat config in eslint.config.js)
npm run lint
```

---

## 2. Multi-Brokerage Architecture (`src/brokerages/`)

All brokerage-specific copy, branding, leadership bios, service seats, areas served, disclosures, and feature flags live outside of UI components:

- [`src/brokerages/types.ts`](src/brokerages/types.ts) — Full TypeScript schema for any brokerage instance.
- [`src/brokerages/kw-success/config.ts`](src/brokerages/kw-success/config.ts) — Complete configuration for **KW Success Keller Williams Realty** (Layton, UT).
- [`src/brokerages/index.ts`](src/brokerages/index.ts) — Active brokerage selector (`VITE_BROKERAGE=kw-success` or `monogram`).

### How to Add a 3rd Brokerage
1. Duplicate `src/brokerages/kw-success/config.ts` into `src/brokerages/<new-slug>/config.ts`.
2. Place logos and leadership headshots in `public/<new-slug>/`.
3. Register the slug in `src/brokerages/index.ts` and set `VITE_BROKERAGE=<new-slug>`.

### How to Swap Content or Flip Feature Flags
Open [`src/brokerages/kw-success/config.ts`](src/brokerages/kw-success/config.ts):
- **Feature Flags (`flags`)**:
  - `showTestimonials`: Set to `true` once real client and agent quotes are collected with permission.
  - `showAgentStories`: Set to `true` once agent stories are ready.
  - `showInsurancePartner`: Set to `true` when the insurance partner launches.
  - `showTableProviderLogos`: Set to `true` to show provider names/logos inside the "Everyone at One Table" diagram (automatically triggers the Affiliated Business Disclosure when any provider has `affiliated: true`).
- **One Table Seats (`home.oneTable.seats`)**: Reorder, add, or remove service categories without touching components.
- **Leadership Team (`aboutPage.leadership`)**: Edit bios, contact details, or photos in one array.

---

## 3. Environment Variables (`.env.example`)

Never commit secrets to the repository. Copy `.env.example` to `.env.local` for local/production configuration:

| Variable | Description |
| :--- | :--- |
| `VITE_BROKERAGE` | Active brokerage key (`kw-success` default, or `monogram`) |
| `VITE_SUPABASE_URL` | Supabase project URL for storing `/contact` and `/agents` form submissions |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key for inserting into `lead_submissions` |
| `VITE_GA4_ID` | Google Analytics 4 Measurement ID |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible Analytics domain |

---

## 4. Open Placeholders & Compliance Review

See [`CONTENT-TODO.md`](CONTENT-TODO.md) for the complete checklist of `[PLACEHOLDER]` and `[SHAWN REVIEW]` items tracked for staging review.
