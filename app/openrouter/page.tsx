import Image from "next/image"
import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What can you build with $1? | Samantha J. Brown",
  description: "A budget planner for building with LLMs, and a Discord challenge to grow it.",
  robots: { index: false, follow: false },
}

const link =
  "italic text-zinc-400 underline underline-offset-4 decoration-zinc-600 hover:text-white hover:decoration-zinc-400 transition-colors"

function Shot({
  src,
  alt,
  width,
  height,
  caption,
  wide = false,
  maxClass = "max-w-[400px]",
}: {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  wide?: boolean
  maxClass?: string
}) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-auto rounded-lg border border-zinc-800 ${wide ? "w-full" : `w-full ${maxClass}`}`}
      />
      <figcaption className="mt-2 text-sm text-zinc-500">{caption}</figcaption>
    </figure>
  )
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 mb-3 text-lg font-bold text-white">{children}</h2>
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 mb-2 font-bold text-white">{children}</h3>
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-1 mb-4">{children}</ul>
  )
}

function Copy({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 whitespace-pre-line rounded-lg border border-zinc-800 bg-zinc-950 p-5 font-sans text-sm leading-relaxed text-zinc-300">
      {children}
    </div>
  )
}

export default function OpenRouterPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto w-full max-w-3xl px-8 sm:px-10 py-12 text-base leading-relaxed">
        <p className="text-sm text-zinc-500 mb-2">OpenRouter take-home · Community Lead, Developer Relations</p>
        <h1 className="text-2xl font-bold text-white mb-4">What can you build with $1?</h1>

        <p className="mb-4">
          People want the best outcome for as little spend as possible. So I made a budget planner that picks the best
          model for each part of your project, and I&apos;d grow it on Discord as a challenge: what can you build with $1?
          $5?
        </p>

        <H2>What I built</H2>
        <p className="mb-4">
          A project budget planner.{" "}
          <a
            href="https://github.com/SamanthaJeanneb/model-budget-planner"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            Repo
          </a>
        </p>
        <List>
          <li>Describe your project and set a budget</li>
          <li>Pick which model plans it, ranked by intelligence score with the price next to each</li>
          <li>Every task gets the best model your budget can afford, and you can see why it was picked</li>
          <li>Lock or swap a model and the rest rebalance to the money that&apos;s left</li>
          <li>Set $10k and the best stack costs $100? You see the $100 stack</li>
          <li>Lower budgets swap in the closest open-weight models, with what you give up and what you save</li>
          <li>Requirements, cost estimates from real session data, new model tags, and news and benchmark tabs</li>
          <li>Export to Claude Code, Cline, or OpenCode so your agent uses the right model for each task</li>
        </List>

        <H2>How I know people need it</H2>
        <p className="mb-4">People in the OpenRouter Discord keep asking the same thing: what&apos;s the best model I can afford for this?</p>

        <Shot
          src="/openrouter/cost-to-performance.png"
          alt="Discord message in #general: I'm trying to find the best model for building applets / gtk stuff / python scripting that's like good on cost to performance"
          width={394}
          height={172}
          caption="#general"
        />
        <Shot
          src="/openrouter/best-and-cheapest.png"
          alt="Discord message asking the Answer HQ bot for the best and cheapest model for Arabic structured data extraction"
          width={394}
          height={326}
          caption="#general, asking the support bot"
        />
        <Shot
          src="/openrouter/too-expensive.png"
          alt="Discord message: Anthropic responses are usually better, but Anthropic models are still way too expensive for me to use on the regular"
          width={394}
          height={150}
          caption="#models"
        />
        <Shot
          src="/openrouter/naming.png"
          alt="Discord message complaining that new model names make it impossible to know what is what"
          width={394}
          height={304}
          caption="#models, on keeping up with new releases"
        />

        <List>
          <li>2,134 messages mention &quot;cheaper,&quot; 248 say &quot;too expensive&quot; (Discord search, Nov 10)</li>
          <li>These questions don&apos;t have a home. About 70 of the last 100 #community-help threads are billing or account issues</li>
        </List>

        <H2>Growing it on Discord</H2>

        <H3>What I noticed</H3>
        <List>
          <li>#models is where the energy is. &quot;Upcoming models speculation&quot; is at 16,408 replies, up about 1,580 since Oct 29</li>
        </List>
        <Shot
          src="/openrouter/models-forum.png"
          alt="The #models forum showing Upcoming models speculation with 16,408 replies"
          width={1025}
          height={580}
          caption="#models, Nov 10"
          wide
        />
        <List>
          <li>The #new-models post for Gemini 4 Carbon got 8 reactions. Its #models thread got 488 replies. People want to talk about whether a model is worth it</li>
          <li>At least 21 of the 68 newest #feedback-and-requests posts have no replies</li>
          <li>Members are already asking for a way to rate which models and providers actually work</li>
        </List>
        <Shot
          src="/openrouter/rating-idea.png"
          alt="Feedback post asking for community feedback and ratings for providers or provider/model combinations"
          width={1210}
          height={1340}
          caption="#feedback-and-requests, Nov 8"
          maxClass="max-w-[560px]"
        />

        <H3>This project: Budget Build</H3>
        <List>
          <li>
            When people ask what models cost or what to use for different tasks, point them to the budget planner. It&apos;s a
            simple way to start exploring open-weight models
          </li>
          <li>Set a budget challenge and get the community to build something under it and explain how</li>
          <li>It directly grows OpenRouter usage. Demos of building an app for $1 vs $100 are the type of thing that gets attention</li>
          <li>
            It gets people building with models outside Claude and OpenAI. It gives them a reason to build something and see
            what&apos;s possible with open-weight
          </li>
          <li>Every entry is a real example of which models work for what, which is the rating people are already asking for</li>
        </List>

        <H3>How it runs</H3>
        <List>
          <li>Week 1: I post the challenge, build an example entry myself, and judge by hand</li>
          <li>Week 8: a bot posts the prompt and counts votes, past winners judge and pick the next budget</li>
          <li>If I&apos;m out for a week, the prompts are already queued and the judges are members</li>
        </List>

        <H3>Discord in general</H3>
        <List>
          <li>
            Regularly engage with the community and support what they&apos;re building with my own comments. People keep
            building when they feel seen by the team behind the tool they&apos;re using
          </li>
          <li>Show up where people already talk, like #models, not just #announcements</li>
          <li>Reply to feedback posts, even just to say we saw it and what happens next</li>
          <li>Give people a visible place to show what they built</li>
          <li>Get billing and account issues to support fast so help channels stay about building</li>
          <li>Recognize regulars with roles and shoutouts, then let them run things</li>
          <li>Run online events too, so people outside SF and NYC can show up</li>
        </List>

        <H3>Announcements</H3>
        <p className="mb-4">
          OpenRouter&apos;s event posts already have a strong hook, a &quot;you&apos;ll get&quot; list, and one link. I&apos;d
          keep that and add a deadline, an easy way to enter, and a reason to reply in the thread.
        </p>

        <p className="mb-2 text-sm text-zinc-500">Launch announcement</p>
        <Copy>
          {`**budget build: what can you build with $1?**

