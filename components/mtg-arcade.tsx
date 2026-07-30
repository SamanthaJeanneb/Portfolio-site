"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import collection from "@/data/mtg-collection.json"

interface CardEntry {
  id: string
  n: string // name
  s: string // set name
  r: string // rarity
  q: number // quantity
  f: boolean // any foil copy
  t: string // primary type
  c: string // color identity, e.g. "WU"
  m: string // mana cost
  v: number // mana value
}

const cards = collection as CardEntry[]

const TYPES = ["All", "Creature", "Instant", "Sorcery", "Artifact", "Enchantment", "Planeswalker", "Battle", "Land"]
const RARITIES = ["all", "common", "uncommon", "rare", "mythic"]
const COLORS: { key: string; label: string; textClass: string }[] = [
  { key: "All", label: "ALL", textClass: "" },
  { key: "W", label: "W", textClass: "text-[#d8cfa8]" },
  { key: "U", label: "U", textClass: "text-[#7fa6c8]" },
  { key: "B", label: "B", textClass: "text-[#a08cb8]" },
  { key: "R", label: "R", textClass: "text-[#c87f7f]" },
  { key: "G", label: "G", textClass: "text-[#8cb88c]" },
  { key: "M", label: "MULTI", textClass: "" },
  { key: "C", label: "NONE", textClass: "" },
]
const PAGE_SIZE = 60
const TRADE_EMAIL = "samantha@suzanne3d.com"
const ACCENT = "#d8a83c"

function imageUrl(id: string) {
  return `https://cards.scryfall.io/normal/front/${id[0]}/${id[1]}/${id}.jpg`
}

function matchesColor(card: CardEntry, filter: string) {
  if (filter === "All") return true
  if (filter === "C") return card.c.length === 0
  if (filter === "M") return card.c.length > 1
  return card.c.includes(filter)
}

