"use client"

import Image from "next/image"
import { ExternalLink, Calendar, Newspaper, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
  index: number
  isFeatured?: boolean
}

export function ArticleCard({ article, index, isFeatured = false }: ArticleCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Article Image - Full Width */}
      <div className={cn(
        "relative overflow-hidden w-full group rounded-lg",
        isFeatured ? "h-64 sm:h-80" : "h-56 sm:h-72"
      )}>
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
            <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400/50" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 group overflow-hidden relative hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5 -mt-4">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative z-10"
        >
          <CardContent className={cn("p-3 sm:p-4", isFeatured && "p-4 sm:p-5")}>
            {/* Article Content */}
            <div className="flex-1 min-w-0 space-y-1.5">
              {/* Publication and Date */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-purple-400">{article.publication}</span>
                </div>
                <span className="text-zinc-500">•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className={cn(
                "font-bold group-hover:text-purple-400 transition-colors duration-300",
                isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-base"
              )}>
                {article.title}
              </h2>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3">
                  {article.excerpt}
                </p>
              )}

              {/* Read More Link and Video Link */}
              <div className="flex items-center gap-3 pt-0.5">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-purple-400 group-hover:text-purple-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Read Article</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
                {article.videoUrl && (
                  <a
                    href={article.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-purple-400 group-hover:text-purple-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Watch Video</span>
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </a>
      </Card>
    </div>
  )
}

