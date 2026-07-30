import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllMultimediaProjects, getMultimediaProjectBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import { ProjectProcess } from "@/components/project-process"

interface MultimediaProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllMultimediaProjects().map((project) => ({ slug: project.slug }))
}

export default async function MultimediaProjectPage({ params }: MultimediaProjectPageProps) {
  const { slug } = await params
  const project = getMultimediaProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
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

        {project.youtubeUrl && (
          <div className="mb-10">
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
            >
              Watch on YouTube
            </a>
          </div>
        )}

        {project.youtubeUrl ? (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-surface mb-10">
            <iframe
              src={getYouTubeEmbedUrl(project.youtubeUrl)}
              title={project.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-surface mb-10">
            <Image
              src={project.thumbnailImage || "/placeholder.svg"}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-4 text-zinc-400 leading-relaxed mb-10">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.software && project.software.length > 0 && (
          <p className="text-sm text-zinc-500 mb-10">Made with {project.software.join(", ")}.</p>
        )}

        {project.process && project.process.length > 0 && <ProjectProcess steps={project.process} />}
      </div>
    </main>
  )
}
