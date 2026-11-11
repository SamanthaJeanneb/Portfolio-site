import Image from "next/image"
import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Take-Home Challenge, Part 2 | Samantha J. Brown",
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
        <h1 className="text-2xl font-bold text-white">Take-Home Challenge (Community Lead, Developer Relations)</h1>
        <p className="text-xl font-bold text-white mb-4">Part 2</p>
        <p className="mb-4 text-sm">
          Part 1:{" "}
          <a href="https://github.com/SamanthaJeanneb/model-budget-planner" target="_blank" rel="noopener noreferrer" className={link}>
            Model Budget Planner on GitHub
          </a>
          <span className="text-zinc-600"> · </span>
          <a href="https://model-budget-planner.vercel.app" target="_blank" rel="noopener noreferrer" className={link}>
            Live demo
          </a>
        </p>

        <H2>What I noticed</H2>
        <p className="mb-4">
          People come to the OpenRouter Discord for new models. #models is the busiest place in the server.
        </p>
        <Shot src="/openrouter/models-forum.png" alt="The #models forum" width={1025} height={580} wide />
        <p className="mb-4">
          For the problem I picked, cost comes up a lot. When I searched &quot;cheaper&quot; I got 2,134 messages, and &quot;too expensive&quot; came up in 248. People keep asking some version of &quot;what&apos;s the best model I can afford for this?&quot;, and some are asking the support bot how to figure out which models they can afford to build with.
        </p>
        <Shot src="/openrouter/cost-to-performance.png" alt="Discord message asking for the best model that's good on cost to performance" width={394} height={172} />
        <Shot src="/openrouter/best-and-cheapest.png" alt="Discord message asking the support bot for the best and cheapest model" width={394} height={326} />
        <Shot src="/openrouter/too-expensive.png" alt="Discord message: Anthropic models are still way too expensive for me to use on the regular" width={394} height={150} />
        <p className="mb-4">
          A few observations:
        </p>
        <ol className="list-decimal list-outside pl-5 marker:text-zinc-500 space-y-3 mb-4">
          <li>Where people stop engaging with a developer community is when they don&apos;t feel their feedback is being seen. Some questions and feedback posts just don&apos;t get a reply. At least 21 of the 68 newest posts in #feedback-and-requests have none, and support is mostly billing. If I posted an idea and nobody answered, I probably wouldn&apos;t take the time to post again.</li>
          <li>#app-showcase isn&apos;t in the default channels, so most people never see it. After I found the channel, I scrolled through the 10 projects posted Nov 5 to 9, and none of them got a reaction or a reply from anyone else. I think there should be more effort to grow this channel and highlight the best projects from it often. People keep building when they feel seen by the team behind the tool they&apos;re using, and right now there isn&apos;t much interaction from the team.</li>
        </ol>
        <p className="mb-4">
          A few ideas posted in the Discord asked for a better way to test model and provider combinations and see how they rank. One example:
        </p>
        <Shot src="/openrouter/rating-idea.png" alt="Feedback post asking for community ratings of providers and model combinations" width={1210} height={1340} maxClass="max-w-[520px]" />

        <H2>What I&apos;d launch for my solution</H2>
        <p className="mb-4">
          First I&apos;d start with a new channel, <span className="font-bold text-white">#budget-builds</span>. It&apos;s for showing off what you built and how you kept the cost down. That&apos;s the challenge entries, and anyone building on open-weight models who wants to show their project and how they optimized their token costs to build more for less. This is a hot topic in the server, and seems to be one of the main reasons developers use OpenRouter. The budget planner is a resource for planning it efficiently before you start, or if you&apos;re a beginner.
        </p>
        <p className="mb-4">
          <span className="font-bold text-white">Budget Build</span> is a new weekly challenge. Every week there&apos;s a prompt and a budget, like $5. You build something under it and post what you built, which models you used, and what it cost in #budget-builds. Best build for the least money wins. This would be hosted online every week.
        </p>
        <p className="mb-4">
          <span className="font-bold text-white">Open Weight Build</span> is the same idea once a month, but you can only use open-weight models. It gets people building with models outside Claude and OpenAI and shows what&apos;s actually possible with open weight. The planner can come in here as well with the open weights toggle.
        </p>
        <p className="mb-4">
          This works here because cost already comes up a lot in the server, and this turns it into real projects. When someone asks which model to use, there&apos;s somewhere to point them: past builds in #budget-builds and the planner. It directly grows OpenRouter usage, and a $1 vs $100 build is the kind of thing that grabs attention. The best builds get highlighted in #app-showcase and #general as well.
        </p>

        <H2>How it runs</H2>
        <p className="mb-4">
          In week 1 I run it by hand. I post the first Budget Build, build an entry myself, comment on every entry, and pick the winner. I also post a few of my own builds in #budget-builds so people can see what a good post looks like: what I built, my models, and how I cut my token costs.
        </p>
        <p className="mb-4">
          By week 8, Budget Build runs as an automated weekly challenge. A bot posts the prompt from a list members voted on, opens the thread, reminds people before the deadline, and counts votes. People post their own open-weight builds in #budget-builds between challenges, and the best ones get pinned and shared on X. Past winners get a Budget Builder role, and the winner can be picked by community votes.
        </p>
        <p className="mb-4">
          If I&apos;m out for a week, the prompts are already queued, the bots keep running, and winners can be picked by community engagement.
        </p>
        <p className="mb-4">
          Outside the challenges, I&apos;d regularly engage with the community and support what they&apos;re building with my own comments. I&apos;d reply to feedback posts even if it&apos;s just &quot;checking up on this,&quot; react to #app-showcase posts, and get billing questions to support fast so the help channel stays about building.
        </p>
        <p className="mb-4">
          To make sure feedback gets seen, I&apos;d also write up a regular summary of the issues and requests the community brings up and share it with the team, so no one has to go through every single request.
        </p>

        <H2>Announcements</H2>
        <p className="mb-4">
          The posts that do well in #announcements sound like a real person on the team. The Stripe post got 853 reactions and welcoming a new mod got 209. #events posts get 0 to 8, and almost all of them are in person in SF or NYC. Budget Builds would be open to everyone online, and I&apos;d love to get more engagement with in-person events by giving the online community a way to participate.
        </p>
        <p className="mb-2 mt-6 font-bold text-white">Launch announcement</p>
        <Copy>
          {`**Budget Builds: what can you build with $5?**

Building with frontier models is getting more expensive, but cheap models are also getting more powerful. So what's the right balance for your project?

Every week we post a prompt and a budget. Build the best thing you can without going over, then show us what you made, which models you used, and what it cost. Best build for the least money wins.

**This week:** [prompt of the week]
**Budget:** $[]
**Due:** [due date]

**Prizes**
- $[] in credits to build with for everyone who enters
- $100 in credits for the best build for the least money
- A demo spot at our next In Production and the [Budget Builder] role

Post your entry in #budget-builds. Building on open-weight models outside the challenge? Share it there too.

Not sure where to start? The budget planner gives you a breakdown of which models perform best for each part of your idea within your budget: [link]`}
        </Copy>
        <p className="mb-2 mt-8 font-bold text-white">Event promotion</p>
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

