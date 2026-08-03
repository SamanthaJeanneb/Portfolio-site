import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { getPost, getPosts } from "@/lib/blog"

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return { title: `${post.title} | Samantha J. Brown` }
}

function formatDate(date: string) {
  if (!date) return ""
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto max-w-xl px-5 sm:px-8 py-12 sm:py-16">
        <Link href="/blog" className="text-sm text-zinc-500 hover:text-white transition-colors">
          &larr; Blog
        </Link>

        <h1 className="text-2xl font-bold text-white mt-8 mb-2">{post.title}</h1>
        {post.date && <p className="text-sm text-zinc-500 mb-8">{formatDate(post.date)}</p>}

        <article className="space-y-4 text-lg leading-relaxed [&_a]:italic [&_a]:text-zinc-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-zinc-600 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-zinc-600 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-700 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_code]:text-base [&_img]:w-full [&_img]:h-auto">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  )
}
