"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { ProjectGalleryImage } from "@/lib/projects"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  VisuallyHidden,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface PhotoGalleryProps {
  images: ProjectGalleryImage[]
  title?: string
  variant?: "sidebar" | "grid"
  className?: string
}

export function PhotoGallery({ 
  images, 
  title = "Photo Gallery",
  variant = "sidebar",
  className 
}: PhotoGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  if (!images || images.length === 0) {
    return null
  }

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
    setSelectedImageIndex(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImageIndex === null) return
    
    if (direction === "prev") {
      setSelectedImageIndex(
        selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1
      )
    } else {
      setSelectedImageIndex(
        selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0
      )
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || selectedImageIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setSelectedImageIndex(
          selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1
        )
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setSelectedImageIndex(
          selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0
        )
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedImageIndex, images.length])

  // Sidebar variant (vertical stack)
  if (variant === "sidebar") {
    return (
      <>
        <Card className={cn("bg-zinc-900/70 border-zinc-800 backdrop-blur-sm", className)}>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{title}</h2>
            <div className="space-y-3 sm:space-y-4">
              {images.map((image, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={50 * (index + 1)}>
                  <button
                    onClick={() => openLightbox(index)}
                    className="relative h-32 sm:h-40 w-full rounded-lg overflow-hidden border border-zinc-800 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.caption || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {image.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                          <p className="text-xs sm:text-sm text-white font-medium">{image.caption}</p>
                        </div>
                      </div>
                    )}
                  </button>
                </AnimatedSection>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lightbox Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-zinc-800">
            <VisuallyHidden>
              <DialogTitle>Photo Gallery - {images[selectedImageIndex || 0]?.caption || `Image ${(selectedImageIndex || 0) + 1}`}</DialogTitle>
            </VisuallyHidden>
            {selectedImageIndex !== null && (
              <div className="relative w-full h-[80vh] sm:h-[85vh]">
                <Image
                  src={images[selectedImageIndex].url || "/placeholder.svg"}
                  alt={images[selectedImageIndex].caption || `Gallery image ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
                
                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border border-zinc-700"
                      onClick={() => navigateImage("prev")}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border border-zinc-700"
                      onClick={() => navigateImage("next")}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}

                {/* Image caption */}
                {images[selectedImageIndex].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6">
                    <DialogDescription className="text-white text-sm sm:text-base">
                      {images[selectedImageIndex].caption}
                    </DialogDescription>
                  </div>
                )}

                {/* Image counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-xs text-white">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Grid variant (for main content area)
  return (
    <>
      <Card className={cn("bg-zinc-900/70 border-zinc-800 backdrop-blur-sm", className)}>
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <AnimatedSection key={index} animation="zoom-in" delay={100 * (index + 1)}>
                <button
                  onClick={() => openLightbox(index)}
                  className="relative h-40 sm:h-48 w-full rounded-lg overflow-hidden border border-zinc-800 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                        <p className="text-xs sm:text-sm text-white font-medium">{image.caption}</p>
                      </div>
                    </div>
                  )}
                </button>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-zinc-800">
          <VisuallyHidden>
            <DialogTitle>Photo Gallery - {images[selectedImageIndex || 0]?.caption || `Image ${(selectedImageIndex || 0) + 1}`}</DialogTitle>
          </VisuallyHidden>
          {selectedImageIndex !== null && (
            <div className="relative w-full h-[80vh] sm:h-[85vh]">
              <Image
                src={images[selectedImageIndex].url || "/placeholder.svg"}
                alt={images[selectedImageIndex].caption || `Gallery image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border border-zinc-700"
                    onClick={() => navigateImage("prev")}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border border-zinc-700"
                    onClick={() => navigateImage("next")}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image caption */}
              {images[selectedImageIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6">
                  <DialogDescription className="text-white text-sm sm:text-base">
                    {images[selectedImageIndex].caption}
                  </DialogDescription>
                </div>
              )}

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-xs text-white">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

