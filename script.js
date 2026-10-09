const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');
const closeMenu = () => {
  if (!menuButton || !mobileNav) return;
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
};
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
    document.querySelectorAll('.nav-services[open]').forEach(item => {
      item.open = false;
      item.querySelector('summary').focus();
    });
  }
});
window.matchMedia('(min-width: 861px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
document.addEventListener('click', event => {
  document.querySelectorAll('.nav-services[open]').forEach(item => {
    if (!item.contains(event.target)) item.open = false;
  });
  if (!mobileNav?.hidden && !event.target.closest('.site-header')) closeMenu();
});
const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.service-grid [data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  const status = document.querySelector('#filter-status');
  if (status) status.textContent = `Showing ${count} ${count === 1 ? 'service' : 'services'}`;
}));
document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());
