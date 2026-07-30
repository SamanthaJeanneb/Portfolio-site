import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  category: string
  image: string
  slug?: string
  href?: string
  winnerInfo?: string
}

export function ProjectCard({ title, category, image, slug, href, winnerInfo }: ProjectCardProps) {
  const target = href ?? `/projects/${slug}`
  const isExternal = target.startsWith("http")

  return (
    <Link
      href={target}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block group"
      title={winnerInfo}
      aria-label={winnerInfo ? `${title} - ${winnerInfo}` : title}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-surface mb-2">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-opacity group-hover:opacity-90"
        />
      </div>
      <h3 className="text-sm font-medium text-white leading-snug">
        {title}
        {winnerInfo && <span className="text-amber-400 ml-1.5 text-xs leading-none">★</span>}
      </h3>
      <p className="text-xs text-zinc-500">{category}</p>
    </Link>
  )
}
