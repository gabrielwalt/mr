/**
 * Tabs Block - Horizontal tab navigation with content panels
 * Each row in the block becomes a tab with:
 * - First cell: Tab content (h3 title becomes tab label, rest becomes panel content)
 * - Second cell: Optional image displayed on the right side of the panel
 */

export default function decorate(block) {
  // Parse rows into tab data
  const tabs = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 1) {
      const contentCell = cells[0];
      const imageCell = cells[1] || null;

      // Extract tab title from h3
      const titleEl = contentCell.querySelector('h3');
      const title = titleEl ? titleEl.textContent.trim() : `Tab ${tabs.length + 1}`;

      // Remove title from content (will be used as tab label only)
      if (titleEl) {
        titleEl.remove();
      }

      tabs.push({
        title,
        content: contentCell.innerHTML,
        image: imageCell ? imageCell.innerHTML : null,
      });
    }
  });

  // Clear block and build tabs structure
  block.innerHTML = '';

  // Create tab navigation
  const tabNav = document.createElement('div');
  tabNav.classList.add('tabs-nav');

  // Create tab list
  const tabList = document.createElement('div');
  tabList.classList.add('tabs-list');
  tabList.setAttribute('role', 'tablist');

  // Create tab panels container
  const tabPanels = document.createElement('div');
  tabPanels.classList.add('tabs-panels');

  // Build tabs and panels
  tabs.forEach((tab, index) => {
    // Create tab button
    const tabButton = document.createElement('button');
    tabButton.classList.add('tabs-tab');
    tabButton.setAttribute('role', 'tab');
    tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    tabButton.setAttribute('aria-controls', `tab-panel-${index}`);
    tabButton.setAttribute('id', `tab-${index}`);
    tabButton.textContent = tab.title;

    if (index === 0) {
      tabButton.classList.add('active');
    }

    // Tab click handler
    tabButton.addEventListener('click', () => {
      // Update tab states
      tabList.querySelectorAll('.tabs-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabButton.classList.add('active');
      tabButton.setAttribute('aria-selected', 'true');

      // Update panel states
      tabPanels.querySelectorAll('.tabs-panel').forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });
      const panel = tabPanels.querySelector(`#tab-panel-${index}`);
      if (panel) {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
      }
    });

    tabList.append(tabButton);

    // Create tab panel
    const tabPanel = document.createElement('div');
    tabPanel.classList.add('tabs-panel');
    tabPanel.setAttribute('role', 'tabpanel');
    tabPanel.setAttribute('id', `tab-panel-${index}`);
    tabPanel.setAttribute('aria-labelledby', `tab-${index}`);

    if (index === 0) {
      tabPanel.classList.add('active');
    } else {
      tabPanel.setAttribute('hidden', '');
    }

    // Panel content wrapper
    const panelContent = document.createElement('div');
    panelContent.classList.add('tabs-panel-content');
    panelContent.innerHTML = tab.content;

    tabPanel.append(panelContent);

    // Panel image (if exists)
    if (tab.image) {
      const panelImage = document.createElement('div');
      panelImage.classList.add('tabs-panel-image');
      panelImage.innerHTML = tab.image;
      tabPanel.append(panelImage);
    }

    tabPanels.append(tabPanel);
  });

  // Add scroll buttons for mobile
  const scrollLeft = document.createElement('button');
  scrollLeft.classList.add('tabs-scroll', 'tabs-scroll-left');
  scrollLeft.setAttribute('aria-label', 'Scroll tabs left');
  scrollLeft.innerHTML = '<span class="tabs-scroll-icon">&lsaquo;</span>';
  scrollLeft.addEventListener('click', () => {
    tabList.scrollBy({ left: -150, behavior: 'smooth' });
  });

  const scrollRight = document.createElement('button');
  scrollRight.classList.add('tabs-scroll', 'tabs-scroll-right');
  scrollRight.setAttribute('aria-label', 'Scroll tabs right');
  scrollRight.innerHTML = '<span class="tabs-scroll-icon">&rsaquo;</span>';
  scrollRight.addEventListener('click', () => {
    tabList.scrollBy({ left: 150, behavior: 'smooth' });
  });

  // Update scroll button visibility
  const updateScrollButtons = () => {
    const { scrollLeft: sl, scrollWidth, clientWidth } = tabList;
    scrollLeft.style.display = sl > 0 ? 'flex' : 'none';
    scrollRight.style.display = sl + clientWidth < scrollWidth - 1 ? 'flex' : 'none';
  };

  tabList.addEventListener('scroll', updateScrollButtons);
  window.addEventListener('resize', updateScrollButtons);

  // Assemble navigation
  tabNav.append(scrollLeft, tabList, scrollRight);
  block.append(tabNav, tabPanels);

  // Initial scroll button state
  setTimeout(updateScrollButtons, 100);
}
