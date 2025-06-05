import { Play, AlertCircle } from "lucide-react"

import { allProjects } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { useMDXComponent } from "next-contentlayer/hooks"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }))
}

export default function ProjectDetailPage({ params }: Props) {
  const project = allProjects.find((project) => project.slug === params.slug)

  if (!project) {
    return notFound()
  }

  const MDXContent = useMDXComponent(project.body.code)

  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p className="text-sm text-gray-500">
          Published: {project.date} - {project.readingTime.text}
        </p>
        {project.image && (
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={1200}
            height={600}
            className="rounded-lg"
            priority={true}
          />
        )}
        <div className="text-gray-700">
          <MDXContent />
        </div>

        {/* Project Links */}
        {project.links && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Links</h3>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Video Demo and Access Note */}
        {(project.videoUrl || project.accessNote) && (
          <div className="space-y-4">
            {project.videoUrl && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Video Demo</h3>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  Watch Demo
                </a>
              </div>
            )}

            {project.accessNote && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800 text-sm">{project.accessNote}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
