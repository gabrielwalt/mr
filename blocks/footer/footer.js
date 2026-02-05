import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Social icon mapping - maps platform names to icon filenames
 */
const socialIconMap = {
  LinkedIn: 'social-linkedin.svg',
  Facebook: 'social-facebook.svg',
  X: 'social-x.svg',
  Instagram: 'social-instagram.svg',
  YouTube: 'social-youtube.svg',
};

/**
 * Builds the logo element for the footer
 * @returns {HTMLElement} The logo link element
 */
function buildLogo() {
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.setAttribute('aria-label', 'Motorola Solutions');

  const logoImg = document.createElement('img');
  logoImg.src = '/icons/logo-inverted.svg';
  logoImg.alt = 'Motorola Solutions';
  logoImg.loading = 'lazy';

  logoLink.appendChild(logoImg);
  return logoLink;
}

/**
 * Builds the social icons section from author content
 * The author provides "Follow us:" label + list of platform names with links
 * This function replaces text links with icon links
 * @param {HTMLElement} socialDiv The div containing "Follow us:" and social links
 */
function buildSocialIcons(socialDiv) {
  const ul = socialDiv.querySelector('ul');
  if (!ul) return;

  ul.querySelectorAll('li').forEach((li) => {
    const link = li.querySelector('a');
    if (!link) return;

    const platformName = link.textContent.trim();
    const iconFile = socialIconMap[platformName];

    if (iconFile) {
      // Replace text with icon
      const icon = document.createElement('img');
      icon.src = `/icons/${iconFile}`;
      icon.alt = platformName;

      // Clear link content and add icon
      link.textContent = '';
      link.appendChild(icon);
      link.setAttribute('aria-label', platformName);
    }
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer';
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Process the first section (logo + social)
  const firstSection = footer.querySelector(':scope > div:first-child');
  if (firstSection) {
    // Check if this section has "Follow us:" text (social section)
    // Note: Fragment loader may wrap content in .default-content-wrapper
    const followUsP = firstSection.querySelector('p');
    if (followUsP && followUsP.textContent.trim().toLowerCase().includes('follow us')) {
      // Create logo and insert it before the "Follow us:" paragraph
      const logoWrapper = document.createElement('p');
      logoWrapper.appendChild(buildLogo());

      // Insert before the paragraph's parent if it's in a wrapper, or the paragraph itself
      const insertTarget = followUsP.parentElement;
      if (insertTarget && insertTarget !== firstSection) {
        // Content is wrapped - insert logo before the wrapper content
        insertTarget.insertBefore(logoWrapper, followUsP);
      } else {
        // Direct child - insert before the paragraph
        firstSection.insertBefore(logoWrapper, followUsP);
      }

      // Build social icons from the list
      buildSocialIcons(firstSection);
    }
  }

  // Remove button classes from all links in footer
  footer.querySelectorAll('.button').forEach((button) => {
    button.className = '';
    const buttonContainer = button.closest('.button-container');
    if (buttonContainer) {
      buttonContainer.className = '';
    }
  });

  block.append(footer);
}
