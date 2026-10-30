import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Imagine AI redesign | Samantha J. Brown",
  description: "How I redesigned Imagine AI, from onboarding to dashboard.",
}

type Shot = { src: string; alt: string; caption: string }

function BeforeAfter({ before, after }: { before: Shot; after: Shot }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {[before, after].map((shot) => (
        <figure key={shot.src}>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={1600}
            height={1000}
            sizes="(min-width: 640px) 360px, 100vw"
            className="w-full h-auto border border-zinc-800"
          />
          <figcaption className="text-sm text-zinc-500 italic mt-1.5">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function ImagineAiPage() {
  const link = "italic text-zinc-400 underline underline-offset-4 decoration-zinc-600 hover:text-white hover:decoration-zinc-400 transition-colors"

  return (
    <main className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-10 py-10 text-base leading-relaxed">
        <p className="text-sm mb-6">
          <Link href="/" className={link}>
            home
          </Link>
          <span className="text-zinc-600"> · </span>
          <Link href="/projects" className={link}>
            projects
          </Link>
        </p>

        <h1 className="text-xl font-bold text-white mb-1">Redesigning Imagine AI</h1>
        <p className="text-sm text-zinc-500 mb-6">
          design engineering · 2026 ·{" "}
          <a href="https://useimagine.ai/" target="_blank" rel="noopener noreferrer" className={link}>
            useimagine.ai
          </a>
        </p>

        <p className="mb-4">
          When I joined Imagine AI (YC F25), the product worked, but it didn't feel like something you'd
          want to open every day. I spent my first few months rethinking it, from the first screen a new
          user sees to the dashboard people come back to.
        </p>

        <h2 className="text-lg font-bold text-white mt-8 mb-2">What wasn't working:</h2>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-0.5 mb-6">
          <li>New users landed on an empty dashboard with no idea where to start</li>
          <li>Three different button styles could show up on the same screen</li>
          <li>The thing people actually came for, their latest project, was buried two clicks deep</li>
        </ul>

        <h2 className="text-lg font-bold text-white mt-8 mb-2">What I changed:</h2>
        <p className="mb-4">
          I rebuilt the dashboard around one question: what is this person here to do right now?
          Everything else moved out of the way.
        </p>

        <BeforeAfter
          before={{
            src: "/imagine-ai/dashboard-before.png",
            alt: "The old Imagine AI dashboard, with a sidebar, two summary panels, and a large content area all competing for attention",
            caption: "before: everything competed for attention",
          }}
          after={{
            src: "/imagine-ai/dashboard-after.png",
            alt: "The new Imagine AI dashboard, with the latest project front and center and one primary action below it",
            caption: "after: one clear place to start",
          }}
        />

        <p className="mb-4">
          Onboarding got the same treatment. Instead of a five-step tour, new users now start with a
          single example project they can poke at right away.
        </p>

        <BeforeAfter
          before={{
            src: "/imagine-ai/onboarding-before.png",
            alt: "The old Imagine AI onboarding, a centered modal showing step 1 of a 5-step tour",
            caption: "before: step 1 of 5",
          }}
          after={{
            src: "/imagine-ai/onboarding-after.png",
            alt: "The new Imagine AI onboarding, which opens an example project in the full editor",
            caption: "after: start from a real example",
          }}
        />

        <p className="mb-4">
          Under the hood, I pulled every button, input, and card into one shared set of components, so
          the product finally looks like one thing.
        </p>

        <h2 className="text-lg font-bold text-white mt-8 mb-2">How it turned out:</h2>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-0.5 mb-6">
          <li>More new users made their first project on day one</li>
          <li>Fewer "where do I find…" support messages</li>
          <li>New screens now ship in days instead of weeks, because the pieces already exist</li>
        </ul>

        <h2 className="text-lg font-bold text-white mt-8 mb-2">What I learned:</h2>
        <p className="mb-4">
          The best redesigns are mostly subtraction. Most of my time went into deciding what to remove,
          not what to add.
        </p>

        <p>
          You can try it yourself at{" "}
          <a href="https://useimagine.ai/" target="_blank" rel="noopener noreferrer" className={link}>
            useimagine.ai
          </a>
          .
        </p>
      </div>
    </main>
  )
}
