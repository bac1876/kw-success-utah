# KW Success Website — Open Placeholders & Content Checklist (`CONTENT-TODO.md`)

Per **§14 & §15** of `imfo.md`, this file tracks every open `[PLACEHOLDER]`, `[SHAWN REVIEW]` item, and feature-flagged section awaiting final assets or verification.

---

## 1. Visual & Brand Assets
- [ ] **Hero Photo (§3.2, §15)**: Currently using a high-resolution Wasatch mountain stock photo (`/kw-success/hero-wasatch.jpg`, labeled `[PLACEHOLDER]` on staging). Replace in `src/brokerages/kw-success/config.ts` (`home.hero.image`) if Marcus commissions a custom Ogden Valley / Pineview photo.
- [ ] **KWRI-Approved Web Fonts (§3.5, §15)**: Currently using clean geometric sans (`Jost`) with Monogram's italic serif accents removed. Swap in web-licensed KWRI font files once Vincie Edwards / Shawn Janke supply the brand kit.
- [ ] **Community / Event Photos (§8.5, §15)**: 4 placeholder tiles on `/about` ("RED Day Service Project", "KW Success Cares Event", etc.) awaiting event photos.

---

## 2. Leadership Team (`src/brokerages/kw-success/config.ts` → `aboutPage.leadership`)
- [ ] **Alyson Brown (Productivity Coach, #5)**:
  - `[PLACEHOLDER]` Email address
  - `[PLACEHOLDER]` Phone number
  - `[PLACEHOLDER: bio coming]` Short bio
- [ ] **Bradley Green (Market Center Tech Trainer, #8)**:
  - `[PLACEHOLDER: bio coming]` Short bio (Email `bradley@unitedagentservices.biz` and phone `385.405.4082` are live)

---

## 3. Copy & External Links (`src/brokerages/kw-success/config.ts`)
- [ ] **Main Office Phone & Hours (§11, §15)**:
  - Phone currently shows `801.475.9900` (from the leadership doc) with `[PLACEHOLDER: Marcus to confirm]`.
  - Office hours currently show `Monday – Friday · 9:00 AM – 5:00 PM` with `[PLACEHOLDER]`.
- [ ] **Timeline Milestones (§8.3, §15)**:
  - `1997 · KW Success opens in Layton.` is live; intermediate milestones between 1997 and today are marked `[PLACEHOLDER]`.
- [ ] **Verified 1997–2011 Production Numbers (§5.6, §15)**:
  - `20,000+ Homes closed since 1997` and `$6 Billion+ In real estate` are marked `[DRAFT STATS]` pending Marcus's verification of 1997–2011 numbers.
- [ ] **Unity Home Loans & Amicus Title Final Copy (§10, §15)**:
  - `/services/mortgage` and `/services/title` have official logos and draft 2–3 sentence intro copy marked `[PLACEHOLDER]` until Marcus/Unity/Amicus supply final text.
- [ ] **Find-an-Agent Roster URL on kw.com (§7, §15)**:
  - Currently links to `https://kwsuccessutah.kw.com/agents` with `[PLACEHOLDER]` badge until Marcus confirms the exact roster URL.

---

## 4. Legal & Compliance Items (`[SHAWN REVIEW]` — Shawn Janke, Designated Broker)
- [ ] **Affiliated Business Disclosure (§5.2, §10, §13)**:
  - Draft disclosure and full-capitals RESPA notice (`YOU ARE NOT REQUIRED TO USE THE LISTED PROVIDER(S)…`) are live on `/services/mortgage`, `/services/title`, the site Footer, and `/affiliated-business-disclosure`. Shawn to supply final approved text and PDF.
- [ ] **Utah Best of State Badge (§5.6)**:
  - `"Keller Williams Utah · Utah Best of State, Real Estate Services · 8-time winner (2018–2026)."` (Attributed to the Utah Region, without the word "consecutive").
- [ ] **Footer Legal Line & Utah Advertising Rules (§13)**:
  - `© 2026 KW Success Keller Williams Realty · 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041 · Each Keller Williams office is independently owned and operated · Equal Housing Opportunity · REALTOR®`
- [ ] **Fair Housing Review (§7, §9)**:
  - `/clients` and `/areas-served` list only towns and services without neighborhood/school/demographic steering.

---

## 5. Hidden Sections (Controlled by Feature Flags in `src/brokerages/kw-success/config.ts`)
- [ ] `showTestimonials: false` (§5.8 — hidden until real client & agent quotes are collected with permission)
- [ ] `showAgentStories: false` (§6.7 — hidden until real agent stories are collected)
- [ ] `showInsurancePartner: false` (§4 — hidden until insurance partner is finalized)
