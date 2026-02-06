/**
 * Columns block - Multi-purpose column layouts with variants
 * Variants:
 * - Default: Two equal columns
 * - media: Image/video and content columns - auto-detects image position per row
 * - stats: Statistics display with large numbers and descriptions
 * - logos: Logo display with optional rotation (marquee)
 * - icons: Icon navigation grid
 */
export default function decorate(block) {
  const isMedia = block.classList.contains('media') || block.classList.contains('media-reversed');
  const isStats = block.classList.contains('stats');
  const isLogos = block.classList.contains('logos');
  const isIcons = block.classList.contains('icons');

  // Get rows
  const rows = [...block.children];

  if (isStats) {
    // Stats variant: parse rows into stat items
    const stats = [];
    rows.forEach((row) => {
      const cells = [...row.children];
      if (cells.length >= 2) {
        const number = cells[0].textContent.trim();
        const description = cells[1].textContent.trim();
        stats.push({ number, description });
      }
    });

    // Clear and rebuild
    block.innerHTML = '';
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('columns-stats-container');

    stats.forEach((stat) => {
      const statItem = document.createElement('div');
      statItem.classList.add('columns-stats-item');

      const numberEl = document.createElement('p');
      numberEl.classList.add('columns-stats-number');
      numberEl.textContent = stat.number;

      const descEl = document.createElement('p');
      descEl.classList.add('columns-stats-description');
      descEl.textContent = stat.description;

      statItem.append(numberEl, descEl);
      statsContainer.append(statItem);
    });

    block.append(statsContainer);
  } else if (isLogos) {
    // Logos variant: collect all logo images
    const isRotating = block.classList.contains('rotate');
    const logos = [];
    block.querySelectorAll('picture').forEach((pic) => {
      logos.push(pic.cloneNode(true));
    });

    // Clear and rebuild
    block.innerHTML = '';
    const marqueeTrack = document.createElement('div');
    marqueeTrack.classList.add('columns-logo-marquee-track');

    const logoSet1 = document.createElement('div');
    logoSet1.classList.add('columns-logo-set');

    logos.forEach((pic) => {
      const logoItem = document.createElement('div');
      logoItem.classList.add('columns-logo-item');
      logoItem.append(pic.cloneNode(true));
      logoSet1.append(logoItem);
    });

    marqueeTrack.append(logoSet1);

    // Duplicate for seamless scroll when rotating
    if (isRotating) {
      const logoSet2 = logoSet1.cloneNode(true);
      marqueeTrack.append(logoSet2);
    }

    block.append(marqueeTrack);
  } else if (isIcons) {
    // Icons variant: create icon card grid
    const ul = document.createElement('ul');
    rows.forEach((row) => {
      const li = document.createElement('li');
      while (row.firstElementChild) li.append(row.firstElementChild);

      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) {
          div.className = 'columns-icons-card-image';
        } else {
          div.className = 'columns-icons-card-body';
        }
      });

      // Wrap entire card content with link if one exists
      const link = li.querySelector('.columns-icons-card-body a');
      if (link) {
        const wrapper = document.createElement('a');
        wrapper.href = link.href;
        wrapper.className = 'columns-icons-card-link';
        // Replace inner link with plain text
        const linkText = link.textContent;
        const textSpan = document.createElement('span');
        textSpan.textContent = linkText;
        link.replaceWith(textSpan);
        // Move all li children into the wrapper
        while (li.firstChild) wrapper.append(li.firstChild);
        li.append(wrapper);
      }

      ul.append(li);
    });

    block.textContent = '';
    block.append(ul);
  } else if (isMedia) {
    // Ensure media class is present for styling
    if (!block.classList.contains('media')) {
      block.classList.add('media');
    }

    // Media variant: process each row independently
    rows.forEach((row) => {
      const cols = [...row.children];

      if (cols.length >= 2) {
        // Determine which column has the image
        const col1HasImage = cols[0].querySelector('picture, img');
        const col2HasImage = cols[1].querySelector('picture, img');

        let mediaCol;
        let contentCol;
        let isReversed = false;

        if (col1HasImage && !col2HasImage) {
          // Image in first column: standard layout (image left)
          [mediaCol, contentCol] = cols;
        } else if (col2HasImage && !col1HasImage) {
          // Image in second column: reversed layout (image right)
          [contentCol, mediaCol] = cols;
          isReversed = true;
        } else {
          // Both or neither have images: default to first as media
          [mediaCol, contentCol] = cols;
        }

        mediaCol.classList.add('columns-media-col');
        contentCol.classList.add('columns-content-col');

        // Add row-specific reversed class for CSS targeting
        if (isReversed) {
          row.classList.add('columns-row-reversed');
        }
      }
    });
  } else {
    // Default variant: equal columns
    rows.forEach((row) => {
      const cols = [...row.children];
      cols.forEach((col) => {
        col.classList.add('columns-col');
      });
    });
  }
}
