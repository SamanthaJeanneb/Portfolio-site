import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects, getAllMultimediaProjects, getAllBrandingProjects } from "@/lib/data"
import { getAllArticles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Projects | Samantha J. Brown",
  description: "Projects, awards, creative work, and articles.",
}

const AWARDS: Record<string, { title: string; description: string }> = {
  letshelp: {
    title: "LetsHelp",
    description: "Georgetown University Hackathon — 2nd Place Overall & Gemini Track Winner.",
  },
  "bearly-running": {
    title: "Bear Escape",
    description: "Cornell University Hackathon — Best Design & Best Use of Gemini API.",
  },
  "beat-boxing": {
    title: "Beat Boxing",
    description:
      "Johns Hopkins University Hackathon — Best Overall Hack & Gaming Track: Best Use of SpacetimeDB.",
  },
  "airwaves-rhythm-game": {
    title: "AirWaves",
    description: "University of Maryland Hackathon — Best Gamification Hack.",
  },
}

function highlightName(text: string) {
  return text.split(/(Samantha(?: J\.)? Brown|Samantha)/g).map((part, index) =>
    /^Samantha(?: J\.)? Brown$|^Samantha$/.test(part) ? (
      <strong key={index} className="text-white font-semibold">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const multimediaProjects = getAllMultimediaProjects()
  const brandingProjects = getAllBrandingProjects()
  const articles = getAllArticles()

  const awardedProjects = projects.filter((project) => AWARDS[project.slug])
  const otherProjects = projects.filter(
    (project) => !AWARDS[project.slug] && project.slug !== "vex-robotics",
  )

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

        <section id="awards" className="mb-16 sm:mb-20 scroll-mt-12">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">Awards</h1>
          <div>
            {awardedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={AWARDS[project.slug].title}
                description={AWARDS[project.slug].description}
                timeline={project.timeline}
                slug={project.slug}
              />
            ))}
          </div>
        </section>

        <section id="work" className="mb-16 sm:mb-20 scroll-mt-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">Projects</h2>
          <div>
            <ProjectCard
              title="Suzanne"
              description="AI-native 3D modeling for parts that work in the real world, built at Founders, Inc."
              timeline="2025"
              href="https://suzanne3d.com"
            />
            {otherProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.shortDescription}
                timeline={project.timeline}
                slug={project.slug}
              />
            ))}
          </div>
        </section>

        <section id="creative" className="mb-16 sm:mb-20 scroll-mt-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">Creative work</h2>
          <div>
            {creativeProjects.map(({ project, slug }) => (
              <ProjectCard
                key={slug}
                title={project.title}
                description={project.shortDescription}
                timeline={project.timeline}
                slug={slug}
              />
            ))}
          </div>
        </section>

        {articles.length > 0 && (
          <section id="articles" className="scroll-mt-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">Articles &amp; mentions</h2>
            <ul className="space-y-8">
              {articles.map((article) => (
                <li key={article.id} className="flex flex-col sm:flex-row gap-4">
                  {article.image && (
                    <div className="relative w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-surface shrink-0">
                      <Image src={article.image} alt={article.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
                    >
                      {article.title}
                    </a>
                    <p className="text-sm text-zinc-500 mb-1.5">
                      {article.publication} · {article.date}
                    </p>
                    {article.excerpt && (
                      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                        {highlightName(article.excerpt)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
