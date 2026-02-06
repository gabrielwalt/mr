/**
 * Teaser Block - Single hero/promotional content with background media
 * Variants:
 * - hero: Full-width hero with background image/video, dark overlay, white text
 *         Identical styling to carousel (hero) but for single items
 *
 * Structure (two-column format, matching carousel hero):
 * | Teaser (hero) |  |
 * | --- | --- |
 * | ![background image](url) | <h2>Heading Line 1</h2><h2>Heading Line 2</h2> |
 * |  | Description text |
 * |  | [CTA Button](url) |
 */
export default function decorate(block) {
  const isHero = block.classList.contains('hero');

  if (isHero) {
    const rows = [...block.children];

    // Two-column format: image in col1 of first row, content in col2 of all rows
    let imageEl = null;
    const contentItems = [];

    rows.forEach((row, rowIndex) => {
      const cells = [...row.children];

      if (cells.length >= 2) {
        // Two-column format
        if (rowIndex === 0) {
          // First row: get image from first cell
          const imageCell = cells[0];
          const picture = imageCell.querySelector('picture');
          const img = imageCell.querySelector('img');
          imageEl = picture || img;
        }
        // All rows: collect content from second cell
        const contentCell = cells[1];
        if (contentCell && contentCell.innerHTML.trim()) {
          contentItems.push(contentCell);
        }
      } else if (cells.length === 1) {
        // Single-column fallback (legacy format)
        const cell = cells[0];
        const picture = cell.querySelector('picture');
        const img = cell.querySelector('img');

        if (picture || img) {
          imageEl = picture || img;
        } else if (cell.innerHTML.trim()) {
          contentItems.push(cell);
        }
      }
    });

    // Clear block and rebuild structure
    block.innerHTML = '';

    // Create background image container with overlay
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'teaser-image';

    if (imageEl) {
      if (imageEl.tagName === 'PICTURE') {
        imageWrapper.appendChild(imageEl.cloneNode(true));
      } else if (imageEl.tagName === 'IMG') {
        imageWrapper.appendChild(imageEl.cloneNode(true));
      }
    }

    // Create content container
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'teaser-content';

    // Process content items - flatten and add to content wrapper
    contentItems.forEach((item) => {
      // Get direct children (headings, paragraphs, etc.)
      const children = [...item.children];
      if (children.length > 0) {
        children.forEach((child) => {
          contentWrapper.appendChild(child.cloneNode(true));
        });
      } else if (item.textContent.trim()) {
        // If item has no children but has text, wrap in paragraph
        const p = document.createElement('p');
        p.innerHTML = item.innerHTML;
        contentWrapper.appendChild(p);
      }
    });

    // Find CTA links and create CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'teaser-cta-container';

    // Find all paragraphs with single links (CTA candidates)
    const ctaParagraphs = [...contentWrapper.querySelectorAll('p')].filter((p) => {
      const links = p.querySelectorAll('a');
      return links.length === 1 && p.children.length === 1;
    });

    ctaParagraphs.forEach((p) => {
      const link = p.querySelector('a');
      const linkText = link.textContent.toLowerCase();

      // Check if it's a video link
      if (linkText.includes('video') || linkText.includes('watch')) {
        // Create video link with play button
        const videoLink = document.createElement('a');
        videoLink.href = link.href;
        videoLink.className = 'teaser-video-link';

        const playButton = document.createElement('span');
        playButton.className = 'teaser-play-button';
        playButton.setAttribute('aria-hidden', 'true');

        const linkSpan = document.createElement('span');
        linkSpan.textContent = link.textContent;

        videoLink.appendChild(playButton);
        videoLink.appendChild(linkSpan);
        ctaContainer.appendChild(videoLink);
      } else {
        // Regular button link
        link.classList.add('button');
        ctaContainer.appendChild(link);
      }

      // Remove the original paragraph
      p.remove();
    });

    // Append CTA container if it has children
    if (ctaContainer.children.length > 0) {
      contentWrapper.appendChild(ctaContainer);
    }

    block.appendChild(imageWrapper);
    block.appendChild(contentWrapper);
  }
}
