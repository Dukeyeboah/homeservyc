import type { Service } from './services';

export interface ServiceFilters {
  category: string | null;
  search: string;
  workType?: string | null;
  sort?: 'directory' | 'name';
}

/** Directory order is not a quality score. No historical outcomes exist yet. */
export function filterServices(items: Service[], filters: ServiceFilters): Service[] {
  const terms = filters.search.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = items.filter((service) => {
    if (filters.category && !service.categories.includes(filters.category)) return false;
    if (filters.workType && service.workType !== filters.workType) return false;
    const text = [service.name, service.location, service.description, ...service.categories].join(' ').toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
  return filters.sort === 'name'
    ? matches.sort((a, b) => a.name.localeCompare(b.name) || a.id - b.id)
    : matches;
}
