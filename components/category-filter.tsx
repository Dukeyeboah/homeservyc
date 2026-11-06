'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllCategories } from '@/lib/services';
import { CategoryIcon } from './category-icon';
const priority = ['Cleaner', 'Nanny', 'Cook / Chef', 'Housekeeper', 'Driver', 'Gardener', 'Home Care'];
const categories = ['All services', ...priority, ...getAllCategories().filter(c => !priority.includes(c))];
export function CategoryFilter({ selected }: { selected: string | null }) {
  const strip = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => strip.current?.scrollBy({ left: direction * strip.current.clientWidth * .75, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  const choose = (category: string) => window.dispatchEvent(new CustomEvent('filterChanged', { detail: { category: category === 'All services' ? null : category } }));
  return <section aria-label="Browse by service" className="category-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center gap-4 mb-3"><span className="text-xs font-semibold uppercase tracking-[.14em] text-slate-500">What could you use a hand with?</span><div className="flex gap-2"><button type="button" aria-label="Previous categories" onClick={() => scroll(-1)} className="category-scroll-button"><ChevronLeft size={18}/></button><button type="button" aria-label="Next categories" onClick={() => scroll(1)} className="category-scroll-button"><ChevronRight size={18}/></button></div></div>
      <div ref={strip} id="category-choices" role="group" aria-label="Service categories" className="category-choices" onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const buttons = Array.from(e.currentTarget.querySelectorAll('button')); const index = buttons.indexOf(document.activeElement as HTMLButtonElement); buttons[Math.max(0, Math.min(buttons.length - 1, index + (e.key === 'ArrowRight' ? 1 : -1)))]?.focus(); } }}>
        {categories.map(category => <button key={category} type="button" aria-pressed={(selected ?? 'All services') === category} onClick={() => choose(category)} className="category-choice"><CategoryIcon category={category}/><span>{category}</span></button>)}
      </div>
      {selected && <div className="flex flex-wrap items-center gap-3 mt-3 text-sm"><span>Showing <strong>{selected}</strong></span><button className="underline underline-offset-4" onClick={() => choose('All services')}>Clear category</button></div>}
    </div>
  </section>;
}
