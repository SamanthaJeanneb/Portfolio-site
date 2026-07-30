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
const COLORS: { key: string; label: string; className: string }[] = [
  { key: "All", label: "ALL", className: "text-zinc-300 border-zinc-500" },
  { key: "W", label: "W", className: "text-yellow-100 border-yellow-200" },
  { key: "U", label: "U", className: "text-sky-400 border-sky-400" },
  { key: "B", label: "B", className: "text-purple-400 border-purple-400" },
  { key: "R", label: "R", className: "text-red-400 border-red-400" },
  { key: "G", label: "G", className: "text-green-400 border-green-400" },
  { key: "M", label: "MULTI", className: "text-amber-400 border-amber-400" },
  { key: "C", label: "NONE", className: "text-zinc-400 border-zinc-400" },
]
const PAGE_SIZE = 60
const TRADE_EMAIL = "samantha@suzanne3d.com"

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

  const button = (active: boolean, extra = "") =>
    `border-2 px-2 py-1 text-[10px] sm:text-xs uppercase transition-colors ${
      active ? "bg-[#00ff66] text-black border-[#00ff66]" : `bg-transparent hover:bg-[#1a1a2e] ${extra || "text-zinc-300 border-zinc-600"}`
    }`

  return (
    <main
      className="min-h-screen bg-[#0a0a12] text-zinc-200 pb-28"
      style={{ fontFamily: "var(--font-terminal)" }}
    >
      {/* CRT scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-20"
        style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #000 3px)" }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-[#00e5ff] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          ← exit
        </Link>

        {/* Marquee */}
        <header className="text-center border-4 border-[#ff2bd6] bg-[#12081c] rounded-lg px-4 py-6 mt-4 mb-6 shadow-[0_0_24px_#ff2bd644]">
          <h1
            className="text-lg sm:text-2xl text-[#00ff66] mb-3 [text-shadow:0_0_8px_#00ff66]"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            SAM'S CARD VAULT
          </h1>
          <p className="text-[#00e5ff] text-lg sm:text-xl">
            MAGIC: THE GATHERING · {totalCopies.toLocaleString()} CARDS · {cards.length.toLocaleString()} UNIQUE
          </p>
          <p className="text-[#ff2bd6] text-base mt-1 animate-pulse" style={{ fontFamily: "var(--font-pixel)" }}>
            PICK CARDS TO REQUEST A TRADE
          </p>
        </header>

        {/* Controls */}
        <div className="border-2 border-zinc-700 bg-[#0e0e1a] rounded-lg p-3 sm:p-4 mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5" style={{ fontFamily: "var(--font-pixel)" }}>
            <span className="text-[10px] text-zinc-500 mr-1">TYPE</span>
            {TYPES.map((t) => (
              <button key={t} className={button(type === t)} onClick={() => { setType(t); resetPaging() }}>
                {t === "All" ? "ALL" : t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5" style={{ fontFamily: "var(--font-pixel)" }}>
            <span className="text-[10px] text-zinc-500 mr-1">COLOR</span>
            {COLORS.map((c) => (
              <button
                key={c.key}
                className={button(color === c.key, c.className)}
                onClick={() => { setColor(c.key); resetPaging() }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5" style={{ fontFamily: "var(--font-pixel)" }}>
            <span className="text-[10px] text-zinc-500 mr-1">RARITY</span>
            {RARITIES.map((r) => (
              <button key={r} className={button(rarity === r)} onClick={() => { setRarity(r); resetPaging() }}>
                {r === "all" ? "ALL" : r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500" style={{ fontFamily: "var(--font-pixel)" }}>
              SEARCH
            </span>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPaging() }}
              placeholder="type a card or set name..."
              className="flex-1 bg-black border-2 border-zinc-700 focus:border-[#00e5ff] outline-none rounded px-3 py-1.5 text-lg text-[#00ff66] placeholder:text-zinc-600"
            />
          </div>
          <p className="text-zinc-500 text-base">
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
                className={`border-2 rounded-lg bg-[#0e0e1a] p-2 flex flex-col transition-colors ${
                  inTrade ? "border-[#00ff66] shadow-[0_0_12px_#00ff6655]" : "border-zinc-800 hover:border-[#00e5ff]"
                }`}
              >
                <img
                  src={imageUrl(card.id)}
                  alt={card.n}
                  loading="lazy"
                  className="w-full rounded-md mb-2"
                />
                <p className="text-base leading-tight text-zinc-100 truncate" title={card.n}>
                  {card.n}
                </p>
                <p className="text-sm text-zinc-500 truncate">{card.s}</p>
                <div className="flex items-center gap-2 text-sm mt-0.5 mb-2">
                  <span className="text-[#00e5ff]">x{card.q}</span>
                  <span className="text-zinc-500 capitalize">{card.r}</span>
                  {card.f && <span className="text-amber-300">✦ FOIL</span>}
                </div>
                <button
                  onClick={() => toggleTrade(card)}
                  className={`mt-auto text-[9px] py-1.5 border-2 rounded uppercase transition-colors ${
                    inTrade
                      ? "bg-[#00ff66] text-black border-[#00ff66]"
                      : "text-[#ff2bd6] border-[#ff2bd6] hover:bg-[#ff2bd6] hover:text-black"
                  }`}
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  {inTrade ? "✓ in trade" : "+ trade"}
                </button>
              </div>
            )
          })}
        </div>

        {shown.length === 0 && (
          <p className="text-center text-2xl text-[#ff2bd6] py-16" style={{ fontFamily: "var(--font-pixel)" }}>
            GAME OVER · NO CARDS FOUND
          </p>
        )}

        {shown.length < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="border-2 border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black px-6 py-3 text-xs uppercase transition-colors"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              continue? ({filtered.length - shown.length} left)
            </button>
          </div>
        )}
      </div>

      {/* Trade tray */}
      {tradeList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t-4 border-[#00ff66] bg-[#0a0a12ee] backdrop-blur px-4 py-3">
          <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3">
            <p className="text-lg text-[#00ff66]">
              TRADE PILE: {tradeList.length} card{tradeList.length === 1 ? "" : "s"}
              <button onClick={() => setTrade({})} className="ml-3 text-sm text-zinc-500 hover:text-[#ff2bd6] underline">
                clear
              </button>
            </p>
            <a
              href={tradeMailto()}
              className="bg-[#00ff66] text-black border-2 border-[#00ff66] px-5 py-2.5 text-[10px] uppercase hover:bg-transparent hover:text-[#00ff66] transition-colors animate-pulse"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              ▶ request trade
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
