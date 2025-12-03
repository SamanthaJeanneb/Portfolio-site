"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { AnimatedSection } from "@/components/animated-section"
import type { Article } from "@/lib/articles"
import { cn } from "@/lib/utils"

interface ArticlesCarouselProps {
  articles: Article[]
}

export function ArticlesCarousel({ articles }: ArticlesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1))
  }

  if (articles.length === 0) return null

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="min-w-full flex-shrink-0 px-2"
            >
              <AnimatedSection animation="fade-up" delay={100}>
                <ArticleCard article={article} index={index} isFeatured={index === 0} />
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {articles.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 z-10 shadow-lg"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 z-10 shadow-lg"
            aria-label="Next article"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {articles.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-purple-400 w-6"
                  : "bg-zinc-700 hover:bg-zinc-600"
              )}
              aria-label={`Go to article ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

