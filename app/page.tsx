'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { Footer } from '@/components/footer';
import { AddRecommendationModal } from '@/components/add-recommendation-modal';
export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  return <div className="min-h-screen bg-background">
    <Navigation onAddClick={() => setShowAddModal(true)}/>
    <main><Hero/>
      <section id="how-it-works" className="welcome-how max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-20 scroll-mt-24">
        <p className="text-xs font-semibold uppercase tracking-[.14em]">A little guidance. A lot less guesswork.</p>
        <h2 className="mt-3 max-w-xl">Home help starts here.</h2>
        <p className="mt-4 max-w-2xl text-base">From a cleaner for your space to a cook for busy weeks or care for your family, find people recommended by the community.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <article className="welcome-step"><img className="welcome-icon" src="/design/icons/find-your-fit.svg" alt="" aria-hidden="true"/><h3>Find your fit</h3><p>Explore by service, search your area, and choose the work arrangement that suits your home.</p></article>
          <article className="welcome-step"><img className="welcome-icon" src="/design/icons/get-to-know.svg" alt="" aria-hidden="true"/><h3>Get to know them</h3><p>Read community recommendations. Log in to save profiles you want to come back to.</p></article>
          <article className="welcome-step"><img className="welcome-icon" src="/design/icons/make-connection.svg" alt="" aria-hidden="true"/><h3>Make the connection</h3><p>Private introductions are coming soon. You’ll need an account, and each provider’s agreement, before connecting.</p></article>
        </div>
        <div className="welcome-cta flex flex-col sm:flex-row gap-5 sm:items-center justify-between mt-8"><p className="text-sm max-w-xl">Know someone great? Share a recommendation. Profiles, qualifications and availability still need to be checked before hiring.</p><Link href="/directory" className="hero-cta !mt-0 self-start shrink-0">Let’s get started <ArrowUpRight size={18}/></Link></div>
      </section>
    </main><Footer/>
    {showAddModal && <AddRecommendationModal onClose={() => setShowAddModal(false)}/>}
  </div>;
}