export function MtgArcade() {
  const [type, setType] = useState("All")
  const [color, setColor] = useState("All")
  const [rarity, setRarity] = useState("all")
  const [search, setSearch] = useState("")
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [trade, setTrade] = useState<Record<string, CardEntry>>({})

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return cards.filter(
      (card) =>
        (type === "All" || card.t === type) &&
        matchesColor(card, color) &&
        (rarity === "all" || card.r === rarity) &&
        (!q || card.n.toLowerCase().includes(q) || card.s.toLowerCase().includes(q)),
    )
  }, [type, color, rarity, search])

  const shown = filtered.slice(0, visible)
  const totalCopies = useMemo(() => cards.reduce((sum, card) => sum + card.q, 0), [])
  const tradeList = Object.values(trade)

  const resetPaging = () => setVisible(PAGE_SIZE)

  const toggleTrade = (card: CardEntry) => {
    setTrade((prev) => {
      const next = { ...prev }
      if (next[card.id]) delete next[card.id]
      else next[card.id] = card
      return next
    })
  }

  const tradeMailto = () => {
    const lines = tradeList.map((card) => `- ${card.n} (${card.s})`)
    const subject = "MTG trade request"
    const body = `Hi Samantha,\n\nI'd like to trade for these cards from your collection:\n\n${lines.join(
      "\n",
    )}\n\nHere's what I can offer:\n\n`
    return `mailto:${TRADE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const button = (active: boolean, textClass = "") =>
    `border-2 px-2 py-1 text-[9px] uppercase transition-none ${
      active
        ? "bg-[#e8e8e8] text-black border-[#e8e8e8]"
        : `border-[#3a3a3a] hover:border-[#8a8a8a] ${textClass || "text-[#b8b8b8]"}`
    }`

  return (
    <main className="min-h-screen bg-[#141414] text-[#e8e8e8] pb-28" style={{ fontFamily: "var(--font-terminal)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8">
        <Link
          href="/"
          className="text-[10px] text-[#8a8a8a] hover:text-[#e8e8e8] uppercase"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          ← exit
        </Link>

        {/* Title box */}
        <header className="border-2 border-[#e8e8e8] mt-4 mb-6">
          <div className="border-2 border-[#141414] outline outline-1 outline-[#3a3a3a] px-4 py-6 text-center">
            <h1 className="text-base sm:text-xl mb-3" style={{ fontFamily: "var(--font-pixel)" }}>
              SAM'S CARD VAULT
            </h1>
            <p className="text-lg sm:text-xl text-[#8a8a8a]">
              MAGIC: THE GATHERING · {totalCopies.toLocaleString()} CARDS · {cards.length.toLocaleString()} UNIQUE
            </p>
            <p className="text-[10px] mt-2 text-[#8a8a8a]" style={{ fontFamily: "var(--font-pixel)" }}>
              PICK CARDS TO REQUEST A TRADE
            </p>
          </div>
        </header>

        {/* Controls */}
        <div className="border-2 border-[#3a3a3a] p-3 sm:p-4 mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5" style={{ fontFamily: "var(--font-pixel)" }}>
            <span className="text-[9px] text-[#8a8a8a] mr-1 w-12">TYPE</span>
            {TYPES.map((t) => (
              <button key={t} className={button(type === t)} onClick={() => { setType(t); resetPaging() }}>
                {t === "All" ? "ALL" : t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5" style={{ fontFamily: "var(--font-pixel)" }}>
            <span className="text-[9px] text-[#8a8a8a] mr-1 w-12">COLOR</span>
            {COLORS.map((c) => (
              <button
                key={c.key}
                className={button(color === c.key, c.textClass)}
                onClick={() => { setColor(c.key); resetPaging() }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5" style={{ fontFamily: "var(--font-pixel)" }}>
            <span className="text-[9px] text-[#8a8a8a] mr-1 w-12">RARITY</span>
            {RARITIES.map((r) => (
              <button key={r} className={button(rarity === r)} onClick={() => { setRarity(r); resetPaging() }}>
                {r === "all" ? "ALL" : r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-[#8a8a8a] w-12 shrink-0" style={{ fontFamily: "var(--font-pixel)" }}>
              FIND
            </span>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPaging() }}
              placeholder="type a card or set name..."
              className="flex-1 bg-[#141414] border-2 border-[#3a3a3a] focus:border-[#8a8a8a] outline-none px-3 py-1.5 text-lg placeholder:text-[#5a5a5a]"
            />
          </div>
          <p className="text-[#8a8a8a] text-base">
            {filtered.length.toLocaleString()} result{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {shown.map((card) => {
            const inTrade = Boolean(trade[card.id])
            return (
              <div
                key={card.id}
                className="border-2 p-2 flex flex-col bg-[#1a1a1a]"
                style={{ borderColor: inTrade ? ACCENT : "#2a2a2a" }}
              >
                <img src={imageUrl(card.id)} alt={card.n} loading="lazy" className="w-full rounded-[5px] mb-2" />
                <p className="text-base leading-tight truncate" title={card.n}>
                  {card.n}
                </p>
                <p className="text-sm text-[#8a8a8a] truncate">{card.s}</p>
                <div className="flex items-center gap-2 text-sm mt-0.5 mb-2 text-[#8a8a8a]">
                  <span className="text-[#b8b8b8]">x{card.q}</span>
                  <span className="capitalize">{card.r}</span>
                  {card.f && <span style={{ color: ACCENT }}>foil</span>}
                </div>
                <button
                  onClick={() => toggleTrade(card)}
                  className={`mt-auto text-[8px] py-1.5 border-2 uppercase ${
                    inTrade
                      ? "text-black"
                      : "text-[#b8b8b8] border-[#3a3a3a] hover:bg-[#e8e8e8] hover:text-black hover:border-[#e8e8e8]"
                  }`}
                  style={inTrade ? { background: ACCENT, borderColor: ACCENT } : undefined}
                >
                  {inTrade ? "in trade ✓" : "trade"}
                </button>
              </div>
            )
          })}
        </div>

        {shown.length === 0 && (
          <p className="text-center text-sm text-[#8a8a8a] py-16" style={{ fontFamily: "var(--font-pixel)" }}>
            NO CARDS FOUND
          </p>
        )}

        {shown.length < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="border-2 border-[#3a3a3a] text-[#b8b8b8] hover:bg-[#e8e8e8] hover:text-black hover:border-[#e8e8e8] px-6 py-3 text-[10px] uppercase"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              continue ({filtered.length - shown.length} left)
            </button>
          </div>
        )}
      </div>

      {/* Trade tray */}
      {tradeList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[#3a3a3a] bg-[#1a1a1a] px-4 py-3">
          <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3">
            <p className="text-lg">
              TRADE PILE: {tradeList.length} card{tradeList.length === 1 ? "" : "s"}
              <button
                onClick={() => setTrade({})}
                className="ml-3 text-sm text-[#8a8a8a] hover:text-[#e8e8e8] underline"
              >
                clear
              </button>
            </p>
            <a
              href={tradeMailto()}
              className="text-black px-5 py-2.5 text-[9px] uppercase border-2 hover:brightness-110"
              style={{ fontFamily: "var(--font-pixel)", background: ACCENT, borderColor: ACCENT }}
            >
              request trade →
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
