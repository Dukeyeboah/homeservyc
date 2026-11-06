'use client';

import { useMemo, useState } from 'react';
import { ServiceCard } from '@/components/service-card';
import { services, type Service } from '@/lib/services';
import { filterServices } from '@/lib/service-search';

interface ServiceGridProps {
  onServiceClick: (service: Service) => void;
  filters: { category: string | null; search: string };
}

export function ServiceGrid({ onServiceClick, filters }: ServiceGridProps) {
  const [workType, setWorkType] = useState<string | null>(null);
  const [sort, setSort] = useState<'directory' | 'name'>('directory');
  const filteredServices = useMemo(() => filterServices(services, { ...filters, workType, sort }), [filters, workType, sort]);
  const update = (detail: Partial<ServiceGridProps['filters']>) => window.dispatchEvent(new CustomEvent('filterChanged', { detail }));
  const reset = () => { update({ category: null, search: '' }); setWorkType(null); setSort('directory'); };
  const control = 'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  return (
    <section id="services" className="scroll-mt-24 px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">MEET YOUR NEXT HELPING HAND</p>
          <h2 className="text-3xl font-medium tracking-tight">Good people. Everyday help.</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">Browse existing recommendations. Profiles and availability have not been independently checked.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-4 mb-5">
          <label className="text-sm space-y-2"><span>Search</span><input type="search" value={filters.search} onChange={(e) => update({ search: e.target.value })} placeholder="Role, location or name" className={control} /></label>
          <label className="text-sm space-y-2"><span>Work arrangement</span><select value={workType ?? ''} onChange={(e) => setWorkType(e.target.value || null)} className={control}><option value="">Any arrangement</option><option>Full-time</option><option>Part-time</option></select></label>
          <label className="text-sm space-y-2"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={control}><option value="directory">Directory order</option><option value="name">Name: A–Z</option></select></label>
        </div>
        <div className="flex justify-between gap-4 mb-8 text-sm text-muted-foreground">
          <p role="status" aria-live="polite">{filteredServices.length} {filteredServices.length === 1 ? 'profile' : 'profiles'} · Not ranked by quality</p>
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
