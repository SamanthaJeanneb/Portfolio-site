import type React from "react"
import { GlobeIcon, CodeIcon, BriefcaseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects, getAllMultimediaProjects, getAllBrandingProjects } from "@/lib/data"
import { ExperienceCard } from "@/components/experience-card"
import { AnimatedSection } from "@/components/animated-section"
import { EnhancedProfile } from "@/components/enhanced-profile"
import { CredentialsSection } from "@/components/credentials-section"
import { PortfolioHeader } from "@/components/portfolio-header"
import { getExperienceInfo, getTechnicalSkillsInfo } from "@/lib/data"
import { getAllArticles } from "@/lib/articles"
import { ArticlesCarousel } from "@/components/articles-carousel"
import { Newspaper } from "lucide-react"
import { ProjectsFilter } from "@/components/projects-filter"

const WINNER_INFO: Record<string, string> = {
  "bearly-running": "Big Red Hacks 2025 – Overall Winner",
  "airwaves-rhythm-game": "Bitcamp 2025 – Winning Project",
  "beat-boxing": "HopHacks 2025 – Winning Project",
}

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2 py-1 bg-surface-alt text-xs font-medium text-muted-foreground">{children}</div>
}

export default function Home() {
  const projects = getAllProjects()
  const multimediaProjects = getAllMultimediaProjects()
  const brandingProjects = getAllBrandingProjects()
  const experienceInfo = getExperienceInfo()
  const technicalSkills = getTechnicalSkillsInfo()
  const articles = getAllArticles()

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-10 sm:pb-14">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Enhanced Profile Section */}
          <div className="md:sticky md:top-24 self-start">
            <AnimatedSection animation="slide-right">
              <EnhancedProfile />
            </AnimatedSection>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-6 sm:space-y-8">

            {/* Projects Section */}
            <AnimatedSection animation="fade-up" id="projects">
              <ProjectsFilter projects={projects} winnerInfoMap={WINNER_INFO} />
            </AnimatedSection>

            {/* Credentials Section */}
            <AnimatedSection animation="fade-up" id="credentials">
              <CredentialsSection />
            </AnimatedSection>

            {/* Skills Section */}
            <div id="skills" />
            <AnimatedSection animation="fade-up">
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <CodeIcon className="w-5 h-5 mr-2 text-zinc-500" />
                    <h3 className="text-lg font-medium">Technical Skills</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <AnimatedSection animation="slide-right" delay={100}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Design</h4>
                        <div className="flex flex-wrap gap-2">
                          {(technicalSkills?.design || []).map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left" delay={200}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Development</h4>
                        <div className="flex flex-wrap gap-2">
                          {(technicalSkills?.development || []).map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-right" delay={300}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">UX Methods</h4>
                        <div className="flex flex-wrap gap-2">
                          {(technicalSkills?.uxMethods || []).map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left" delay={400}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Soft Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {(technicalSkills?.softSkills || []).map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>


            {/* Experience Section - Expanded */}
            <div id="experience" />
            <AnimatedSection animation="fade-up">
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-zinc-500" />
                    <h3 className="text-lg font-medium">Experience</h3>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    {experienceInfo.map((experience, index) => (
                      <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                        <ExperienceCard
                          title={experience.title}
                          company={experience.company}
                          period={experience.period}
                          description={experience.description}
                          achievements={experience.achievements}
                          technologies={experience.technologies}
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Creative Work Section (branding + multimedia) */}
            <div id="creative" className="-mt-8 pt-8" />
            <AnimatedSection animation="fade-up" id="branding">
              <Card className="bg-surface border-border">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <GlobeIcon className="w-5 h-5 mr-2 text-zinc-500" />
                      <h3 className="text-lg font-medium">Creative Work</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      ...brandingProjects.map((project) => ({ project, slug: `branding/${project.slug}` })),
                      ...multimediaProjects.map((project) => ({ project, slug: `multimedia/${project.slug}` })),
                    ].map(({ project, slug }, index) => (
                      <AnimatedSection key={slug} animation="zoom-in" delay={100 * (index + 1)}>
                        <ProjectCard
                          title={project.title}
                          category={project.category}
                          image={project.thumbnailImage}
                          slug={slug}
                          winnerInfo={WINNER_INFO[project.slug]}
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Articles Section */}
            {articles.length > 0 && (
              <AnimatedSection animation="fade-up" id="articles">
                <Card className="bg-surface border-border">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <Newspaper className="w-5 h-5 mr-2 text-zinc-500" />
                      <h3 className="text-lg font-medium">Articles & Mentions</h3>
                    </div>
                    <ArticlesCarousel articles={articles} />
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
    </main>
  )
}
