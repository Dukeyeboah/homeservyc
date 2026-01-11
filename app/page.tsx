'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { ServiceGrid } from '@/components/service-grid';
import { Footer } from '@/components/footer';
import { ServiceModal } from '@/components/service-modal';
import { AddRecommendationModal } from '@/components/add-recommendation-modal';
import { services, type Service } from '@/lib/services';

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    category: null as string | null,
    search: '',
  });

  useEffect(() => {
    const handleFilterChange = (e: CustomEvent) => {
      setFilters((prev) => ({ ...prev, ...e.detail }));
    };

    window.addEventListener(
      'filterChanged',
      handleFilterChange as EventListener
    );
    return () =>
      window.removeEventListener(
        'filterChanged',
        handleFilterChange as EventListener
      );
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      <Navigation onAddClick={() => setShowAddModal(true)} />
      <Hero />
      <ServiceGrid onServiceClick={setSelectedService} filters={filters} />
      <Footer />

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      {showAddModal && (
        <AddRecommendationModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

// Export services for use in other components
export { services as mockServices };
