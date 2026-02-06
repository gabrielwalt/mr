# Motorola Solutions - Site Map & Template Classification

## Template Definitions

| Template | Description | Key Patterns |
|----------|-------------|--------------|
| `template-home` | Homepage with centered default content, multiple block types | Carousel hero, accordion+cards, logo marquee, carousel stories/wide, image-full-width, columns icons |
| `template-product` | Product/feature landing page with hero, stats, tabs, media columns | Teaser hero, columns stats, tabs, columns logos, columns media, carousel testimonials, carousel default, form |
| `template-industry` | Industry vertical page with hero, value props, product carousels, use cases, resources | Hero banner, info cards, product carousels by category, use case timeline, video embeds, customer story banner, resources carousel, CTA |
| `template-product-category` | Product category hub with hero, feature cards, product grid | Hero, feature highlights, product grid/cards, comparison tables |
| `template-about` | Corporate/about pages | Hero, text sections, leadership grid, stats |
| `template-contact` | Contact/form pages | Hero, form, location info |

## Already Migrated

| Page | URL | Template | Status |
|------|-----|----------|--------|
| Homepage | /en_us.html | `template-home` | ✅ Migrated |
| AI Assist Suites | /en_us/ai/assist-suites.html | `template-product` | ✅ Migrated |

## Priority Pages for Import

### Tier 1 - Pages using `template-product` (similar to assist-suites)

These pages follow a similar pattern to assist-suites and can largely reuse existing blocks.

| Page | URL | Template | Similarity to Assist Suites | Notes |
|------|-----|----------|-----------------------------|-------|
| Safety & Security Ecosystem | /en_us/solutions/safety-ecosystem.html | `template-product` | High | Hero + stats + product sections + testimonials |
| Critical Communications | /en_us/products/critical-communications.html | `template-product` | High | Product landing with hero + features |
| Command Center Software | /en_us/products/command-center-software.html | `template-product` | High | Software product hub |
| Video Security | /en_us/video-security-access-control.html | `template-product` | Medium | Product hub with more sub-categories |
| Managed & Support Services | /en_us/managed-support-services.html | `template-product` | Medium | Services overview |
| Cybersecurity Services | /en_us/managed-support-services/cybersecurity.html | `template-product` | Medium | Service-focused page |
| Government Grants | /en_us/solutions/government-grants.html | `template-product` | Medium | Informational with CTAs |

### Tier 2 - Industry Pages using `template-industry`

These pages are much more complex with many custom sections. They share a common pattern with each other but differ significantly from existing migrated pages.

| Page | URL | Template | Notes |
|------|-----|----------|-------|
| Education | /en_us/solutions/education.html | `template-industry` | Hero + value props + product carousel + use case timeline + ecosystem + resources + CTA |
| Law Enforcement | /en_us/solutions/law-enforcement.html | `template-industry` | Most complex - hero + AI tabs + 3 product carousel sections + video + testimonial + logos |
| Fire & EMS | /en_us/solutions/fire-ems.html | `template-industry` | Similar pattern to Education |
| Healthcare | /en_us/solutions/healthcare.html | `template-industry` | Similar pattern |
| Retail | /en_us/solutions/retail.html | `template-industry` | Enterprise-focused variant |
| Hospitality | /en_us/solutions/hospitality.html | `template-industry` | Enterprise-focused variant |
| Manufacturing | /en_us/solutions/manufacturing.html | `template-industry` | Enterprise-focused variant |
| Mining | /en_us/solutions/mining.html | `template-industry` | Enterprise-focused variant |
| Oil & Gas | /en_us/solutions/oil-gas.html | `template-industry` | Enterprise-focused variant |
| Transportation & Logistics | /en_us/solutions/transportation-logistics.html | `template-industry` | Enterprise-focused variant |
| Utilities | /en_us/solutions/utilities.html | `template-industry` | Enterprise-focused variant |
| Corrections | /en_us/solutions/corrections.html | `template-industry` | Public safety variant |
| U.S. Federal Government | /en_us/solutions/national-government-security.html | `template-industry` | Government-focused |
| Military | /en_us/solutions/defense.html | `template-industry` | Defense-focused |
| Stadiums | /en_us/solutions/stadiums.html | `template-industry` | Venue-focused |

### Tier 3 - Corporate/About Pages

| Page | URL | Template | Notes |
|------|-----|----------|-------|
| About Motorola Solutions | /en_us/about.html | `template-about` | Corporate overview |
| Customer Success Stories | /en_us/about/customers.html | `template-about` | Story listing/grid |
| Contact Us | /en_us/contact-us.html | `template-contact` | Form-focused |
| Careers | /en_us/about/careers.html | `template-about` | Job listings |
| Trust Center | /en_us/about/trust-center.html | `template-about` | Informational |
| ESG | /en_us/about/environmental-social-corporate-governance-esg.html | `template-about` | Corporate responsibility |
| Foundation | /en_us/about/motorola-solutions-foundation.html | `template-about` | Foundation info |
| Recognition | /en_us/about/recognition.html | `template-about` | Awards listing |

### Tier 4 - Product Detail Pages

| Page | URL | Template | Notes |
|------|-----|----------|-------|
| All Products | /en_us/products.html | `template-product-category` | Product directory |
| APX P25 Radio | /en_us/products/p25-products/apx-story.html | `template-product` | Product story page |
| MOTOTRBO | /en_us/products/mototrbo-story.html | `template-product` | Product story page |

## Block Requirements by Template

### template-product (existing blocks cover ~90%)
- ✅ `teaser (hero)` - Single hero with background image
- ✅ `columns (stats)` - Statistics display
- ✅ `tabs` - Tabbed content panels
- ✅ `columns (logos)` - Logo display
- ✅ `columns (media)` - Two-column with image/text
- ✅ `carousel (testimonials)` - Quote carousel
- ✅ `carousel` (default) - Product card carousel
- ✅ `form` - Contact/lead gen form
- ✅ Section styles: highlight, dark, black

### template-industry (needs ~40% new blocks)
- ✅ Hero banner (can use `teaser (hero)`)
- ✅ Product carousel (can use `carousel` default)
- ✅ Logo marquee (can use `columns (logos-rotate)`)
- ❌ **NEW: Info cards** - 3-column value proposition cards with icons
- ❌ **NEW: Timeline/steps** - Numbered step-by-step process
- ❌ **NEW: Video embed** - Brightcove video player integration
- ❌ **NEW: Category sections** - Grouped product carousels with section headers
- ❌ **NEW: Resource cards** - Download cards with thumbnails
- ✅ Customer story banner (can use `columns (media)` variant)
- ✅ CTA banner (can use `teaser` variant or default content)

## Import Strategy

**Phase 1**: Import Tier 1 pages (template-product) - these reuse ~90% of existing blocks
**Phase 2**: Build new blocks for template-industry, then import Tier 2 pages
**Phase 3**: Import remaining Tier 3-4 pages as needed
