import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PortfolioHeader } from "@/components/portfolio-header"
import { AnimatedSection } from "@/components/animated-section"

export const metadata: Metadata = {
  title: "Suzanne | Samantha J. Brown",
  description: "AI-native 3D modeling for parts that actually work in the real world.",
}

const TAGS = ["AI", "CAD", "Physical AI"]

const IMAGES = [
  { src: "/suzanne/cover.jpg", alt: "Suzanne" },
  { src: "/suzanne/landing.png", alt: "The Suzanne platform" },
]

export default function SuzannePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PortfolioHeader />

      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-24 sm:pt-32 pb-16">
        <AnimatedSection animation="fade-in">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All work
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">Suzanne</h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-6">
            AI-native 3D modeling for parts that actually work in the real world.
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {TAGS.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-surface text-xs text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {IMAGES.map((image) => (
              <div key={image.src} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="space-y-6 text-zinc-400 leading-relaxed">
            <p>
              Suzanne generates an editable 3D model from any context: manuals, a description, or photos.
              Physics checks run during generation, covering material strength, where stress concentrates,
              and the rules of 3D printing, so a part comes out knowing its material, its loads, and its
              printer. It prints in-house, right the first time.
            </p>
            <p>
              One hardware iteration normally takes six weeks: about a week of CAD, then physics
              simulations, then two to three weeks of overseas manufacturing and another week or two of
              testing. Generative AI tools only speed up the design step, producing visual renders with no
              context of physical constraints, materials, or manufacturing. Suzanne collapses generation
              and validation into one step and turns six weeks into two hours.
            </p>
            <p>
              Every printed part gets measured and fed back into the model. Competitors train on CAD
              files, we train on physical outcomes. More than 2,000 models have been generated on the
              platform so far, and on printed parts 92% of critical dimensions land within 0.2 mm on PLA
              and 96% within 0.1 mm on resin.
            </p>
            <p className="text-zinc-300">
              Backed by Founders, Inc. and part of NVIDIA Inception. Try it at{" "}
              <a
                href="https://suzanne3d.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors"
              >
                suzanne3d.com
              </a>
              .
            </p>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}
