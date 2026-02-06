# Project Memory - Motorola Solutions Migration

Migrating Motorola Solutions homepage (https://www.motorolasolutions.com/en_us.html) to Adobe Edge Delivery Services.

---

## ⚠️ CRITICAL RULES

1. **NEVER create screenshots outside `/tmp` folder** - All screenshots MUST be saved to `/tmp/` directory. Never save screenshots to project root or any workspace folder.
2. **Always read files before editing** - Never modify code without reading it first.
3. **Use `box-sizing: border-box`** - When setting explicit width/height on elements with padding.
4. **REUSE existing blocks** - Always use existing blocks and variants before creating new ones. See "Block Reuse Guidelines" section.
5. **Keep CLAUDE.md up-to-date** - Update this file when creating/modifying/deleting blocks, variants, or patterns. See "Maintaining This Documentation" section.
6. **Extract video poster images** - When importing pages with videos, find the `poster` attribute on `<video>` elements and use that image URL instead of the video. Videos are not supported in static migration; use poster images as placeholders.
7. **Create variants, not new blocks** - When a content pattern is similar to an existing block but needs different styling, create a VARIANT of that block (not a new block). This maintains consistency and reduces code duplication.

---

## Block Reuse Guidelines

**IMPORTANT**: When importing new pages or content, ALWAYS prioritize reusing existing blocks and their variants.

### Before Creating a New Block

1. **Check the Block Reference table** - Review all existing blocks and their variants
2. **Analyze if existing blocks can work** - Consider:
   - Can an existing block handle this content with its current structure?
   - Can an existing variant be used with minor CSS adjustments?
   - Can a new variant of an existing block solve the need?
3. **Only create new blocks when**:
   - No existing block can reasonably accommodate the content pattern
   - The content structure is fundamentally different from all existing blocks
   - Creating a variant would require more than 50% new code

### Decision Tree for Content Mapping

```
New content section identified
    ↓
Does it match an existing block's purpose?
    ├─ YES → Use that block
    │         ↓
    │     Does styling match an existing variant?
    │         ├─ YES → Use existing variant
    │         └─ NO → Can styling be achieved with section styles (dark, highlight)?
    │                   ├─ YES → Use base block + section style
    │                   └─ NO → Create new VARIANT (not new block)
    │
    └─ NO → Is it similar to any existing block?
              ├─ YES → Create new VARIANT of that block
              └─ NO → Create new BLOCK (document it immediately!)
```

### Variant Naming Convention

When creating new variants, use descriptive kebab-case names:
- `carousel hero` - Hero-style carousel
- `carousel stories` - Story cards carousel
- `cards-icon link-style` - Link-styled icon cards

### Examples of Correct Reuse

| Content Need | ✅ Correct Approach | ❌ Wrong Approach |
|--------------|---------------------|-------------------|
| Hero banner with different colors | Use `carousel hero` + CSS variables | Create new `hero-banner` block |
| **Single hero item (no rotation)** | Use `teaser hero` | Use `carousel hero` with single slide |
| Product cards in grid | Use `cards-portfolio` or `cards-icon` | Create new `product-cards` block |
| Expandable FAQ | Use `accordion` | Create new `faq` block |
| Logo strip | Use `columns (logos)` | Create new `logo-strip` block |
| Tabbed content | Use `tabs` | Create new `tabbed-content` block |
| Full-width image section | Use `image-full-width` section style | Create new `full-image` block |
| Two-column with video/image | Use `columns (media)` variant | Create new `video-text` block |
| **Multiple two-column rows** | Single `columns (media)` with multiple rows | Separate blocks for each row |
| Quote carousel | Use `carousel testimonials` variant | Create new `testimonials` block |

---

## Migration Rules

### Video Poster Extraction

When importing pages that contain videos (Brightcove, HTML5 video, etc.), **extract the poster image** instead of the video itself:

**⚠️ CRITICAL: Always scrape at desktop resolution (≥1200px width)**

Many sites serve **different video posters based on viewport size**:
- **Desktop (≥1200px)**: Landscape posters (16:9 or similar)
- **Tablet (768-1199px)**: Often vertical/portrait posters
- **Mobile (<768px)**: Various aspect ratios

The poster URL dynamically changes when viewport changes. **Scraping at tablet resolution will give you vertical aspect ratio images** that look wrong on desktop.

**Extraction steps:**
1. **Set viewport to desktop size** (≥1200px width) using Playwright `browser_resize` or browser DevTools
2. **Reload the page** after resizing (posters load on page init)
3. **Find the `poster` attribute** on `<video>` tags
4. **Verify aspect ratio** - desktop posters should be landscape (wider than tall)

**Example JavaScript to extract posters:**
```javascript
// In browser console or Playwright evaluate
const videos = document.querySelectorAll('video');
videos.forEach((v, i) => {
  const title = v.getAttribute('data-video-title') || `Video ${i}`;
  console.log(`${title}: ${v.poster}`);
});
```

**Common poster URL patterns**:
- Brightcove: `https://cf-images.us-east-1.prod.boltdns.net/v1/jit/{account}/{uuid}/main/1280x720/...`
- DAM thumbnails: `https://www.motorolasolutions.com/content/dam/...thumbnail.jpg`

**Debug checklist for wrong aspect ratio posters:**
1. What viewport size were you at when scraping? (Must be ≥1200px)
2. Did you reload after resizing? (Posters load on page init)
3. Check `data-poster-source-desktop` attribute if present - this shows the DAM path for desktop

**Why this matters**: Videos require special embed handling and backends. Static migration uses poster images as visual placeholders, maintaining layout while simplifying content.

### Variant-First Approach

When encountering a content pattern that's similar to an existing block:

1. **Identify the closest existing block** (e.g., carousel, columns, cards)
2. **Analyze what's different** (layout direction, styling, content structure)
3. **Create a variant** by adding a class modifier (e.g., `carousel testimonials`, `columns-media`)
4. **Add variant CSS** in the same block's CSS file
5. **Update JS if needed** to handle variant-specific decoration

**Variant naming**: Use space-separated names in authoring: `| Carousel (testimonials) |`
- This creates class: `.carousel.testimonials`

**When to create a NEW block instead of variant**:
- Content structure is fundamentally different (>50% different markup)
- JavaScript logic is completely different
- No shared styling or behavior with existing blocks

---

## Maintaining This Documentation

**This file is the project's source of truth.** Keep it current to ensure consistency.

### When to Update CLAUDE.md

| Event | Required Updates |
|-------|------------------|
| **New block created** | Add to Block Reference table, add full documentation in Custom Blocks section |
| **New variant added** | Update the block's variant table, document specifics |
| **Block deleted** | Remove from Block Reference, remove documentation |
| **Variant removed** | Update variant table, remove variant-specific docs |
| **New section style** | Add to Section Styles table |
| **New page template** | Add to Page Templates section |
| **New design token** | Add to Design Tokens table |
| **New icon added** | Add to Local Assets section |
| **CSS pattern discovered** | Add to CSS Patterns to Maintain |
| **Bug fix with learnings** | Add to Reminders section |

### Documentation Checklist for New Blocks

When creating a new block, document ALL of the following:

```markdown
### block-name

**Location**: `/blocks/block-name/`

| Variant | Class | Purpose |
|---------|-------|---------|
| Default | `.block-name` | Description |
| Variant | `.block-name.variant` | Description |

**Authoring:**
\`\`\`
| Block Name (variant) |
| -------------------- |
| Content structure... |
\`\`\`

**Features**:
- Feature 1
- Feature 2

**Responsive behavior**:
- Mobile: ...
- Desktop: ...
```

### Documentation Checklist for New Variants

When adding a variant to an existing block:

1. Add row to block's variant table
2. Add "**Variant-name specifics**" section with:
   - Key visual differences
   - Unique behaviors
   - Responsive changes
   - CSS class name

### Periodic Review

When working on this project, periodically verify:
- [ ] All blocks in `/blocks/` are documented
- [ ] All variants mentioned in CSS are documented
- [ ] Design tokens match what's in `styles.css`
- [ ] Reminders section captures recent learnings

---

## Key Files

- **Content (homepage)**: `/content/en-us.html`
- **Content (assist-suites)**: `/content/en-us/ai/assist-suites.html`
- **Global styles**: `/styles/styles.css`
- **Blocks**: `/blocks/` (carousel, teaser, accordion, cards-portfolio, columns, tabs, header, footer, fragment)
- **Icons**: `/icons/` (custom SVG icons)
- **Images**: `/content/images/` (local assets)
- **Navigation**: `/content/nav.html`, `/content/nav.plain.html` (fragment files)
- **Footer**: `/content/footer.html`, `/content/footer.plain.html` (fragment files)

---

## Pages Inventory

All content pages in this project and their source URLs.

| Local Path | Origin URL | Description |
|------------|-----------|-------------|
| `/content/en-us.html` | https://www.motorolasolutions.com/en_us.html | Homepage |
| `/content/en-us/ai/assist-suites.html` | https://www.motorolasolutions.com/en_us/ai/assist-suites.html | AI Assist Suites product page |
| `/content/fragments/contact-form.html` | N/A (locally authored) | Contact form fragment |
| `/content/nav.html` | Derived from https://www.motorolasolutions.com/en_us.html | Navigation fragment |
| `/content/footer.html` | Derived from https://www.motorolasolutions.com/en_us.html | Footer fragment |

**URL mapping convention**: Local paths follow the origin URL structure with `/content/` prefix. For example:
- `motorolasolutions.com/en_us.html` → `/content/en-us.html`
- `motorolasolutions.com/en_us/ai/assist-suites.html` → `/content/en-us/ai/assist-suites.html`

---

## Navigation Content Structure

The nav content (`nav.plain.html`) uses semantic h2 headings to organize content that the header.js parses:

```html
<!-- 1. Brand (first div, becomes nav-brand) -->
<div>
  <p><a href="/">Motorola Solutions</a></p>  <!-- Text link - JS adds logo image -->
</div>

<!-- 2. Tools (h2 "Tools" - becomes nav-primary-tools) -->
<div>
  <h2>Tools</h2>
  <ul>
    <li>Search</li>  <!-- Text only - JS builds search form -->
    <li><a href="...">Support</a></li>  <!-- JS adds icon -->
    <li><a href="...">Cart</a></li>
    <li><a href="...">Sign In</a></li>
  </ul>
</div>

<!-- 3. Sections (h2 "Sections" - becomes nav-sections + nav-tools) -->
<div>
  <h2>Sections</h2>
  <ul>
    <li>Products</li>  <!-- Text only - triggers mega menu -->
    <li>Industries</li>
    <li>About us</li>
  </ul>
  <p><a href="...">Contact sales</a></p>  <!-- Becomes nav-tools button -->
</div>

<!-- 4+ Mega menu content (h2 titles: Support, Products, Industries, About us) -->
<div>
  <h2>Products</h2>
  <!-- Nested lists for mega menu panels -->
</div>
```

**Key Principle**: Authors only need to maintain translatable text. Icons and form markup are added programmatically by JavaScript.

---

## Fragment Files

Fragment files (`nav.html`, `footer.html`) are loaded by blocks, not rendered as standalone pages.

**⚠️ CRITICAL**: Fragment files must NOT have `<header></header>` or `<footer></footer>` tags in their HTML structure. These tags cause AEM to try loading header/footer blocks on the fragment page itself, creating recursive loading issues.

**Correct fragment structure**:
```html
<!DOCTYPE html>
<html>
<head>...</head>
<body>
<main>
  <!-- Fragment content here -->
</main>
</body>
</html>
```

**Wrong** (causes duplicate header/recursion):
```html
<body>
<header></header>  <!-- ✗ Don't include -->
<main>...</main>
<footer></footer>  <!-- ✗ Don't include -->
</body>
```

---

## Footer Content Structure

The footer content (`footer.plain.html`) uses author-friendly text that JavaScript transforms:

```html
<!-- 1. Social section (first div) -->
<div>
  <p>Follow us:</p>  <!-- Label for authors - removed by JS -->
  <ul>
    <li><a href="...">LinkedIn</a></li>  <!-- Text replaced with icon by JS -->
    <li><a href="...">Facebook</a></li>
    <li><a href="...">X</a></li>
    <li><a href="...">Instagram</a></li>
    <li><a href="...">YouTube</a></li>
  </ul>
</div>

<!-- 2. Link columns, trademark, copyright sections follow -->
```

**JavaScript Architecture** (`footer.js`):
- `buildLogo()` - Creates logo link element pointing to `/icons/logo-inverted.svg`
- `buildSocialIcons(socialDiv)` - Maps platform names to icon files

**Social Icon Mapping**:
```javascript
const socialIconMap = {
  LinkedIn: 'social-linkedin.svg',
  Facebook: 'social-facebook.svg',
  X: 'social-x.svg',
  Instagram: 'social-instagram.svg',
  YouTube: 'social-youtube.svg',
};
```

**Key Principle**: Authors only write text links (e.g., "LinkedIn"), and JavaScript replaces them with the corresponding icons. The "Follow us:" label is removed after processing.

---

## Design Tokens

Defined in `/styles/styles.css` - reference these variable names, don't hardcode values.

| Category | Variables |
|----------|-----------|
| **Text** | `--text-color`, `--text-color-secondary`, `--text-color-inverse`, `--color-text-muted` |
| **Brand** | `--color-brand-primary` (#005EB8), `--link-color`, `--color-hero-indicator-active` |
| **Backgrounds** | `--background-color`, `--background-color-light`, `--background-color-dark`, `--background-color-black`, `--color-surface-white` |
| **Borders** | `--color-border-light`, `--color-border-dark` |
| **Indicators** | `--color-indicator-inactive`, `--color-indicator-hover` |
| **Spacing** | `--spacing-xxs` through `--spacing-xxxl` (4px to 64px scale) |
| **Typography** | `--body-font-family`, `--heading-font-family` (Roboto), `--heading-font-weight` (400), `--body-font-size-*` |
| **Shadows** | `--shadow-card`, `--shadow-card-elevated` |
| **Transitions** | `--transition-fast`, `--transition-base`, `--transition-slow` |

### ⚠️ CRITICAL: CSS Variable Naming Convention

**NEVER use these incorrect variable names:**
- ~~`--spacing-sm`~~ → Use `--spacing-s`
- ~~`--spacing-md`~~ → Use `--spacing-m`
- ~~`--spacing-lg`~~ → Use `--spacing-l`

**Correct spacing variable names:**
| Variable | Value |
|----------|-------|
| `--spacing-xxs` | 4px |
| `--spacing-xs` | 8px |
| `--spacing-s` | 12px |
| `--spacing-m` | 16px |
| `--spacing-l` | 24px |
| `--spacing-xl` | 32px |
| `--spacing-xxl` | 48px |
| `--spacing-xxxl` | 64px |

**Why this matters:** Using non-existent variable names like `--spacing-md` will silently fail - the CSS rule will have no effect because the variable resolves to nothing. Always verify variable names exist in `styles.css` before using them.

### ⚠️ CRITICAL: Always Verify CSS Variables Before Using

**Before writing any CSS property with `var(--...)`, cross-check against this complete list.** If the variable isn't listed here or in `styles.css`, it does NOT exist and will silently fail.

**Complete variable reference** (all defined in `:root` of `styles.css`):

| Category | Available Variables |
|----------|-------------------|
| **Spacing** | `--spacing-xxs` (4px), `--spacing-xs` (8px), `--spacing-s` (12px), `--spacing-m` (16px), `--spacing-l` (24px), `--spacing-xl` (32px), `--spacing-xxl` (48px), `--spacing-xxxl` (64px) |
| **Body font sizes** | `--body-font-size-xl` (20px), `--body-font-size-l` (18px), `--body-font-size-m` (16px), `--body-font-size-s` (14px), `--body-font-size-xs` (12px) |
| **Heading font sizes** | `--heading-font-size-xxl` (48px), `--heading-font-size-xl` (40px), `--heading-font-size-l` (32px), `--heading-font-size-m` (24px), `--heading-font-size-s` (20px), `--heading-font-size-xs` (16px) |
| **Colors** | `--color-brand-primary`, `--color-brand-primary-dark`, `--link-color`, `--link-hover-color` |
| **Text** | `--text-color`, `--text-color-secondary`, `--text-color-inverse`, `--text-color-inverse-secondary` |
| **Backgrounds** | `--background-color`, `--background-color-light`, `--background-color-dark`, `--background-color-black`, `--background-color-highlight` |
| **Semantic** | `--color-border-light`, `--color-border-dark`, `--color-text-muted`, `--color-surface-white`, `--color-indicator-inactive`, `--color-indicator-hover`, `--color-hero-indicator-active` |
| **Shadows** | `--shadow-card`, `--shadow-card-elevated` |
| **Transitions** | `--transition-fast` (0.15s), `--transition-base` (0.2s), `--transition-slow` (0.3s) |
| **Typography** | `--body-font-family`, `--heading-font-family`, `--heading-font-weight` (400), `--body-line-height`, `--heading-line-height` |
| **Buttons** | `--button-padding`, `--button-padding-large`, `--button-border-radius`, `--button-border-radius-large`, `--button-font-size`, `--button-font-size-large`, `--button-font-weight` |
| **Layout** | `--nav-height` (64px), `--content-max-width` (1200px), `--section-padding` |
| **Focus** | `--focus-outline`, `--focus-outline-offset` |

---

## CSS Guidelines

1. **Never use `!important`** - increase selector specificity instead
2. **Use CSS custom properties** - reference design tokens, override at block level when needed
3. **Edge-to-edge blocks** - use `:has()` selector on wrapper: `main > div:has(.block-name)`
4. **Specificity order in styles.css** - section-specific styles (like `image-full-width`) must come BEFORE template styles (like `template-home`) to maintain proper cascade
5. **Visually hidden text** - use `clip-path: inset(50%)` instead of deprecated `clip: rect()`
6. **Backdrop filter** - always include both `-webkit-backdrop-filter` and `backdrop-filter`

---

## Lint Rules

- **no-descending-specificity**: For complex block CSS with variant overrides, add `/* stylelint-disable no-descending-specificity */` at the top of the file
- **declaration-block-no-duplicate-properties**: Never duplicate CSS properties (except vendor prefixes like `-webkit-`)
- **property-no-deprecated**: Use modern equivalents (`clip-path` not `clip`)

---

## Responsive Breakpoints

Standard breakpoints used across the project:

| Breakpoint | Value | Usage |
|------------|-------|-------|
| **sm** | 600px | Small mobile / very small tablet - cards start growing |
| **md** | 768px | Tablet - carousel, accordion adjustments |
| **lg** | 900px | Tablet breakpoint - iPad-style slide-out menu |
| **xl** | 1024px | Large tablet / small desktop refinements |
| **xxl** | 1200px | Desktop - two-row header, mega menus, footer 7 columns |

**Key layout changes (Header has THREE distinct breakpoints):**
- **< 900px**: Mobile header (full-width hamburger menu, icons only)
- **900px - 1199px**: Tablet header (iPad-style slide-out menu at 520px width, goes to top of screen)
- **≥ 1200px**: Desktop header (two-row layout, search bar visible, mega menus, Support dropdown)
- **≥ 1200px**: Footer columns expand to 7-column grid

**Media query syntax** (use modern CSS syntax):
```css
/* Mobile-first (min-width) */
@media (width >= 900px) { }

/* Desktop-first (max-width) */
@media (width < 900px) { }

/* Range */
@media (width >= 768px) and (width < 1200px) { }
```

### Fluid Responsive Behavior

**⚠️ IMPORTANT**: Avoid fixed-width "jumps" between breakpoints. Content should scale fluidly across all viewport sizes.

**Principles:**
1. **No max-width constraints on primary containers** - Header, footer, and main layout should scale to full viewport width
2. **Use percentage-based or viewport-relative widths** - Prefer `%`, `vw`, `fr` units over fixed `px` widths for containers
3. **Flexible grids with auto-fill** - Use `repeat(auto-fill, minmax(min, 1fr))` for responsive card layouts
4. **Smooth transitions** - When switching layouts at breakpoints, ensure visual continuity

**What to avoid:**
```css
/* ✗ BAD - Creates fixed-width display between 900-1023px */
.container {
  max-width: 900px;
}
@media (width >= 1024px) {
  .container {
    max-width: 1200px;
  }
}

/* ✓ GOOD - Fluid scaling with optional max on large screens */
.container {
  width: 100%;
  max-width: 1400px; /* Only kicks in at very large viewports */
  margin: 0 auto;
}
```

**Header behavior**: Header scales to full viewport width at all sizes. No max-width constraint.

**Footer behavior**: Footer scales to full viewport width. Only link column content has max-width for readability.

**Content containers**: Use padding for breathing room rather than max-width to constrain content.

---

## EDS Authoring Patterns

- **Link → Button**: Link alone in its own paragraph becomes a button
- **Link stays link**: Link inline with other text stays a link
- **Section metadata**: Use `section-metadata` block to apply styles like `highlight`, `dark`, `image-full-width`
- **Page templates**: Add `Template: template-home` to page metadata for centered default content
- **HTML in table cells**: Markdown syntax (like `## Heading`) is NOT parsed inside table cells. Use HTML tags (`<h2>Heading</h2>`) when you need structured content in block tables.
- **One row per item**: In block tables (carousel, accordion), each row becomes one item/slide. Combine all content for an item into a single row using HTML.

---

## Page Templates

Templates are applied via page metadata: `Template: template-name`

| Template | Class Applied | Purpose |
|----------|---------------|---------|
| `template-home` | `body.template-home` | Homepage layout with centered default content |

### template-home

Centers default content (text, headings, buttons, images) on homepage.

**Exception**: Sections containing `.carousel.stories` are NOT centered - they keep left-aligned text for the intro panel.

CSS selector pattern:
```css
body.template-home main > .section:not(:has(.carousel.stories)) .default-content-wrapper {
  text-align: center;
}
```

---

## Section Styles

Applied via `section-metadata` block with `Style: style-name`. Multiple styles can be combined.

| Style | Class | Purpose |
|-------|-------|---------|
| `highlight` | `.section.highlight` | Light blue background (`--background-color-light`), brand-colored headings |
| `light` | `.section.light` | Same as highlight (alias) |
| `dark` | `.section.dark` | Dark background (`--background-color-dark`), white text |
| `black` | `.section.black` | Pure black background (`--background-color-black`), white text |
| `image-full-width` | `.section.image-full-width` | Images break out of container to full viewport width |
| `homepage-portfolio` | `.section.homepage-portfolio` | Two-column accordion + cards-portfolio layout |

**Example usage in content:**
```html
<div class="section-metadata">
  <div><div>Style</div><div>dark</div></div>
</div>
```

---

## Block Reference

Complete reference of all blocks and their variants.

### Summary Table

| Block | Variants | Description |
|-------|----------|-------------|
| **carousel** | `hero`, `stories`, `wide`, `testimonials`, (default) | Horizontal slide carousels with multiple layouts |
| **teaser** | `hero` | Single hero content with background image (use instead of single-item carousel) |
| **accordion** | (default), (homepage-portfolio context) | Expandable content sections |
| **cards-portfolio** | — | Product cards controlled by accordion |
| **columns** | (default), `media`, `stats`, `logos`, `logos-rotate`, `icons` | Multi-purpose layout block with variants for two-column, statistics, logos, and icon grids |
| **tabs** | — | Horizontal tab navigation with content panels |
| **header** | — | Site header with three responsive modes |
| **footer** | — | Site footer with social links |
| **fragment** | — | Utility for loading content fragments |

---

## Custom Blocks

### carousel (Unified with Variants)

**Location**: `/blocks/carousel/`

| Variant | Class | Purpose |
|---------|-------|---------|
| Hero | `.carousel.hero` | Full-width hero with auto-rotation (10s), dark overlay, white text |
| Stories | `.carousel.stories` | Cards with optional intro panel from preceding content |
| Wide | `.carousel.wide` | Large centered cards (920px), 50% opacity on inactive, infinite loop |
| Testimonials | `.carousel.testimonials` | Quote carousel with author info and optional CTA |
| Default | `.carousel` | Simple horizontal scrolling cards (330px) |

**Authoring:**
```
| Carousel (hero) |
| --------------- |
| ![image](...)   |
| ## Heading      |
| Description     |
| [CTA Link](url) |
```

**Hero variant specifics**:
- Auto-rotation: 10 seconds between slides
- Pauses on hover/focus/touch (15 seconds)
- Dark gradient overlay on images
- White text, inverted CTA button
- Navigation arrows on sides (hidden <600px)
- Dot indicators at bottom center

**Stories variant specifics**:
- Intro panel pulls content from preceding default-content-wrapper
- Two-column layout on desktop (intro left, cards right)
- Cards extend to right edge
- Card structure: image, title (bold), description, links (Learn more, video, download icons)

**Wide variant specifics**:
- Card aspect ratio: `920 / 560` (1.64:1)
- No padding-top (`padding: 0 0 var(--spacing-xl)`)
- Navigation below slides with double margin (`margin-bottom: calc(2 * var(--spacing-xl))`)
- Centered active slide, edge-to-edge, cloned slides for seamless infinite scroll
- Inactive slides at 50% opacity, active at 100%
- Glass-effect footer overlay with blur

**Testimonials variant specifics**:
- Large centered quote with decorative quote mark
- Author name (bold) and title displayed on the same line with spacing between them, same font size (16px)
- Optional CTA link
- No padding on `.carousel-slides` (padding: 0)
- Works in highlight and dark sections
- Navigation below slides

**Authoring (testimonials):**
```
| Carousel (testimonials) |
| ----------------------- |
| <blockquote>"Quote text"</blockquote> <p><strong>Author Name</strong>, Title</p> <a href="url">CTA</a> |
| <blockquote>"Second quote"</blockquote> <p><strong>Author 2</strong>, Title</p> <a href="url">CTA</a> |
```

**Default variant specifics**:
- Fixed-width cards (330px)
- Horizontal scroll with snap
- Card structure: image (16:9), title, description, divider, links
- All card text is centered (text-align: center)
- Full description text shown (no truncation)

### teaser

**Location**: `/blocks/teaser/`

| Variant | Class | Purpose |
|---------|-------|---------|
| Hero | `.teaser.hero` | Full-width hero with background image, dark overlay, white text |

**When to use teaser vs carousel hero**:
- Use `teaser (hero)` for **single hero content** (no rotation, no navigation)
- Use `carousel (hero)` for **multiple slides** with auto-rotation and navigation

**Authoring (two-column format, matching carousel hero):**
```
| Teaser (hero) |  |
| --- | --- |
| ![background image](url) | <h2>Heading Line 1</h2><h2>Heading Line 2</h2> |
|  | Description text |
|  | [CTA Button](url) |
|  | [Secondary link](url) |
```

- Column 1: Background image (first row only)
- Column 2: All content (headings, description, CTAs across rows)
- Use `<h2>` tags for headings within table cells

**Hero variant specifics**:
- Identical styling to `carousel (hero)` slides
- Full-width, edge-to-edge layout
- Background image with dark gradient overlay (left to right)
- White text positioned on left side
- Inverted CTA button (white background)
- Secondary CTA (video link) has play button icon with `gap: var(--spacing-m)` (16px)
- Min-height: 400px mobile, 600px tablet, 700px desktop
- No navigation elements (dots, arrows) - single item only

**Responsive behavior**:
- Mobile: Content takes 90% width, smaller text
- Tablet: Content max 500px, larger margins
- Desktop: Content max 60%, positioned at left with generous margins

### accordion

**Location**: `/blocks/accordion/`

| Context | Behavior |
|---------|----------|
| Default | Simple single-column expandable sections |
| In `homepage-portfolio` section | Two-column layout with dynamic image switching |

**Authoring:**
```
| Accordion |
| --------- |
| ### Title |
| **Subtitle** |
| Description text |
| [Link](url) |
| ![image](...) |
```

**Features**:
- First item expanded by default
- Only one item open at a time
- Chevron icon hides when item is expanded
- Smooth transitions

**In homepage-portfolio section**:
- Two-column layout on desktop (accordion left, image right)
- `column-reverse` on mobile (image on top)
- Controls visibility of corresponding `cards-portfolio` blocks via `data-title`/`data-category` matching
- Accordion image constraint on mobile: `max-width: 500px` and `margin: 0 auto`

### cards-portfolio

**Location**: `/blocks/cards-portfolio/`

Product cards displayed below accordion. Visibility controlled by accordion selection.

**Authoring:**
```
| Cards Portfolio |
| --------------- |
| ## Category Title |
| --------------- |
| ![image](...) |
| Product Name |
| [Learn more](url) |
```

**Features**:
- Hidden by default, shown when `.active` class added
- H2 used for category matching (hidden in display)
- 2x2 grid on mobile, 4-column grid on desktop
- Image constraints: Max 250x250px, centered
- Entire card is clickable link


### columns

**Location**: `/blocks/columns/`

| Variant | Class | Purpose |
|---------|-------|---------|
| Default | `.columns` | Two equal columns side-by-side |
| Media | `.columns.media` | Auto-detects image position for layout |
| Stats | `.columns.stats` | Statistics display with large numbers and descriptions |
| Logos | `.columns.logos` | Static centered logo display |
| Logos Rotate | `.columns.logos-rotate` | Continuous scrolling logo marquee |
| Icons | `.columns.icons` | Icon navigation cards in grid |

**Authoring (media):**
```
| Columns (media) |  |
| --------------- | - |
| ![image](url) | <h2>Heading</h2><h4>Subheading</h4><p>Description text</p><p><a href="url">CTA Link</a></p> |

<!-- OR for reversed layout (image on right): -->
| Columns (media) |  |
| --------------- | - |
| <h2>Heading</h2><p>Content...</p> | ![image](url) |
```

**Note**: Content in table cells must use HTML tags (not markdown syntax) for proper rendering. Markdown like `## Heading` stays as raw text in tables.

**Media variant specifics**:
- **Auto-detects image position per row**: Put image in first column for image-left layout, or in second column for image-right layout
- **Supports multiple rows**: Add multiple rows to a single block for alternating layouts
- No need for separate `media-reversed` variant - just swap column order in authoring
- Image/video poster on one side (45% width on desktop), fills entire container (object-fit: cover)
- Content on other side with heading, subheadings (h4), descriptions
- **Inverted CTA buttons**: White text on black background (overrides global button styles)
- Play button overlay appears when image alt contains "video" or src contains "poster"
- Responsive: stacks vertically on mobile

**Single block with multiple rows (PREFERRED):**
```
| Columns (media) |  |
| --------------- | - |
| ![Dispatcher](poster.jpg) | <h2>Dispatcher Suite</h2><p>Description...</p><p><a href="url">Learn more</a></p> |
| <h2>Responder Suite</h2><p>Description...</p><p><a href="url">Learn more</a></p> | ![Responder](poster.jpg) |
```

This creates two rows in one block, with alternating image positions (auto-detected per row).

**⚠️ DO NOT create separate blocks for each row** - merge related content into single multi-row block.

**Authoring (stats):**
```
| Columns (stats) |  |
| --------------- | - |
| 30% | of 9-1-1 calls include excessive amounts of information. |
| 40% | of an officer's shift is spent on administrative tasks. |
| 10% | staffing deficits force agencies to do more with less. |
| 50% | of officers frequently arrive at a scene that isn't as described. |
```

**Stats variant specifics**:
- Large, bold numbers (48-64px depending on viewport)
- Centered text layout
- Responsive grid: 2 columns on mobile, 4 columns on tablet/desktop
- In `.section.dark`: Numbers and descriptions adapt to white/light colors

**Authoring (logos):**
```
| Columns (logos) |
| --------------- |
| ![logo1](...) | ![logo2](...) | ![logo3](...) | ... |
```

For rotating marquee:
```
| Columns (logos rotate) |
| ---------------------- |
| ![logo1](...) | ![logo2](...) | ![logo3](...) | ... |
```

**Logos variant specifics**:
- Static centered logo display (default)
- Full viewport width (breaks out of container)
- Logo height: 100px, max-width: 280px

**Logos-rotate variant specifics**:
- Infinite horizontal scroll animation (30s cycle)
- Logos duplicated for seamless loop
- Fade edges (gradient masks left/right)
- In `.section.dark`: Fade gradients use dark background color

**Authoring (icons):**
```
| Columns (icons) |
| --------------- |
| ![icon](...) |
| [Label](url) |
```

**Icons variant specifics**:
- Flexible cards that scale between 100px-160px wide, 120px tall
- Icon images: 48x48px (mobile), 64x64px (desktop)
- Entire card is clickable
- Hover shadow: `0 8px 20px 0 rgb(35 35 35 / 25%)`
- In `.section.dark`: white shadow on hover


### tabs

**Location**: `/blocks/tabs/`

Horizontal tab navigation with content panels. Each tab displays different content when clicked.

**Authoring:**
```
| Tabs |  |
| ---- | - |
| <h3>Tab 1 Title</h3><h4>Heading</h4><p>Content...</p> | ![image](...) |
| <h3>Tab 2 Title</h3><h4>Heading</h4><p>Content...</p> | ![image](...) |
| <h3>Tab 3 Title</h3><h4>Heading</h4><p>Content...</p> | ![image](...) |
```

**Structure per row:**
- First cell: Tab content (h3 becomes tab label, rest becomes panel content)
- Second cell: Optional image displayed on right side of panel

**Features**:
- Pill-style tab buttons
- First tab selected by default
- Smooth tab switching
- Scroll buttons appear on mobile when tabs overflow
- Two-column layout on desktop (content left, image right)
- Full accessibility with ARIA roles

**Responsive behavior**:
- Mobile: Tabs scroll horizontally, single column layout
- Tablet+: Centered tabs, two-column panel layout
- Desktop: Larger tab buttons and panel text

**In `.section.dark`**: Tab buttons and content adapt to dark backgrounds

---


### fragment (Utility Module)

**Location**: `/blocks/fragment/`

**Note**: Not typically used as a block in content. Provides `loadFragment()` utility function used by `header.js` and `footer.js` to load nav and footer content.

**If used as a block:**
```
| Fragment |
| -------- |
| /path/to/fragment |
```

Loads the referenced fragment HTML and inserts it into the page.

---

### image-full-width (Section Style)

Centered text content with full viewport-width image below.

**Key CSS pattern** for breaking out of centered container:
```css
main .section.image-full-width .default-content-wrapper p:has(picture) {
  align-self: stretch;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  max-width: unset;
}
```

This works at all viewport sizes by calculating the offset from the centered container.

### header (Two-Row Layout with Three Responsive Modes)

Two-row fixed header with different backgrounds per row. **THREE distinct responsive breakpoints**.

**Visual Structure** (rendered output):
1. `nav-brand` - Logo (uses `/icons/logo.svg`, NOT inverted)
2. `nav-primary-tools` - Search form, Support, Cart, Sign In (icons added programmatically)
3. `nav-sections` - Products, Industries, About us (with dropdown chevrons)
4. `nav-tools` - Contact sales button

**Row 1 (White, 64px)**: Brand + Primary tools
- Background: `#fff`
- Icons from `/icons/header-*.svg` (search, support, cart, user)
- Search bar: oblong button (52px wide, border-radius: 18px), 12px margin-right

**Row 2 (Light Grey, 64px)**: Sections + Tools
- Background: `rgb(242 242 242)`
- Nav items have chevrons that flip on expand
- Contact sales: black pill button (`rgb(0 0 0 / 95%)`)

**CSS Grid Layout** (desktop ≥1200px):
```css
grid-template:
  'brand primary-tools' 64px
  'sections tools' 64px / 1fr auto;
```

#### Header Responsive Modes

**Mobile (<900px)**:
- Single row with hamburger menu
- Full-width slide-out menu from right
- Menu starts at 64px from top (below nav bar)
- No backdrop overlay

**Tablet (900px - 1199px)** - iPad-style slide-out:
- Single row: Brand + Contact sales + icons + hamburger
- Slide-out menu: **520px width**, slides from right
- Menu goes to **top of screen** (inset: 0), NOT below nav bar
- Semi-transparent **backdrop overlay** (`rgb(0 0 0 / 50%)`)
- Shadow on panel: `-8px 0 24px rgb(0 0 0 / 20%)`
- Full logo.svg (NOT logo-small.svg)
- Support hidden from top bar (in hamburger menu)
- Search icon triggers modal overlay

**Desktop (≥1200px)**:
- Two-row layout with mega menus
- Support dropdown with triangular arrow
- Full search bar visible
- No hamburger menu

#### Support Dropdown (Desktop Only)

Dropdown menu triggered by Support button in nav-primary-tools.

**Styling:**
- Triangular arrow pointing up (CSS `::before` pseudo-element)
- Left-aligned links (NOT centered)
- Separator lines between groups (HR from content "-" items)
- Shadow: `0 4px 20px rgb(0 0 0 / 15%)`
- Border-radius: 6px
- Min-width: 380px

**CSS for triangular arrow:**
```css
header .support-dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  filter: drop-shadow(0 -2px 2px rgb(0 0 0 / 8%));
}
```

**JavaScript Architecture** (`header.js`):
- `buildBrandLogo(brandDiv)` - Replaces text link with logo image (`/icons/logo.svg`)
- `buildPrimaryTools(nav)` - Finds "Tools" div by h2, creates search form and icon links programmatically
- `buildNavSectionsAndTools(nav)` - Finds "Sections" div by h2, creates nav-sections and nav-tools
- `buildMobileMenu(nav)` - Builds slide-out menu with backdrop, returns `{ overlay, backdrop }`
- `buildSearchModal()` - Modal overlay for tablet search
- `buildProductsMegaMenu(nav, container)` - Builds Products mega menu from "Products" h2 div
- `buildIndustriesMegaMenu(nav, container)` - Builds Industries mega menu
- `buildAboutMegaMenu(nav, container)` - Builds About us mega menu

**Media Query Constants** (in header.js):
```javascript
const isDesktop = window.matchMedia('(min-width: 1200px)');
const isTablet = window.matchMedia('(min-width: 900px) and (max-width: 1199px)');
```

**Icon Mapping** (in `buildPrimaryTools`):
```javascript
const iconMap = {
  Search: 'header-search.svg',
  Support: 'header-support.svg',
  Cart: 'header-cart.svg',
  'Sign In': 'header-user.svg',
};
```

**Mega-menu**: Divs with `<h2>` titles (Support, Products, Industries, About us) contain mega menu content. JS parses these and builds interactive panels.

### footer (Four-Row Layout)

Dark footer (`#111`) with 60% white default text color.

**Structure** (4 sections):
1. **Logo + Social Row**: Logo left, social SVG icons right (same row)
2. **Link Columns**: 7 columns (desktop), uppercase titles in full white
3. **Trademark**: Legal blurb text
4. **Copyright Row**: Copyright left, legal links right (same line)

**Color Scheme**:
- Default text/links: `rgb(255 255 255 / 60%)`
- Column titles: `rgb(255 255 255)` (full white)
- Hover: `#fff`

**Social Icons**: Use SVGs from `/icons/social-*.svg` (linkedin, facebook, x, instagram, youtube)

**Horizontal Rules**: Added via CSS `border-bottom` on sections 1 and 2 only (Logo+Social, Link Columns). No rule between Trademark and Copyright sections.

**CSS Grid** for link columns:
- Mobile: 1 column
- Tablet (900px+): 4 columns
- Desktop (1200px+): 7 columns

---

## Page Structure (en-us.html)

1. carousel hero (4 slides)
2. "Solving for safer" default content
3. Highlight section
4. Accordion + cards-portfolio (homepage-portfolio section)
5. Partner logos - columns (logos rotate)
6. carousel stories - "A shared vision..."
7. image-full-width section - "See what safer can do..."
8. carousel wide - "Featured news"
9. columns (icons) - "Explore Motorola Solutions"
10. Metadata

## Page Structure (assist-suites.html)

1. teaser hero (single hero with video poster)
2. columns (stats) - 4 statistics (highlight section)
3. "Operationalize your mission" default content + tabs (5 tabs)
4. "Trusted by public safety agencies" + columns (logos)
5. "Introducing role-based AI suites" default content
6. columns (media) - Dispatcher & Responder Assist Suites (2 rows)
7. "What public safety leaders are saying" + carousel (testimonials) - 2 quotes (highlight section)
8. "Explore AI-enabled products" default content + carousel (default) - 9 product cards
9. "Speak with an expert" default content + form
10. Metadata (Template: template-home)

---

## Local Assets

**Images** (`/content/images/`): news-assist-suites.jpg, news-manet-radio.jpg, news-avigilon-alerts.png, news-the-realreal.png, news-android-911.jpg

**Icons** (`/icons/`):
- **Page icons**: icon-about.svg, icon-newsroom.svg, icon-investors.svg, icon-careers.svg, icon-shop.svg
- **Header icons**: header-search.svg, header-support.svg, header-cart.svg, header-user.svg
- **Social icons**: social-linkedin.svg, social-facebook.svg, social-x.svg, social-instagram.svg, social-youtube.svg
- **Logos**: logo.svg (dark, for light backgrounds), logo-inverted.svg (white, for dark backgrounds)

---

## CSS Style Guide

### Color Syntax
Always use CSS Color Level 4 syntax:
```css
/* ✓ Correct */
color: rgb(0 0 0 / 95%);
background: rgb(255 255 255 / 50%);

/* ✗ Avoid */
color: rgba(0, 0, 0, 0.95);
background: rgba(255, 255, 255, 0.5);
```

### CSS Variables Usage
1. **Always use tokens** for: colors, spacing, typography, shadows, transitions
2. **Define new tokens** only if a value is used 2+ times across different files
3. **Keep hardcoded** intentional design dimensions (specific widths like 330px, 920px, icon sizes)

### Comment Format
Use consistent section headers:
```css
/* ===== SECTION NAME ===== */
```

### Block CSS Scoping
- Scope all styles to the block class: `.my-block .child-element`
- Avoid external context selectors unless necessary (e.g., `.section.dark .my-block`)
- Use `:has()` on wrapper for edge-to-edge blocks: `main > div:has(.my-block)`

### Fixed Dimensions with Padding
When setting explicit width/height on elements that also have padding:
```css
/* ✓ Correct - dimensions include padding */
.card {
  box-sizing: border-box;
  width: 160px;
  height: 120px;
  padding: 16px;
}

/* ✗ Wrong - actual size will be 192x152px */
.card {
  width: 160px;
  height: 120px;
  padding: 16px;
}
```

### Font Family
Always use the variable, never hardcode:
```css
/* ✓ Correct */
font-family: var(--body-font-family);

/* ✗ Avoid */
font-family: Roboto, sans-serif;
```

---

## JavaScript Style Guide

### Block Module Pattern
Export only the default decorate function:
```javascript
// ✓ Correct
export default function decorate(block) { ... }

// ✗ Avoid - unless function is imported elsewhere
export function showSlide() { ... }
```

### DOM Manipulation
1. Use `document.createElement()` for structural elements
2. `innerHTML = ''` is acceptable for clearing containers
3. `innerHTML` with template literals is acceptable for:
   - Fully controlled static content (no user input)
   - Simple markup that would be verbose with createElement
4. Always scope queries to `block`: `block.querySelector('.child')`

### Accessibility
Always include ARIA attributes on interactive elements:
- `aria-label` on buttons without visible text
- `aria-hidden` on decorative elements
- `aria-expanded` on toggleable sections

---

## Reminders

1. **Screenshots → `/tmp/` ONLY** - Never save to project root or workspace
2. Always read files before editing
3. Test in preview at localhost:3000
4. Check hover states - many elements have specific behaviors
5. Follow existing patterns in the codebase
6. Update this file when learning new project-specific patterns
7. Use `box-sizing: border-box` when setting width/height on padded elements
8. **Fragment files** (nav.html, footer.html) must NOT have `<header>` or `<footer>` tags
9. **Nav content** uses h2 headings ("Tools", "Sections") that JS parses - icons are added programmatically
10. When modifying header.js, ensure `buildPrimaryTools` and `buildNavSectionsAndTools` functions exist
11. **Header has THREE breakpoints** - Mobile (<900px), Tablet (900-1199px), Desktop (≥1200px) - don't confuse them
12. **Tablet menu goes to TOP of screen** (`inset: 0`) - NOT below the nav bar like mobile
13. **Support dropdown is desktop-only** (≥1200px) - on tablet/mobile, Support is in the hamburger menu
14. **Accordion images on mobile** need `max-width: 500px` constraint when stacked above accordion
15. **Video posters: scrape at desktop resolution** (≥1200px) - tablet resolution gives vertical aspect ratio posters
16. **Merge similar blocks into single multi-row blocks** - don't create separate blocks for each row of similar content
17. **Use teaser (hero) for single hero items** - don't use carousel (hero) for non-rotating single items
18. **Page-specific styles stay page-specific** - When importing styles from one page to match another, NEVER modify shared block CSS in ways that affect other pages. Instead: (a) Use page-specific or template-specific selectors like `body.template-name .block`, (b) Create a new variant if the styling is fundamentally different, (c) Check how changes affect all pages using the block before committing
19. **CSS variable naming** - NEVER use `--spacing-sm`, `--spacing-md`, `--spacing-lg`. The correct names are `--spacing-s`, `--spacing-m`, `--spacing-l`. Using incorrect names will silently fail.
20. **Links vs Buttons** - In EDS, links that are alone in a paragraph (`<p><a>...</a></p>`) become buttons styled by global styles. If a block needs specific button styling (e.g., inverted colors), the block CSS must override the global button styles using block-scoped selectors.
21. **Logos marquee direction** - The `.columns.logos .columns-logo-marquee-track` must have `flex-direction: row` explicitly set; otherwise inherited styles might cause vertical display.
22. **Default content centering** - For `template-home` pages, centering is applied to `.default-content-wrapper`. If centering isn't working, check: (a) the body has the `template-home` class, (b) the selector specificity matches the HTML structure.
23. **Text truncation in carousels** - Never use `-webkit-line-clamp` or text truncation on carousel descriptions unless explicitly requested. Show full text.
24. **Template meta tag in HTML head** - The `decorateTemplateAndTheme()` function reads `<meta name="template" content="template-home">` from the `<head>`, NOT from the metadata block in the body. When creating new page HTML files, always add `<meta name="template" content="template-home"/>` to the `<head>` if the page uses a template. Without this, the body won't get the template class and template-specific CSS (like centering) won't apply.
25. **CSS variables: always verify before using** - Before using ANY CSS variable in your code, verify it exists in `styles.css`. CSS variables that don't exist silently resolve to nothing, causing invisible styling failures. Common mistakes: `--spacing-sm` (correct: `--spacing-s`), `--spacing-md` (correct: `--spacing-m`), `--spacing-lg` (correct: `--spacing-l`). Also check the complete list of all variables in the Design Tokens section of this file.
26. **Block CSS must not override global button styles with link styles** - In EDS, `a.button` gets global button styling (pill shape, dark bg on hover, etc.). Block CSS should NEVER set `color: var(--link-color)` on `a.button` or `p > a:only-child` elements, as this overrides the global button styling and makes buttons appear as plain blue links. Instead, either let global styles apply or add explicit block-scoped button overrides.
27. **Variant-scoped carousel CSS** - When adding CSS to `.carousel .carousel-slide-content` or other base carousel selectors, always consider whether it should apply to ALL variants or only specific ones. Use `:not()` selectors like `.carousel:not(.hero):not(.stories):not(.wide):not(.testimonials)` to scope changes to the default variant only.
28. **Picture elements need explicit height** - When using `img { width: 100%; height: 100%; object-fit: cover; }` to fill a container, the parent `<picture>` element also needs `width: 100%; height: 100%` for the image to actually fill the space. Without this, the picture element has no explicit dimensions and the image won't stretch.

---

## CSS Patterns to Maintain

### Slide-out Menu Positioning
```css
/* Mobile: starts below nav bar */
@media (width < 900px) {
  .mobile-menu-overlay {
    inset: 64px 0 0;  /* Top offset = nav height */
  }
}

/* Tablet: goes to top of screen */
@media (width >= 900px) and (width < 1200px) {
  .mobile-menu-overlay {
    inset: 0 0 0 auto;  /* Full height, anchored right */
    width: 520px;
  }
  .mobile-menu-backdrop {
    inset: 0;  /* Full screen backdrop */
  }
}
```

### Dropdown with Triangular Arrow
```css
.dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  filter: drop-shadow(0 -2px 2px rgb(0 0 0 / 8%));
}
```

### Constrain and Center Images on Mobile
```css
@media (width < 900px) {
  .image-container {
    max-width: 500px;
    margin: 0 auto;
  }
}
```
