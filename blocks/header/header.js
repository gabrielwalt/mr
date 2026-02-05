import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

let activeProductsPanel = 'technologies';

/**
 * Builds the primary tools section (Search, Support, Cart, Sign In)
 */
function buildPrimaryTools(nav) {
  // Find the Tools div by h2 heading
  const toolsDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'Tools');
  if (!toolsDiv) return null;

  const primaryTools = document.createElement('div');
  primaryTools.className = 'nav-primary-tools';

  const ul = document.createElement('ul');

  // Icon mapping for tools
  const iconMap = {
    Search: 'header-search.svg',
    Support: 'header-support.svg',
    Cart: 'header-cart.svg',
    'Sign In': 'header-user.svg',
  };

  const toolsList = toolsDiv.querySelector('ul');
  if (toolsList) {
    toolsList.querySelectorAll(':scope > li').forEach((li) => {
      const itemLi = document.createElement('li');
      const link = li.querySelector('a');
      const text = link ? link.textContent.trim() : li.textContent.trim();

      if (text === 'Search') {
        // Build search form (desktop)
        const form = document.createElement('form');
        form.className = 'search-form';
        form.action = '/search';
        form.method = 'get';

        const input = document.createElement('input');
        input.type = 'search';
        input.name = 'q';
        input.placeholder = text;
        input.setAttribute('aria-label', text);

        const button = document.createElement('button');
        button.type = 'submit';
        button.setAttribute('aria-label', text);

        const icon = document.createElement('img');
        icon.src = `/icons/${iconMap[text]}`;
        icon.alt = text;
        button.appendChild(icon);

        form.appendChild(input);
        form.appendChild(button);
        itemLi.appendChild(form);

        // Build search trigger (mobile) - opens modal
        const searchTrigger = document.createElement('button');
        searchTrigger.className = 'search-trigger';
        searchTrigger.type = 'button';
        searchTrigger.setAttribute('aria-label', 'Open search');

        const triggerIcon = document.createElement('img');
        triggerIcon.src = `/icons/${iconMap[text]}`;
        triggerIcon.alt = text;
        searchTrigger.appendChild(triggerIcon);
        itemLi.appendChild(searchTrigger);
      } else if (link) {
        // Build icon + text link
        const a = document.createElement('a');
        a.href = link.href;

        const icon = document.createElement('img');
        icon.src = `/icons/${iconMap[text]}`;
        icon.alt = text;
        a.appendChild(icon);

        const span = document.createElement('span');
        span.textContent = text;
        a.appendChild(span);

        itemLi.appendChild(a);
      }

      ul.appendChild(itemLi);
    });
  }

  primaryTools.appendChild(ul);

  // Remove the original Tools div from nav
  toolsDiv.remove();

  return primaryTools;
}

/**
 * Builds the search modal for mobile - full dark overlay with floating search bar
 */
function buildSearchModal() {
  const overlay = document.createElement('div');
  overlay.className = 'search-modal-overlay';

  // Close button - at overlay level (top right corner)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'search-modal-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close search');
  overlay.appendChild(closeBtn);

  // Modal container for search form
  const modal = document.createElement('div');
  modal.className = 'search-modal';

  // Hidden header (kept for accessibility)
  const header = document.createElement('div');
  header.className = 'search-modal-header';
  const title = document.createElement('h3');
  title.textContent = 'Search';
  header.appendChild(title);
  modal.appendChild(header);

  // Search form
  const form = document.createElement('form');
  form.className = 'search-modal-form';
  form.action = '/search';
  form.method = 'get';

  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.placeholder = 'Search';
  input.setAttribute('aria-label', 'Search');

  const button = document.createElement('button');
  button.type = 'submit';
  button.setAttribute('aria-label', 'Submit search');

  const icon = document.createElement('img');
  icon.src = '/icons/header-search.svg';
  icon.alt = 'Search';
  button.appendChild(icon);

  form.appendChild(input);
  form.appendChild(button);
  modal.appendChild(form);

  overlay.appendChild(modal);

  // Close on overlay click (but not on modal/form click)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });

  // Close on close button click
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('open');
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
    }
  });

  return overlay;
}

/**
 * Builds the nav sections (Products, Industries, About us) and tools (Contact sales)
 */
