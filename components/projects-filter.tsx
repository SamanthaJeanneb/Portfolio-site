"use client"

import { useState } from "react"
import type { Project } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"
import { AnimatedSection } from "@/components/animated-section"

type ProjectFilter =
  | "All"
  | "Hackathon Projects"
  | "Class Projects"
  | "Internship Projects"
  | "Personal Projects"

interface ProjectsFilterProps {
  projects: Project[]
  winnerInfoMap?: Record<string, string>
}

const CLASS_PROJECT_SLUGS = new Set<string>([
  "quotable",
  "soundsketch",
  "family-tree-web-app",
  "zyra",
])

const INTERNSHIP_PROJECT_SLUGS = new Set<string>([
  "reach-campus-connection",
  "beardsley-office-hub",
  "beardsley-map-application",
])

function getProjectFilter(project: Project): Exclude<ProjectFilter, "All"> {
  const timeline = (project.timeline || "").toLowerCase()
  const category = (project.category || "").toLowerCase()

  if (timeline.includes("hackathon") || category.includes("hackathon")) {
    return "Hackathon Projects"
  }

  if (INTERNSHIP_PROJECT_SLUGS.has(project.slug)) {
    return "Internship Projects"
  }

  if (
    CLASS_PROJECT_SLUGS.has(project.slug) ||
    /capstone|course|class|studio|semester/.test(timeline)
  ) {
    return "Class Projects"
  }

  return "Personal Projects"
}

export function ProjectsFilter({ projects, winnerInfoMap }: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All")

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => getProjectFilter(project) === activeFilter)

  const filters: ProjectFilter[] = [
    "All",
    "Hackathon Projects",
    "Class Projects",
    "Internship Projects",
    "Personal Projects",
  ]

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-purple-500/90 text-white shadow-[0_5px_20px_rgba(168,85,247,0.35)]"
                  : "bg-zinc-900/70 text-zinc-300 hover:text-white hover:bg-zinc-800",
              ].join(" ")}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredProjects.map((project, index) => {
          const winnerInfo = winnerInfoMap?.[project.slug]
          return (
            <AnimatedSection key={project.id} animation="zoom-in" delay={100 * (index + 1)}>
              <ProjectCard
                title={project.title}
                category={project.category}
                image={project.thumbnailImage}
                slug={project.slug}
                winnerInfo={winnerInfo}
              />
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}


