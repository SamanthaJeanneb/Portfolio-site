import type { Metadata } from "next"
import { MtgArcade } from "@/components/mtg-arcade"

export const metadata: Metadata = {
  title: "Card Vault | Samantha J. Brown",
  description: "Samantha's Magic: The Gathering collection. Browse by type, color, and rarity, and request a trade.",
}

export default function MtgPage() {
  return <MtgArcade />
}
