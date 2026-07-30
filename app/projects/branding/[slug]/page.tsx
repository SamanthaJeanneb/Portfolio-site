import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllBrandingProjects, getBrandingProjectBySlug } from "@/lib/projects"
import { notFound } from "next/navigation"
import { ProjectProcess } from "@/components/project-process"

interface BrandingProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllBrandingProjects().map((project) => ({ slug: project.slug }))
}

export default async function BrandingProjectPage({ params }: BrandingProjectPageProps) {
  const { slug } = await params
  const project = getBrandingProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <Link
          href="/projects#creative"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Creative work
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{project.title}</h1>
        <p className="text-zinc-400 leading-relaxed mb-3">{project.shortDescription}</p>
        <p className="text-sm text-zinc-500 mb-4">
          {[project.category, project.timeline, project.role].filter(Boolean).join(" · ")}
        </p>

        {project.figmaUrl && (
          <div className="mb-10">
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
            >
              View in Figma
            </a>
          </div>
        )}

        <div className="relative aspect-video rounded-xl overflow-hidden bg-surface mb-10">
          <Image
            src={project.thumbnailImage || "/placeholder.svg"}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-4 text-zinc-400 leading-relaxed mb-10">
          {project.description.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.features?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-3">Features</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              {project.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.process && project.process.length > 0 && <ProjectProcess steps={project.process} />}

        {project.styleGuideImage && (
          <figure className="mt-10">
            <Image
              src={project.styleGuideImage}
              alt={`${project.title} style guide`}
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl"
            />
            <figcaption className="text-sm text-zinc-500 mt-2">Style guide</figcaption>
          </figure>
        )}
      </div>
    </main>
  )
}
