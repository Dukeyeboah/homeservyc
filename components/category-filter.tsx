'use client';
import { useEffect, useRef, useState } from 'react';
import { getAllCategories } from '@/lib/services';
import { CategoryIcon } from './category-icon';
const priority = ['Cleaner', 'Nanny', 'Cook / Chef', 'Housekeeper', 'Driver', 'Gardener', 'Home Care'];
const categories = ['All services', ...priority, ...getAllCategories().filter(c => !priority.includes(c))];
export function CategoryFilter({ selected }: { selected: string | null }) {
  const strip = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      const count = Math.max(1, Math.ceil(max / el.clientWidth) + 1);
      setPages(count);
      setPage(max > 0 ? Math.round(el.scrollLeft / max * (count - 1)) : 0);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener('scroll', measure, { passive: true });
    measure();
    return () => { observer.disconnect(); el.removeEventListener('scroll', measure); };
  }, []);
  const goToPage = (index: number) => {
    const el = strip.current;
    if (el) el.scrollTo({ left: index / Math.max(1, pages - 1) * (el.scrollWidth - el.clientWidth), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const choose = (category: string) => window.dispatchEvent(new CustomEvent('filterChanged', { detail: { category: category === 'All services' ? null : category } }));
  return <section aria-label="Browse by service" className="category-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center gap-4 mb-3"><span className="whitespace-nowrap text-[10px] min-[375px]:text-xs font-semibold uppercase tracking-[.08em] sm:tracking-[.14em] text-slate-500">What could you use a hand with?</span></div>
      <div ref={strip} id="category-choices" role="group" aria-label="Service categories" className="category-choices" onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const buttons = Array.from(e.currentTarget.querySelectorAll('button')); const index = buttons.indexOf(document.activeElement as HTMLButtonElement); buttons[Math.max(0, Math.min(buttons.length - 1, index + (e.key === 'ArrowRight' ? 1 : -1)))]?.focus(); } }}>
        {categories.map(category => <button key={category} type="button" aria-pressed={(selected ?? 'All services') === category} onClick={() => choose(category)} className="category-choice"><CategoryIcon category={category}/><span>{category}</span></button>)}
      </div>
      {pages > 1 && <div className="flex justify-center gap-1" role="group" aria-label="Category pages">
        {Array.from({ length: pages }, (_, index) => <button key={index} type="button" aria-label={`Show category page ${index + 1} of ${pages}`} aria-current={index === page ? 'true' : undefined} onClick={() => goToPage(index)} className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary"><span className={`h-1.5 rounded-full transition-all ${index === page ? 'w-4 bg-primary' : 'w-1.5 bg-slate-300'}`} /></button>)}
      </div>}
      {selected && <div className="flex flex-wrap items-center gap-3 mt-3 text-sm"><span>Showing <strong>{selected}</strong></span><button className="underline underline-offset-4" onClick={() => choose('All services')}>Clear category</button></div>}
    </div>
  </section>;
}
