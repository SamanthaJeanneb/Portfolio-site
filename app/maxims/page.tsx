import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Maxims",
}

export default function MaximsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          noooo, private
        </h1>
      </article>
    </main>
  )
}
