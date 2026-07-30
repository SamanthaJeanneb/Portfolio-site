import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SkillTag } from "@/components/skill-tag"
import { getProjectBySlug, getRelatedProjects } from "@/lib/data"
import type { RelatedProject } from "@/lib/projects"
import { notFound } from "next/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { PortfolioHeader } from "@/components/portfolio-header"
import { ProjectProcess } from "@/components/project-process"
import { PhotoGallery } from "@/components/photo-gallery"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Simplified layout: single description card, process toggled above/below
  const showProcessFirst = project.layout?.showProcessFirst === true

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Grid Pattern */}

      {/* Header */}
      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Back Button */}
        <AnimatedSection animation="fade-in">
          <Link
            href="/"
            className="inline-flex items-center text-xs sm:text-sm text-zinc-400 hover:text-white mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back to Portfolio
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Project Header */}
          <AnimatedSection animation="fade-up" className="lg:col-span-3">
            <Card className="bg-surface border-border overflow-hidden">
              <div className="relative h-48 sm:h-64 md:h-80 w-full">
                <Image
                  src={project.coverImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{project.category}</div>
                      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">{project.title}</h1>
                      <p className="text-sm text-zinc-400 mt-1 sm:mt-2 max-w-2xl">{project.shortDescription}</p>
                    </div>
                    
                    {/* Action Buttons - Moved to header */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.liveUrl && (
                        <Button
                          asChild
                          size="sm"
                          className="bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View Live Project
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm bg-black/50 border-zinc-600 hover:bg-black/70">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View Source Code
                          </a>
                        </Button>
                      )}
                      {project.figmaUrl && (
                        <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm bg-black/50 border-zinc-600 hover:bg-black/70">
                          <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View Figma Design
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          {/* Project Content - Single card with optional process before/after */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Process at top (if configured) */}
            {showProcessFirst && project.process && project.process.length > 0 && (
              <AnimatedSection animation="fade-up" delay={100}>
                <ProjectProcess steps={project.process} />
              </AnimatedSection>
            )}

            {/* Description + Features + Technologies in one card */}
            <AnimatedSection animation="fade-up" delay={showProcessFirst ? 150 : 100}>
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Overview</h2>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-300">
                    {project.description.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {project.features?.length > 0 && (
                    <AnimatedSection animation="fade-up" delay={200}>
                      <h3 className="text-base sm:text-lg font-bold mt-6 sm:mt-8 mb-2 sm:mb-3">Key Features</h3>
                      <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base text-zinc-300">
                        {project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </AnimatedSection>
                  )}

                  {project.technologies?.length > 0 && (
                    <AnimatedSection animation="fade-up" delay={300}>
                      <h3 className="text-base sm:text-lg font-bold mt-6 sm:mt-8 mb-2 sm:mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                        {project.technologies.map((tech, index) => (
                          <SkillTag key={index}>{tech}</SkillTag>
                        ))}
                      </div>
                    </AnimatedSection>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Process at bottom (default) */}
            {!showProcessFirst && project.process && project.process.length > 0 && (
              <AnimatedSection animation="fade-up" delay={150}>
                <ProjectProcess steps={project.process} />
              </AnimatedSection>
            )}
          </div>

          {/* Project Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <AnimatedSection animation="slide-left" delay={100}>
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Details</h2>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Client</h3>
                      <p className="text-sm sm:text-base">{project.client || "Personal Project"}</p>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Timeline</h3>
                      <p className="text-sm sm:text-base">{project.timeline}</p>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Role</h3>
                      <p className="text-sm sm:text-base">{project.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Photo Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <AnimatedSection animation="slide-left" delay={150}>
                <PhotoGallery images={project.gallery} variant="sidebar" />
              </AnimatedSection>
            )}

            {/* Next Projects */}
            <AnimatedSection animation="slide-left" delay={200}>
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">More Projects</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {getRelatedProjects(project.slug, 3).map((related: RelatedProject, index: number) => (
                        <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                          <Link href={`/projects/${related.slug}`} className="block group">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={related.image || "/placeholder.svg"}
                                  alt={related.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-sm sm:text-base font-medium group-hover:text-white transition-colors">
                                  {related.title}
                                </h3>
                                <p className="text-xs text-zinc-400">{related.category}</p>
                              </div>
                            </div>
                          </Link>
                        </AnimatedSection>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>

        {/* Footer */}
        <AnimatedSection
          animation="fade-in"
          delay={500}
          className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-zinc-500"
        >
          <p>© {new Date().getFullYear()} Samantha J. Brown. All rights reserved.</p>
        </AnimatedSection>
      </div>

      {/* Scroll to Top Button */}
    </main>
  )
}
