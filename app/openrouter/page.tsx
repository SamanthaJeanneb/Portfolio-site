import Image from "next/image"
import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What can you build with $5? | Samantha J. Brown",
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
  wide = false,
  maxClass = "max-w-[400px]",
}: {
  src: string
  alt: string
  width: number
  height: number
  wide?: boolean
  maxClass?: string
}) {
  return (
    <figure className="my-5">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-auto rounded-lg ${wide ? "w-full" : `w-full ${maxClass}`}`}
      />
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

function Copy({ children }: { children: string }) {
  const parts = children.split("**")
  return (
    <div className="my-4 whitespace-pre-line rounded-lg bg-[#313338] p-5 font-sans text-sm leading-relaxed text-zinc-200">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-white">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </div>
  )
}

export default function OpenRouterPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto w-full max-w-3xl px-8 sm:px-10 py-12 text-base leading-relaxed">
        <p className="text-sm text-zinc-500 mb-2">OpenRouter take-home · Community Lead, Developer Relations</p>
        <h1 className="text-2xl font-bold text-white mb-4">What can you build with $5?</h1>

        <p className="mb-4">
          Everyone building with AI wants the best outcome for as little spend as possible. So I built a budget planner
          that picks the best model for each part of your project, and I&apos;d grow it on Discord with a challenge: what
          can you build with $5?
        </p>

        <H2>Part 1: What I built</H2>
        <p className="mb-4">
          I built a project budget planner.{" "}
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
        <p className="mb-4">I kept seeing the same question in the OpenRouter Discord: what&apos;s the best model I can afford for this?</p>

        <Shot
          src="/openrouter/cost-to-performance.png"
          alt="Discord message in #general: I'm trying to find the best model for building applets / gtk stuff / python scripting that's like good on cost to performance"
          width={394}
          height={172}
        />
        <Shot
          src="/openrouter/best-and-cheapest.png"
          alt="Discord message asking the Answer HQ bot for the best and cheapest model for Arabic structured data extraction"
          width={394}
          height={326}
        />
        <Shot
          src="/openrouter/too-expensive.png"
          alt="Discord message: Anthropic responses are usually better, but Anthropic models are still way too expensive for me to use on the regular"
          width={394}
          height={150}
        />
        <Shot
          src="/openrouter/naming.png"
          alt="Discord message complaining that new model names make it impossible to know what is what"
          width={394}
          height={304}
        />

        <p className="mb-4">When I searched the server, &quot;too expensive&quot; came up in 248 messages.</p>

        <H2>Part 2: Growing it on Discord</H2>

        <H3>What I noticed</H3>
        <p className="mb-4">
          The first thing I noticed is that people show up for new models. #models is the busiest place in the server.
          The &quot;Upcoming models speculation&quot; thread was at about 14,800 replies when I joined and 16,408 twelve
          days later. When a model drops, its thread fills up the same day.
        </p>
        <Shot src="/openrouter/models-forum.png" alt="The #models forum showing Upcoming models speculation with 16,408 replies" width={1025} height={580} wide />
        <p className="mb-4">
          From what I saw, they come back for the next drop and to argue about whether it&apos;s worth the price. When I
          searched &quot;cheaper,&quot; I got 2,134 messages.
        </p>
        <p className="mb-2">What I don&apos;t think is working:</p>
        <List>
          <li>#new-models is a bot feed. Gemini 4 Carbon&apos;s post there got 8 reactions while its #models thread got 488 replies. The conversation happens in #models, not where the model gets announced</li>
          <li>I went through the last 100 #community-help threads and about 70 were billing or account problems. If you just want to know what model to use, there&apos;s nowhere to ask, so people ask in #general or ping the bot</li>
          <li>At least 21 of the 68 newest #feedback-and-requests posts have no replies. If I posted an idea and nobody answered, I wouldn&apos;t post again. I think this is where people stop engaging</li>
          <li>People do post what they built in #app-showcase. I scrolled through the 10 projects posted Nov 5 to 9, and none of them got a reaction or a reply from anyone else. It&apos;s not on the default channel list either, so I almost missed it myself</li>
          <li>Most events are in person in SF and NYC, and the #events posts I looked at got 0 to 8 reactions</li>
        </List>
        <p className="mb-4">
          What I think people want and aren&apos;t getting is an answer to &quot;what&apos;s the best model I can afford for
          this?&quot; Someone even posted asking for a way to rate which models and providers actually work.
        </p>
        <Shot src="/openrouter/rating-idea.png" alt="Feedback post asking for community feedback and ratings for providers or provider/model combinations" width={1210} height={1340} maxClass="max-w-[520px]" />

        <H3>The initiative: Budget Build</H3>
        <p className="mb-4">
          I&apos;d launch a weekly challenge with a budget and a prompt. What can you build with $5? You plan your stack
          with my budget planner, build it, and post what you built, which models you used, and what it cost. Best build
          for the least money wins.
        </p>
        <p className="mb-2">Why I think it works here:</p>
        <List>
          <li>This server already argues about price vs performance all day. This gives that somewhere to go</li>
          <li>It gets people building with models outside Claude and OpenAI. A $5 cap pretty much forces you to try open-weight models</li>
          <li>It directly grows OpenRouter usage. Building an app for $5 vs $100 is the type of thing that gets attention</li>
          <li>Every entry is a real example of which models work for what, which is the rating people are already asking for</li>
          <li>When someone asks &quot;what should I use?&quot;, there&apos;s finally an answer: try the planner and look at past entries</li>
          <li>It&apos;s a twist on Build Day. Online, every week, and the limit is money instead of time</li>
        </List>

        <H3>How it runs</H3>
        <List>
          <li>Week 1: I post the challenge, build an entry myself, judge by hand, and comment on every entry</li>
          <li>Week 8: a bot posts the prompt from a list members voted on, opens the thread, sends a reminder before the deadline, and counts votes. Past winners judge and pick next week&apos;s budget</li>
          <li>Automated: posting, reminders, vote counts, the leaderboard</li>
          <li>Needs a human: the first few prompts, tie-breaks, sending credits, featuring builds on X</li>
          <li>Members own: the prompt list, judging, and the writeup of the winning stack</li>
          <li>If I&apos;m out for a week, the prompts are already queued, the bot runs it, and member judges pick the winner</li>
        </List>
        <p className="mb-2">Outside the challenge, here&apos;s what I&apos;d do day to day:</p>
        <List>
          <li>Regularly engage with the community and support what they&apos;re building with my own comments. People keep building when they feel seen by the team behind the tool they&apos;re using</li>
          <li>Hang out in #models, not just post in #announcements</li>
          <li>Reply to every feedback post, even if it&apos;s just &quot;we saw this&quot;</li>
          <li>React and reply to #app-showcase posts, and get the channel on everyone&apos;s list</li>
          <li>Get billing issues to support fast so they don&apos;t take over the help channel</li>
          <li>Give regulars roles and let them run things</li>
        </List>

        <H3>The copy</H3>
        <p className="mb-4">
          I looked at what already does well in #announcements: posts that sound like a person, @everyone for big news,
          and shoutouts to the community. The Stripe post got 853 reactions and welcoming a new mod got 209. I kept that
          and added a real reward, a deadline, and a reason to reply.
        </p>

        <p className="mb-2 font-bold text-white">Launch announcement</p>
        <Copy>
          {`hey @everyone

y'all argue about price vs performance in #models every single day. time to prove it.

**budget build: what can you build with $5?**
one prompt. one budget. any model on openrouter. best build for the least money wins.

**this week:** build something that saves you time every day
**budget:** $5 in API spend
**deadline:** sunday, nov 22, 11:59 PM PT

**what you get:**
- **we cover your $5.** every real entry gets $5 in credits back
- the winner gets **$100 in credits** (20x your budget)
- the top build gets the community demo spot at our next In Production
- the Budget Builder role and a feature on @OpenRouter
- your stack goes on the leaderboard so everyone can copy it

**how to enter:**
1. plan your stack with the budget planner: [link]
2. build it
3. post in #budget-build: a demo, your models, and a screenshot of what it cost

the team's builds drop in the thread tomorrow. beat us.

next week's budget: $1. think you can go lower?`}
        </Copy>

        <p className="mb-2 mt-8 font-bold text-white">Event promotion</p>
        <p className="mb-4">
          I based this on the In Production post and added who it&apos;s for, demo spots for the community, and a way in
          if you&apos;re not in SF.
        </p>
        <Copy>
          {`**In Production: OpenRouter x ElevenLabs**
**Tuesday, Nov 17 · 5:30 to 8:30 PM PT · San Francisco**
RSVP: https://luma.com/wvw8xwsi

Founders and engineers shipping voice and audio products with ElevenLabs on OpenRouter show what they built, which models they picked, and what broke once real users showed up.

**This one's for you if:**
- you're building voice agents, dubbing, podcasts, or anything with audio
- you're choosing between speech models and want to see what's actually working in production
- you want to meet people in SF building the same thing

**You'll get:**
- live demos of real products, not slides
- the actual model stack behind each one and what it costs to run
- time with the ElevenLabs and OpenRouter teams

**We're saving 2 demo spots for this community.** Building voice or audio on OpenRouter? Reply in the thread with a one-line pitch and a link by Friday, Nov 13. We'll pick 2.

When you RSVP, tell us what you're building so we can introduce you to the right people in the room.

Not in SF? Drop your questions for the builders in the thread. We'll ask the best ones on stage and share the takeaways after.`}
        </Copy>

        <H3>Success</H3>
        <p className="mb-2">What I&apos;d measure:</p>
        <List>
          <li>Entries per week. I&apos;d call it working at 20+ by week 4</li>
          <li>People coming back. Working if 30% of entrants enter again</li>
          <li>Spend on open-weight models from people who entered</li>
          <li>Fewer &quot;which model should I use?&quot; questions going to the bot</li>
        </List>
        <p className="mb-2">What I&apos;d change if it isn&apos;t working:</p>
        <List>
          <li>Under 10 entries: make the prompt smaller or do a free-models week</li>
          <li>People enter once and leave: add streaks and a monthly leaderboard</li>
          <li>Entries but no conversation: I comment more and post a weekly recap in #general</li>
        </List>

        <H3>Bonus: X and Reddit</H3>
        <List>
          <li>On X, I&apos;d post the best $5 build each week with its stack and cost</li>
          <li>On Reddit, I&apos;d do a monthly roundup of the cheapest working stacks for r/LocalLLaMA</li>
          <li>Everything links back to Discord so people can enter</li>
        </List>
      </div>
    </main>
  )
}
