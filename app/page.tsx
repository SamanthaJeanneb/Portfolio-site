import Image from "next/image"
import Link from "next/link"
import { getPersonalInfo } from "@/lib/data"

export default function Home() {
  const personal = getPersonalInfo()
  const instagram = personal.social.find((s) => s.platform === "Instagram")?.url
  const github = personal.social.find((s) => s.platform === "GitHub")?.url

  const link = "italic text-zinc-400 underline underline-offset-4 decoration-zinc-600 hover:text-white hover:decoration-zinc-400 transition-colors"

  return (
    <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center">
      <div className="w-full max-w-xl px-6 py-16 text-lg leading-relaxed">
        <h1 className="text-2xl font-bold text-white mb-4">Samantha J. Brown</h1>
        <Image
          src={personal.avatar || "/placeholder.svg"}
          alt={personal.name}
          width={1179}
          height={1670}
          priority
          className="float-right w-56 h-auto ml-6 mb-3"
        />

        <p className="text-base mb-8">
          <Link href="/projects" className={link}>
            projects
          </Link>
          <span className="text-zinc-600"> · </span>
          <Link href="/projects#articles" className={link}>
            articles
          </Link>
          <span className="text-zinc-600"> · </span>
          <Link href="/blog" className={link}>
            blog
          </Link>
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

        <p className="mb-4">
          I build things, write code, and explore the intersection of AI, design, and the physical
          world.
        </p>

        <p className="mb-8">
          Currently building{" "}
          <a href="https://suzanne3d.com" target="_blank" rel="noopener noreferrer" className={link}>
            Suzanne
          </a>{" "}
          in San Francisco, where we are solving the spatial reasoning gap for AI models.
        </p>

        <h2 className="text-xl font-bold text-white mb-3">Some things about me:</h2>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-1 mb-8">
          <li>Studied Computer Science and Human Computer Interaction</li>
          <li>
            Founded LakerHacks, my university's hackathon, which became an official{" "}
            <a href="https://mlh.io" target="_blank" rel="noopener noreferrer" className={link}>
              MLH
            </a>{" "}
            event
          </li>
          <li>
            Fell in love with{" "}
            <Link href="/projects#work" className={link}>
              hackathons
            </Link>
            ,{" "}
            <Link href="/projects/vex-robotics" className={link}>
              robotics
            </Link>
            , and building things from scratch
          </li>
          <li>
            Previously worked as a software engineer building systems for the U.S. Department of
            State and U.S. Army
          </li>
          <li>
            Create tech content and have grown a community of{" "}
            <a href={instagram} target="_blank" rel="noopener noreferrer" className={link}>
              30k+ builders
            </a>
          </li>
          <li>Currently obsessed with teaching AI how to understand and create in the physical world</li>
        </ul>

        <h2 className="text-xl font-bold text-white mb-3">Some things I believe:</h2>
        <div className="space-y-5 mb-8">
          <div>
            <p className="font-bold text-white">The best way to learn is to build</p>
            <p>
              Most of the opportunities I've had came from creating something and putting it into
              the world.
            </p>
          </div>
          <div>
            <p className="font-bold text-white">Creativity and engineering are connected</p>
            <p>
              The best products come from people who combine technical depth, design, and curiosity.
            </p>
          </div>
          <div>
            <p className="font-bold text-white">Speed compounds</p>
            <p>The fastest way to understand an idea is to build it, test it, and iterate.</p>
          </div>
          <div>
            <p className="font-bold text-white">The physical world is the next frontier of AI</p>
            <p>
              AI has changed how we interact with information. The next step is helping humans
              design and create the world around us.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3">Things I love:</h2>
        <ul className="list-disc list-outside pl-5 marker:text-zinc-600 space-y-1">
          <li>Robotics and 3D printing</li>
          <li>Beautiful websites</li>
          <li>
            <Link href="/art" className={link}>
              Drawing, painting, and illustration
            </Link>
          </li>
          <li>Math and understanding how things work</li>
          <li>
            Magic: The Gathering and{" "}
            <Link href="/mtg" className={link}>
              collecting cards
            </Link>
          </li>
          <li>Hiking mountains</li>
          <li>Meeting people who are endlessly curious</li>
        </ul>
      </div>
    </main>
  )
}