function buildNavSectionsAndTools(nav) {
  // Find the Sections div by h2 heading
  const sectionsDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'Sections');
  if (!sectionsDiv) return { navSections: null, navTools: null };

  // Build nav-sections
  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';

  const wrapper = document.createElement('div');
  wrapper.className = 'default-content-wrapper';

  const ul = document.createElement('ul');

  const sectionsList = sectionsDiv.querySelector('ul');
  if (sectionsList) {
    sectionsList.querySelectorAll(':scope > li').forEach((li) => {
      const newLi = document.createElement('li');
      newLi.textContent = li.textContent.trim();
      newLi.setAttribute('aria-expanded', 'false');
      ul.appendChild(newLi);
    });
  }

  wrapper.appendChild(ul);
  navSections.appendChild(wrapper);

  // Build nav-tools from the Contact sales link
  const navTools = document.createElement('div');
  navTools.className = 'nav-tools';

  const contactLink = sectionsDiv.querySelector('p > a');
  if (contactLink) {
    const toolsUl = document.createElement('ul');
    const toolsLi = document.createElement('li');
    const a = document.createElement('a');
    a.href = contactLink.href;
    a.textContent = contactLink.textContent;
    toolsLi.appendChild(a);
    toolsUl.appendChild(toolsLi);
    navTools.appendChild(toolsUl);
  }

  // Remove the original Sections div from nav
  sectionsDiv.remove();

  return { navSections, navTools };
}

/**
 * Builds the brand logo from author content
 * The author provides just a text link (e.g., "Motorola Solutions" linking to "/")
 * This function replaces it with the actual logo image
 * Uses different logos for mobile (small) and desktop (full)
 * @param {HTMLElement} brandDiv The brand div containing the text link
 */
function buildBrandLogo(brandDiv) {
  const link = brandDiv.querySelector('a');
  if (!link) return;

  const altText = link.textContent.trim() || 'Motorola Solutions';

  // Replace link content with logo images
  link.textContent = '';

  // Desktop logo (full)
  const logoDesktop = document.createElement('img');
  logoDesktop.src = '/icons/logo.svg';
  logoDesktop.alt = altText;
  logoDesktop.loading = 'lazy';
  logoDesktop.className = 'logo-desktop';

  // Mobile logo (small)
  const logoMobile = document.createElement('img');
  logoMobile.src = '/icons/logo-small.svg';
  logoMobile.alt = altText;
  logoMobile.loading = 'lazy';
  logoMobile.className = 'logo-mobile';

  link.appendChild(logoDesktop);
  link.appendChild(logoMobile);
  link.setAttribute('aria-label', altText);
}

function closeMegaMenu() {
  const megaMenu = document.querySelector('.mega-menu');
  if (megaMenu) {
    megaMenu.classList.remove('open');
    megaMenu.querySelectorAll('.mega-menu-content').forEach((content) => {
      content.classList.remove('active');
    });
  }
  // Reset nav item states
  document.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((li) => {
    li.setAttribute('aria-expanded', 'false');
  });
}

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    closeMegaMenu();
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnClickOutside(e) {
  const megaMenu = document.querySelector('.mega-menu');
  const navSections = document.querySelector('.nav-sections');
  if (megaMenu && !megaMenu.contains(e.target) && !navSections.contains(e.target)) {
    closeMegaMenu();
  }
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('click', closeOnClickOutside);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    document.removeEventListener('click', closeOnClickOutside);
  }
}

/**
 * Builds the Products mega menu panel with sub-sections
 */
