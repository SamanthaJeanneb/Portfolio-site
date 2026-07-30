import Image from "next/image"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects, getAllMultimediaProjects, getPersonalInfo, getAboutInfo } from "@/lib/data"
import { getAllBrandingProjects } from "@/lib/data"
import { PortfolioHeader } from "@/components/portfolio-header"
import { getAllArticles } from "@/lib/articles"
import { ArticlesCarousel } from "@/components/articles-carousel"

const WINNER_INFO: Record<string, string> = {
  "vex-robotics": "VEX Robotics – National Champion",
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
  const about = getAboutInfo()

  const creativeProjects = [
    ...brandingProjects.map((project) => ({ project, slug: `branding/${project.slug}` })),
    ...multimediaProjects.map((project) => ({ project, slug: `multimedia/${project.slug}` })),
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <PortfolioHeader />

      <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-24 sm:pt-32 pb-16">
        {/* Hero */}
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

        {/* Selected work */}
        <section id="work" className="mb-16 sm:mb-24 scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Selected work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <ProjectCard
              title="Suzanne"
              category="AI 3D Modeling"
              image="/suzanne/cover.jpg"
              href="https://suzanne3d.com"
            />
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                category={project.category}
                image={project.thumbnailImage}
                slug={project.slug}
                winnerInfo={WINNER_INFO[project.slug]}
              />
            ))}
          </div>
        </section>

        {/* Creative work */}
        <section id="creative" className="mb-16 sm:mb-24 scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Creative work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {creativeProjects.map(({ project, slug }) => (
              <ProjectCard
                key={slug}
                title={project.title}
                category={project.category}
                image={project.thumbnailImage}
                slug={slug}
                winnerInfo={WINNER_INFO[project.slug]}
              />
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-16 sm:mb-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-12">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">About</h2>
              <p className="text-zinc-400 leading-relaxed max-w-2xl">{about.intro}</p>
            </div>
            <div className="relative w-full sm:w-64 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-surface">
              <Image src={about.photo} alt={personal.name} fill className="object-cover" />
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-base font-semibold mb-3 pb-3 border-b border-border">Now</h3>
            <p className="text-zinc-400 leading-relaxed">{about.now}</p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3 pb-3 border-b border-border">Before</h3>
            <div className="space-y-4">
              {about.before.map((paragraph) => (
                <p key={paragraph} className="text-zinc-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Press */}
        {articles.length > 0 && (
          <section id="press" className="mb-16 sm:mb-24 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Press &amp; mentions</h2>
            <ArticlesCarousel articles={articles} />
          </section>
        )}

        {/* Contact / footer */}
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
      </div>
    </main>
  )
}
