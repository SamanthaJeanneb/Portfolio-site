import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllProjects, getProjectBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import { ProjectProcess } from "@/components/project-process"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const links = [
    project.liveUrl && { label: "Live site", url: project.liveUrl },
    project.githubUrl && { label: "Source code", url: project.githubUrl },
    project.figmaUrl && { label: "Figma", url: project.figmaUrl },
  ].filter(Boolean) as { label: string; url: string }[]

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All work
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{project.title}</h1>
        <p className="text-zinc-400 leading-relaxed mb-3">{project.shortDescription}</p>
        <p className="text-sm text-zinc-500 mb-4">
          {[project.category, project.timeline, project.role].filter(Boolean).join(" · ")}
        </p>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-5 mb-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="relative aspect-video rounded-xl overflow-hidden bg-surface mb-10">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-4 text-zinc-400 leading-relaxed mb-10">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.features?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-3">Features</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies?.length > 0 && (
          <p className="text-sm text-zinc-500 mb-10">Built with {project.technologies.join(", ")}.</p>
        )}

        {project.process && project.process.length > 0 && <ProjectProcess steps={project.process} />}

        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-6 mt-10">
            {project.gallery.map((image) => (
              <figure key={image.url}>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-surface">
                  <Image src={image.url} alt={image.caption || project.title} fill className="object-cover" />
                </div>
                {image.caption && <figcaption className="text-sm text-zinc-500 mt-2">{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
