import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  timeline: string
  slug?: string
  href?: string
  winnerInfo?: string
}

export function ProjectCard({ title, description, timeline, slug, href, winnerInfo }: ProjectCardProps) {
  const target = href ?? `/projects/${slug}`
  const isExternal = target.startsWith("http")
  const year = timeline.match(/\b(?:19|20)\d{2}\b/)?.[0]

  return (
    <Link
      href={target}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 sm:gap-5 py-5 border-t border-zinc-800 first:border-t-0 first:pt-0"
      title={winnerInfo}
      aria-label={winnerInfo ? `${title} - ${winnerInfo}` : title}
    >
      <span className="pt-0.5 text-sm tabular-nums text-zinc-600 group-hover:text-zinc-400 transition-colors">
        {year ?? "—"}
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-white leading-snug group-hover:underline underline-offset-4 decoration-zinc-600">
          {title}
          {winnerInfo && <span className="text-amber-400 ml-1.5 text-xs leading-none">★</span>}
        </h3>
        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}
