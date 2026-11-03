// Movimento discreto e nativo: IntersectionObserver para revelações e rAF para parallax leve.
// Tudo é desativado quando o usuário prefere movimento reduzido.

export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveal(root: ParentNode = document) {
  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in), .lines:not(.is-in)'));
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

export function initParallax() {
  if (prefersReducedMotion()) return () => {};
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!els.length) return () => {};
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const strength = Number(el.dataset.parallax) || 0.06;
      const offset = (r.top + r.height / 2 - vh / 2) * -strength;
      el.style.setProperty('--py', `${offset.toFixed(1)}px`);
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
