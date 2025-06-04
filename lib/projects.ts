export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  slug: string
  title: string
  category: string
  image: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: RelatedProject[]
}

const projects: Project[] = [
  {
    id: 1,
    slug: "family-tree-web-app",
    title: "FamilyTree",
    category: "Fullstack Web Application",
    shortDescription:
      "Collaborative web app for building and managing visual family trees with real-time collaboration features.",
    description: [
      "Developed a comprehensive Family Tree web application that enables users to build and manage extensive family trees with features like adding family members, defining relationships, and attaching documentation.",
      "Designed a visualization tool for navigating trees, incorporating real-time updates and intuitive user interface elements.",
      "Implemented online collaboration features allowing multiple family members to contribute to and maintain shared family trees.",
    ],
    features: [
      "Add and manage family members with detailed profiles",
      "Define complex family relationships and connections",
      "Attach and organize family documentation and photos",
      "Interactive tree visualization with zoom and navigation",
      "Real-time updates and synchronization",
      "Online collaboration with multiple users",
      "Responsive design for desktop and mobile devices",
    ],
    technologies: ["Java", "JavaScript", "Springboot", "Bootstrap", "React", "Docker"],
    coverImage: "/family-tree-cover.png",
    thumbnailImage: "/family-tree-thumb.png",
    timeline: "Academic Project (2024)",
    role: "Fullstack Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/FamilyTree",
  },
  {
    id: 2,
    slug: "airwaves-rhythm-game",
    title: "BitCamp2025-AirWaves",
    category: "Browser Game",
    shortDescription:
      "Browser-based rhythm game using real-time hand tracking through webcam with OpenCV and TensorFlow.js.",
    description: [
      "Browser-based rhythm game using real-time hand tracking through users web cam with OpenCV and TensorFlow.js.",
      "Built with React and Three.js to create a 3D experience playable directly in the browser.",
      "Supports custom song map uploads, allowing users to create and share their own rhythm challenges.",
    ],
    features: [
      "Real-time hand tracking using webcam input",
      "3D game environment built with Three.js",
      "Custom song map upload functionality",
      "Browser-based gameplay with no downloads required",
      "Computer vision integration with OpenCV",
      "Responsive rhythm-based gameplay mechanics",
    ],
    technologies: ["React", "Three.js", "OpenCV", "TensorFlow.js", "JavaScript", "Computer Vision"],
    coverImage: "/airwaves-cover.png",
    thumbnailImage: "/airwaves-thumb.png",
    timeline: "Hackathon Project (April 2025)",
    role: "Lead Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/BitCamp2025-AirWaves",
  },
    {
  id: 3,
  slug: "quotable",
  title: "Quotable",
  category: "Fullstack Web App",
  shortDescription: "Quote management system to add, store, and organize quotes by category or author.",
  description: [
    "Quotable is a full-stack quote management application that allows users to add, edit, and categorize quotes for inspiration or reference.",
    "Built with user experience in mind, the interface enables easy searching and filtering by author, tags, or date added.",
    "Designed to be scalable and visually clean, it offers responsive performance across devices."
  ],
  features: [
    "Add/edit/delete quotes with metadata",
    "Filter/search by tag, author, or category",
    "User authentication and saved sessions",
    "Responsive and mobile-friendly design",
    "Export and share quote lists",
  ],
  technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "CSS3"],
  coverImage: "/quotable-cover.png",
  thumbnailImage: "/quotable-thumb.png",
  timeline: "Personal Project (2025)",
  role: "Fullstack Developer",
  githubUrl: "https://github.com/SamanthaJeanneb/Quotable"
},
  {
    id: 9,
    slug: "interactive-project-map",
    title: "Interactive Project Map",
    category: "Web Prototype",
    shortDescription: "Interactive map prototype for Beardsley Architects + Engineers' Higher Education landing page.",
    description: [
      "This project showcases an interactive map prototype designed for Beardsley Architects + Engineers' Higher Education landing page.",
      "The interactive map allows users to explore various educational projects and locations in an engaging, visual format.",
      "Built with modern JavaScript technologies to provide smooth interactions and responsive design across devices.",
    ],
    features: [
      "Interactive map interface with smooth navigation",
      "Project location markers with detailed information",
      "Responsive design for all device types",
      "Smooth animations and transitions",
      "Educational project showcase integration",
      "Professional client-ready prototype",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Interactive Design"],
    coverImage: "/interactive-map-cover.png",
    thumbnailImage: "/interactive-map-thumb.png",
    timeline: "Client Project (2024)",
    role: "Frontend Developer",
    client: "Beardsley Architects + Engineers",
    githubUrl: "https://github.com/SamanthaJeanneb/Interactive-Project-Map",
  },
  {
    id: 4,
    slug: "getter-done-task-manager",
    title: "HenHacks2025-GetterDone",
    category: "Task Management App",
    shortDescription:
      "Task management application designed to help users organize and track their tasks efficiently with category-based organization.",
    description: [
      "Built for HenHacks 2025: GetterDone is a task management application designed to help users organize and track their tasks efficiently.",
      "The application includes features such as category-based task organization, priority levels, and progress tracking.",
      "Developed with a focus on user experience and productivity enhancement through intuitive design and efficient task management workflows.",
    ],
    features: [
      "Category-based task organization",
      "Priority level assignment for tasks",
      "Progress tracking and completion status",
      "User-friendly interface design",
      "Efficient task management workflows",
      "Responsive design for mobile and desktop",
    ],
    technologies: ["JavaScript", "React", "Node.js", "CSS3"],
    coverImage: "/getter-done-cover.png",
    thumbnailImage: "/getter-done-thumb.png",
    timeline: "Hackathon Project (March 2025)",
    role: "Fullstack Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/HenHacks2025-GetterDone",
  },
  {
    id: 5,
    slug: "lakerhacks-website",
    title: "LakerHacks Website",
    category: "Event Website",
    shortDescription:
      "Website for LakerHacks Pilot event - SUNY Oswego's annual hackathon that I created and lead as Graphic Designer.",
    description: [
      "Website for LakerHacks Pilot event, SUNY Oswego's annual hackathon.",
      "As the creator and lead Graphic Designer of LakerHacks, I contributed to developing the official event website.",
      "The website serves as the central hub for hackathon information, registration, and event updates.",
    ],
    features: [
      "Event information and schedule display",
      "Registration system integration",
      "Responsive design for all devices",
      "Modern web technologies implementation",
      "Event branding and visual design",
      "User-friendly navigation and layout",
    ],
    technologies: ["Svelte", "JavaScript", "CSS3", "Web Design"],
    coverImage: "/lakerhacks-cover.png",
    thumbnailImage: "/lakerhacks-thumb.png",
    timeline: "Event Project (April 2024)",
    role: "Graphic Designer & Web Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/lakerhacks-site",
  },
  {
    id: 6,
    slug: "escape-utica-game",
    title: "Escape Utica National",
    category: "Java Game",
    shortDescription:
      "Text-based Java adventure game where players navigate an office, interact with NPCs, collect items, and avoid security guards to escape.",
    description: [
      "Text-based Java adventure game where players navigate an office environment, interact with NPCs, collect items, and avoid security guards to escape.",
      "The game features a complex narrative structure with multiple paths and decision points that affect the outcome.",
      "Implemented object-oriented programming principles to create an engaging and replayable gaming experience.",
    ],
    features: [
      "Text-based adventure gameplay",
      "Interactive NPC dialogue system",
      "Item collection and inventory management",
      "Multiple escape routes and endings",
      "Security guard avoidance mechanics",
      "Object-oriented game architecture",
    ],
    technologies: ["Java", "Object-Oriented Programming", "Game Development"],
    coverImage: "/escape-utica-cover.png",
    thumbnailImage: "/escape-utica-thumb.png",
    timeline: "Academic Project (February 2024)",
    role: "Game Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/Escape-Utica-National",
  },
  {
    id: 7,
    slug: "vaers-data-sorting",
    title: "VAERSData-Sorting",
    category: "Data Analysis",
    shortDescription:
      "Java application for sorting and analyzing VAERS (Vaccine Adverse Event Reporting System) data with efficient algorithms.",
    description: [
      "Java application designed for sorting and analyzing VAERS (Vaccine Adverse Event Reporting System) data.",
      "Implements efficient sorting algorithms to process large datasets of vaccine adverse event reports.",
      "Provides data analysis capabilities to help researchers and healthcare professionals understand patterns in adverse event reporting.",
    ],
    features: [
      "Efficient data sorting algorithms",
      "Large dataset processing capabilities",
      "VAERS data format compatibility",
      "Performance optimization for big data",
      "Data analysis and reporting tools",
      "Clean, maintainable code architecture",
    ],
    technologies: ["Java", "Data Structures", "Algorithms", "Data Analysis"],
    coverImage: "/vaers-data-cover.png",
    thumbnailImage: "/vaers-data-thumb.png",
    timeline: "Academic Project (April 2024)",
    role: "Data Analyst & Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/VAERSData-Sorting",
  },
  {
    id: 8,
    slug: "string-pattern-matching",
    title: "String Pattern Matching",
    category: "Algorithm Implementation",
    shortDescription:
      "Scala implementation of string pattern matching algorithms demonstrating functional programming principles.",
    description: [
      "Scala implementation of string pattern matching algorithms demonstrating functional programming principles.",
      "Explores various pattern matching techniques and their applications in text processing and analysis.",
      "Showcases the power of functional programming paradigms in solving computational problems efficiently.",
    ],
    features: [
      "Multiple pattern matching algorithms",
      "Functional programming implementation",
      "Efficient text processing capabilities",
      "Scala language features utilization",
      "Algorithm performance comparison",
      "Clean functional code architecture",
    ],
    technologies: ["Scala", "Functional Programming", "Algorithms", "Pattern Matching"],
    coverImage: "/pattern-matching-cover.png",
    thumbnailImage: "/pattern-matching-thumb.png",
    timeline: "Academic Project (February 2024)",
    role: "Algorithm Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/String-Pattern-Matching",
  },

]

export { projects }

// Add these functions after the projects array export

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 2): RelatedProject[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (!currentProject || !currentProject.relatedProjects) {
    // If no related projects defined, return random projects
    return projects
      .filter((project) => project.slug !== currentSlug)
      .slice(0, limit)
      .map((project) => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        image: project.thumbnailImage,
      }))
  }

  return currentProject.relatedProjects.slice(0, limit)
}
