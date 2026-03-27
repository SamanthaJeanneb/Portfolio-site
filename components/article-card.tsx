"use client"

import Image from "next/image"
import { ExternalLink, Calendar, Newspaper, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
  index: number
  isFeatured?: boolean
}

export function ArticleCard({ article, index: _index, isFeatured = false }: ArticleCardProps) {
  return (
    <div className="w-full max-w-full border border-border rounded-lg overflow-hidden bg-surface hover:border-border-hover transition-colors">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div
          className={cn(
            "relative w-full overflow-hidden bg-black",
            isFeatured
              ? "aspect-[16/10] sm:aspect-video max-h-[220px] sm:max-h-none"
              : "aspect-[16/10] sm:aspect-video max-h-[200px] sm:max-h-none",
          )}
        >
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 672px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-surface-alt flex items-center justify-center">
              <Newspaper className="w-10 h-10 sm:w-14 sm:h-14 text-zinc-600" />
            </div>
          )}
        </div>

        <div className="p-3 sm:p-5 space-y-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
            <span className="text-zinc-300 font-medium">{article.publication}</span>
            <span className="text-zinc-600">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 shrink-0" />
              {article.date}
            </span>
          </div>

          <h2
            className={cn(
              "font-semibold leading-snug group-hover:text-white transition-colors duration-200",
              isFeatured ? "text-base sm:text-lg" : "text-[15px] sm:text-base",
            )}
          >
            {article.title}
          </h2>

          {article.excerpt && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {article.excerpt.split(/(Samantha Brown)/gi).map((part, i) =>
                /Samantha Brown/i.test(part) ? (
                  <strong key={i} className="font-semibold text-zinc-300">
                    {part}
                  </strong>
                ) : (
                  part
                ),
              )}
            </p>
          )}

          <p className="inline-flex items-center gap-1 pt-1 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
            Read article <ExternalLink className="w-3 h-3" />
          </p>
        </div>
      </a>

      {article.videoUrl && (
        <div className="px-3 sm:px-5 pb-3 -mt-1">
          <a
            href={article.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
          >
            <Play className="w-3 h-3 shrink-0" />
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  )
}
