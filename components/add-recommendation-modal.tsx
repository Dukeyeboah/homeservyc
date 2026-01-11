"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"

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

interface AddRecommendationModalProps {
  onClose: () => void
}

export function AddRecommendationModal({ onClose }: AddRecommendationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    categories: [] as string[],
    workType: "Full-time" as "Full-time" | "Part-time",
    notes: "",
    location: "",
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to a backend
    console.log("Form submitted:", { ...formData, photo: photoFile })
    alert("Thank you for your recommendation! It will be reviewed and added to the directory soon.")
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
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
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-medium text-foreground mb-2">Add a Recommendation</h2>
            <p className="text-muted-foreground">Share a trusted service provider with the community</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location / Area</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              placeholder="e.g., Accra, Osu"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Photo</label>
            <div className="relative">
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-input" />
              <label
                htmlFor="photo-input"
                className="block w-full px-4 py-8 bg-secondary border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition-colors text-center"
              >
                {photoPreview ? (
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Upload size={24} className="text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to change photo</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-foreground">Upload a photo</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Service Categories */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Service Categories (select one or more)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    formData.categories.includes(category)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {formData.categories.length === 0 && (
              <p className="text-xs text-destructive mt-2">Please select at least one category</p>
            )}
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Work Type</label>
            <div className="flex gap-3">
              {["Full-time", "Part-time"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, workType: type as "Full-time" | "Part-time" }))}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.workType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Notes / Recommendation */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Notes & Recommendation</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
              placeholder="Share what makes this person special: experience, skills, customer feedback, etc."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.name || formData.categories.length === 0}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-primary-foreground font-medium rounded-lg transition-colors"
          >
            Submit Recommendation
          </button>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-medium">Community submitted</span> • All recommendations are reviewed before appearing
            in the directory.
          </p>
        </form>
      </div>
    </div>
  )
}
