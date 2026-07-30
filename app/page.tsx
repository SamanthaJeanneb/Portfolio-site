import Image from "next/image"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects, getAllMultimediaProjects, getPersonalInfo, getNowInfo, getStoryInfo } from "@/lib/data"
import { getAllBrandingProjects } from "@/lib/data"
import { AnimatedSection } from "@/components/animated-section"
import { PortfolioHeader } from "@/components/portfolio-header"
import { getAllArticles } from "@/lib/articles"
import { ArticlesCarousel } from "@/components/articles-carousel"
import { ProjectsFilter } from "@/components/projects-filter"

const WINNER_INFO: Record<string, string> = {
  "bearly-running": "Big Red Hacks 2025 – Overall Winner",
  "airwaves-rhythm-game": "Bitcamp 2025 – Winning Project",
  "beat-boxing": "HopHacks 2025 – Winning Project",
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Instagram,
}

export default function Home() {
  const projects = getAllProjects()
  const multimediaProjects = getAllMultimediaProjects()
  const brandingProjects = getAllBrandingProjects()
  const articles = getAllArticles()
  const personal = getPersonalInfo()
  const now = getNowInfo()
  const story = getStoryInfo()

  const creativeProjects = [
    ...brandingProjects.map((project) => ({ project, slug: `branding/${project.slug}` })),
    ...multimediaProjects.map((project) => ({ project, slug: `multimedia/${project.slug}` })),
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <PortfolioHeader />

      <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-24 sm:pt-32 pb-16">
        {/* Hero */}
        <AnimatedSection animation="fade-in">
          <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-8 sm:gap-12 mb-16 sm:mb-24">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">{personal.name}</h1>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-6">
                Building{" "}
                <a
                  href="https://suzanne3d.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors"
                >
                  Suzanne
                </a>{" "}
                (Founders, Inc. &amp; NVIDIA Inception). AI 3D models that actually work.
              </p>
              <div className="flex items-center gap-4">
                {personal.social.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon]
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </a>
                  )
                })}
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Email"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden shrink-0 border border-border">
              <Image
                src={personal.avatar || "/placeholder.svg"}
                alt={personal.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </section>
        </AnimatedSection>

        {/* Now */}
        <AnimatedSection animation="fade-up">
          <section id="now" className="mb-16 sm:mb-24 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">Now</h2>
            <p className="text-zinc-400 leading-relaxed max-w-2xl mb-10">{now.body}</p>
            <ol className="space-y-5 border-l border-border pl-6">
              {now.log.map((item) => (
                <li key={item.entry}>
                  <span className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">{item.date}</span>
                  <span className="text-sm sm:text-base text-zinc-300 leading-relaxed">{item.entry}</span>
                </li>
              ))}
            </ol>
          </section>
        </AnimatedSection>

        {/* Selected work */}
        <AnimatedSection animation="fade-up">
          <section id="work" className="mb-16 sm:mb-24 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Selected work</h2>
            <ProjectsFilter projects={projects} winnerInfoMap={WINNER_INFO} />
          </section>
        </AnimatedSection>

        {/* Creative work */}
        <AnimatedSection animation="fade-up">
          <section id="creative" className="mb-16 sm:mb-24 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Creative work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {creativeProjects.map(({ project, slug }, index) => (
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
          </section>
        </AnimatedSection>

        {/* About */}
        <AnimatedSection animation="fade-up">
          <section id="about" className="mb-16 sm:mb-24 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">About</h2>
            <div className="space-y-4 max-w-2xl">
              {story.map((paragraph) => (
                <p key={paragraph} className="text-zinc-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Press */}
        {articles.length > 0 && (
          <AnimatedSection animation="fade-up">
            <section id="press" className="mb-16 sm:mb-24 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Press &amp; mentions</h2>
              <ArticlesCarousel articles={articles} />
            </section>
          </AnimatedSection>
        )}

        {/* Contact / footer */}
        <AnimatedSection animation="fade-in">
          <footer className="border-t border-border pt-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">Get in touch</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 mb-10">
              <a
                href={`mailto:${personal.email}`}
                className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
              >
                {personal.email}
              </a>
              <a
                href={personal.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
              >
                Book a meeting
              </a>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600">
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
          </footer>
        </AnimatedSection>
      </div>
    </main>
  )
}
