import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-icon-card-image';
      else div.className = 'cards-icon-card-body';
    });

    // Wrap entire card content with link if one exists
    const link = li.querySelector('.cards-icon-card-body a');
    if (link) {
      const wrapper = document.createElement('a');
      wrapper.href = link.href;
      wrapper.className = 'cards-icon-card-link';
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
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
