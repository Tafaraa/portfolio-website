// Eased scroll with a distance-scaled duration: long jumps glide instead of
// teleporting. Native smooth scrolling is UA-controlled and rushes long distances.
export const smoothScrollTo = (targetY: number) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;
  const duration = Math.min(1600, Math.max(650, Math.abs(distance) * 0.35));
  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  // Neutralise the global CSS scroll-behavior so per-frame jumps aren't re-smoothed
  html.style.scrollBehavior = 'auto';
  const start = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      html.style.scrollBehavior = prevBehavior;
    }
  };
  requestAnimationFrame(step);
};

// Click handler for in-page anchor links (#projects, #contact, ...). Falls back to
// default navigation when the target is not on the current page.
export const handleAnchorClick = (event: { preventDefault: () => void }, hash: string) => {
  const el = hash.startsWith('#') ? (document.querySelector(hash) as HTMLElement | null) : null;
  if (!el) return;
  event.preventDefault();
  smoothScrollTo(window.scrollY + el.getBoundingClientRect().top);
};
