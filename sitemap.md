# Motorola Solutions - Site Map & Template Classification

> **Source**: `https://www.motorolasolutions.com/sitemap-index.xml` (28 sub-sitemaps, en_us focus)
> **Total en_us pages**: ~600+
> **Last updated**: 2026-02-11

---

## Already Migrated

| Page | Source URL | Local Path | Template | Status |
|------|-----------|------------|----------|--------|
| Homepage | /en_us.html | `/content/en-us.html` | `template-home` | Migrated |
| AI Assist Suites | /en_us/ai/assist-suites.html | `/content/en-us/ai/assist-suites.html` | `template-home` | Migrated |
| Safety & Security Ecosystem | /en_us/solutions/safety-ecosystem.html | `/content/en-us/solutions/safety-ecosystem.html` | `template-home` | Migrated |
| Avigilon Alta | avigilon.com/alta | `/content/alta.html` | `template-home` | Migrated |
| Navigation | (derived) | `/content/nav.html` | Fragment | Migrated |
| Footer | (derived) | `/content/footer.html` | Fragment | Migrated |
| Contact Form | (locally authored) | `/content/fragments/contact-form.html` | Fragment | Migrated |

---

## Template Definitions

| Template | Description | Key Patterns | Page Count |
|----------|-------------|--------------|------------|
| `template-home` | Marketing landing pages with rich content sections | Hero (teaser/carousel) + cards + tabs + columns + testimonials + logos + CTA | ~50 |
| `template-product-catalog` | Product portfolio hub with category navigation | Secondary sticky nav + product carousels + decision tools + accordion directory | ~1 |
| `template-product-detail` | Individual product/feature pages | Product image + specs + features + accessories + downloads | ~245 |
| `template-about` | Corporate/about information pages | Varies: rich marketing or simpler text-heavy content | ~92 |
| `template-application-catalog` | Standardized partner/app listing pages | Logo + description + features + compatibility | ~74 |
| `template-engage` | Gated content / lead gen landing pages | Brief description + lead capture form | ~21 |
| Specialized | Interactive tools, portals, community | Varies significantly | ~22 |

> See `page-templates.md` for detailed template analysis and block requirements.

---

## Full Page Inventory by Section

### Top-Level Pages (direct /en_us/ paths)

| Page | URL | Template | Priority | Notes |
|------|-----|----------|----------|-------|
| Homepage | /en_us.html | `template-home` | — | Migrated |
| All Products | /en_us/products.html | `template-product-catalog` | Medium | Unique layout: card carousel + decision tools + accordion directory |
| Solution Finder | /en_us/solution-finder.html | Specialized | Low | Interactive JS tool (MOTOTRBO radio builder) |
| Brand Guidelines | /en_us/brand.html | `template-about` | Low | Corporate reference |
| Notifications Subscription | /en_us/notifications-subscription.html | Specialized | Low | Utility page |
| Registration Status | /en_us/RegistrationStatus.html | Specialized | Low | Utility page |
| CSFC | /en_us/csfc.html | Specialized | Low | Utility page |
| DSCLLC | /en_us/dscllc.html | Specialized | Low | Utility page |
| Activity Streams | /en_us/activitystreams.html | Specialized | Low | Utility page |
| Texas | /en_us/states/texas.html | `template-home` | Low | State-specific landing |
| Community User Groups | /en_us/communities/usergroups.html | Specialized | Low | Community feature |

---

### Solutions / Industry Pages (~48 pages)

#### Industry Verticals (Tier 2 - High Priority)

All industry pages follow the same structure: hero banner + value propositions + multiple product carousel sections + video embeds + testimonial + partner logos + resources + CTA. Structurally identical to the imported Safety Ecosystem page.

