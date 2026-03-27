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
    <div className="relative w-full min-w-0">
      <div className="overflow-hidden w-full min-w-0 px-0 sm:px-11">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="min-w-full w-full max-w-full flex-shrink-0 box-border pl-0 pr-0 sm:px-1"
            >
              <AnimatedSection animation="fade-up" delay={100}>
                <ArticleCard article={article} index={index} isFeatured={index === 0} />
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>

      {articles.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-surface border border-border hover:bg-surface-alt"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-surface border border-border hover:bg-surface-alt"
            aria-label="Next article"
          >
            <ChevronRight className="w-5 h-5 text-zinc-400" />
          </Button>
        </>
      )}

      {articles.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {articles.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-white w-6" : "w-2 bg-zinc-700 hover:bg-zinc-500",
              )}
              aria-label={`Go to article ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
