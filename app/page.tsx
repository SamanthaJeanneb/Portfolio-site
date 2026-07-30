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
        <Image
          src={personal.avatar || "/placeholder.svg"}
          alt={personal.name}
          width={160}
          height={160}
          priority
          className="w-36 h-36 object-cover rounded-sm mb-8"
        />
        <h1 className="text-2xl font-bold text-white mb-4">{personal.name}</h1>

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

        <p className="mb-6">
          I'm building{" "}
          <a href="https://suzanne3d.com" target="_blank" rel="noopener noreferrer" className={link}>
            Suzanne
          </a>
          , AI-native 3D modeling for parts that actually work in the real world, based in San
          Francisco (backed by Founders, Inc. and part of NVIDIA Inception). The problem I'm obsessed
          with right now is making AI understand the physical world.
        </p>

        <p className="mb-2">
          I like building things people can hold in their hands. I'm 21, and before Suzanne I was a
          software engineer at Sicura, double majored in Computer Science and Design at SUNY Oswego,
          won a national VEX Robotics championship, and founded LakerHacks, my campus's annual
          hackathon. The things I keep coming back to are
        </p>

        <ul className="list-disc pl-8 mb-6">
          <li>hardware and 3D printing,</li>
          <li>design systems and interaction design,</li>
          <li>hackathons,</li>
          <li>and teaching people to build.</li>
        </ul>

        <p>
          Outside of work I coach hackathons for Major League Hacking and make content about tech,
          startups, and college life for 30k+ followers across socials.
        </p>
      </div>
    </main>
  )
}
