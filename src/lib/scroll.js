import Lenis from 'lenis';

let lenis = null;
let rafId = null;

export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    duration: 1.15,
    lerp: 0.095,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  const loop = (time) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
  return lenis;
}

export function destroySmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  lenis?.destroy();
  lenis = null;
}

/** Scroll to a selector or element, works with or without Lenis. */
export function scrollToTarget(target, { offset = 0, immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: immediate ? 0 : 1.25 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) lenis.scrollTo(0, { duration: immediate ? 0 : 1.2 });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

/** Freeze the page behind a preloader or an open overlay. */
export function setScrollLock(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
  document.body.style.overflow = locked ? 'hidden' : '';
}
