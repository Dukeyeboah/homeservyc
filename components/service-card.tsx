"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface ServiceCardProps {
  id: number
  name: string
  profileImage: string
  categories: string[]
  workType: "Full-time" | "Part-time"
  description: string
  location: string
  onClick: () => void
}

export function ServiceCard({
  name,
  profileImage,
  categories,
  workType,
  description,
  location,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Profile Section */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-muted">
          <Image src={profileImage || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{location}</p>
        </div>
      </div>

      {/* Categories Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <span key={cat} className="inline-block px-3 py-1 bg-muted text-foreground text-xs font-medium rounded-full">
            {cat}
          </span>
        ))}
      </div>

      {/* Work Type Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            workType === "Full-time" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
          }`}
        >
          {workType}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>

      {/* View Details Button */}
      <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
        View Details
        <ChevronRight size={16} />
      </div>
    </button>
  )
}
