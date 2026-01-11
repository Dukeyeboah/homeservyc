"use client"

import { useMemo, useState } from "react"
import { ServiceCard } from "@/components/service-card"
import { services } from "@/lib/services"
import type { Service } from "@/lib/services"

interface ServiceGridProps {
  onServiceClick: (service: Service) => void
  filters: { category: string | null; search: string }
}

export function ServiceGrid({ onServiceClick, filters }: ServiceGridProps) {
  const [workTypeFilter, setWorkTypeFilter] = useState<string | null>(null)

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category filter
      if (filters.category && !service.categories.includes(filters.category)) {
        return false
      }

      // Work type filter
      if (workTypeFilter && service.workType !== workTypeFilter) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesName = service.name.toLowerCase().includes(searchLower)
        const matchesDescription = service.description.toLowerCase().includes(searchLower)
        if (!matchesName && !matchesDescription) {
          return false
        }
      }

      return true
    })
  }, [filters, workTypeFilter])

  return (
    <section className="w-full bg-background px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setWorkTypeFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              workTypeFilter === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {["Full-time", "Part-time"].map((type) => (
            <button
              key={type}
              onClick={() => setWorkTypeFilter(workTypeFilter === type ? null : type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                workTypeFilter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-sm">
            Showing <span className="font-medium text-foreground">{filteredServices.length}</span> service
            {filteredServices.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Service Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} onClick={() => onServiceClick(service)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No services found matching your criteria.</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
