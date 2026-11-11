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
          People want the best outcome for as little spend as possible. So I made a budget planner that picks the
          best model for each part of your project based on what you want to spend, and I&apos;d grow it on Discord as a
          weekly challenge: what can you build with $1? $5?
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
          <li>You describe your project and set a budget</li>
          <li>
            You pick the planning model from a dropdown ranked by intelligence score, with the price next to each one
          </li>
          <li>It breaks the project into tasks: planning, coding, tests, UI, review, docs</li>
          <li>Each task gets the best model your budget can afford, with the benchmark score it was picked on and the runner-up</li>
          <li>Lock or swap any model and everything else rebalances to the money that&apos;s left</li>
          <li>The budget is a cap, not a target. If you set $10k and the best stack costs $100, you see the $100 stack</li>
          <li>
            A lower budget swaps closed models for the closest open-source or Chinese models, and shows the points
            you lose and the money you save
          </li>
          <li>Requirements: minimum quality per task, open-source only, exclude labs or regions, zero data retention, context length, speed</li>
          <li>Cost estimate based on OpenRouter&apos;s real cost-per-session data, shown as a range with the math</li>
          <li>New tags on recent models, a News tab, and a Benchmarking tab with your stack highlighted</li>
          <li>Export to Claude Code, Cline, or OpenCode so your agent uses the right model for each task, with an OpenRouter spending cap</li>
        </List>
        <p className="mb-4 text-zinc-400">
          Built on OpenRouter&apos;s Chat Completions, Models, Benchmarks, Classifications, and Datasets APIs.
        </p>

        <H2>How I know people need it</H2>
        <p className="mb-4">
          In the OpenRouter Discord, people keep asking the same thing: what&apos;s the best model I can afford for this?
        </p>

        <Shot
          src="/openrouter/cost-to-performance.png"
          alt="Discord message in #general: I'm trying to find the best model for building applets / gtk stuff / python scripting that's like good on cost to performance"
          width={394}
          height={172}
          caption="#general. Best model for the job, good on cost to performance."
        />
        <Shot
          src="/openrouter/best-and-cheapest.png"
          alt="Discord message asking the Answer HQ bot for the best and cheapest model for Arabic structured data extraction"
          width={394}
          height={326}
          caption="#general. Asking the support bot for the best and cheapest model for one specific task."
        />
        <Shot
          src="/openrouter/too-expensive.png"
          alt="Discord message: Anthropic responses are usually better, but Anthropic models are still way too expensive for me to use on the regular"
          width={394}
          height={150}
          caption="#models. The better model isn't worth it if you can't afford to use it."
        />
        <Shot
          src="/openrouter/naming.png"
          alt="Discord message complaining that new model names make it impossible to know what is what"
          width={394}
          height={304}
          caption="#models. New models come out so fast people can't keep track of what's what."
        />

        <p className="mb-2">From Discord search on Nov 10, 2026:</p>
        <List>
          <li>2,134 messages mention &quot;cheaper,&quot; 248 say &quot;too expensive,&quot; and 203 talk about price and performance</li>
          <li>
            These questions don&apos;t have a home. About 70 of the latest 100 threads in #community-help are billing or
            account issues, and only about 3 ask which model to use or how to cut costs. The rest end up scattered in
            #general and #models, or asked to the bot
          </li>
        </List>

        <H2>How I&apos;d grow it on Discord</H2>

        <H3>What I noticed</H3>
        <List>
          <li>
            #models is the heart of the server. &quot;Upcoming models speculation&quot; has 16,408 replies, up about 1,580
            since I first checked on Oct 29. New model threads fill up fast: Gemini 4 Carbon has 488 replies and Claude
            Fable 5.2 has 269
          </li>
        </List>
        <Shot
          src="/openrouter/models-forum.png"
          alt="The #models forum showing Upcoming models speculation with 16,408 replies"
          width={1025}
          height={580}
          caption="#models, Nov 10, 2026."
          wide
        />
        <List>
          <li>
            #new-models is an automated feed. Gemini 4 Carbon&apos;s post got 8 reactions while its #models thread got 488
            replies. People don&apos;t just want to know a model is out, they want to talk about whether it&apos;s worth it
          </li>
          <li>
            #community-help is mostly billing and account issues, so builders asking &quot;what should I use?&quot; get
            lost in it
          </li>
          <li>
            At least 21 of the 68 newest posts in #feedback-and-requests have no replies. One of them asks for a way for
            the community to rate which model and provider combos actually work
          </li>
        </List>
        <Shot
          src="/openrouter/rating-idea.png"
          alt="Feedback post asking for community feedback and ratings for providers or provider/model combinations"
          width={1210}
          height={1340}
          caption="#feedback-and-requests, Nov 8, 2026. Members are asking for community ratings."
          maxClass="max-w-[560px]"
        />
        <List>
          <li>The rules point people to #app-showcase, but it isn&apos;t in the channel list, so there&apos;s no visible place to show what you built</li>
          <li>
            Events so far are big one-offs: Build Day with Meta, a model battle royale livecast, and In Production in SF.
            Build Day was a timed build challenge in person
          </li>
        </List>

        <H3>The initiative: Budget Build</H3>
        <p className="mb-4">
          Every week there&apos;s one small build prompt and a budget cap. What can you build with $1? $5? You plan your
          stack in the budget planner, build it, and post your stack, what you actually spent, and a demo. The best build
          for the least money wins.
        </p>
        <List>
          <li>This server already argues about price and performance every day. Budget Build turns that into real results</li>
          <li>It gives people a reason to try the cheap and brand-new models they&apos;d otherwise skip</li>
          <li>Every entry is a real data point on which models work for which task, which is the community rating members are already asking for</li>
          <li>It&apos;s a twist on Build Day: online, every week, and the limit is money instead of time</li>
        </List>

        <H3>How it runs</H3>
        <List>
          <li>Week 1: I post the prompt, seed a few example entries, judge by hand, and shout out winners in #general</li>
          <li>
            Week 8: a bot posts the prompt every Monday from a member-voted queue, opens the thread, sends reminders,
            closes entries Sunday, and tallies votes. Past winners get a Budget Builder role, judge, and write the next
            prompts
          </li>
          <li>Automated: posting prompts, threads, reminders, vote counts, and a monthly &quot;best stack per dollar&quot; leaderboard</li>
          <li>Needs a human: choosing early prompts, breaking ties, and featuring entries on X</li>
          <li>Members own: the prompt queue, judging, and the weekly stack writeup</li>
          <li>If I&apos;m out for a week: the queue already has prompts, the bot runs it, and member judges pick the winner</li>
        </List>

        <H3>Launch announcement</H3>
        <Copy>
          {`**Budget Build: what can you build with $1?**

Every week we'll drop one small build prompt and a budget. You pick your models, build it, and show us what it cost.

**This week:** a CLI that summarizes any GitHub repo. **Budget: $1.**

How to enter:
1. Plan your stack with the budget planner (or pick models yourself)
2. Build it
3. Post in #budget-build: your stack, what you spent, and a quick demo

Best build for the least spend gets the Budget Builder role and gets featured. Entries close Sunday.

Show us what $1 gets you.`}
        </Copy>

        <H3>Event promotion</H3>
        <Copy>
          {`**In Production: OpenRouter x ElevenLabs**
Tuesday, Nov 17 · 5:30 to 8:30 PM PT · San Francisco

Founders building voice and audio products with ElevenLabs models on OpenRouter are showing what they actually shipped. Live.

- Real products, live demos
- How they picked their models and what it costs to run them
- The problems that don't show up in a benchmark

RSVP: https://luma.com/wvw8xwsi

Can't make it? Drop your questions for the builders in this thread and we'll bring the best ones to the room.`}
        </Copy>

        <H3>Success</H3>
        <List>
          <li>20+ entries a week by week 4</li>
          <li>30%+ of entrants come back for a second challenge</li>
          <li>Replies and reactions on entries from people who didn&apos;t enter</li>
          <li>Planner visits and new OpenRouter signups from challenge links</li>
          <li>Fewer &quot;which model should I use?&quot; questions going to the bot</li>
          <li>
            If it isn&apos;t working: fewer than 10 entries means the prompts get smaller or there&apos;s a free-models
            tier. Low return rate means adding streaks and the monthly leaderboard
          </li>
        </List>

        <H3>Other communities</H3>
        <List>
          <li>X: a weekly &quot;what $1 built this week&quot; post with the winning stack and cost</li>
          <li>Reddit: a monthly roundup of the cheapest working stacks for r/LocalLLaMA, where people care about open models</li>
          <li>Everything links back to the Discord thread to enter</li>
        </List>

        <p className="mt-12 text-sm text-zinc-500">Discord data from the OpenRouter server, Nov 10, 2026.</p>
      </div>
    </main>
  )
}
