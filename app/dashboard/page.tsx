'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getSavedServices, unsaveService, type SavedService } from '@/lib/firestore';
import { ServiceCard } from '@/components/service-card';
import { ServiceModal } from '@/components/service-modal';
import { AuthModal } from '@/components/auth-modal';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import type { Service } from '@/lib/services';
import { getAllCategories } from '@/lib/services';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [savedServices, setSavedServices] = useState<SavedService[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [loadingServices, setLoadingServices] = useState(true);

  const categories = getAllCategories();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadSavedServices();
    } else if (!loading) {
      setShowAuthModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, loading]);

  const loadSavedServices = async () => {
    if (!user) return;
    try {
      setLoadingServices(true);
      const services = await getSavedServices(user.uid);
      setSavedServices(services);
    } catch (error) {
      console.error('Error loading saved services:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  const handleUnsave = async (serviceId: number) => {
    if (!user) return;
    try {
      await unsaveService(user.uid, serviceId);
      setSavedServices((prev) =>
        prev.filter((s) => s.serviceId !== serviceId)
      );
    } catch (error) {
      console.error('Error unsaving service:', error);
    }
  };

  const filteredServices = categoryFilter
    ? savedServices.filter((s) => s.service.categories.includes(categoryFilter))
    : savedServices;

  if (loading || loadingServices) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Please sign in to view your dashboard
            </p>
          </div>
        </div>
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            initialMode="signin"
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onAddClick={() => {}} />
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Your saved service providers organized by category
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCategoryFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoryFilter === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-muted'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setCategoryFilter(categoryFilter === cat ? null : cat)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-sm">
            Showing{' '}
            <span className="font-medium text-foreground">
              {filteredServices.length}
            </span>{' '}
            saved service{filteredServices.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((savedService) => (
              <div key={savedService.id} className="relative">
                <ServiceCard
                  {...savedService.service}
                  service={savedService.service}
                  onClick={() => setSelectedService(savedService.service)}
                />
                <button
                  onClick={() => handleUnsave(savedService.serviceId)}
                  className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                  title="Remove from saved"
                >
                  <BookmarkCheck size={20} className="text-[#dc143c]" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              No saved services yet
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Start saving service providers to organize them here
            </p>
          </div>
        )}

        {/* Service Modal */}
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

