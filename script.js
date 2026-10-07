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

