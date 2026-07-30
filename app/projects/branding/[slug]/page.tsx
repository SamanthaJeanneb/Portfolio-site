import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Figma } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SkillTag } from "@/components/skill-tag"
import { getAllBrandingProjects, getBrandingProjectBySlug } from "@/lib/projects"
import { notFound } from "next/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { PortfolioHeader } from "@/components/portfolio-header"
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
                  src={project.thumbnailImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{project.category}</div>
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">{project.title}</h1>
                  <p className="text-sm text-zinc-400 mt-1 sm:mt-2 max-w-2xl">{project.shortDescription}</p>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          {/* Project Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Design Process Section */}
            {project.process && project.process.length > 0 && (
              <AnimatedSection animation="fade-up" delay={100}>
                <ProjectProcess steps={project.process} />
              </AnimatedSection>
            )}

            <AnimatedSection animation="fade-up" delay={200}>
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Overview</h2>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-300">
                    {project.description.map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  {project.figmaUrl && (
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
                      <Button
                        asChild
                        size="sm"
                        className="bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm"
                      >
                        <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                          <Figma className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          View in Figma
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Features Section */}
            <AnimatedSection animation="fade-up" delay={300}>
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Key Deliverables</h2>
                  <div className="grid gap-2 sm:gap-3">
                    {project.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-sm sm:text-base text-zinc-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Project Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <AnimatedSection animation="slide-left" delay={100}>
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Details</h2>

                  <div className="space-y-3 sm:space-y-4">
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

            {/* Style Guide Image */}
            {project.styleGuideImage && (
              <AnimatedSection animation="slide-left" delay={200}>
                <Card className="bg-surface border-border">
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Style Guide</h2>
                    <div className="relative w-full">
                      <Image
                        src={project.styleGuideImage}
                        alt={`${project.title} Style Guide`}
                        width={400}
                        height={600}
                        className="w-full h-auto rounded-lg border border-zinc-800"
                      />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}
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
