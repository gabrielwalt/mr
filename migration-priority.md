# Migration Priority & Strategy

> Recommended import order and strategy for the Motorola Solutions Edge Delivery Services migration.
> **Last updated**: 2026-02-11

---

## Guiding Principles

1. **Maximize block reuse** — Import pages that can use existing blocks before building new ones
2. **Template-first** — Group pages by template; migrate one template fully before moving to the next
3. **High-traffic first** — Prioritize customer-facing marketing pages over internal/utility pages
4. **Bulk import readiness** — Identify groups of structurally identical pages for efficient batch processing

---

## Phase 1: Marketing Landing Pages (`template-home`)

**Status**: 4 of 158 pages migrated
**New blocks needed**: 0
**Block coverage**: ~90% (all blocks already exist)

These pages reuse the same blocks as the 4 already-migrated pages. They are the highest-value, lowest-effort migrations.

### Phase 1A: Product Pillar Landings (Tier 1)

Direct reuse of existing block patterns from Assist Suites and Safety Ecosystem.

| # | Page | URL | Similar To | Priority |
|---|------|-----|------------|----------|
| 1 | Critical Communications | /en_us/products/critical-communications.html | Safety Ecosystem | High |
| 2 | Command Center Software | /en_us/products/command-center-software.html | Safety Ecosystem | High |
| 3 | Video Security Landing | /en_us/video-security-access-control.html | Safety Ecosystem | High |
| 4 | Managed & Support Services | /en_us/managed-support-services.html | Safety Ecosystem | High |
| 5 | Cybersecurity Services | /en_us/managed-support-services/cybersecurity.html | Assist Suites | High |
| 6 | APX Story (P25) | /en_us/products/p25-products/apx-story.html | Assist Suites | Medium |
| 7 | MOTOTRBO Story | /en_us/products/mototrbo-story.html | Assist Suites | Medium |
| 8 | Two-Way Radios Story | /en_us/products/two-way-radios-story.html | Assist Suites | Medium |
| 9 | FirstNet | /en_us/products/firstnet.html | Assist Suites | Medium |
| 10 | Government Grants | /en_us/solutions/government-grants.html | Assist Suites | Medium |

### Phase 1B: Industry Vertical Pages (Tier 2)

All 15 industry pages follow the same structural pattern. Once one is migrated successfully, the rest can be bulk-imported.

**Recommended pilot**: Law Enforcement (most complex industry page — if it works, all simpler ones will too)

| # | Page | URL | Notes |
|---|------|-----|-------|
| 1 | Law Enforcement | /en_us/solutions/law-enforcement.html | Pilot — most complex |
| 2 | Education | /en_us/solutions/education.html | Public safety variant |
| 3 | Fire & EMS | /en_us/solutions/fire-ems.html | Public safety variant |
| 4 | Healthcare | /en_us/solutions/healthcare.html | Enterprise variant |
| 5 | Retail | /en_us/solutions/retail.html | Enterprise variant |
| 6 | Hospitality | /en_us/solutions/hospitality.html | Enterprise variant |
| 7 | Manufacturing | /en_us/solutions/manufacturing.html | Enterprise variant |
| 8 | Corrections | /en_us/solutions/corrections.html | Public safety variant |
| 9 | Transportation & Logistics | /en_us/solutions/transportation-logistics.html | Enterprise variant |
| 10 | Utilities | /en_us/solutions/utilities.html | Enterprise variant |
| 11 | Mining | /en_us/solutions/mining.html | Enterprise variant |
| 12 | Oil & Gas | /en_us/solutions/oil-gas.html | Enterprise variant |
| 13 | U.S. Federal Government | /en_us/solutions/national-government-security.html | Government variant |
| 14 | Military / Defense | /en_us/solutions/defense.html | Defense variant |
| 15 | Stadiums | /en_us/solutions/stadiums.html | Venue variant |

### Phase 1C: Secondary Marketing Pages

| # | Page | URL | Notes |
|---|------|-----|-------|
| 1 | ESG Landing | /en_us/about/environmental-social-corporate-governance-esg.html | Corporate responsibility |
| 2 | Careers | /en_us/about/careers.html | Job listings |
| 3 | Trust Center | /en_us/about/trust-center.html | Security info |
| 4 | Recognition / Awards | /en_us/about/recognition.html | Awards listing |
| 5 | Customer Success Stories | /en_us/about/customers.html | Story listing |
| 6 | Developers | /en_us/developers.html | Developer portal |
| 7 | Partners | /en_us/partners.html | Partner portal |
| 8 | Ecosystem Use Cases (6 pages) | /en_us/solutions/safety-ecosystem/*-use-case.html | Interactive walkthroughs |
| 9 | Solution sub-pages (~30) | /en_us/solutions/*/*.html | Industry sub-pages |

---

## Phase 2: Product Detail Pages (`template-product-detail`)

**Status**: 0 of 716 pages migrated
**New blocks needed**: 3-4
**Block coverage**: ~50% — requires template development

### Prerequisites

Before bulk import, develop these new blocks:

1. **Product hero variant** — Large product image with name, tagline, key specs
2. **Specs table block** — Two-column key-value specification table
3. **Feature list block** — Icon + text feature bullet points
4. **Downloads block** — File download links with type icons

### Sub-phases

