# Page Templates - Detailed Analysis

> Detailed template definitions, block requirements, and structural patterns for the Motorola Solutions Edge Delivery Services migration.
> **Last updated**: 2026-02-11

---

## Template 1: `template-home` (Marketing Landing Pages)

**Used by**: Homepage, product story pages, industry/solution pages, AI pages
**Page count**: 158 pages
**Block coverage**: ~90% with existing blocks
**Status**: Fully implemented, 4 pages migrated

### Structural Pattern

```
1. Hero section (teaser hero OR carousel hero)
2. Intro / value proposition (default content, centered)
3. Content sections (mix of):
   - Cards (default) — product/feature grids
   - Columns (media) — two-column image+text
   - Columns (stats) — statistics display
   - Tabs — tabbed content panels
   - Accordion — expandable sections
   - Carousel (testimonials) — quote slider
   - Carousel (stories) — card carousel with intro
   - Carousel (wide) — featured news
   - Carousel (default) — horizontal card scroll
   - Columns (logos / logos-rotate) — partner logos
   - Columns (icons) — icon navigation grid
   - Cards (awards) — award/recognition badges
   - Cards-portfolio — product cards with accordion control
4. Bottom CTA section (default content OR teaser)
5. Metadata (Template: template-home)
```

### Section Styles Used

| Style | Purpose | Frequency |
|-------|---------|-----------|
| `highlight` | Light blue background sections | Very common |
| `dark` | Dark background with white text | Common |
| `black` | Pure black background | Rare |
| `image-full-width` | Full-width images breaking container | Occasional |
| `homepage-portfolio` | Two-column accordion + cards layout | Homepage only |

### Block Requirements (all existing)

| Block | Variant | Usage |
|-------|---------|-------|
| `teaser` | `hero` | Single hero with background image/video poster |
| `carousel` | `hero` | Multi-slide hero with auto-rotation |
| `carousel` | `stories` | Card carousel with intro panel |
| `carousel` | `wide` | Large centered card carousel |
| `carousel` | `testimonials` | Quote carousel |
| `carousel` | (default) | Horizontal scrolling cards |
| `cards` | (default) | Grid card layout |
| `cards` | `awards` | Compact award/recognition display |
| `cards-portfolio` | — | Accordion-controlled product cards |
| `columns` | `media` | Two-column image+text (multi-row) |
| `columns` | `stats` | Statistics display |
| `columns` | `logos` | Static logo display |
| `columns` | `logos-rotate` | Scrolling logo marquee |
| `columns` | `icons` | Icon navigation grid |
| `tabs` | — | Tabbed content panels |
| `accordion` | — | Expandable sections |

### Sub-variants Observed

**Industry pages** (Law Enforcement, Education, etc.) use this template but have additional patterns:

| Pattern | EDS Block Mapping | Notes |
|---------|-------------------|-------|
| Hero with video play button | `teaser (hero)` | Video poster + play button overlay |
| 3-column value proposition icons | `cards (default)` or `columns` | Icon + heading + description |
| Sectioned product carousels | `carousel (default)` with headings | Multiple carousel sections with h2 headers |
| Video embed with overlay | `columns (media)` | Brightcove video poster as image |
| Testimonial quote block | `carousel (testimonials)` | Single quote or carousel |
| Partner logo marquee | `columns (logos-rotate)` | Association/partner logos |
| Resource cards | `carousel (default)` or `cards (default)` | Thumbnail + title + link |
| Customer story banner | `teaser (hero)` in dark section | Full-width image + heading + CTA |
| Grant/CTA banner | `teaser (hero)` or default content | Bottom page CTA |

### Example Page Structures

**Safety Ecosystem** (migrated reference):
1. teaser hero (video poster)
2. Default content + cards (3 technology cards)
3. image-full-width section
4. Default content + cards (6 use case cards)
5. Default content + cards (14 industry cards)
6. teaser hero (dark section - customer stories)
7. Default content + cards (3 innovation cards)
8. Default content + cards (awards) + CTA link
9. Metadata

**Law Enforcement** (not yet migrated):
1. Hero banner (video poster)
2. Default content + 3 info cards (command center, field ops, investigations)
3. AI section + tabs (3 tabs: Assist Suites Overview, Dispatcher, Responder)
4. Video embed section (ecosystem in action)
5. "Connected command center" + product carousel (~12 cards)
6. "Connected patrol units" + video + product carousel (~12 cards)
7. "Connected investigations" + product carousel (~7 cards)
8. Customer story banner (dark section)
9. Testimonial quote
10. "Resources for your agency" + resource cards
11. Partner logo marquee
12. Grant CTA banner
13. Metadata

---

## Template 2: `template-product-catalog` (Product Portfolio Hub)

**Used by**: /en_us/products.html
**Page count**: 1 page
**Block coverage**: ~70%
**Status**: Not yet implemented

### Structural Pattern

```
1. Secondary sticky navigation bar (in-page anchors)
   - "Explore Products" | "Help Me Decide" | "Popular Resources" | "All Products"
2. "Explore our products" section
   - Heading + description
   - Product card carousel (11 cards with image, h5, description, CTA)
   - Dot navigation
3. "Help me decide" section
   - Heading + description
   - 4 decision-tool cards (image, h4 title, description, CTA)
4. "Browse popular resources" section
   - 4 icon + text quick-link cards (Contact, Shop, Support, Grants)
5. "All products" section
   - Accordion-style category browser
   - 6 expandable categories: Safety Ecosystem, Critical Communications,
     Command Center, Video Security, Managed Services, Other
   - Each expands to show categorized link lists
6. Footer
```

### Block Requirements

