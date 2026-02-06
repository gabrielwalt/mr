/* eslint-disable */
/* global WebImporter */

/**
 * Parser for teaser-hero block
 *
 * Source: https://www.motorolasolutions.com/en_us/solutions/safety-ecosystem.html
 * Base Block: teaser (hero)
 *
 * Converts hero/banner sections with video poster or background image
 * into EDS Teaser (hero) block table format.
 *
 * Source selectors:
 *   - .header-full-width-image-or-video.section (with video/image hero)
 *   - .hero2020.section (CTA banner style hero)
 *
 * Block Structure:
 *   | Teaser (hero) |  |
 *   | --- | --- |
 *   | ![image](url) | <h2>Heading</h2><p>Description</p> |
 *
 * Generated: 2026-02-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract background/poster image
  let imageCell = '';

  // Try video poster first (Brightcove or HTML5 video)
  const video = element.querySelector('video, .video-js');
  if (video) {
    const poster = video.getAttribute('poster') ||
      video.getAttribute('data-poster') ||
      video.querySelector('source')?.getAttribute('poster');
    if (poster) {
      const img = document.createElement('img');
      img.src = poster;
      img.alt = 'Hero video poster';
      imageCell = img;
    }
  }

  // Try background image
  if (!imageCell) {
    const bgEl = element.querySelector('[style*="background-image"]') ||
      element.querySelector('.hero--bg, .hero-bg, [class*="hero-image"]');
    if (bgEl) {
      const style = bgEl.getAttribute('style') || '';
      const urlMatch = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (urlMatch) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = 'Hero background';
        imageCell = img;
      }
    }
  }

  // Try any prominent image
  if (!imageCell) {
    const heroImg = element.querySelector('.hero img, .hero2020 img, picture img, img[class*="hero"]') ||
      element.querySelector('img');
    if (heroImg) {
      const img = document.createElement('img');
      img.src = heroImg.src;
      img.alt = heroImg.alt || 'Hero image';
      imageCell = img;
    }
  }

  // Extract content (heading, description, CTA)
  const contentCell = document.createElement('div');

  // Heading - try h1 first, then h2
  const heading = element.querySelector('.hero--heading__display-3, h1, h2, [class*="hero-title"]');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    contentCell.appendChild(h2);
  }

  // Description
  const description = element.querySelector('.hero--description, [class*="hero-desc"], h3, p:not(:has(a))');
  if (description && description !== heading) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    if (p.textContent) {
      contentCell.appendChild(p);
    }
  }

  // CTA links
  const ctas = element.querySelectorAll('.hero--cta-btn a, .hero--link__w-100 a, a.btn, a[class*="cta"], a[class*="button"]');
  if (ctas.length > 0) {
    ctas.forEach((cta) => {
      const text = cta.textContent.trim();
      if (text) {
        const p = document.createElement('p');
        const link = document.createElement('a');
        link.href = cta.href;
        link.textContent = text;
        p.appendChild(link);
        contentCell.appendChild(p);
      }
    });
  } else {
    // Fallback: find any links that look like CTAs
    const links = element.querySelectorAll('a[href]');
    links.forEach((link) => {
      const text = link.textContent.trim();
      if (text && text.length > 2 && text.length < 50 && !text.includes('Skip')) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = text;
        p.appendChild(a);
        contentCell.appendChild(p);
      }
    });
  }

  // Build the block if we have content
  if (imageCell || contentCell.children.length > 0) {
    cells.push([imageCell || '', contentCell]);

    const block = WebImporter.Blocks.createBlock(document, {
      name: 'Teaser (hero)',
      cells,
    });
    element.replaceWith(block);
  }
}
