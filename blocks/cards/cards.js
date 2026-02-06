export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);

  // Force images to load after DOM restructuring resets lazy loading observers
  ul.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.loading = 'eager';
  });

  // Show More for horizontal cards with more than 6 items
  if (block.classList.contains('horizontal')) {
    const items = ul.querySelectorAll('li');
    const limit = 6;
    if (items.length > limit) {
      items.forEach((item, i) => {
        if (i >= limit) item.classList.add('cards-hidden');
      });

      const showMore = document.createElement('button');
      showMore.className = 'cards-show-more';
      showMore.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg><span>Show More</span>';
      showMore.addEventListener('click', () => {
        const hidden = ul.querySelectorAll('.cards-hidden');
        if (hidden.length > 0) {
          hidden.forEach((item) => item.classList.remove('cards-hidden'));
          showMore.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg><span>Show Less</span>';
        } else {
          items.forEach((item, i) => {
            if (i >= limit) item.classList.add('cards-hidden');
          });
          showMore.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg><span>Show More</span>';
        }
      });
      block.append(showMore);
    }
  }
}