| Phase | Section | Count | Notes |
|-------|---------|-------|-------|
| 2A | P25 products (radios, systems, security) | ~46 | Highest traffic products |
| 2B | MOTOTRBO radios & systems | ~30 | Second highest |
| 2C | Command center software | ~78 | Software product pages (largest sub-group) |
| 2D | Video security & access control | ~105 | Cameras, LPR, drones, body-worn, in-car |
| 2E | Two-way radio accessories | ~118 | Batteries, chargers, audio, antennas |
| 2F | Commercial/consumer radios | ~55 | Analog, on-site, consumer radios |
| 2G | Dispatch & logging | ~38 | Consoles, fire station alerting, recorders |
| 2H | Broadband / LTE / SCADA | ~40 | PTT, IoT, SCADA, LTE devices |
| 2I | Vertex Standard radios | ~16 | Legacy Vertex product line |
| 2J | Other products (impres, pagers, etc.) | ~90 | Everything else |

### Bulk Import Strategy

Product detail pages within the same category are structurally identical. Recommended approach:

1. Migrate **one pilot page** per category manually
2. Build **import scripts** for each category based on the pilot
3. **Bulk import** remaining pages in the category
4. **QA** with visual comparison

---

## Phase 3: Corporate & About Pages (`template-about`)

**Status**: 0 of 141 pages migrated (+ 9 investors pages)
**New blocks needed**: 1-2
**Block coverage**: ~60%

### Sub-phases

| Phase | Section | Count | Notes |
|-------|---------|-------|-------|
| 3A | About landing + main corporate | ~5 | About, Foundation, Suppliers |
| 3B | ESG sub-pages | ~30 | Text-heavy reports |
| 3C | Legal / Privacy / Terms | ~17 | Plain text pages |
| 3D | History / Heritage | ~10 | Interactive content |
| 3E | Police Week profiles | ~10 | Story pages |
| 3F | Other about pages | ~20 | Events, misc |

---

## Phase 4: Application Catalog (`template-application-catalog`)

**Status**: 0 of 112 pages migrated
**New blocks needed**: 2-3
**Block coverage**: ~40%

All 112 pages follow the same standardized format. Ideal for bulk import once the template is developed.

1. Develop template from **one pilot page**
2. Build import script
3. Bulk import all 112 pages
4. QA

---

## Phase 5: Remaining Pages

| Phase | Section | Count | Template | Notes |
|-------|---------|-------|----------|-------|
| 5A | Engage / gated content | 29 | `template-engage` | Form-based lead gen |
| 5B | Product catalog hub | 1 | `template-product-catalog` | Unique interactive layout |
| 5C | Specialized pages | 42 | Various | Low priority utilities |
| 5D | Newsroom / press releases | 2,009 | newsroom | Separate CMS, likely last |
| 5E | Investors pages | 9 | `template-about` | Corporate IR pages |

---

## Summary Roadmap

| Phase | Pages | New Blocks | Effort | Value |
|-------|-------|-----------|--------|-------|
| **1A**: Product pillar landings | 10 | 0 | Low | High |
| **1B**: Industry vertical pages | 15 | 0 | Low-Medium | High |
| **1C**: Secondary marketing pages | ~133 | 0 | Medium | Medium |
| **2**: Product detail pages | 716 | 3-4 | High | High |
| **3**: Corporate / About pages | 150 | 1-2 | Medium | Medium |
| **4**: Application catalog | 112 | 2-3 | Medium | Low |
| **5A**: Engage pages | 29 | 0-1 | Low | Low |
| **5B-E**: Remaining + Newsroom | 2,052 | 1-2 | Medium-High | Low |

### Quick Wins (immediate, no new development)

1. Import **Critical Communications** landing (/en_us/products/critical-communications.html) — structurally identical to Safety Ecosystem
2. Import **Law Enforcement** industry page (/en_us/solutions/law-enforcement.html) — validates industry page template
3. Import **Command Center Software** landing (/en_us/products/command-center-software.html)

These three pages combined cover the two main page structures (product pillar + industry vertical) and unlock bulk import of ~150+ more `template-home` pages using the same approach.

> **Full site scope**: The complete Motorola Solutions sitemap contains **3,217 pages** (1,199 en_us + 9 investors + 2,009 newsroom). See `sitemap.md` for the complete URL listing.

---

## Avigilon / External Sites

The Avigilon site (avigilon.com) is a separate domain with its own sitemap. The Alta page has been migrated as a one-off. Additional Avigilon pages would follow the same `template-home` pattern but are tracked separately:

| Site | Sitemap Sections | Notes |
|------|-----------------|-------|
| avigilon.com | blog, case-studies, pages, partner-integrations, products | Separate domain, separate migration track |

---

## Localization Note

The sitemap index contains **27 locale-specific sitemaps** beyond en_us:

| Region | Locale | Notes |
|--------|--------|-------|
| International | en_xu, en_xp, en_xl | English regional variants |
| France | fr_fr | French |
| DACH | de_xc | German |
| Poland | pl_pl | Polish |
| Russia | ru_ru | Russian |
| Israel | he_il | Hebrew |
| Asia | en_xa | English for Asia |
| Japan | ja_jp | Japanese |
| Korea | ko_kr | Korean |
| China | zh_cn | Chinese |
| Latin America | es_xl, pt_xl | Spanish, Portuguese |
| Ukraine | uk_ua | Ukrainian |
| Italy | it_it | Italian |

Localized versions share the same templates but have translated content. Once en_us templates and blocks are stable, localized sites can follow the same import patterns.
