export interface Article {
  id: number
  title: string
  publication: string
  url: string
  date: string
  excerpt?: string
  image?: string
  videoUrl?: string
}

const articles: Article[] = [
  {
    id: 1,
    title: "Computer science, interaction design and winning hackathons: Samantha Brown thrives at Oswego",
    publication: "SUNY Oswego News",
    url: "https://www.oswego.edu/news/file/computer-science-interaction-design-and-winning-hackathons-samantha-brown-thrives-oswego",
    date: "November 2025",
    excerpt: "Samantha Brown excels in computer science and interaction design at SUNY Oswego, with a track record of winning hackathons and creating innovative projects that combine technology and design.",
    image: "/articles/samantha.jpg",
    videoUrl: "https://youtu.be/IUdZqbT2CLQ"
  },
  {
    id: 2,
    title: "LakerHacks earns top finishes in Johns Hopkins, Cornell University hackathons",
    publication: "SUNY Oswego News",
    url: "https://www.oswego.edu/news/story/lakerhacks-earns-top-finishes-johns-hopkins-cornell-university-hackathons",
    date: "October 2025",
    excerpt: "SUNY Oswego's LakerHacks team achieved notable success with top finishes at Johns Hopkins and Cornell University hackathons. Samantha Brown, director of LakerHacks, won Best Use of Gemini API and Best Design at Cornell's BigRed//Hacks with 'Bear Escape', a 3D browser-based rhythm game.",
    image: "/articles/lakerhacks-jh.jpg"
  },
  {
    id: 3,
    title: "LakerHacks provides learning opportunity with plans for future growth",
    publication: "SUNY Oswego News",
    url: "https://www.oswego.edu/news/story/lakerhacks-provides-learning-opportunity-plans-future-growth-0",
    date: "September 2025",
    excerpt: "The inaugural LakerHacks event redefined the traditional hackathon experience, drawing around 75 students. Samantha Brown, a key student architect of the event, helped create a vibrant space where innovation and collaboration thrived, with plans for future growth including Major League Hacking approval.",
    image: "/articles/lakerhacks2.png"
  }
]

export function getAllArticles(): Article[] {
  return articles.sort((a, b) => {
    // Sort by date, most recent first
    // Handle "Month Year" format by parsing it
    const parseDate = (dateStr: string): number => {
      try {
        // Try parsing as full date first
        const parsed = new Date(dateStr)
        if (!isNaN(parsed.getTime())) {
          return parsed.getTime()
        }
        // If that fails, try parsing "Month Year" format
        const [month, year] = dateStr.split(' ')
        const monthMap: { [key: string]: number } = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        }
        if (month && year && monthMap[month] !== undefined) {
          return new Date(parseInt(year), monthMap[month], 1).getTime()
        }
        return 0
      } catch {
        return 0
      }
    }
    return parseDate(b.date) - parseDate(a.date)
  })
}

export function getArticleById(id: number): Article | undefined {
  return articles.find((article) => article.id === id)
}

