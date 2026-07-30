import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Artwork | Samantha J. Brown",
  description: "Drawings, paintings, and photography by Samantha J. Brown.",
}

interface Piece {
  src: string
  title: string
  width: number
  height: number
}

const drawings: Piece[] = [
  { src: "/artwork/sleeping-santa.jpg", title: "Santa's nap", width: 1280, height: 1600 },
  { src: "/artwork/digital-portrait.jpg", title: "Face study", width: 1600, height: 1600 },
  { src: "/artwork/starlet-sketch.jpg", title: "Starlet", width: 1242, height: 1420 },
  { src: "/artwork/braids-sketch.jpg", title: "Braids", width: 1339, height: 1600 },
]

const photography: Piece[] = [
  { src: "/artwork/umbrella-portrait.jpg", title: "Umbrella", width: 1600, height: 1063 },
  { src: "/artwork/phillies-cap.jpg", title: "Phillies cap", width: 1600, height: 1063 },
  { src: "/artwork/back-to-back.jpg", title: "Back to back", width: 1600, height: 1063 },
  { src: "/artwork/studio-duo.jpg", title: "Studio duo", width: 1600, height: 1066 },
  { src: "/artwork/red-blue-portrait.jpg", title: "Two minds", width: 1600, height: 1063 },
  { src: "/artwork/neon-outline.jpg", title: "Neon outline", width: 1066, height: 1600 },
  { src: "/artwork/glowing-hands.jpg", title: "Glow", width: 1063, height: 1600 },
  { src: "/artwork/light-drawing.jpg", title: "Light drawing", width: 1063, height: 1600 },
  { src: "/artwork/martini-still-life.jpg", title: "Still life", width: 1266, height: 1600 },
  { src: "/artwork/game-night.jpg", title: "Game night", width: 1600, height: 1063 },
  { src: "/artwork/vulture-in-flight.jpg", title: "Vulture in flight", width: 1600, height: 1066 },
  { src: "/artwork/vulture-closeup.jpg", title: "Turkey vulture", width: 1600, height: 1063 },
  { src: "/artwork/anhinga-wings.jpg", title: "Wings out", width: 1063, height: 1600 },
  { src: "/artwork/bald-eagle.jpg", title: "Bald eagle", width: 1600, height: 1018 },
  { src: "/artwork/cat-on-blanket.jpg", title: "Barn cat", width: 1600, height: 1066 },
  { src: "/artwork/yawning-cat.jpg", title: "Big yawn", width: 1600, height: 1066 },
  { src: "/artwork/apple-harvest.jpg", title: "Apple harvest", width: 1600, height: 1066 },
  { src: "/artwork/apple-with-leaf.jpg", title: "Apples", width: 1600, height: 1066 },
  { src: "/artwork/pumpkin-stand.jpg", title: "Pumpkin stand", width: 1600, height: 1066 },
  { src: "/artwork/venice-canal.jpg", title: "Venice", width: 1200, height: 1600 },
  { src: "/artwork/mountain-summit.jpg", title: "Summit", width: 1200, height: 1600 },
]

function Gallery({ pieces }: { pieces: Piece[] }) {
  return (
    <div className="columns-2 sm:columns-3 gap-3">
      {pieces.map((piece) => (
        <figure key={piece.src} className="mb-3 break-inside-avoid">
          <Image
            src={piece.src}
            alt={piece.title}
            width={piece.width}
            height={piece.height}
            className="w-full h-auto"
          />
          <figcaption className="text-xs text-zinc-500 italic mt-1">{piece.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function ArtPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 sm:py-16">
        <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
          &larr; Home
        </Link>

        <h1 className="text-2xl font-bold text-white mt-8 mb-8">Artwork</h1>

        <h2 className="text-xl font-bold text-white mb-4">Drawings &amp; paintings</h2>
        <div className="mb-12">
          <Gallery pieces={drawings} />
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Photography</h2>
        <Gallery pieces={photography} />
      </div>
    </main>
  )
}
