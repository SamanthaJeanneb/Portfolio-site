import portfolioData from "@/data/portfolio-data.json"
import { projects, getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects"

// Export the portfolio data
export const data = portfolioData

// Export the projects data
export { projects, getAllProjects, getProjectBySlug, getRelatedProjects }

// Type definitions for the portfolio data
export type PortfolioData = typeof portfolioData

// Helper function to get navigation items
export function getNavItems() {
  return data.navigation
}

// Helper function to get personal information
export function getPersonalInfo() {
  return data.personal
}

// Helper function to get about information
export function getAboutInfo() {
  return data.about
}

// Helper function to get experience information
export function getExperienceInfo() {
  return data.experience
}

// Helper function to get credentials information
export function getCredentialsInfo() {
  return data.credentials
}

// Helper function to get technical skills information
export function getTechnicalSkillsInfo() {
  return data.technicalSkills
}

// Helper function to get meta information
export function getMetaInfo() {
  return data.meta
}

export interface MultimediaProject {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  thumbnailImage: string
  posterImage?: string
  videoUrl?: string
  youtubeUrl?: string
  timeline: string
  role: string
  software?: string[]
}

const multimediaProjects: MultimediaProject[] = [
  {
    id: 1,
    slug: "fighting-animation",
    title: "Fighting Animation",
    category: "Animation",
    shortDescription: "Dynamic fighting sequence animation showcasing character movement and action choreography.",
    description: [
      "A dynamic fighting sequence animation that demonstrates character movement, action choreography, and storytelling through motion.",
      "Created to explore animation principles including timing, spacing, and character expression in action sequences.",
      "Showcases skills in digital animation and visual storytelling techniques."
    ],
    thumbnailImage: "/fighting-animation-cover.png",
    posterImage: "/fighting-animation-poster.png",
    youtubeUrl: "https://www.youtube.com/watch?v=YxOD7qQTczo&ab_channel=JeanneBrown",
    timeline: "Personal Project",
    role: "Animator & Director",
    software: ["Animation Software", "Digital Art"]
  }
]

export function getAllMultimediaProjects(): MultimediaProject[] {
  return multimediaProjects
}

export function getMultimediaProjectBySlug(slug: string): MultimediaProject | undefined {
  return multimediaProjects.find((project) => project.slug === slug)
}