| Block | Exists? | Notes |
|-------|---------|-------|
| Secondary nav | No | New block needed OR section style |
| Product card carousel | Yes | `carousel (default)` |
| Decision tool cards | Yes | `cards (default)` |
| Icon quick-links | Yes | `columns (icons)` |
| Category accordion | Partial | `accordion` exists but needs link-list variant |

### New Blocks / Variants Needed

- **Secondary navigation bar**: Sticky in-page navigation with anchor links. Could be a new `secondary-nav` block or a variant of tabs.
- **Accordion (directory)**: Variant of accordion that expands to show categorized link columns instead of content paragraphs.

---

## Template 3: `template-product-detail` (Individual Product Pages)

**Used by**: Individual radios, cameras, software products, accessories
**Page count**: 716 pages (largest category)
**Block coverage**: ~50%
**Status**: Not yet implemented — needs template development

### Expected Structural Pattern

```
1. Product hero (product image + name + key value prop)
2. Product overview (description, key features)
3. Feature highlights (icons/images + descriptions)
4. Specifications table
5. Accessories / related products
6. Downloads / resources (datasheets, manuals)
7. CTA (contact sales, request demo, buy now)
8. Metadata
```

### Block Requirements

| Block | Exists? | Notes |
|-------|---------|-------|
| Product hero | Partial | Could use `columns (media)` or new variant |
| Feature list | No | New block needed (icon + text list) |
| Specs table | No | New block needed (key-value table) |
| Accessories carousel | Yes | `carousel (default)` |
| Download links | No | New block needed (file type icon + link) |
| Related products | Yes | `cards (default)` |

### New Blocks Needed

- **Product hero**: Large product image with name, tagline, and key specs. May be a `teaser` variant.
- **Specs table**: Two-column key-value specification table with category headers.
- **Feature list**: Bullet or icon list of product features.
- **Downloads**: File download links with icons (PDF, DOC, etc.).

---

## Template 4: `template-about` (Corporate / About Pages)

**Used by**: About pages, legal pages, ESG reports, history, careers, case studies, investors
**Page count**: 141 pages (+ 9 investors pages)
**Block coverage**: ~60%
**Status**: Not yet implemented

### Sub-types

#### Marketing About Pages (similar to template-home)
Pages like About landing, Careers, ESG landing, Trust Center.
Can reuse `template-home` with different content.

#### Text-Heavy Content Pages
Legal, privacy, terms of use, ESG reports.
Primarily long-form text with headings and paragraphs.

```
1. Page title (h1)
2. Long-form text content (paragraphs, lists, headings)
3. Optional sidebar navigation / table of contents
4. Metadata
```

#### Story / Profile Pages
Police Week officer profiles, customer stories, history pages.

```
1. Hero image/banner
2. Story content (text + images)
3. Related content links
4. Metadata
```

### Block Requirements

| Block | Exists? | Notes |
|-------|---------|-------|
| Default content | Yes | Primary content vehicle |
| Image with caption | Partial | Default content handles basic images |
| Table of contents | No | New block needed for long documents |
| Leadership grid | No | New block needed (photo + name + title grid) |
| Timeline | No | New block needed for history pages |

---

## Template 5: `template-application-catalog` (App Catalog Entries)

**Used by**: Partner/app listing pages in /en_us/application-catalog/
**Page count**: 112 pages
**Block coverage**: ~40%
**Status**: Not yet implemented — suitable for bulk import

### Expected Structural Pattern

```
1. App/partner logo + name
2. Description text
3. Key features / capabilities list
4. Compatibility info (which Motorola products)
5. Contact / website link
6. Metadata
```

### Block Requirements

| Block | Exists? | Notes |
|-------|---------|-------|
| App header (logo + name) | No | New block or columns variant |
| Feature list | No | Same as product-detail |
| Compatibility table | No | New block |
| Contact link | Yes | Default content with button |

---

## Template 6: `template-engage` (Gated Content / Lead Gen)

**Used by**: /en_us/engage/webapp/* pages
**Page count**: 29 pages
**Block coverage**: ~50%
**Status**: Not yet implemented

### Expected Structural Pattern

```
1. Hero / title section
2. Brief content description
3. Key benefits or highlights
4. Lead capture form (name, email, company, etc.)
5. Metadata
```

### Block Requirements

| Block | Exists? | Notes |
|-------|---------|-------|
| Hero | Yes | `teaser (hero)` or default content |
| Form | Partial | Contact form fragment exists, may need variant |
| Benefits list | Yes | Default content or `cards` |

---

## Template Comparison Matrix

Which existing blocks are needed by each template:

| Block | template-home | template-product-catalog | template-product-detail | template-about | template-app-catalog | template-engage |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|
| teaser (hero) | Yes | — | Maybe | Maybe | — | Maybe |
| carousel (hero) | Yes | — | — | — | — | — |
| carousel (default) | Yes | Yes | Yes | — | — | — |
| carousel (stories) | Yes | — | — | — | — | — |
| carousel (wide) | Yes | — | — | — | — | — |
| carousel (testimonials) | Yes | — | — | — | — | — |
| cards (default) | Yes | Yes | Yes | Maybe | — | Maybe |
| cards (awards) | Yes | — | — | Maybe | — | — |
| cards-portfolio | Yes | — | — | — | — | — |
| columns (media) | Yes | — | Maybe | Maybe | — | — |
| columns (stats) | Yes | — | — | — | — | — |
| columns (logos) | Yes | — | — | — | — | — |
| columns (logos-rotate) | Yes | — | — | — | — | — |
| columns (icons) | Yes | Yes | — | — | — | — |
| tabs | Yes | — | Maybe | — | — | — |
| accordion | Yes | Yes (variant) | — | — | — | — |
| form (fragment) | Yes | — | Maybe | — | — | Yes |
| **New blocks needed** | 0 | 1-2 | 3-4 | 1-2 | 2-3 | 0-1 |
