import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  category: string
  image: string
  slug: string
  winnerInfo?: string
}

export function ProjectCard({ title, category, image, slug, winnerInfo }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block h-full"
      title={winnerInfo}
      aria-label={winnerInfo ? `${title} - ${winnerInfo}` : title}
    >
      <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-purple-500/50 transition-all h-full">
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            <div className="text-xs text-purple-400 mb-1 flex items-center gap-2">
              <span>{category}</span>
              {winnerInfo && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-amber-300 text-xs sm:text-sm leading-none drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]">
                    ★
                  </span>
                </span>
              )}
            </div>
            <h3 className="font-medium text-sm sm:text-base">{title}</h3>
          </div>
        </div>
      </Card>
    </Link>
  )
}
