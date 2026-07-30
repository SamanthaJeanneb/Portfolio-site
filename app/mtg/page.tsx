import type { Metadata } from "next"
import { Press_Start_2P, VT323 } from "next/font/google"
import { MtgArcade } from "@/components/mtg-arcade"

const pixelHeading = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel" })
const pixelBody = VT323({ weight: "400", subsets: ["latin"], variable: "--font-terminal" })

export const metadata: Metadata = {
  title: "Card Vault | Samantha J. Brown",
  description: "Samantha's Magic: The Gathering collection. Browse by type, color, and rarity, and request a trade.",
}

export default function MtgPage() {
  return (
    <div className={`${pixelHeading.variable} ${pixelBody.variable}`}>
      <MtgArcade />
    </div>
  )
}
