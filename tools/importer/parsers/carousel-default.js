/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel (default) block
 *
 * Source: https://www.motorolasolutions.com/en_us/solutions/safety-ecosystem.html
 * Base Block: carousel (default)
 *
 * Converts card grid/carousel sections into EDS Carousel block table format.
 * Handles multiple source patterns:
 *   - .dnaIconsDescriptions.section (technology icon cards)
 *   - .dnaResourcesWithFilters.section (use case / industry card grids)
 *   - .featurecontentblock.section (feature content cards)
 *   - .headline-with-cta (headline + card layout)
 *
 * Block Structure:
 *   | Carousel |  |
 *   | -------- | - |
 *   | ![image](url) | <strong>Title</strong> <p>Description</p> <a href="url">Learn more</a> |
 *
 * Generated: 2026-02-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Strategy 1: Find card elements (most common pattern)
  let cards = element.querySelectorAll('.card, .column-card, [class*="feature-card"]');

  // Strategy 2: dnaIconsDescriptions - icon + text columns
  if (cards.length === 0) {
    cards = element.querySelectorAll('[class*="icon-description"], .hwcta-12column > div > div');
  }

  // Strategy 3: dnaResourcesWithFilters - resource cards
  if (cards.length === 0) {
    cards = element.querySelectorAll('[class*="resource-card"], [class*="use-case-card"]');
  }

  // Strategy 4: Generic card-like containers with images and text
  if (cards.length === 0) {
    const containers = element.querySelectorAll('div');
    const potentialCards = [];
    containers.forEach((div) => {
      const hasImg = div.querySelector('img');
      const hasHeading = div.querySelector('h3, h4, strong');
      const hasLink = div.querySelector('a');
      if (hasImg && hasHeading && hasLink && div.children.length >= 2) {
        // Check not a parent of another potential card
        const isParent = potentialCards.some((pc) => div.contains(pc));
        if (!isParent) {
          potentialCards.push(div);
        }
      }
    });
    // Filter out containers that contain other potential cards
    cards = potentialCards.filter((card) => !potentialCards.some((other) => other !== card && card.contains(other)));
  }

  cards.forEach((card) => {
    // Extract image
    let imageCell = '';
    const img = card.querySelector('img.card-img-top, img[class*="icon"], img');
    if (img && img.src) {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt || '';
      imageCell = image;
    }

    // Extract content
    const contentCell = document.createElement('div');

    // Title (strong or heading)
    const title = card.querySelector('.card-title, h3, h4, [class*="title"], strong');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentCell.appendChild(strong);
      contentCell.appendChild(document.createTextNode(' '));
    }

    // Description
    const desc = card.querySelector('.card-text, p, [class*="description"]');
    if (desc && desc !== title) {
      const text = desc.textContent.trim();
      if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        contentCell.appendChild(p);
        contentCell.appendChild(document.createTextNode(' '));
      }
    }

    // CTA link
    const cta = card.querySelector('a[href]');
    if (cta) {
      const link = document.createElement('a');
      link.href = cta.href;
      link.textContent = cta.textContent.trim() || 'Learn more';
      contentCell.appendChild(link);
    }

    if (imageCell || contentCell.children.length > 0) {
      cells.push([imageCell || '', contentCell]);
    }
  });

  // Create the block if we have content
  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, {
      name: 'Carousel',
      cells,
    });
    element.replaceWith(block);
  }
}
