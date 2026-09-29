/* =========================================================
   Jaqueline Bastos Gomes — Nutricionista
   Interações: header ao rolar, menu mobile, animações reveal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Ano atual no rodapé ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header com fundo ao rolar ---- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Menu mobile ---- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  const closeMenu = () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao clicar fora do menu (mobile)
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  /* ---- Animações suaves ao rolar (reveal) ---- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // pequeno atraso escalonado para elementos irmãos
          const delay = entry.target.dataset.delay || (i * 80);
          setTimeout(() => entry.target.classList.add('visible'), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: mostra tudo
    revealEls.forEach(el => el.classList.add('visible'));
  }

});