| Page | URL | Template | Similarity | Notes |
|------|-----|----------|------------|-------|
| Law Enforcement | /en_us/solutions/law-enforcement.html | `template-home` | Safety Ecosystem | Hero + AI tabs + 3 product carousel sections + video + testimonial + logos |
| Education | /en_us/solutions/education.html | `template-home` | Safety Ecosystem | Hero + value props + product carousel + use case timeline + ecosystem |
| Fire & EMS | /en_us/solutions/fire-ems.html | `template-home` | Safety Ecosystem | Public safety variant |
| Healthcare | /en_us/solutions/healthcare.html | `template-home` | Safety Ecosystem | Similar pattern |
| Retail | /en_us/solutions/retail.html | `template-home` | Safety Ecosystem | Enterprise-focused variant |
| Hospitality | /en_us/solutions/hospitality.html | `template-home` | Safety Ecosystem | Enterprise-focused variant |
| Manufacturing | /en_us/solutions/manufacturing.html | `template-home` | Safety Ecosystem | Enterprise-focused variant |
| Mining | /en_us/solutions/mining.html | `template-home` | Safety Ecosystem | Enterprise-focused variant |
| Oil & Gas | /en_us/solutions/oil-gas.html | `template-home` | Safety Ecosystem | Enterprise-focused variant |
| Transportation & Logistics | /en_us/solutions/transportation-logistics.html | `template-home` | Safety Ecosystem | Enterprise-focused variant |
| Utilities | /en_us/solutions/utilities.html | `template-home` | Safety Ecosystem | Enterprise-focused variant |
| Corrections | /en_us/solutions/corrections.html | `template-home` | Safety Ecosystem | Public safety variant |
| U.S. Federal Government | /en_us/solutions/national-government-security.html | `template-home` | Safety Ecosystem | Government-focused |
| Military / Defense | /en_us/solutions/defense.html | `template-home` | Safety Ecosystem | Defense-focused |
| Stadiums | /en_us/solutions/stadiums.html | `template-home` | Safety Ecosystem | Venue-focused |
| Government Grants | /en_us/solutions/government-grants.html | `template-home` | Assist Suites | Informational with CTAs |
| Customer Success Stories | /en_us/about/customers.html | `template-home` | Safety Ecosystem | Story listing |

#### Solution Sub-pages (~30 pages)

