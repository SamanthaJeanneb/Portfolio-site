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
      <Card className="bg-surface border-border overflow-hidden group hover:border-border-hover transition-colors h-full">
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
              <span>{category}</span>
              {winnerInfo && (
                <span className="text-amber-400 text-xs leading-none">★</span>
              )}
            </div>
            <h3 className="font-medium text-sm sm:text-base text-white">{title}</h3>
          </div>
        </div>
      </Card>
    </Link>
  )
}