Not in SF? Share what you've built with ElevenLabs and OpenRouter in the thread. The best build wins $100 in credits to keep building.`}
        </Copy>

        <H2>How I&apos;d know it&apos;s working</H2>
        <p className="mb-4">
          I&apos;d know it&apos;s working if 30% of the people who enter come back for another one. I&apos;d also watch for:
        </p>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-1 mb-4">
          <li>Open-weight spend from people who entered</li>
          <li>Reactions and replies in #app-showcase</li>
          <li>Fewer &quot;which model should I use?&quot; questions to the bot</li>
          <li>More usage of non-mainstream models</li>
          <li>First-time posters coming back on a regular cadence</li>
          <li>If there&apos;s a way to track it, people who got Budget Builds credits coming back to reload credits for their next project</li>
        </ul>
        <p className="mb-4">
          If there are fewer than 10 entries, I&apos;d make the prompt smaller or do a free models week. If people enter once and leave, I&apos;d add streaks and tiered roles for people who regularly show up to events. If there are entries but no conversation, I&apos;d comment more and post a weekly recap in #general, shouting out the winners and honorable mentions.
        </p>

        <H2>Outside Discord</H2>
        <p className="mb-4">
          On X I&apos;d post the best $5 build each week with its stack and what it cost. On Reddit I&apos;d do a monthly roundup of the cheapest working stacks. Everything links back to the Discord so people can enter and join the conversation.
        </p>

        <H2>Other suggestions</H2>
        <p className="mb-4">
          Feedback tags are just Feedback and Request right now, so it&apos;s hard to tell what the team has seen. I&apos;d
          add Under review, Planned, and Shipped tags, and reply with a link back to the original post when something
          ships. That way people can see their feedback actually went somewhere, which encourages more feedback and makes community members feel it&apos;s being used.
        </p>
        <p className="mb-4">
          I&apos;d also turn repeated questions into short guides. I&apos;d write them from questions in #community-help, then link the guide the next time someone asks. This keeps the workload lower for answering questions, and a bot could auto-answer some of them when the question is covered by a guide.
        </p>
      </div>
    </main>
  )
}
