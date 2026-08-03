import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "content/blog")

export interface Post {
  slug: string
  title: string
  date: string
  content: string
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const { data, content } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"))
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug)
}
