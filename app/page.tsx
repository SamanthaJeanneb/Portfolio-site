import Image from "next/image"
import Link from "next/link"
import { getPersonalInfo } from "@/lib/data"

const serif = { fontFamily: '"Times New Roman", Times, serif' }

export default function Home() {
  const personal = getPersonalInfo()
  const linkedin = personal.social.find((s) => s.platform === "LinkedIn")?.url
  const instagram = personal.social.find((s) => s.platform === "Instagram")?.url
  const github = personal.social.find((s) => s.platform === "GitHub")?.url

  const link = "italic text-zinc-400 underline underline-offset-4 decoration-zinc-600 hover:text-white hover:decoration-zinc-400 transition-colors"

  return (
    <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center" style={serif}>
      <div className="w-full max-w-xl px-6 py-16 text-lg leading-relaxed">
        <h1 className="text-2xl font-bold text-white mb-8">Sam Brown</h1>
        <Image
          src={personal.avatar || "/placeholder.svg"}
          alt={personal.name}
          width={1179}
          height={1670}
          priority
          className="float-right w-56 h-auto ml-6 mb-3"
        />
        <h2 className="text-xl font-bold text-white mb-2">Hellooo :)</h2>
        <p className="mb-4">Welcome to my corner of the internet!</p>

        <p className="mb-4">
          I'm building{" "}
          <a href="https://suzanne3d.com" target="_blank" rel="noopener noreferrer" className={link}>
            Suzanne
          </a>
          .
        </p>

        <p className="text-base mb-8">
          <Link href="/projects" className={link}>
            projects
          </Link>
          <span className="text-zinc-600"> · </span>
          <Link href="/projects#press" className={link}>
            press
          </Link>
          <span className="text-zinc-600"> · </span>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
          <span className="text-zinc-600"> · </span>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className={link}>
            Instagram
          </a>
          <span className="text-zinc-600"> · </span>
          <a href="https://x.com/samanthajeanneb" target="_blank" rel="noopener noreferrer" className={link}>
            X
          </a>
          <span className="text-zinc-600"> · </span>
          <a href={github} target="_blank" rel="noopener noreferrer" className={link}>
            GitHub
          </a>
          <span className="text-zinc-600"> · </span>
          <a href={`mailto:${personal.email}`} className={link}>
            email
          </a>
          <span className="text-zinc-600"> · </span>
          <a href={personal.bookingUrl} target="_blank" rel="noopener noreferrer" className={link}>
            book a meeting
          </a>
        </p>

        <h2 className="text-xl font-bold text-white mb-3">A little bit about me</h2>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-1 mb-8">
          <li>I am an artist</li>
          <li>B.S. double major in Computer Science &amp; Design</li>
          <li>
            30k on{" "}
            <a href={instagram} target="_blank" rel="noopener noreferrer" className={link}>
              socials
            </a>{" "}
            (I make tech memes)
          </li>
          <li>Coaching students through MLH</li>
          <li>Ex software engineer</li>
        </ul>

        <h2 className="text-xl font-bold text-white mb-3">What I love</h2>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-1">
          <li>
            <Link href="/projects#work" className={link}>
              Hackathons
            </Link>{" "}
            &amp;{" "}
            <Link href="/projects/vex-robotics" className={link}>
              robotics
            </Link>
          </li>
          <li>Beautiful websites</li>
          <li>
            Magic: The Gathering player, check out my{" "}
            <Link href="/mtg" className={link}>
              card collection
            </Link>
          </li>
          <li>
            Art, check out my{" "}
            <Link href="/projects#creative" className={link}>
              work
            </Link>
          </li>
          <li>Math</li>
          <li>3D printing</li>
        </ul>
      </div>
    </main>
  )
}
