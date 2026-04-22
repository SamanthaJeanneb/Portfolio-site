import type { Metadata } from "next"

const author = "Marc Randolph"
const handle = "@marcrandolph"

export const metadata: Metadata = {
  title: "Tuesday Nights",
}

const paragraphs = [
  "My definition of success is a bit different.",
  "I’ve worked hard, for my entire career, to keep my life balanced with my job. In my book, I write about my Tuesday date nights with my wife. For over thirty years, I had a hard cut-off on Tuesdays. Rain or shine, I left at exactly 5 pm and spent the evening with my best friend. We would go to a movie, have dinner, or just go window-shopping downtown together.",
  "Nothing got in the way of that. No meeting, no conference call, no last-minute question or request. If you had something to say to me on Tuesday afternoon at 4:55, you had better say it on the way to the parking lot. If there was a crisis, we are going to wrap it up by 5:00.",
  "Those Tuesday nights kept me sane. And they put the rest of my work in perspective.",
  "I resolved a long time ago to not be one of those entrepreneurs on their 7th startup and their 7th wife. In fact, the thing I'm most proud of in my life is not the companies I started, it’s the fact that I was able to start them while staying married to the same woman; having my kids grow up knowing me and (best as I can tell) liking me, and being able to spend time pursuing the other passions in my life.",
  "That’s my definition of success.",
]

export default function TuesdayNightsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <article className="rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50 p-5 shadow-sm sm:p-8">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Tuesday Nights
        </h1>
        <p className="mb-8 text-xs uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Saved Inspiration
        </p>

        <div className="mb-8 border-l-4 border-blue-400 pl-4">
          <p className="text-base font-semibold text-neutral-900 sm:text-lg">
            {author}
          </p>
          <p className="text-sm text-blue-700">{handle}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            Marc Randolph is the co-founder and first CEO of Netflix
          </p>
        </div>

        <div className="space-y-4 text-sm leading-7 text-neutral-800 sm:space-y-5 sm:text-base sm:leading-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? "text-lg font-medium text-neutral-900 sm:text-xl" : ""}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  )
}
