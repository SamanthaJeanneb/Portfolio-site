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

export interface ProcessStep {
  id: string
  type: "image" | "video" | "figma" | "text" | "slideshow" | "canva"
  title?: string
  description?: string
  content: string | string[] // URL for images/videos, embed URL for Figma, text content for text, array of image URLs for slideshow
  thumbnail?: string // Optional thumbnail for videos
}

export interface ProjectLayout {
  showProcessFirst?: boolean
  showGallery?: boolean
  showTechnologies?: boolean
  showFeatures?: boolean
  customOrder?: string[] // Array of section IDs in desired order
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
  order?: number
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  figmaUrl?: string
  videoUrl?: string
  accessNote?: string
  process?: ProcessStep[]
  relatedProjects?: RelatedProject[]
  layout?: ProjectLayout
}

const projects: Project[] = [
  {
    id: 100,
    slug: "bearly-running",
    title: "Big Red Hacks 2025 - Bear Escape",
    category: "Rhythm Game",
    shortDescription:
      "Web-based rhythm game with AI-generated charts and gesture controls (Big Red Hacks Winner).",
    description: [
      "Bear Escape is a web-based rhythm game where players keep the beat to help a bear escape from a pursuer.",
      "Features AI-powered chart generation from MP3s (Gemini API) and gesture controls via OpenCV/MediaPipe.",
      "Built with a modern React + Vite frontend and real-time processing.",
    ],
    features: [
      "AI chart generation from MP3s",
      "Gesture controls with webcam",
      "Real-time Socket.IO processing",
      "Modern React interface",
    ],
    technologies: ["React", "TypeScript", "Vite", "Socket.IO", "OpenCV", "MediaPipe", "Gemini API"],
    coverImage: "/bearly-running/title.png",
    thumbnailImage: "/bearly-running/title.png",
    timeline: "Hackathon Project (2025)",
    role: "Lead Developer",
    liveUrl: "https://bearly-running.vercel.app/",
    githubUrl: "https://github.com/SamanthaJeanneb/guitar",
    process: [
      {
        id: "screens",
        type: "slideshow",
        title: "Screenshots",
        description: "Gameplay and UI screenshots",
        content: [
          "/bearly-running/Screenshot From 2025-09-21 08-26-04.png",
          "/bearly-running/Screenshot From 2025-09-21 08-26-15.png",
          "/bearly-running/Screenshot From 2025-09-21 08-26-23.png",
          "/bearly-running/title.png"
        ]
      }
    ],
    order: 2,
  },
  {
    id: 7,
    slug: "beat-boxing",
    title: "HopHacks 2025 - Beat Boxing",
    category: "Rhythm Game",
    shortDescription: "Web-based boxing rhythm game with webcam hand-tracking and uploadable songs.",
    description: [
      "Multiplayer rhythm boxing game playable in the browser.",
      "Four distinct hand-tracking motions and infinitely uploadable songs.",
    ],
    features: [
      "Webcam hand-tracking (OpenCV)",
      "Multiplayer capable",
      "Song uploads",
    ],
    technologies: ["TypeScript", "React", "Vite", "OpenCV", "Socket.IO"],
    coverImage: "/beatboxing/title.png",
    thumbnailImage: "/beatboxing/title.png",
    timeline: "Hackathon Project (2025)",
    role: "Developer",
    githubUrl: "https://github.com/SamanthaJeanneb/Beat-Boxing-HopHacks2025",
    process: [
      {
        id: "screens",
        type: "slideshow",
        title: "Screenshots",
        description: "Gameplay and UI screenshots",
        content: [
          "/beatboxing/Screenshot From 2025-10-06 14-44-46.png",
          "/beatboxing/Screenshot From 2025-10-06 14-44-58.png",
          "/beatboxing/Screenshot From 2025-10-06 14-45-22.png",
          "/beatboxing/title.png"
        ]
      }
    ],
    order: 4,
  },
  // Projects with live links first
  {
    id: 1,
    slug: "echochambers",
    title: "World's Largest Hackathon 2025 - Echochambers",
    category: "Web Game",
    shortDescription:
      "Web-based video game where players navigate fake online communities and try to persuade users without getting banned by moderators.",
    description: [
      "Echochambers is a web-based video game where players are placed into fake online communities where all members of the community have a certain belief.",
      "Your goal is to try and persuade as many users on the selected echo chamber as possible without getting flat out banned by the moderators of the community.",
      "This interactive experience explores social dynamics and persuasion tactics in online environments while highlighting the challenges of echo chambers in digital communities.",
    ],
    features: [
      "Multiple fake online community environments",
      "Dynamic user interaction system",
      "Moderator AI with banning mechanics",
      "Persuasion scoring and tracking",
      "Multiple echo chamber scenarios",
      "Social dynamics simulation",
      "Interactive dialogue system",
    ],
    technologies: ["JavaScript", "React", "Web Development", "Game Development", "Social Simulation"],
    coverImage: "/echochambers-cover.png",
    thumbnailImage: "/echochambers-thumb.png",
    timeline: "Hackathon Project (2025)",
    role: "Game Developer",
    liveUrl: "https://echochambers-theta.vercel.app/",
    githubUrl: "https://github.com/SamanthaJeanneb/echochambers",
    accessNote: "Submitted for World's Largest Hackathon",
    order: 12,
  },
  {
    id: 2,
    slug: "soundsketch",
    title: "SoundSketch",
    category: "Interactive Spotify App",
    shortDescription:
      "Interactive Spotify app that shows off my artwork while playing recommended songs based off of the artwork and the user's recent Spotify songs.",
    description: [
      "SoundSketch is an innovative interactive Spotify application that combines visual art with music discovery.",
      "The app displays my original artwork while intelligently curating and playing recommended songs based on both the visual elements of the artwork and the user's recent Spotify listening history.",
      "This unique fusion creates a personalized audiovisual experience that bridges the gap between visual and auditory art forms.",
    ],
    features: [
      "Integration with Spotify API for music playback",
      "Original artwork gallery display",
      "AI-powered song recommendations based on artwork themes",
      "User's recent listening history analysis",
      "Seamless audiovisual synchronization",
      "Personalized music discovery experience",
      "Interactive artwork browsing interface",
    ],
    technologies: ["JavaScript", "React", "Spotify API", "Node.js", "CSS3", "Art Integration"],
    coverImage: "/sound-sketch/cover.png",
    thumbnailImage: "/sound-sketch/cover.png",
    timeline: "Personal Project (2024)",
    role: "Fullstack Developer & Artist",
    liveUrl: "https://soundsketch-six.vercel.app/",
    githubUrl: "https://github.com/SamanthaJeanneb/soundsketch",
    process: [
      {
        id: "step4",
        type: "video",
        title: "Development Progress",
        description: "A walkthrough of the application during development, showing the integration with Spotify API.",
        content: "https://www.youtube.com/embed/k7Vkkg7CYp4",
        thumbnail: "/soundsketch-video-thumb.png",
      },
      {
        id: "ui-screenshots",
        type: "slideshow",
        title: "UI Screenshots",
        description: "Various screenshots showing the application interface and user experience.",
        content: [
          "/sound-sketch/classroom.png",
          "/sound-sketch/kitchen.png",
          "/sound-sketch/lounge.png",
          "/sound-sketch/office.png",
        ],
      },
    ],
    relatedProjects: [
      {
        slug: "quotable",
        title: "Quotable",
        category: "Fullstack Web App",
        image: "/quotable-thumb.png"
      },
      {
        slug: "airwaves-rhythm-game",
        title: "BitCamp2025-AirWaves",
        category: "Browser Game",
        image: "/airwaves-thumb.png"
      }
    ],
    order: 6,
  },
  {
    id: 3,
    slug: "airwaves-rhythm-game",
    title: "BitCamp 2025 - AirWaves",
    category: "Rhythm Game",
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
    liveUrl: "http://cs.oswego.edu/~efereira/airwaves/",
    githubUrl: "https://github.com/SamanthaJeanneb/BitCamp2025-AirWaves",
    process: [],
    order: 3,
    relatedProjects: [
      {
        slug: "soundsketch",
        title: "SoundSketch",
        category: "Interactive Spotify App",
        image: "/sound-sketch/cover.png"
      },
      {
        slug: "escape-utica-game",
        title: "Escape Utica National",
        category: "Java Game",
        image: "/escape-utica-thumb.png"
      }
    ]
  },
  {
    id: 4,
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
    liveUrl: "http://cs.oswego.edu/lakerhacks/",
    githubUrl: "https://github.com/SamanthaJeanneb/lakerhacks-site",
    order: 13,
  },
  {
    id: 5,
    slug: "quotable",
    title: "Quotable",
    category: "Fullstack Web App",
    shortDescription: "Quote management system to add, store, and organize quotes by category or author.",
    description: [
      "Quotable is a full-stack quote management application that allows users to add, edit, and categorize quotes for inspiration or reference.",
      "Built with user experience in mind, the interface enables easy searching and filtering by author, tags, or date added.",
      "Designed to be scalable and visually clean, it offers responsive performance across devices.",
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
    timeline: "Course Project (2025)",
    role: "Scrum Master & Fullstack Developer",
    liveUrl: "http://moxie.cs.oswego.edu:48080/",
    githubUrl: "https://github.com/Paul-Austin-Oswego-CSC480-HCI521/OZ-CSC-480-HCI-521-Spring-2025",
    process: [
      {
        id: "figma-prototype",
        type: "figma",
        title: "Figma Prototype",
        description: "Interactive Figma prototype for the Quotable application design.",
        content: "https://embed.figma.com/proto/hyl3PKGhSoGDiGxFTX5C3X/Draft-Med--Fi?node-id=1165-758&scaling=scale-down-width&content-scaling=fixed&page-id=1165%3A756&starting-point-node-id=1165%3A758&embed-host=share"
      },
      {
        id: "development-process",
        type: "slideshow",
        title: "Development Process",
        description: "Step-by-step screenshots showing the development and design process of the Quotable application.",
        content: [
          "/quotable/Quotable-1.png",
          "/quotable/Quotable-2.png",
          "/quotable/Quotable-3.png",
          "/quotable/Quotable-4.png",
          "/quotable/Quotable-5.png",
          "/quotable/Quotable-6.png",
          "/quotable/Quotable-7.png",
          "/quotable/Quotable-8.png",
          "/quotable/Quotable-9.png",
          "/quotable/Quotable-10.png",
          "/quotable/Quotable-11.png",
          "/quotable/Quotable-12.png",
          "/quotable/Quotable-13.png",
          "/quotable/Quotable-14.png",
          "/quotable/Quotable-15.png",
          "/quotable/Quotable-16.png",
          "/quotable/Quotable-17.png",
          "/quotable/Quotable-18.png",
          "/quotable/Quotable-19.png",
          "/quotable/Quotable-20.png",
          "/quotable/Quotable-21.png",
          "/quotable/Quotable-22.png",
          "/quotable/Quotable-23.png",
          "/quotable/Quotable-24.png",
          "/quotable/Quotable-25.png",
          "/quotable/Quotable-26.png",
          "/quotable/Quotable-27.png",
          "/quotable/Quotable-28.png",
          "/quotable/Quotable-29.png",
          "/quotable/Quotable-30.png",
          "/quotable/Quotable-31.png",
          "/quotable/Quotable-32.png",
          "/quotable/Quotable-33.png",
          "/quotable/Quotable-34.png",
          "/quotable/Quotable-35.png",
          "/quotable/Quotable-36.png",
          "/quotable/Quotable-37.png",
          "/quotable/Quotable-38.png",
          "/quotable/Quotable-39.png",
          "/quotable/Quotable-40.png",
          "/quotable/Quotable-41.png",
          "/quotable/Quotable-42.png",
          "/quotable/Quotable-43.png",
          "/quotable/Quotable-44.png"
        ]
      },
    ],
    layout: {
      showProcessFirst: true,
      showGallery: false,
      showTechnologies: true,
      showFeatures: true,
      customOrder: ['process', 'description', 'features', 'technologies']
    },
    order: 5,
    relatedProjects: [
      {
        slug: "soundsketch",
        title: "SoundSketch",
        category: "Interactive Spotify App",
        image: "/sound-sketch/cover.png"
      },
      {
        slug: "getter-done-task-manager",
        title: "HenHacks2025-GetterDone",
        category: "Task Management App",
        image: "/getter-done-thumb.png"
      }
    ]
  },
  
  {
    id: 8,
    slug: "getter-done-task-manager",
    title: "HenHacks 2025 - GetterDone",
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
    liveUrl: "https://getterdone-7ab42de2c63d.herokuapp.com/",
    githubUrl: "https://github.com/SamanthaJeanneb/HenHacks2025-GetterDone",
    order: 7,
  },
  {
    id: 9,
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
    liveUrl: "http://cs.oswego.edu/~sbrown27/EscapeUticaNational/",
    githubUrl: "https://github.com/SamanthaJeanneb/Escape-Utica-National",
    order: 14,
  },
  // Projects without live links
  {
    id: 10,
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
    process: [
      {
        id: "step1",
        type: "figma",
        title: "Figma Prototype",
        description: "Interactive Figma prototype for the Family Tree Web Application.",
content: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/WY8wFLQpycygkNHo1oqA5z/Family-Tree-Web-Application?node-id=11-1415&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=113%3A324"
      },
    ],
    figmaUrl: "https://www.figma.com/design/WY8wFLQpycygkNHo1oqA5z/Family-Tree-Web-Application?node-id=10-279&t=546rtRhLwgYTbDdO-1",
    relatedProjects: [
      {
        slug: "quotable",
        title: "Quotable",
        category: "Fullstack Web App",
        image: "/quotable-thumb.png"
      },
      {
        slug: "beardsley-office-hub",
        title: "Beardsley Office Hub",
        category: "Office Management App",
        image: "/beardsley-office-thumb.png"
      }
    ],
    order: 15,
  },
  {
    id: 12,
    slug: "beardsley-office-hub",
    title: "Beardsley Office Hub",
    category: "Office Management App",
    shortDescription:
      "Office seating chart application for Beardsley Architects and Engineers with GitHub integration to update seating chart and employee information.",
    description: [
      "Office seating chart application developed for Beardsley Architects and Engineers to manage workspace organization and employee seating arrangements.",
      "Features GitHub integration that allows for automated updates to seating charts and employee information through version control workflows.",
      "Designed to streamline office management processes and provide real-time visibility into workspace utilization and employee locations.",
    ],
    features: [
      "Interactive office seating chart visualization",
      "GitHub integration for automated updates",
      "Employee information management system",
      "Real-time seating chart updates",
      "Workspace utilization tracking",
      "Professional office management interface",
      "Version control integration for data management",
    ],
    technologies: ["JavaScript", "React", "GitHub API", "Web Development", "Office Management"],
    coverImage: "/beardsley-office-cover.png",
    thumbnailImage: "/beardsley-office-thumb.png",
    timeline: "Client Project (2024)",
    role: "Frontend Developer",
    client: "Beardsley Architects and Engineers",
    liveUrl: "https://beardsley-office-hub.vercel.app/",
    githubUrl: "https://github.com/SamanthaJeanneb/Beardsley-Office-Hub",
    relatedProjects: [
      {
        slug: "beardsley-map-application",
        title: "Beardsley Map Application",
        category: "Interactive Map Portfolio",
        image: "/beardsley-map-thumb.png"
      },
      {
        slug: "interactive-project-map",
        title: "Interactive Project Map",
        category: "Web Prototype",
        image: "/interactive-map-thumb.png"
      }
    ],
    order: 8,
  },
  {
    id: 13,
    slug: "beardsley-map-application",
    title: "Beardsley Map Application",
    category: "Interactive Map Portfolio",
    shortDescription:
      "Interactive, map-based portfolio for presenting architectural and engineering projects with project filtering, administrative controls, and CSV import/export.",
    description: [
      "Beardsley Map Application is an interactive, map-based portfolio used to present architectural and engineering projects from Beardsley Architects + Engineers.",
      "The application provides a comprehensive project showcase with advanced filtering capabilities and administrative management tools.",
      "Features CSV import/export functionality for efficient project data management and seamless integration with existing workflows.",
    ],
    features: [
      "Interactive map-based project visualization",
      "Advanced project filtering and search capabilities",
      "Administrative controls for project management",
      "CSV import/export functionality",
      "Professional project portfolio presentation",
      "Real-time project data updates",
      "Responsive design for all devices",
    ],
    technologies: ["JavaScript", "React", "Interactive Maps", "CSV Processing", "Admin Dashboard"],
    coverImage: "/beardsley-map-cover.png",
    thumbnailImage: "/beardsley-map-thumb.png",
    timeline: "Client Project (2024)",
    role: "Frontend Developer",
    client: "Beardsley Architects + Engineers",
    liveUrl: "https://beardsley-project-map.netlify.app",
    githubUrl: "https://github.com/SamanthaJeanneb/Beardsley-Map-Application",
    order: 9,
  },
  {
    id: 101,
    slug: "vex-robotics",
    title: "VEX Robotics Competition",
    category: "Robotics",
    shortDescription:
      "Competition robot designed, built, and programmed for VEX Robotics, part of a national championship college season.",
    description: [
      "VEX is a competitive robotics league where teams design, build, and program a robot to play a brand new game each season, scoring points in a short autonomous period and a driver-controlled period against alliances of other teams.",
      "Our robot was built around a custom metal chassis with an omni-wheel drivetrain for fast, agile positioning, paired with a multi-jointed arm and claw intake for picking game pieces off the field and placing them into scoring zones.",
      "Each season ran like an engineering sprint: design in CAD, build, break, and rebuild, program autonomous routines, and log hours of driver practice, with scrimmages and tournaments stress-testing every decision along the way.",
      "Competing in college at SUNY Oswego, our team earned a national championship and won the Innovate Award at nationals, recognizing a uniquely clever design element. The work also contributed to a New York State innovation grant.",
      "VEX is where I first learned to design for the physical world: parts that have to survive real matches, real loads, and real deadlines. That mindset carried directly into building Suzanne.",
    ],
    features: [
      "Custom metal chassis with omni-wheel drivetrain",
      "Multi-jointed arm with claw intake for game pieces",
      "Programmed autonomous scoring routines",
      "Tournament-tuned driver control",
      "Season-long design, build, and rebuild iteration cycles",
      "Match strategy and alliance play",
    ],
    technologies: ["VEX V5", "Mechanical design", "CAD", "Autonomous programming", "Match strategy"],
    coverImage: "/vex/genius-robotics.webp",
    thumbnailImage: "/vex/genius-robotics.webp",
    timeline: "VEX U, SUNY Oswego",
    role: "Design, build, and programming",
    gallery: [
      {
        url: "/vex/genius-robotics.webp",
        caption: "Mid-match: the arm and claw placing game pieces into a scoring bin",
      },
    ],
    order: 2,
  },
  {
    id: 15,
    slug: "visionforge",
    title: "CalHacks 12.0 - VisionForge",
    category: "AR/VR Prototyping Tool",
    shortDescription:
      "Web-based, voice-activated augmented reality rapid prototyping environment inspired by Tony Stark's design process in Iron Man II.",
    description: [
      "VisionForge is an augmented reality web application that allows users to place and manipulate 3D objects in a simulated environment using voice commands.",
      "Inspired by the scene from Iron Man II where Tony Stark discovers a new element, modifying designs and structures on command and visualizing all changes in real-time.",
      "Users can adjust object size, proportions, or change the object entirely, and save their work as STL files for 3D printing.",
    ],
    features: [
      "Voice-activated 3D object placement and manipulation",
      "Real-time AR/VR visualization with Meta Quest 2 support",
      "STL file export for 3D printing",
      "OpenSCAD code generation from natural language",
      "WebXR integration for spatial manipulation",
      "Speech recognition and 3D model rendering",
    ],
    technologies: ["TypeScript", "WebXR", "Python", "Flask", "Claude", "Gemini", "Three.js", "OpenSCAD", "Node.js", "JavaScript"],
    coverImage: "/Vision-forge/IMG_4314.jpg",
    thumbnailImage: "/Vision-forge/IMG_4314.jpg",
    timeline: "Hackathon Project (CalHacks 12.0)",
    role: "Developer",
    githubUrl: "https://github.com/eggoil166/calhacks",
    videoUrl: "https://www.youtube.com/embed/iQE7kwcXefY",
    gallery: [
      {
        url: "/Vision-forge/IMG_4314.jpg",
        caption: "VisionForge Demo"
      },
      {
        url: "/Vision-forge/IMG_4315.jpg",
        caption: "VisionForge Team"
      }
    ],
    layout: {
      showProcessFirst: false,
      showGallery: true,
      showTechnologies: true,
      showFeatures: true,
      customOrder: ['description', 'features', 'technologies']
    },
    order: 10,
  },
  {
    id: 16,
    slug: "zyra",
    title: "Zyra",
    category: "Capstone Project",
    shortDescription:
      "Interactive art player that uses AI only to fetch YouTube URLs, runs them through yt-dlp, and turns playback into touch-responsive visuals.",
    description: [
      "Zyra uses a lightweight AI agent strictly to parse natural language prompts and return the precise YouTube URL a user is looking for.",
      "Once the link is confirmed, yt-dlp handles downloading and converting the audio so it can be played locally with consistent latency.",
      "Art Mode then launches a full-screen canvas with shaders, particle fields, and typography that react to both the beat and direct touch or pointer gestures.",
      "The goal is to jump from an idea to an immersive audio-visual performance in seconds without AI trying to compose music—just to fetch the right source.",
    ],
    features: [
      "AI prompt interpreter that returns the exact YouTube URL users actually want",
      "YouTube metadata parsing with automatic yt-dlp download + conversion pipeline",
      "Audio playback controls with seamless buffering and track switching",
      "Touch/gesture-driven Art Mode that paints interactive visual layers",
      "Audio-reactive visualizer that syncs color, motion, and typography to the beat",
      "Visualizer presets for concerts, neon grids, and experimental typography modes",
    ],
    technologies: ["React", "Next.js", "yt-dlp", "TypeScript", "WebGL", "Canvas", "Audio API"],
    coverImage: "/Zyra/Coverimage.png",
    thumbnailImage: "/Zyra/Coverimage.png",
    timeline: "Capstone Project (2025)",
    role: "Developer",
    githubUrl: "https://github.com/ArvindAGI22/Zyra",
    gallery: [
      {
        url: "/Zyra/Coverimage.png",
        caption: "Zyra Cover Image"
      },
      {
        url: "/Zyra/Artmode1.png",
        caption: "Zyra Art Mode 1"
      },
      {
        url: "/Zyra/artmode2.png",
        caption: "Zyra Art Mode 2"
      },
      {
        url: "/Zyra/Visualizer.png",
        caption: "Zyra Visualizer"
      }
    ],
    layout: {
      showProcessFirst: false,
      showGallery: true,
      showTechnologies: true,
      showFeatures: true,
      customOrder: ['description', 'features', 'technologies']
    },
    order: 11,
  },
]

// Branding Projects Section
export interface BrandingProject {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  coverImage: string
  thumbnailImage: string
  timeline: string
  role: string
  figmaUrl?: string
  styleGuideImage?: string
  process?: ProcessStep[]
}

const brandingProjects: BrandingProject[] = [
  {
    id: 1,
    slug: "reach-campus-connection",
    title: "Reach - Campus Connection App",
    category: "Branding / UI Design",
    shortDescription: "End-to-end branding system and UI/UX design for a campus networking & resource discovery platform.",
    description: [
      "Reach is a platform that helps college students discover organizations, events, study groups, mentorship opportunities, and campus resources through a personalized feed and structured discovery flows. I designed it during my product design internship at Pinear.",
      "I created a full branding system: logo suite (primary, wordmark, glyph), color architecture (core, semantic, neutrals), typography scale, iconography style, spacing grid, and motion guidelines.",
      "The UI design includes onboarding flows, adaptive dashboard/feed, event & organization detail pages, tag-driven discovery, messaging previews, and notification system wires elevated to high-fidelity interactive components.",
      "All components were built in a scalable design system in Figma (atoms → molecules → layouts), with documentation for states, accessibility contrast, and reusable interaction patterns." 
    ],
    features: [
      "Comprehensive visual identity system",
      "Figma component library w/ variants", 
      "Onboarding + personalization flow",
      "Tag & interest-based discovery model",
      "Organization + event detail layouts",
      "Messaging & notification UI patterns",
      "Accessibility-aware color system",
      "Scalable design tokens structure"
    ],
    coverImage: "/reach/reachcover.png",
    thumbnailImage: "/reach/reachcover.png",
    timeline: "Internship at Pinear (2023)",
    role: "Brand & UI/UX Designer",
    figmaUrl: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FHjaH7a6lu0J1OY2gyFsgwe%2FReach-Design-System%3Fnode-id%3D33525-595",
    styleGuideImage: "/reach/Reach color style 1- Dark.png",
    process: [
      {
        id: "prototype",
        type: "figma",
        title: "Interactive Prototype", 
        description: "High-fidelity prototype demonstrating feed, discovery, and event flows.",
        content: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FHjaH7a6lu0J1OY2gyFsgwe%2FReach-Design-System%3Fnode-id%3D33525-595"
      },
      {
        id: "prototype2",
        type: "figma",
        title: "Interactive Prototype", 
        description: "High-fidelity prototype demonstrating feed, discovery, and event flows.",
        content: "https://embed.figma.com/proto/irUmymGEXqgT40J64JUOGj/Pienee--Reach--r-prototype?node-id=3-3&starting-point-node-id=3%3A3&content-scaling=fixed&embed-host=share"
      },
      {
        id: "presentation",
        type: "canva",
        title: "Pitch Deck",
        description: "Complete pitch deck showcasing the Reach brand system and UI/UX design.",
        content: "https://www.canva.com/design/DAFtIfhosOc/wB-dgVgkGTdGUeqsT8Wi-w/view?embed"
      }
    ]
  },
  {
    id: 2,
    slug: "lakerhacks-branding",
    title: "LakerHacks Visual Identity",
    category: "Event Branding",
    shortDescription: "Complete brand identity system for SUNY Oswego's annual hackathon including logo, graphics, and promotional materials.",
    description: [
      "As the creator and lead Graphic Designer of LakerHacks, I developed the complete visual identity for SUNY Oswego's annual hackathon event.",
      "The branding system encompasses logo design, color palette, typography, promotional graphics, and digital assets used across all event touchpoints.",
      "Created a cohesive brand experience that reflects the innovative and collaborative spirit of the hackathon while maintaining accessibility and visual impact across various media formats.",
      "The identity system was designed to be scalable and adaptable for future iterations of the event."
    ],
    features: [
      "Logo design and brand mark development",
      "Event poster and promotional graphics",
      "Digital asset library for social media",
      "Typography and color system definition",
      "Merchandise and swag design",
      "Website visual elements integration",
      "Signage and environmental graphics",
      "Brand guidelines documentation"
    ],
    coverImage: "/lakerhacks-branding-cover.png",
    thumbnailImage: "/lakerhacks-branding-thumb.png",
    timeline: "Event Project (2024)",
    role: "Lead Graphic Designer & Brand Creator",
    figmaUrl: "https://embed.figma.com/proto/lkvhPVFdDW691fjhuAsBev/Brainstorming---Wireframes?node-id=195-13&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&embed-host=share",
    process: [
      {
        id: "research",
        type: "image",
        title: "Brand Research",
        description: "Initial research and mood boarding to establish the visual direction for LakerHacks.",
        content: "/lakerhacks-process-research.png"
      },
      {
        id: "logo-concepts",
        type: "image",
        title: "Logo Concepts",
        description: "Multiple logo iterations exploring different approaches to represent the hackathon spirit.",
        content: "/lakerhacks-process-logos.png"
      },
      {
        id: "figma-design",
        type: "figma",
        title: "Design System Development",
        description: "Interactive Figma workspace showing the complete brand system development and component library.",
        content: "https://embed.figma.com/proto/lkvhPVFdDW691fjhuAsBev/Brainstorming---Wireframes?node-id=195-13&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&embed-host=share"
      },
      {
        id: "final-brand",
        type: "image",
        title: "Final Brand System",
        description: "Complete brand system with logo, colors, typography, and application examples.",
        content: "/lakerhacks-process-final.png"
      }
    ]
  }
]

export function getAllBrandingProjects(): BrandingProject[] {
  return brandingProjects
}

export function getBrandingProjectBySlug(slug: string): BrandingProject | undefined {
  return brandingProjects.find((p) => p.slug === slug)
}

export { projects }

// Add these functions after the projects array export

export function getAllProjects(): Project[] {
  return projects
    .map((p) => ({ ...p }))
    .sort((a, b) => {
      const ao = a.order ?? Number.MAX_SAFE_INTEGER
      const bo = b.order ?? Number.MAX_SAFE_INTEGER
      if (ao !== bo) return ao - bo
      return a.title.localeCompare(b.title)
    })
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 3): RelatedProject[] {
  const currentProject = getProjectBySlug(currentSlug)

  // Start with explicitly-related projects if provided
  const initial: RelatedProject[] = currentProject?.relatedProjects
    ? [...currentProject.relatedProjects]
    : []

  // Build a pool of candidates excluding the current project and any already included
  const alreadyIncluded = new Set<string>([
    currentSlug,
    ...initial.map((p) => p.slug),
  ])

  const candidates: RelatedProject[] = projects
    .filter((p) => !alreadyIncluded.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      image: p.thumbnailImage,
    }))

  // Combine and cap to the desired limit
  const combined = [...initial, ...candidates]
  return combined.slice(0, limit)
}
