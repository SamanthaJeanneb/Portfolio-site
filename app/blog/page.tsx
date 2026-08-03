import type { Metadata } from "next"
import Link from "next/link"
import { getPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog | Samantha J. Brown",
  description: "Blog posts by Samantha J. Brown.",
}

const papers = [
  {
    title: "A Very Big Video Reasoning Suite",
    url: "https://video-reason.com/",
  },
  {
    title: "Learning to Draw ASCII Improves Spatial Reasoning in Language Models",
    url: "https://arxiv.org/abs/2604.14641",
  },
  {
    title: "Unleashing Spatial Reasoning in Multimodal Large Language Models via Textual Representation Guided Reasoning",
    url: "https://arxiv.org/abs/2603.23404",
  },
]

function formatDate(date: string) {
  if (!date) return ""
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <main className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto max-w-xl px-5 sm:px-8 py-12 sm:py-16">
        <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
          &larr; Home
        </Link>

        <h1 className="text-2xl font-bold text-white mt-8 mb-8">Blog</h1>

        {posts.length > 0 && (
          <ul className="space-y-6 mb-10">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-lg italic text-zinc-200 underline underline-offset-4 decoration-zinc-600 hover:text-white hover:decoration-zinc-400 transition-colors"
                >
                  {post.title}
                </Link>
                {post.date && <p className="text-sm text-zinc-500 mt-1">{formatDate(post.date)}</p>}
              </li>
            ))}
          </ul>
        )}

        <p className="text-zinc-400 italic mb-10">
          Writing in progress. First up: can LLMs learn to reason about space?
        </p>

        <h2 className="text-xl font-bold text-white mb-3">Cool papers I&apos;ve found on this topic!</h2>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-2">
          {papers.map((paper) => (
            <li key={paper.url}>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="italic text-zinc-400 underline underline-offset-4 decoration-zinc-600 hover:text-white hover:decoration-zinc-400 transition-colors"
              >
                {paper.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
