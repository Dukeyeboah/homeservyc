'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** One-shot reveals; content stays readable with JS off or reduced motion on. */
export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-enter');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    const scan = () => document.querySelectorAll('.hero-panel, .welcome-step, .welcome-how h2, .welcome-cta, .category-section, .provider-card, main > section').forEach(element => {
      if (seen.has(element)) return;
      seen.add(element);
      observer.observe(element);
    });
    scan();
    const changes = new MutationObserver(scan);
    changes.observe(document.body, { childList: true, subtree: true });
    const stop = () => { observer.disconnect(); changes.disconnect(); };
    preference.addEventListener('change', stop);
    return () => { stop(); preference.removeEventListener('change', stop); };
  }, [pathname]);
  return null;
}
