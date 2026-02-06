/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards (awards) block variant
 *
 * Source: https://www.motorolasolutions.com/en_us/solutions/safety-ecosystem.html
 * Base Block: cards (awards)
 *
 * Converts awards/recognition sections with inline SVG icons, titles, and subtitles
 * into EDS Cards (awards) block table format.
 *
 * Source selectors:
 *   - .software-statsiconblock.section (awards with inline SVGs)
 *   - .sw-stats-icons (stats icon grid)
 *   - .dnaCtaButtonBlock.section (CTA with awards/badges)
 *
 * Block Structure:
 *   | Cards (awards) |  |
 *   | -------------- | - |
 *   | ![Award name](/icons/award-slug.svg) | <strong>Title</strong> <p>Subtitle</p> |
 *
 * Note: Inline SVGs must be extracted and saved separately during the import process.
 *       This parser creates placeholder references to /icons/award-*.svg paths.
 *
 * Generated: 2026-02-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find award items - look for containers with SVG + heading + description
  const section = element.querySelector('.sw-stats-icons') || element;

  // Find all SVGs in the section
  const svgs = section.querySelectorAll('svg');
  const h4s = section.querySelectorAll('h4');
  const ps = section.querySelectorAll('p');

  if (svgs.length > 0 && h4s.length > 0) {
    svgs.forEach((svg, i) => {
      const title = h4s[i] ? h4s[i].textContent.trim() : '';
      const subtitle = ps[i] ? ps[i].textContent.trim() : '';

      if (!title) return;

      // Create a slug from the title for the SVG filename
      const slug = title
        .toLowerCase()
        .replace(/['']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Create image cell with reference to the SVG icon
      const image = document.createElement('img');
      image.src = `/icons/award-${slug}.svg`;
      image.alt = title;

      // Create content cell
      const contentCell = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = title;
      contentCell.appendChild(strong);

      if (subtitle) {
        contentCell.appendChild(document.createTextNode(' '));
        const p = document.createElement('p');
        p.textContent = subtitle;
        contentCell.appendChild(p);
      }

      cells.push([image, contentCell]);
    });
  }

  // Fallback: look for image + heading pairs (non-SVG award sections)
  if (cells.length === 0) {
    const items = element.querySelectorAll('[class*="stat"], [class*="award"], [class*="badge"]');
    items.forEach((item) => {
      const img = item.querySelector('img');
      const heading = item.querySelector('h3, h4, strong');
      const desc = item.querySelector('p');

      if (heading) {
        let imageCell = '';
        if (img) {
          const image = document.createElement('img');
          image.src = img.src;
          image.alt = img.alt || heading.textContent.trim();
          imageCell = image;
        }

        const contentCell = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        contentCell.appendChild(strong);

        if (desc) {
          contentCell.appendChild(document.createTextNode(' '));
          const p = document.createElement('p');
          p.textContent = desc.textContent.trim();
          contentCell.appendChild(p);
        }

        cells.push([imageCell || '', contentCell]);
      }
    });
  }

  // Create the block if we have content
  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, {
      name: 'Cards (awards)',
      cells,
    });
    element.replaceWith(block);
  }
}