function buildProductsMegaMenu(nav, container) {
  // Find the Products menu div (has h2 "Products")
  const productsDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'Products');
  if (!productsDiv) return;

  // Find sub-section divs (Technologies, Use cases, Radio, Software, Video security, Services)
  const subSectionDivs = {};
  nav.querySelectorAll(':scope > div').forEach((div) => {
    const h3 = div.querySelector('h3');
    if (h3) {
      subSectionDivs[h3.textContent.trim()] = div;
    }
  });

  const content = document.createElement('div');
  content.className = 'mega-menu-content mega-products';
  content.dataset.menu = 'products';

  // Left navigation
  const leftNav = document.createElement('div');
  leftNav.className = 'mega-menu-products-nav';

  // Parse the Products structure
  const productsList = productsDiv.querySelector('ul');
  if (productsList) {
    productsList.querySelectorAll(':scope > li').forEach((li) => {
      // Extract category title - get direct text content excluding nested elements
      const clone = li.cloneNode(true);
      const subElements = clone.querySelectorAll('ul, a');
      subElements.forEach((el) => el.remove());
      const categoryTitle = clone.textContent.trim();
      const subUl = li.querySelector('ul');

      const categoryH3 = document.createElement('h3');
      categoryH3.textContent = categoryTitle;
      leftNav.appendChild(categoryH3);

      if (subUl) {
        const navUl = document.createElement('ul');
        subUl.querySelectorAll(':scope > li').forEach((subLi) => {
          const navItem = document.createElement('li');
          const itemText = subLi.textContent.trim();
          const itemLink = subLi.querySelector('a');

          if (itemLink) {
            // It's a link item (like "View all products")
            const link = document.createElement('a');
            link.href = itemLink.href;
            link.textContent = itemLink.textContent;
            navItem.appendChild(link);
          } else {
            // It's a category trigger
            navItem.textContent = itemText;
            navItem.dataset.panel = itemText.toLowerCase().replace(/\s+/g, '-');
            // Set Technologies as the default active panel
            if (navItem.dataset.panel === 'technologies') {
              navItem.classList.add('active');
            }
          }
          navUl.appendChild(navItem);
        });
        leftNav.appendChild(navUl);
      }
    });
  }

  content.appendChild(leftNav);

  // Right content area
  const rightContent = document.createElement('div');
  rightContent.className = 'mega-menu-products-content';

  // Build panels for each sub-section
  Object.entries(subSectionDivs).forEach(([title, div]) => {
    const panel = document.createElement('div');
    panel.className = 'mega-menu-panel';
    panel.dataset.panel = title.toLowerCase().replace(/\s+/g, '-');
    if (panel.dataset.panel === activeProductsPanel) {
      panel.classList.add('active');
    }

    const ul = div.querySelector('ul');
    if (!ul) return;

    const items = ul.querySelectorAll(':scope > li');

    // Check if this is a Technologies/Use cases style panel
    if (title === 'Technologies' || title === 'Use cases') {
      panel.classList.add('ecosystem-panel');

      // Build intro from paragraphs before the ul
      // Note: Fragment loader may wrap content, so look in wrapper or direct children
      const intro = document.createElement('div');
      intro.className = 'mega-menu-panel-intro';

      // Find paragraphs - check in default-content-wrapper or direct children
      const wrapper = div.querySelector('.default-content-wrapper') || div;
      const paragraphs = wrapper.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const strong = p.querySelector('strong');
        const link = p.querySelector('a');

        if (strong && !link) {
          // Title paragraph
          const h4 = document.createElement('h4');
          h4.textContent = strong.textContent;
          intro.appendChild(h4);
        } else if (link && !strong) {
          // Link paragraph
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent;
          intro.appendChild(a);
        } else if (!strong && !link && p.textContent.trim()) {
          // Description paragraph (non-empty text only)
          const desc = document.createElement('p');
          desc.textContent = p.textContent;
          intro.appendChild(desc);
        }
      });

      if (intro.children.length > 0) {
        panel.appendChild(intro);
      }

      // Grid for all list items (no longer skipping the first one)
      const grid = document.createElement('div');
      grid.className = 'mega-menu-panel-grid';

      Array.from(items).forEach((item, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'mega-menu-panel-grid-item';

        // Add icon for Technologies (4 items with icons)
        if (title === 'Technologies' && index < 4) {
          const iconMap = {
            0: 'technology-critical-communications.svg',
            1: 'technology-command-center-software.svg',
            2: 'technology-video-security-access-control.svg',
            3: 'technology-managed-support-services.svg',
          };
          const img = document.createElement('img');
          img.src = `/icons/${iconMap[index]}`;
          img.alt = '';
          gridItem.appendChild(img);
        }

        const textDiv = document.createElement('div');
        textDiv.className = 'mega-menu-panel-grid-item-text';

        const strong = item.querySelector('strong');
        const strongEl = document.createElement('strong');
        const linkInStrong = strong?.querySelector('a');

        if (linkInStrong) {
          const a = document.createElement('a');
          a.href = linkInStrong.href;
          a.textContent = linkInStrong.textContent;
          strongEl.appendChild(a);
        } else if (strong) {
          strongEl.textContent = strong.textContent;
        }
        textDiv.appendChild(strongEl);

        // Get description text
        const fullText = item.textContent;
        const strongText = strong?.textContent || '';
        const description = fullText.replace(strongText, '').trim();
        if (description) {
          const span = document.createElement('span');
          span.textContent = description;
          textDiv.appendChild(span);
        }

        gridItem.appendChild(textDiv);
        grid.appendChild(gridItem);
      });

      panel.appendChild(grid);
    } else {
      // Radio, Software, Video security, Services - multi-column layout
      const columns = document.createElement('div');
      columns.className = 'mega-menu-columns';

      // Separate main columns from sidebar columns (Product line/lines, Resources)
      const mainColumns = document.createElement('div');
      mainColumns.className = 'mega-menu-columns-main';

      const sidebarColumns = document.createElement('div');
      sidebarColumns.className = 'mega-menu-columns-sidebar';

      items.forEach((item) => {
        const column = document.createElement('div');
        column.className = 'mega-menu-column';

        // Column title - check for direct link child first
        const titleLink = item.querySelector(':scope > a');
        const h4 = document.createElement('h4');
        let columnTitle = '';

        if (titleLink) {
          // Use the link text as the title
          const a = document.createElement('a');
          a.href = titleLink.href;
          a.textContent = titleLink.textContent;
          columnTitle = titleLink.textContent.trim().toLowerCase();
          h4.appendChild(a);
        } else {
          // Get direct text content (excluding nested ul)
          const clone = item.cloneNode(true);
          const nestedUl = clone.querySelector('ul');
          if (nestedUl) nestedUl.remove();
          columnTitle = clone.textContent.trim().toLowerCase();
          h4.textContent = clone.textContent.trim();
        }
        column.appendChild(h4);

        // Column items
        const subUl = item.querySelector('ul');
        if (subUl) {
          const newUl = document.createElement('ul');
          subUl.querySelectorAll(':scope > li').forEach((subLi) => {
            const li = document.createElement('li');
            const link = subLi.querySelector('a');
            if (link) {
              const a = document.createElement('a');
              a.href = link.href;
              a.textContent = link.textContent;
              li.appendChild(a);
            } else {
              li.textContent = subLi.textContent;
            }
            newUl.appendChild(li);
          });
          column.appendChild(newUl);
        }

        // Add to sidebar or main area based on column title
        if (columnTitle === 'product line' || columnTitle === 'product lines' || columnTitle === 'resources') {
          column.classList.add('sidebar-column');
          sidebarColumns.appendChild(column);
        } else {
          mainColumns.appendChild(column);
        }
      });

      columns.appendChild(mainColumns);
      if (sidebarColumns.children.length > 0) {
        columns.appendChild(sidebarColumns);
      }

      panel.appendChild(columns);
    }

    rightContent.appendChild(panel);
  });

  content.appendChild(rightContent);
  container.appendChild(content);

  // Wire up panel switching
  leftNav.querySelectorAll('li[data-panel]').forEach((navItem) => {
    navItem.addEventListener('click', () => {
      leftNav.querySelectorAll('li').forEach((li) => li.classList.remove('active'));
      navItem.classList.add('active');

      rightContent.querySelectorAll('.mega-menu-panel').forEach((p) => p.classList.remove('active'));
      const targetPanel = rightContent.querySelector(`[data-panel="${navItem.dataset.panel}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        activeProductsPanel = navItem.dataset.panel;
      }
    });
  });
}

/**
 * Builds the Industries mega menu panel
 */
function buildIndustriesMegaMenu(nav, container) {
  const industriesDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'Industries');
  if (!industriesDiv) return;

  // Map industry names to icon files
  const industryIcons = {
    Corrections: 'industry-corrections.svg',
    Education: 'industry-education.svg',
    'Fire & EMS': 'industry-fire-ems.svg',
    Healthcare: 'industry-healthcare.svg',
    Hospitality: 'industry-hospitality.svg',
    'Law Enforcement': 'industry-law-enforcement.svg',
    Manufacturing: 'industry-manufacturing.svg',
    Mining: 'industry-mining.svg',
    'U.S. Federal Government': 'industry-us-federal-government.svg',
    Military: 'industry-military.svg',
    'Oil & Gas': 'industry-oil-gas.svg',
    Retail: 'industry-retail.svg',
    'Transportation & Logistics': 'industry-transportation-logistics.svg',
    Utilities: 'industry-utilities.svg',
    Stadiums: 'industry-stadiums.svg',
  };

  const content = document.createElement('div');
  content.className = 'mega-menu-content mega-industries';
  content.dataset.menu = 'industries';

  // Main section (title + grid)
  const main = document.createElement('div');
  main.className = 'mega-menu-industries-main';

  const title = document.createElement('h3');
  title.className = 'mega-menu-industries-title';
  title.textContent = 'Industries';
  main.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'mega-menu-industries-grid';

  // Featured section (sidebar)
  const featured = document.createElement('div');
  featured.className = 'mega-menu-industries-featured';

  // Process featured items from paragraphs before the ul
  // Note: Fragment loader may wrap content, so look in wrapper or direct children
  const wrapper = industriesDiv.querySelector('.default-content-wrapper') || industriesDiv;
  const paragraphs = wrapper.querySelectorAll('p');
  let currentFeaturedItem = null;

  paragraphs.forEach((p) => {
    const strong = p.querySelector('strong');
    const linkInStrong = strong?.querySelector('a');

    if (strong && linkInStrong) {
      // This is a featured item title (e.g., "Customer success stories")
      currentFeaturedItem = document.createElement('div');
      currentFeaturedItem.className = 'mega-menu-industries-featured-item';

      const strongEl = document.createElement('strong');
      const a = document.createElement('a');
      a.href = linkInStrong.href;
      a.textContent = linkInStrong.textContent;
      strongEl.appendChild(a);
      currentFeaturedItem.appendChild(strongEl);

      featured.appendChild(currentFeaturedItem);
    } else if (!strong && currentFeaturedItem && p.textContent.trim()) {
      // This is a description for the current featured item
      const span = document.createElement('span');
      span.textContent = p.textContent.trim();
      currentFeaturedItem.appendChild(span);
      currentFeaturedItem = null; // Reset for next pair
    }
  });

  // Process industry links from the ul
  const ul = industriesDiv.querySelector('ul');
  if (ul) {
    ul.querySelectorAll(':scope > li').forEach((li) => {
      const link = li.querySelector('a');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;

        const iconName = industryIcons[link.textContent.trim()];
        if (iconName) {
          const img = document.createElement('img');
          img.src = `/icons/${iconName}`;
          img.alt = '';
          a.appendChild(img);
        }

        const span = document.createElement('span');
        span.textContent = link.textContent;
        a.appendChild(span);

        grid.appendChild(a);
      }
    });
  }

  main.appendChild(grid);
  content.appendChild(main);
  content.appendChild(featured);
  container.appendChild(content);
}

/**
 * Builds the About us mega menu panel
 */
function buildAboutMegaMenu(nav, container) {
  const aboutDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'About us');
  if (!aboutDiv) return;

  // Map social network names to icon files
  const socialIcons = {
    LinkedIn: 'social-linkedin.svg',
    Facebook: 'social-facebook.svg',
    X: 'social-x.svg',
    Instagram: 'social-instagram.svg',
    YouTube: 'social-youtube.svg',
  };

  const content = document.createElement('div');
  content.className = 'mega-menu-content mega-about';
  content.dataset.menu = 'about-us';

  const ul = aboutDiv.querySelector('ul');
  if (ul) {
    ul.querySelectorAll(':scope > li').forEach((li) => {
      const column = document.createElement('div');
      column.className = 'mega-menu-about-column';

      // Extract title - clone li, remove nested ul, get remaining text
      const clone = li.cloneNode(true);
      const nestedUl = clone.querySelector('ul');
      if (nestedUl) nestedUl.remove();
      const title = clone.textContent.trim();
      const isSocialColumn = title.toLowerCase().includes('social');

      if (isSocialColumn) {
        column.classList.add('social');
      }

      const h4 = document.createElement('h4');
      h4.textContent = title;
      column.appendChild(h4);

      const subUl = li.querySelector('ul');
      if (subUl) {
        const newUl = document.createElement('ul');
        subUl.querySelectorAll(':scope > li').forEach((subLi) => {
          const newLi = document.createElement('li');
          const link = subLi.querySelector('a');
          if (link) {
            const a = document.createElement('a');
            a.href = link.href;

            // Add social icon if this is the social column
            if (isSocialColumn) {
              const iconName = socialIcons[link.textContent.trim()];
              if (iconName) {
                const img = document.createElement('img');
                img.src = `/icons/${iconName}`;
                img.alt = '';
                a.appendChild(img);
              }
            }

            const span = document.createElement('span');
            span.textContent = link.textContent;
            a.appendChild(span);

            newLi.appendChild(a);
          } else {
            newLi.textContent = subLi.textContent;
          }
          newUl.appendChild(newLi);
        });
        column.appendChild(newUl);
      }

      content.appendChild(column);
    });

    // Add empty fourth column for spacing
    const emptyColumn = document.createElement('div');
    emptyColumn.className = 'mega-menu-about-column';
    content.appendChild(emptyColumn);
  }

  container.appendChild(content);
}

/**
 * Builds the mobile Contact Sales button for the top nav bar
 * @param {HTMLElement} nav The nav element
 * @returns {HTMLElement|null} The contact mobile element or null
 */
function buildMobileContactButton(nav) {
  // Find the Sections div to get the Contact sales link
  const sectionsDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'Sections');
  if (!sectionsDiv) return null;

  // Look for the Contact sales link - could be in a p > a or decorated as button
  let contactLink = sectionsDiv.querySelector('p > a');
  if (!contactLink) {
    // Try finding any anchor that contains "contact" in its text
    const allLinks = sectionsDiv.querySelectorAll('a');
    contactLink = Array.from(allLinks).find((a) => a.textContent.toLowerCase().includes('contact'));
  }
  if (!contactLink) return null;

  const contactMobile = document.createElement('div');
  contactMobile.className = 'nav-contact-mobile';

  const a = document.createElement('a');
  a.href = contactLink.href;
  a.textContent = contactLink.textContent;
  contactMobile.appendChild(a);

  return contactMobile;
}

/**
 * Builds the mobile flyout menu with sliding panels
 * @param {HTMLElement} nav The nav element containing menu data
 * @returns {HTMLElement} The mobile menu overlay element
 */
function buildMobileMenu(nav) {
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';

  // Menu header with back, title, and close
  const header = document.createElement('div');
  header.className = 'mobile-menu-header';

  const backBtn = document.createElement('button');
  backBtn.className = 'mobile-menu-back';
  backBtn.setAttribute('aria-label', 'Go back');

  const title = document.createElement('h2');
  title.className = 'mobile-menu-title';
  title.textContent = 'Menu';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'mobile-menu-close';
  closeBtn.setAttribute('aria-label', 'Close menu');

  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(closeBtn);
  overlay.appendChild(header);

  // Panels container
  const panelsContainer = document.createElement('div');
  panelsContainer.className = 'mobile-menu-panels';

  // Panel stack for navigation history
  const panelStack = [];

  // Helper to create a menu panel
  function createPanel(id, items, sectionHeader = null, largeHeader = null) {
    const panel = document.createElement('div');
    panel.className = 'mobile-menu-panel';
    panel.dataset.panelId = id;

    // Add section header if provided (grey label at top)
    if (sectionHeader) {
      const headerDiv = document.createElement('div');
      headerDiv.className = 'mobile-menu-section-header';
      headerDiv.textContent = sectionHeader;
      panel.appendChild(headerDiv);
    }

    // Add large header if provided (like "Safety & Security Ecosystem")
    if (largeHeader) {
      const largeHeaderDiv = document.createElement('div');
      largeHeaderDiv.className = 'mobile-menu-section-header large';
      largeHeaderDiv.textContent = largeHeader;
      panel.appendChild(largeHeaderDiv);
    }

    const list = document.createElement('ul');
    list.className = 'mobile-menu-list';

    items.forEach((item) => {
      // Skip text-only items (no link and no submenu)
      if (!item.link && !item.submenu) return;

      const li = document.createElement('li');
      li.className = 'mobile-menu-item';

      if (item.submenu && item.submenu.length > 0) {
        // Has submenu - create button
        const btn = document.createElement('button');
        btn.textContent = item.text;
        btn.addEventListener('click', () => {
          // Create and show submenu panel
          const subPanelId = `${id}-${item.text.toLowerCase().replace(/\s+/g, '-')}`;
          let subPanel = panelsContainer.querySelector(`[data-panel-id="${subPanelId}"]`);

          if (!subPanel) {
            // Section header is the item we're navigating into
            subPanel = createPanel(subPanelId, item.submenu, item.text);
            panelsContainer.appendChild(subPanel);
          }

          // Animate transition
          const currentPanel = panelsContainer.querySelector('.mobile-menu-panel.active');
          if (currentPanel) {
            currentPanel.classList.add('exiting');
            currentPanel.classList.remove('active');
          }

          panelStack.push({ id, title: title.textContent });
          title.textContent = item.text;
          backBtn.classList.add('visible');

          requestAnimationFrame(() => {
            subPanel.classList.add('active');
          });
        });
        li.appendChild(btn);
      } else if (item.link) {
        // Just a link
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.text;
        li.appendChild(a);
      }

      list.appendChild(li);
    });

    panel.appendChild(list);
    return panel;
  }

  // Helper to find h3 section by title
  function findH3Section(titleText) {
    return Array.from(nav.querySelectorAll(':scope > div'))
      .find((div) => div.querySelector('h3')?.textContent.trim() === titleText);
  }

  // Helper to parse nested list structure into menu items
  function parseListToMenuItems(ul) {
    const items = [];
    if (!ul) return items;

    ul.querySelectorAll(':scope > li').forEach((li) => {
      // Link might be direct child or wrapped in p.button-container by AEM decoration
      const link = li.querySelector(':scope > a') || li.querySelector(':scope > p > a');
      const nestedUl = li.querySelector(':scope > ul');

      // Get text content excluding nested elements
      const clone = li.cloneNode(true);
      const nested = clone.querySelectorAll('ul, a');
      nested.forEach((el) => el.remove());
      const text = clone.textContent.trim();

      if (nestedUl) {
        // Has nested list - parse recursively
        const nestedItems = parseListToMenuItems(nestedUl);

        if (link) {
          // Item has both a link and nested items
          // Create a submenu with the main link as the first item, followed by nested items
          const combinedItems = [
            { text: link.textContent.trim(), link: link.href },
            ...nestedItems,
          ];
          items.push({ text: link.textContent.trim(), submenu: combinedItems });
        } else if (text && nestedItems.length > 0) {
          // Text-only header with submenu
          items.push({ text, submenu: nestedItems });
        }
      } else if (link) {
        items.push({ text: link.textContent.trim(), link: link.href });
      }
    });

    return items;
  }

  // Build main menu items from nav content
  const mainMenuItems = [];

  // === PRODUCTS SECTION ===
  // Products has detailed content in h3 sections
  const productsItems = [];

  // Safety & Security Ecosystem submenu (from Technologies and Use cases h3 sections)
  const techSection = findH3Section('Technologies');
  const useCasesSection = findH3Section('Use cases');
  if (techSection || useCasesSection) {
    const ecosystemItems = [];
    if (techSection) {
      const techUl = techSection.querySelector('ul');
      ecosystemItems.push({ text: 'Technologies', submenu: parseListToMenuItems(techUl) });
    }
    if (useCasesSection) {
      const useCasesUl = useCasesSection.querySelector('ul');
      ecosystemItems.push({ text: 'Use cases', submenu: parseListToMenuItems(useCasesUl) });
    }
    if (ecosystemItems.length > 0) {
      productsItems.push({ text: 'Safety & Security Ecosystem', submenu: ecosystemItems });
    }
  }

  // Radio submenu (from Radio h3 section)
  const radioSection = findH3Section('Radio');
  if (radioSection) {
    const radioUl = radioSection.querySelector('ul');
    productsItems.push({ text: 'Radio', submenu: parseListToMenuItems(radioUl) });
  }

  // Software submenu (from Software h3 section)
  const softwareSection = findH3Section('Software');
  if (softwareSection) {
    const softwareUl = softwareSection.querySelector('ul');
    productsItems.push({ text: 'Software', submenu: parseListToMenuItems(softwareUl) });
  }

  // Video security submenu (from Video security h3 section)
  const videoSection = findH3Section('Video security');
  if (videoSection) {
    const videoUl = videoSection.querySelector('ul');
    productsItems.push({ text: 'Video security', submenu: parseListToMenuItems(videoUl) });
  }

  // Services submenu (from Services h3 section)
  const servicesSection = findH3Section('Services');
  if (servicesSection) {
    const servicesUl = servicesSection.querySelector('ul');
    productsItems.push({ text: 'Services', submenu: parseListToMenuItems(servicesUl) });
  }

  if (productsItems.length > 0) {
    mainMenuItems.push({ text: 'Products', submenu: productsItems });
  }

  // === INDUSTRIES SECTION ===
  const industriesDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'Industries');
  if (industriesDiv) {
    const industriesUl = industriesDiv.querySelector('ul');
    const industriesItems = parseListToMenuItems(industriesUl);
    if (industriesItems.length > 0) {
      mainMenuItems.push({ text: 'Industries', submenu: industriesItems });
    }
  }

  // === ABOUT US SECTION ===
  const aboutDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'About us');
  if (aboutDiv) {
    const aboutUl = aboutDiv.querySelector('ul');
    const aboutItems = parseListToMenuItems(aboutUl);
    if (aboutItems.length > 0) {
      mainMenuItems.push({ text: 'About us', submenu: aboutItems });
    }
  }

  // Also add Support link from Tools section
  const toolsDiv = Array.from(nav.querySelectorAll(':scope > div'))
    .find((div) => div.querySelector('h2')?.textContent.trim() === 'Tools');
  if (toolsDiv) {
    const toolsList = toolsDiv.querySelector('ul');
    if (toolsList) {
      toolsList.querySelectorAll(':scope > li').forEach((li) => {
        const link = li.querySelector('a');
        if (link && link.textContent.trim() === 'Support') {
          mainMenuItems.push({ text: 'Support', link: link.href });
        }
      });
    }
  }

  // Create main panel
  const mainPanel = createPanel('main', mainMenuItems);
  mainPanel.classList.add('active');
  panelsContainer.appendChild(mainPanel);

  overlay.appendChild(panelsContainer);

  // Back button handler
  backBtn.addEventListener('click', () => {
    if (panelStack.length === 0) return;

    const prev = panelStack.pop();
    title.textContent = prev.title;

    if (panelStack.length === 0) {
      backBtn.classList.remove('visible');
    }

    const currentPanel = panelsContainer.querySelector('.mobile-menu-panel.active');
    const prevPanel = panelsContainer.querySelector(`[data-panel-id="${prev.id}"]`);

    if (currentPanel) {
      currentPanel.classList.remove('active');
    }

    if (prevPanel) {
      prevPanel.classList.remove('exiting');
      prevPanel.classList.add('active');
    }
  });

  // Close button handler - will be wired up in decorate
  overlay.closeMenu = () => {
    overlay.classList.remove('open');
    document.body.style.overflowY = '';

    // Reset to main panel after transition
    setTimeout(() => {
      panelsContainer.querySelectorAll('.mobile-menu-panel').forEach((p) => {
        p.classList.remove('active', 'exiting');
      });
      mainPanel.classList.add('active');
      panelStack.length = 0;
      title.textContent = 'Menu';
      backBtn.classList.remove('visible');
    }, 300);
  };

  closeBtn.addEventListener('click', overlay.closeMenu);

  return overlay;
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Identify the brand div (first div with text link)
  const brandDiv = nav.querySelector(':scope > div');
  if (brandDiv) {
    brandDiv.classList.add('nav-brand');
    // Replace text link with logo image
    buildBrandLogo(brandDiv);
    // Remove button classes from brand link (AEM decoration adds these to links in paragraphs)
    brandDiv.querySelectorAll('.button').forEach((button) => {
      button.className = '';
      const buttonContainer = button.closest('.button-container');
      if (buttonContainer) {
        buttonContainer.className = '';
      }
    });
  }

  // Build mobile Contact Sales button (before removing Sections div)
  const contactMobile = buildMobileContactButton(nav);

  // Build mobile menu (before removing menu divs)
  const mobileMenu = buildMobileMenu(nav);

  // Build primary tools (Search, Support, Cart, Sign In)
  const primaryTools = buildPrimaryTools(nav);

  // Build search modal and wire up trigger
  const searchModal = buildSearchModal();
  if (primaryTools) {
    const searchTrigger = primaryTools.querySelector('.search-trigger');
    if (searchTrigger) {
      searchTrigger.addEventListener('click', () => {
        searchModal.classList.add('open');
        // Focus the input after modal opens
        setTimeout(() => {
          const input = searchModal.querySelector('input[type="search"]');
          if (input) input.focus();
        }, 200);
      });
    }
  }

  // Build nav sections and tools
  const { navSections, navTools } = buildNavSectionsAndTools(nav);

  // Insert the built elements into nav in correct order
  if (contactMobile) {
    nav.insertBefore(contactMobile, brandDiv.nextSibling);
  }
  if (primaryTools) {
    const insertAfter = contactMobile ? contactMobile.nextSibling : brandDiv.nextSibling;
    nav.insertBefore(primaryTools, insertAfter);
  }
  if (navSections) {
    nav.appendChild(navSections);
  }
  if (navTools) {
    nav.appendChild(navTools);
  }

  // Build mega menu container
  const megaMenu = document.createElement('div');
  megaMenu.className = 'mega-menu';

  buildProductsMegaMenu(nav, megaMenu);
  buildIndustriesMegaMenu(nav, megaMenu);
  buildAboutMegaMenu(nav, megaMenu);

  // Wire up nav section clicks to mega menu
  if (navSections) {
    const menuMap = {
      Products: 'products',
      Industries: 'industries',
      'About us': 'about-us',
    };

    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      const menuName = navSection.textContent.trim();
      const menuKey = menuMap[menuName];

      navSection.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isDesktop.matches) return;

        const isExpanded = navSection.getAttribute('aria-expanded') === 'true';

        // Close all sections first
        navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((li) => {
          li.setAttribute('aria-expanded', 'false');
        });

        if (isExpanded) {
          // Close the mega menu
          closeMegaMenu();
        } else {
          // Open the appropriate mega menu
          navSection.setAttribute('aria-expanded', 'true');

          megaMenu.querySelectorAll('.mega-menu-content').forEach((content) => {
            content.classList.remove('active');
          });

          const targetContent = megaMenu.querySelector(`[data-menu="${menuKey}"]`);
          if (targetContent) {
            targetContent.classList.add('active');
            megaMenu.classList.add('open');
          }
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    if (!isDesktop.matches) {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.closeMenu();
        nav.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.add('open');
        document.body.style.overflowY = 'hidden';
        nav.setAttribute('aria-expanded', 'true');
      }
    }
  };

  hamburger.addEventListener('click', toggleMobileMenu);
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // Close mobile menu on desktop resize
  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches && mobileMenu.classList.contains('open')) {
      mobileMenu.closeMenu();
      nav.setAttribute('aria-expanded', 'false');
    }
    closeMegaMenu();
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  navWrapper.append(megaMenu);
  navWrapper.append(mobileMenu);
  navWrapper.append(searchModal);
  block.append(navWrapper);
}
