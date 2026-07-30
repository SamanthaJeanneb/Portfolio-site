import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects, getAllMultimediaProjects, getAllBrandingProjects } from "@/lib/data"
import { getAllArticles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Projects | Samantha J. Brown",
  description: "Selected work, creative work, and press.",
}

const WINNER_INFO: Record<string, string> = {
  "vex-robotics": "VEX Robotics – National Champion & Innovate Award",
  "bearly-running": "Big Red Hacks 2025 – Overall Winner",
  "airwaves-rhythm-game": "Bitcamp 2025 – Winning Project",
  "beat-boxing": "HopHacks 2025 – Winning Project",
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const multimediaProjects = getAllMultimediaProjects()
  const brandingProjects = getAllBrandingProjects()
  const articles = getAllArticles()

  const creativeProjects = [
    ...brandingProjects.map((project) => ({ project, slug: `branding/${project.slug}` })),
    ...multimediaProjects.map((project) => ({ project, slug: `multimedia/${project.slug}` })),
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <section id="work" className="mb-16 sm:mb-20 scroll-mt-12">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Selected work</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
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

        <section id="creative" className="mb-16 sm:mb-20 scroll-mt-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Creative work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
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

        {articles.length > 0 && (
          <section id="press" className="scroll-mt-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Press &amp; mentions</h2>
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article.id}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-zinc-500">
                    {article.publication} · {article.date}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
