/* ─── CURSOR ─────────────────────── */
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, [data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ─── PAGE TRANSITION ────────────── */
const veil = document.querySelector('.page-veil');

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    veil.style.transition = 'transform .42s cubic-bezier(.77,0,.18,1)';
    veil.style.transformOrigin = 'bottom';
    veil.style.transform = 'scaleY(1)';
    setTimeout(() => { window.location.href = href; }, 420);
  });
});

window.addEventListener('load', () => {
  veil.style.transformOrigin = 'top';
  veil.style.transition = 'transform .5s cubic-bezier(.77,0,.18,1)';
  veil.style.transform = 'scaleY(0)';
});

/* ─── ACTIVE NAV ─────────────────── */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ─── ACCORDION ──────────────────── */
window.toggleAccordion = function(header) {
  const item = header.closest('.acc-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.acc-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
};

/* ─── HORIZONTAL DRAG SCROLL ─────── */
const dragEls = document.querySelectorAll('[data-drag-scroll]');
dragEls.forEach(el => {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
  el.addEventListener('mouseleave', () => isDown = false);
  el.addEventListener('mouseup', () => isDown = false);
  el.addEventListener('mousemove', e => {
    if (!isDown) return; e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.4;
  });
  el.addEventListener('wheel', e => { e.preventDefault(); el.scrollLeft += e.deltaY; }, { passive: false });
});
/* ─── WELCOME MODAL (LocalStorage — 1 fois par session) ─── */
(function initModal() {
  const modal = document.getElementById('welcomeModal');
  if (!modal) return;

  const SEEN_KEY = 'huong_brand_modal_seen';

  // N'afficher qu'une seule fois par session de navigation
  if (sessionStorage.getItem(SEEN_KEY)) {
    modal.style.display = 'none';
    return;
  }

  // Bloquer le scroll pendant que le modal est ouvert
  document.body.style.overflow = 'hidden';

  // Fermer en cliquant sur l'overlay (hors de la box)
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  // Fermer avec Échap
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
})();

window.closeModal = function() {
  const modal = document.getElementById('welcomeModal');
  if (!modal) return;
  modal.style.transition = 'opacity .35s ease';
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    sessionStorage.setItem('huong_brand_modal_seen', '1');
  }, 340);
};