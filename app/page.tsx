"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ServiceGrid } from "@/components/service-grid"
import { Footer } from "@/components/footer"
import { ServiceModal } from "@/components/service-modal"
import { AddRecommendationModal } from "@/components/add-recommendation-modal"

export default function Home() {
  const [selectedService, setSelectedService] = useState<(typeof mockServices)[0] | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filters, setFilters] = useState({ category: null as string | null, search: "" })

  useEffect(() => {
    const handleFilterChange = (e: CustomEvent) => {
      setFilters((prev) => ({ ...prev, ...e.detail }))
    }

    window.addEventListener("filterChanged", handleFilterChange as EventListener)
    return () => window.removeEventListener("filterChanged", handleFilterChange as EventListener)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation onAddClick={() => setShowAddModal(true)} />
      <Hero />
      <ServiceGrid onServiceClick={setSelectedService} filters={filters} />
      <Footer />

      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}

      {showAddModal && <AddRecommendationModal onClose={() => setShowAddModal(false)} />}
    </div>
  )
}

// Mock service data
export const mockServices = [
  {
    id: 1,
    name: "Kwesi Ampah",
    profileImage: "/placeholder.svg?key=jel0c",
    categories: ["Housekeeper / House Help", "Cleaner"],
    workType: "Full-time",
    description:
      "15 years of experience in household management. Reliable, trustworthy, excellent attention to detail.",
    location: "Accra, Osu",
  },
  {
    id: 2,
    name: "Ama Osei",
    profileImage: "/placeholder.svg?key=dhzkz",
    categories: ["Nanny", "Caretaker / Nanny"],
    workType: "Full-time",
    description: "Certified childcare professional. Patient, loving, and experienced with ages 0-12.",
    location: "Accra, East Legon",
  },
  {
    id: 3,
    name: "John Mensah",
    profileImage: "/placeholder.svg?key=msutg",
    categories: ["Watchman / Night Guard / Security"],
    workType: "Full-time",
    description: "Professional security expert. Night shifts available. Vetted and trusted by multiple households.",
    location: "Accra, Cantonments",
  },
  {
    id: 4,
    name: "Abena Boateng",
    profileImage: "/placeholder.svg?key=hymfl",
    categories: ["Cook / Chef"],
    workType: "Part-time",
    description: "Expert Ghanaian cuisine and continental meals. Menu planning and catering available.",
    location: "Accra, Dzorwulu",
  },
  {
    id: 5,
    name: "Emmanuel Tetteh",
    profileImage: "/placeholder.svg?key=dsqjv",
    categories: ["Gardener", "Cleaner"],
    workType: "Part-time",
    description: "Landscape maintenance and garden design. Keeps your outdoor spaces pristine.",
    location: "Accra, Legon",
  },
  {
    id: 6,
    name: "Sophia Nyarko",
    profileImage: "/placeholder.svg?key=xfhgr",
    categories: ["Washing Lady"],
    workType: "Part-time",
    description: "Professional laundry services. Delicate fabric care specialist. Fast turnaround.",
    location: "Accra, Adenta",
  },
  {
    id: 7,
    name: "Peter Asante",
    profileImage: "/placeholder.svg?key=1gpib",
    categories: ["Driver"],
    workType: "Full-time",
    description: "15+ years driving experience. Reliable, professional, excellent safety record.",
    location: "Accra, Airport Area",
  },
  {
    id: 8,
    name: "Keziah Owusu",
    profileImage: "/placeholder.svg?key=n3z8f",
    categories: ["Pet Care"],
    workType: "Part-time",
    description: "Dog walking, pet sitting, and grooming. Pet lovers welcome. Insured and bonded.",
    location: "Accra, Labone",
  },
  {
    id: 9,
    name: "Grace Amoako",
    profileImage: "/placeholder.svg?key=cp3hi",
    categories: ["Piano Teacher"],
    workType: "Part-time",
    description: "Certified music instructor. Teaches beginner to intermediate piano. Flexible scheduling.",
    location: "Accra, Ridge",
  },
]
