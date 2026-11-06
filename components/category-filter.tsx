'use client';
import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { getAllCategories } from '@/lib/services';
import { CategoryIcon } from './category-icon';
const priority = ['Cleaner', 'Nanny', 'Cook / Chef', 'Housekeeper', 'Driver', 'Gardener', 'Home Care'];
const categories = ['All services', ...priority, ...getAllCategories().filter(c => !priority.includes(c))];
export function CategoryFilter({ selected }: { selected: string | null }) {
  const [expanded, setExpanded] = useState(false);
  const allButton = useRef<HTMLButtonElement>(null);
  const visibleCategories = expanded ? categories : categories.filter((category, index) => index < 8 || category === selected);
  const choose = (category: string) => window.dispatchEvent(new CustomEvent('filterChanged', { detail: { category: category === 'All services' ? null : category } }));
  return <section aria-label="Browse by service" className="category-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center gap-4 mb-3"><span className="text-xs font-semibold uppercase tracking-[.14em] text-slate-500">What could you use a hand with?</span><button ref={allButton} onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="category-choices" className="text-xs font-semibold flex items-center gap-1 shrink-0">{expanded ? 'Show less' : 'All categories'}<ChevronDown size={14} className={expanded ? 'rotate-180' : ''}/></button></div>
      <div id="category-choices" role="group" aria-label="Service categories" className={expanded ? 'category-choices expanded' : 'category-choices'} onKeyDown={e => { if (e.key === 'Escape' && expanded) { setExpanded(false); allButton.current?.focus(); } }}>
        {visibleCategories.map(category => <button key={category} type="button" aria-pressed={(selected ?? 'All services') === category} onClick={() => choose(category)} className="category-choice"><CategoryIcon category={category}/><span>{category}</span></button>)}
      </div>
      {selected && <div className="flex flex-wrap items-center gap-3 mt-3 text-sm"><span>Showing <strong>{selected}</strong></span><button className="underline underline-offset-4" onClick={() => choose('All services')}>Clear category</button><a href="#services" className="ml-auto font-semibold text-teal-800">View results ↓</a></div>}
    </div>
  </section>;
}