| Section | Example URLs | Count | Template |
|---------|-------------|-------|----------|
| Disaster preparedness | /en_us/solutions/disaster-preparedness/*.html | ~5 | `template-home` |
| Education sub-pages | /en_us/solutions/education/*.html | ~5 | `template-home` |
| Law enforcement sub-pages | /en_us/solutions/law-enforcement/*.html | ~5 | `template-home` |
| Hospitality sub-pages | /en_us/solutions/hospitality/*.html | ~3 | `template-home` |
| Healthcare sub-pages | /en_us/solutions/healthcare/*.html | ~3 | `template-home` |
| National government sub-pages | /en_us/solutions/national-government-security/*.html | ~5 | `template-home` |
| Other solution sub-pages | Various | ~4 | `template-home` |

#### Safety Ecosystem Use Cases (6 pages)

| Page | URL | Template | Notes |
|------|-----|----------|-------|
| Active School Threat | /en_us/solutions/safety-ecosystem/school-active-threat-use-case.html | `template-home` | Interactive use case walkthrough |
| Missing Child | /en_us/solutions/safety-ecosystem/missing-child-use-case.html | `template-home` | Interactive use case walkthrough |
| Occupational Assault | /en_us/solutions/safety-ecosystem/occupational-safety-use-case.html | `template-home` | Interactive use case walkthrough |
| Road Accident | /en_us/solutions/safety-ecosystem/road-accident-use-case.html | `template-home` | Interactive use case walkthrough |
| Active Workplace Threat | /en_us/solutions/safety-ecosystem/business-active-threat-use-case.html | `template-home` | Interactive use case walkthrough |
| Severe Weather | /en_us/solutions/safety-ecosystem/severe-weather-use-case.html | `template-home` | Interactive use case walkthrough |

---

### Products (~245 pages)

#### Product Story / Landing Pages (Tier 1 - High Priority)

| Page | URL | Template | Similarity | Notes |
|------|-----|----------|------------|-------|
| Critical Communications | /en_us/products/critical-communications.html | `template-home` | Safety Ecosystem | Technology pillar landing |
| Command Center Software | /en_us/products/command-center-software.html | `template-home` | Safety Ecosystem | Software hub |
| APX Story (P25 Radio) | /en_us/products/p25-products/apx-story.html | `template-home` | Assist Suites | Product story page |
| MOTOTRBO Story | /en_us/products/mototrbo-story.html | `template-home` | Assist Suites | Product story page |
| Two-Way Radios Story | /en_us/products/two-way-radios-story.html | `template-home` | Assist Suites | Product story page |
| FirstNet | /en_us/products/firstnet.html | `template-home` | Assist Suites | Product story page |

#### P25 Products (~40 pages)

| Sub-section | Example URLs | Count | Template |
|-------------|-------------|-------|----------|
| Portable radios | /en_us/products/two-way-radios/project-25-radios/portable-radios/*.html | ~15 | `template-product-detail` |
| Mobile radios | /en_us/products/two-way-radios/project-25-radios/mobile-radios/*.html | ~8 | `template-product-detail` |
| ASTRO systems | /en_us/products/p25-products/astro*.html | ~5 | `template-product-detail` |
| APX applications | /en_us/products/p25-products/apx-mission-critical-applications*.html | ~5 | `template-product-detail` |
| Dispatch consoles | /en_us/products/dispatch/*.html | ~7 | `template-product-detail` |

#### MOTOTRBO Products (~30 pages)

| Sub-section | Example URLs | Count | Template |
|-------------|-------------|-------|----------|
| Portable radios | /en_us/products/two-way-radios/mototrbo/portable-radios/*.html | ~10 | `template-product-detail` |
| Mobile radios | /en_us/products/two-way-radios/mototrbo/mobile-radios/*.html | ~8 | `template-product-detail` |
| MOTOTRBO systems | /en_us/products/mototrbo-systems/*.html | ~12 | `template-product-detail` |

#### Command Center Software (~50 pages)

| Sub-section | Example URLs | Count | Template |
|-------------|-------------|-------|----------|
| Public safety software | /en_us/products/command-center-software/public-safety-software/*.html | ~25 | `template-product-detail` |
| Broadband PTT / WAVE | /en_us/products/command-center-software/broadband-ptt-and-lmr-interoperability/*.html | ~10 | `template-product-detail` |
| Enterprise software | /en_us/products/command-center-software/enterprise-software/*.html | ~8 | `template-product-detail` |
| Rave / alerting | /en_us/products/command-center-software/rave*.html | ~7 | `template-product-detail` |

#### Consumer Radios (~15 pages)

| Sub-section | Example URLs | Count | Template |
|-------------|-------------|-------|----------|
| Consumer two-way radios | /en_us/products/two-way-radios/consumer-two-way-radios/*.html | ~10 | `template-product-detail` |
| Commercial business radios | /en_us/products/two-way-radios/commercial-business-two-way-radio-systems/*.html | ~5 | `template-product-detail` |

#### Other Products (~20 pages)

| Sub-section | Example URLs | Count | Template |
|-------------|-------------|-------|----------|
| Panic button | /en_us/products/panic-button-solutions*.html | ~3 | `template-product-detail` |
| Training | /en_us/products/training*.html | ~2 | `template-product-detail` |
| Case studies | /en_us/products/command-center-software/*/case-study*.html | ~10 | `template-about` |
| Accessories | /en_us/products/two-way-radio-accessories/*.html | ~5 | `template-product-detail` |

---

### Video Security & Access Control (~67 pages)

| Sub-section | Example URLs | Count | Template |
|-------------|-------------|-------|----------|
| Video security landing | /en_us/video-security-access-control.html | 1 | `template-home` |
| Video security hub | /en_us/video-security-access-control/video-security.html | 1 | `template-home` |
| IP cameras | /en_us/video-security-access-control/video-security/ip-security-cameras.html | ~5 | `template-product-detail` |
| Video management | /en_us/video-security-access-control/video-security/video-management.html | ~3 | `template-product-detail` |
| Access control | /en_us/video-security-access-control/access-control.html | 1 | `template-home` |
| Body cameras | /en_us/video-security-access-control/body-worn-cameras/*.html | ~15 | `template-product-detail` |
| In-car video | /en_us/video-security-access-control/in-car-video-systems/*.html | ~10 | `template-product-detail` |
| LPR cameras | /en_us/video-security-access-control/license-plate-recognition-camera-systems/*.html | ~10 | `template-product-detail` |
| Drones | /en_us/video-security-access-control/drones/*.html | ~5 | `template-product-detail` |
| Interview recording | /en_us/video-security-access-control/m500-interview-recording-system.html | 1 | `template-product-detail` |
| Record after the fact | /en_us/video-security-access-control/record-after-the-fact.html | 1 | `template-home` |
| Body cameras (police-specific) | /en_us/video-security-access-control/body-cameras-and-in-car-video.html | 1 | `template-home` |

---

### Managed & Support Services (~11 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| Services landing | /en_us/managed-support-services.html | `template-home` | High |
| Cybersecurity services | /en_us/managed-support-services/cybersecurity.html | `template-home` | High |
| ActiveEye platform | /en_us/managed-support-services/cybersecurity/activeeye-security-platform.html | `template-product-detail` | Medium |
| Managed security services | /en_us/managed-support-services/cybersecurity/managed-security-services.html | `template-product-detail` | Medium |
| Advisory services | /en_us/managed-support-services/cybersecurity/advisory-services.html | `template-product-detail` | Medium |
| Device services | /en_us/managed-support-services/devices.html | `template-home` | Medium |
| APX device services | /en_us/managed-support-services/devices/apx-devices-services.html | `template-product-detail` | Low |
| MOTOTRBO device services | /en_us/managed-support-services/devices/mototrbo-device-services.html | `template-product-detail` | Low |
| Infrastructure services | /en_us/managed-support-services/infrastructure.html | `template-home` | Medium |
| LMR services survey | /en_us/managed-support-services/lmrservices-survey.html | `template-engage` | Low |
| Broadband connectivity | /en_us/managed-support-services/infrastructure/broadband-connectivity-package.html | `template-product-detail` | Low |

---

### Application Catalog (~74 pages)

All follow a standardized partner/app listing format.

| Section | Example URLs | Count | Template |
|---------|-------------|-------|----------|
| App catalog entries | /en_us/application-catalog/global-view-systems.html | 74 | `template-application-catalog` |

Example entries: global-view-systems, tallysman-wireless-inc, trbonet_plus, safemobile-inc, seqent

---

### About / Corporate (~92 pages)

| Sub-section | Example URLs | Count | Template |
|-------------|-------------|-------|----------|
| About landing | /en_us/about.html | 1 | `template-about` |
| ESG landing | /en_us/about/environmental-social-corporate-governance-esg.html | 1 | `template-home` |
| ESG sub-pages | /en_us/about/environmental-social-corporate-governance-esg/*.html | ~30 | `template-about` |
| Legal pages | /en_us/about/legal/*.html | ~15 | `template-about` (text-heavy) |
| Privacy/Terms | /en_us/about/privacy-policy.html, terms-use.html | 2 | `template-about` (text-heavy) |
| History/Heritage | /en_us/about/history/*.html, /about/90-years.html | ~10 | `template-about` (interactive) |
| Careers | /en_us/about/careers.html | 1 | `template-home` |
| Foundation | /en_us/about/motorola-solutions-foundation.html | 1 | `template-about` |
| Customer stories | /en_us/about/customers.html | 1 | `template-home` |
| Police Week | /en_us/about/honoring-national-police-week/*.html | ~10 | `template-about` |
| Recognition/Awards | /en_us/about/recognition.html | 1 | `template-home` |
| Trust Center | /en_us/about/trust-center.html | 1 | `template-home` |
| Suppliers | /en_us/about/suppliers.html | 1 | `template-about` |
| Events | /en_us/about/events.html | 1 | `template-about` |

---

### Engage / Gated Content (~21 pages)

All are lead-gen landing pages with forms.

| Section | Example URLs | Count | Template |
|---------|-------------|-------|----------|
| Webapp landing pages | /en_us/engage/webapp/*.html | 21 | `template-engage` |

Examples: guide-to-securing-bwc-grant-funding, federal-industry-insight-report, lpr-ebook---eyes-on-the-road

---

### Other Sections

#### Developers (~7 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| Developers landing | /en_us/developers.html | `template-home` | Low |
| IoT Program sub-pages | /en_us/developers/mission-critical-internet-of-things-program/*.html | ~6 | `template-product-detail` |

#### Partners (~5 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| Partners landing | /en_us/partners.html | `template-home` | Low |
| Partner Interaction Center | /en_us/partners/partner-interaction-center.html | `template-about` | Low |
| Become a partner | /en_us/partners/become-partner/*.html | ~2 | `template-about` |
| Power Partner | /en_us/partners/power-partner.html | `template-about` | Low |

#### Support (~4 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| MTUG | /en_us/support/mtug.html | Specialized | Low |
| WAVE support resources | /en_us/support/wave-support-resources.html | Specialized | Low |
| Vigilant license key | /en_us/support/vigilant-license-key-request.html | Specialized | Low |
| Consumer radio guides | /en_us/support/consumer-radios-user-guides.html | Specialized | Low |

#### Customer Notifications (~2 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| Notification center | /en_us/customer-notification-center-home.html | `template-about` | Low |
| Fortinet bulletin | /en_us/customer-notification-center-home/fortinet-buffer-overflow-flaw.html | `template-about` | Low |

#### User Groups / Community (~4 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| User groups | /en_us/usergroups.html | Specialized | Low |
| Activity | /en_us/usergroups/activity.html | Specialized | Low |
| Groups | /en_us/usergroups/groups.html | Specialized | Low |
| Shell | /en_us/usergroups/moderation/shell3.html | Specialized | Low |

#### My Software (~3 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| WAVE | /en_us/my-software/wave.html | Specialized | Low |
| WAVE 512 | /en_us/my-software/wave512.html | Specialized | Low |
| WAVE 511x | /en_us/my-software/wave511x.html | Specialized | Low |

#### Miscellaneous (~3 pages)

| Page | URL | Template | Priority |
|------|-----|----------|----------|
| Communications - Duty Runs Deep | /en_us/communications/duty-runs-deep.html | `template-home` | Low |
| Product catalog hierarchy | /en_us/product-catalog/catalog-hierarchy.html | Specialized | Low |
| Consumer radio buy | /en_us/how-to-buy/consumer-radios.html | Specialized | Low |

---

## Summary by Template

| Template | Total Pages | Migrated | Remaining | Block Coverage |
|----------|-----------|----------|-----------|----------------|
| `template-home` | ~50 | 4 | ~46 | ~90% (existing blocks) |
| `template-product-catalog` | ~1 | 0 | ~1 | ~70% (needs accordion variant) |
| `template-product-detail` | ~245 | 0 | ~245 | ~50% (needs new template) |
| `template-about` | ~92 | 0 | ~92 | ~60% (varies by sub-type) |
| `template-application-catalog` | ~74 | 0 | ~74 | ~40% (needs new template) |
| `template-engage` | ~21 | 0 | ~21 | ~50% (needs form block) |
| Specialized | ~22 | 0 | ~22 | Varies |
| **Total** | **~600+** | **4** | **~596** | |

> See `migration-priority.md` for recommended import order and strategy.
