"use client"

import Image from "next/image"
import { X } from "lucide-react"
import type { mockServices } from "@/app/page"

interface ServiceModalProps {
  service: (typeof mockServices)[0]
  onClose: () => void
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      {/* Modal Container */}
      <div
        className="bg-card border border-border rounded-3xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-center sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-6 right-6 z-10 float-right p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X size={24} className="text-foreground" />
        </button>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
              <Image
                src={service.profileImage || "/placeholder.svg"}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-medium text-foreground">{service.name}</h2>
              <p className="text-muted-foreground mt-1">{service.location}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    service.workType === "Full-time" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                  }`}
                >
                  {service.workType}
                </span>
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">Services Offered</h3>
            <div className="flex flex-wrap gap-2">
              {service.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-block px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">About</h3>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">Availability</h3>
            <p className="text-muted-foreground">
              {service.workType === "Full-time"
                ? "Available Monday–Saturday, 8:00 AM – 6:00 PM"
                : "Flexible scheduling. Contact for availability."}
            </p>
          </div>

          {/* Verification Badge (Placeholder) */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
              Community submitted • Not yet verified
            </p>
          </div>

          {/* Contact Placeholder */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-foreground mb-2">Contact Information</h3>
            <p className="text-muted-foreground text-sm">
              Contact details and direct messaging coming soon. For now, ask for recommendations in the community.
            </p>
          </div>

          {/* Close Button (Mobile Friendly) */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors mt-6"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
