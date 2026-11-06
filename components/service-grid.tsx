'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import { ServiceCard } from '@/components/service-card';
import { services, type Service } from '@/lib/services';
import { filterServices } from '@/lib/service-search';

interface ServiceGridProps {
  onServiceClick: (service: Service) => void;
  filters: { category: string | null; search: string };
}

export function ServiceGrid({ onServiceClick, filters }: ServiceGridProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [workType, setWorkType] = useState<string | null>(null);
  const [sort, setSort] = useState<'directory' | 'name'>('directory');
  const filteredServices = useMemo(() => filterServices(services, { ...filters, workType, sort }), [filters, workType, sort]);
  const update = (detail: Partial<ServiceGridProps['filters']>) => window.dispatchEvent(new CustomEvent('filterChanged', { detail }));
  const reset = () => { update({ category: null, search: '' }); setWorkType(null); setSort('directory'); };
  const control = 'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  return (
    <section id="services" className="scroll-mt-24 px-4 pt-5 pb-12 md:pt-6 md:pb-16">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-[minmax(0,1fr)_auto] gap-3 mb-5 items-end mx-auto w-full ${filtersOpen ? 'lg:max-w-5xl lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]' : 'max-w-2xl'}`}>
          <div className="relative min-w-0"><Search aria-hidden="true" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"/><input aria-label="Search by role, location or name" type="search" value={filters.search} onChange={(e) => update({ search: e.target.value })} placeholder="Search for a role, location or name…" className={`${control} min-w-0 pl-11`} /></div>
          <button type="button" aria-label="Toggle filters" aria-expanded={filtersOpen} aria-controls="directory-filters" onClick={() => setFiltersOpen(!filtersOpen)} className={`lg:order-4 relative rounded-xl border p-3 focus-visible:outline-2 focus-visible:outline-primary ${filtersOpen ? 'border-primary bg-secondary' : 'border-border bg-card'}`}>
            <span className="flex items-center gap-2"><SlidersHorizontal size={20} aria-hidden="true"/><span className="hidden sm:inline text-sm">Filters</span></span>
            {(workType || sort !== 'directory') && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" aria-label="Filters applied" />}
          </button>
          <div id="directory-filters" className={`${filtersOpen ? 'grid lg:contents' : 'hidden'} grid-cols-2 gap-3 col-span-2`}>
            <label className="min-w-0 text-xs space-y-2"><span>Work arrangement</span><select value={workType ?? ''} onChange={(e) => setWorkType(e.target.value || null)} className={`${control} min-w-0 px-2 sm:px-4`}><option value="">Any arrangement</option><option>Full-time</option><option>Part-time</option></select></label>
            <label className="min-w-0 text-xs space-y-2"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${control} min-w-0 px-2 sm:px-4`}><option value="directory">Directory order</option><option value="name">Name: A–Z</option></select></label>
          </div>
        </div>
        <h1 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">MEET YOUR NEXT HELPING HAND</h1>
        <div className="flex justify-between gap-4 mb-8 text-sm text-muted-foreground">
          <p role="status" aria-live="polite" className="text-xs italic">{filteredServices.length} {filteredServices.length === 1 ? 'profile' : 'profiles'} · Not ranked by quality</p>
          <button onClick={reset} className="underline underline-offset-4 text-foreground">Reset filters</button>
        </div>
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => <ServiceCard key={service.id} {...service} service={service} onClick={() => onServiceClick(service)} />)}
          </div>
        ) : (
          <div className="text-center border border-dashed border-border rounded-2xl py-16 px-5">
            <h3 className="text-lg font-medium">No matches just yet.</h3>
            <p className="text-muted-foreground mt-2 mb-5">Try another role or area, or clear your filters to browse everyone.</p>
            <button onClick={reset} className="rounded-full bg-primary text-primary-foreground px-5 py-3">Clear all filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
