"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  "Caretaker / Nanny",
  "Housekeeper / House Help",
  "Watchman / Night Guard / Security",
  "Cook / Chef",
  "Gardener",
  "Driver",
  "Cleaner",
  "Washing Lady",
  "Pet Care",
  "Piano Teacher",
]

export function Navigation({ onAddClick }: { onAddClick: () => void }) {
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-medium tracking-tight">HomeServyc</span>
          </Link>

          {/* Right side: Categories, Search, Add button */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors"
              >
                Categories
                <ChevronDown size={16} className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>

              {categoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-md py-2 z-10">
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setCategoryOpen(false)
                      window.dispatchEvent(new CustomEvent("filterChanged", { detail: { category: null } }))
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    All Services
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat)
                        setCategoryOpen(false)
                        window.dispatchEvent(new CustomEvent("filterChanged", { detail: { category: cat } }))
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                        selectedCategory === cat ? "bg-muted font-medium" : ""
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-2 bg-secondary text-foreground placeholder-muted-foreground rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
              onChange={(e) =>
                window.dispatchEvent(new CustomEvent("filterChanged", { detail: { search: e.target.value } }))
              }
            />

            {/* Add Recommendation Button */}
            <Button
              onClick={onAddClick}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-all hover:shadow-lg"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button onClick={onAddClick} className="md:hidden flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Plus size={18} />
          </Button>
        </div>
      </div>
    </nav>
  )
}
