// Mobile nav toggle with animated icon and touch scroll management
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuIconOpen = document.getElementById('menuIconOpen');
  const menuIconClose = document.getElementById('menuIconClose');

  if (menuBtn && mobileNav) {
    const toggleMenu = (shouldOpen) => {
      const isOpen = typeof shouldOpen === 'boolean' ? shouldOpen : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.style.display = isOpen ? 'none' : 'block';
        menuIconClose.style.display = isOpen ? 'block' : 'none';
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', () => toggleMenu());

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close on resize to desktop view
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && mobileNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // Interactive category filter for services
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.svc-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      serviceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          // Trigger a micro fade-in
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Reveal on scroll
  (function(){
    const els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){
      els.forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en => {
        if(en.isIntersecting){
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },{threshold:0.08});
    els.forEach(e => io.observe(e));
  })();

// =========================================================
// UMES shared enhancements
// =========================================================

document.querySelectorAll('a[href^="services/"]').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mobileNav');
    if (nav && nav.classList.contains('open')) nav.classList.remove('open');
  });
});

document.querySelectorAll('.nav-item-has-dropdown').forEach(item => {
  const trigger = item.querySelector('.nav-dropdown-trigger');
  if (!trigger) return;
  item.addEventListener('mouseenter', () => trigger.setAttribute('aria-expanded', 'true'));
  item.addEventListener('mouseleave', () => trigger.setAttribute('aria-expanded', 'false'));
  trigger.addEventListener('focus', () => trigger.setAttribute('aria-expanded', 'true'));
});

document.querySelectorAll('a[href="#top"], a.brand').forEach(link => {
  link.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
});

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Keep page and section indicators in sync in both header menus.
(function () {
  const links = [...document.querySelectorAll('.primary-nav a, #mobileNav a, .nav-actions a')];
  const normalizePath = path => path.replace(/\/index\.html$/, '/');
  const currentPath = normalizePath(window.location.pathname);
  const destinations = links.map(link => ({
    link,
    url: new URL(link.getAttribute('href'), window.location.href)
  }));
  const isCurrentPath = url => url.origin === window.location.origin &&
    normalizePath(url.pathname) === currentPath;
  const pageLinks = new Set(destinations
    .filter(({ url }) => isCurrentPath(url) && !url.hash)
    .map(({ link }) => link));

  // The Services parent stays active while viewing any of its detail pages.
  document.querySelectorAll('.nav-item-has-dropdown').forEach(item => {
    if ([...item.querySelectorAll('.dropdown-item')].some(link => pageLinks.has(link))) {
      const trigger = item.querySelector('.nav-dropdown-trigger');
      if (trigger) pageLinks.add(trigger);
    }
  });

  const sectionLinks = destinations.filter(({ url }) => isCurrentPath(url) && url.hash);
  const sections = [...new Set(sectionLinks
    .map(({ url }) => document.getElementById(decodeURIComponent(url.hash.slice(1))))
    .filter(Boolean))];

  function updateNavigation() {
    // Opening the drawer shifts the content; retain the section it opened from.
    if (mobileNav && mobileNav.classList.contains('open')) return;
    // Mark the section just below the sticky header row.
    const headerRow = document.querySelector('header .inner');
    const marker = (headerRow ? headerRow.getBoundingClientRect().bottom : 0) + 24;
    const activeSection = sections.find(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= marker && bounds.bottom > marker;
    });

    destinations.forEach(({ link, url }) => {
      let current = pageLinks.has(link) ? 'page' : null;
      if (activeSection && isCurrentPath(url) && url.hash === '#' + activeSection.id) {
        current = 'location';
      }
      if (link.getAttribute('aria-current') !== current) {
        if (current) link.setAttribute('aria-current', current);
        else link.removeAttribute('aria-current');
      }
    });
  }

  let scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      updateNavigation();
    });
  }

  updateNavigation();
  if (!sections.length) return;
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  if (mobileNav) {
    mobileNav.addEventListener('transitionend', event => {
      if (event.target === mobileNav && event.propertyName === 'max-height') scheduleUpdate();
    });
  }
})();

