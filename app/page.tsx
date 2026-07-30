import Image from "next/image"
import Link from "next/link"
import { getPersonalInfo } from "@/lib/data"

export default function Home() {
  const personal = getPersonalInfo()
  const linkedin = personal.social.find((s) => s.platform === "LinkedIn")?.url
  const instagram = personal.social.find((s) => s.platform === "Instagram")?.url
  const github = personal.social.find((s) => s.platform === "GitHub")?.url

  const link = "italic text-zinc-400 underline underline-offset-4 decoration-zinc-600 hover:text-white hover:decoration-zinc-400 transition-colors"

  return (
    <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center">
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
        <p className="mb-6">
          I've been an artist for as long as I can remember. Somewhere along the way drawing turned
          into building, building turned into{" "}
          <Link href="/projects/vex-robotics" className={link}>
            robotics
          </Link>
          , and robotics turned into code, so I double majored in Computer Science and Design and
          never really picked a side. You can see where the art half ended up in{" "}
          <Link href="/art" className={link}>
            my work
          </Link>
          .
        </p>
        <p className="mb-6">
          I worked as a software engineer for a while, then retired to build cool things full time.
          These days that mostly means{" "}
          <a href="https://suzanne3d.com" target="_blank" rel="noopener noreferrer" className={link}>
            Suzanne
          </a>
          . I also coach students through MLH{" "}
          <Link href="/projects#work" className={link}>
            hackathons
          </Link>
          , and somewhere in there I picked up 30k on{" "}
          <a href={instagram} target="_blank" rel="noopener noreferrer" className={link}>
            socials
          </a>{" "}
          making tech memes.
        </p>
        <p>
          The rest of my heart belongs to beautiful websites, math, 3D printing, and Magic: The
          Gathering (check out my{" "}
          <Link href="/mtg" className={link}>
            card collection
          </Link>
          ).
        </p>
      </div>
    </main>
  )
}