new every week. one budget, any models you want.

this week: build something useful for **$1**. next week: **$5**.

you'll get:
- a reason to finally try that open-weight model you've been eyeing
- a spot on the weekly leaderboard
- the Budget Builder role and a feature on @OpenRouter

how to enter:
1. plan your stack with the budget planner (or pick your own models)
2. build it
3. post in #budget-build: what you built, your models, and what it cost

entries close sunday. reply with what you're building so people can follow along`}
        </Copy>

        <p className="mb-2 text-sm text-zinc-500">Event promotion (example event)</p>
        <Copy>
          {`**PRESENTING: $1 VS $100**

two builders. same app. one has $1, the other has $100.

can open-weight models keep up with the frontier? we're finding out live.

thursday, 12 PM PT, live on discord stage

you'll get:
- a live build from scratch, start to finish
- the exact model stack and cost for each build
- free OpenRouter credits to try your own $1 build after

sign up here: [luma link]

drop your guess in this thread: does $1 win?`}
        </Copy>

        <H3>Success</H3>
        <List>
          <li>20+ entries a week by week 4, and 30% of people coming back for another challenge</li>
          <li>More spend on open-weight models from people who entered</li>
          <li>Fewer &quot;which model should I use?&quot; questions going to the bot</li>
          <li>If entries are low, make the challenge smaller or add a free models round</li>
        </List>

        <H3>Other communities</H3>
        <List>
          <li>X: post the best $1 build each week with its stack and cost</li>
          <li>Reddit: a monthly roundup of the cheapest working stacks for r/LocalLLaMA</li>
          <li>Everything links back to Discord to enter</li>
        </List>

        <p className="mt-12 text-sm text-zinc-500">Discord data from the OpenRouter server, Nov 10, 2026.</p>
      </div>
    </main>
  )
}
