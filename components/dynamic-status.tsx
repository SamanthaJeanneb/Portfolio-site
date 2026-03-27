"use client"

import { useState, useEffect } from "react"
import { Github, Users, Calendar, ArrowUpRight } from "lucide-react"

const BOOKING_URL = "https://calendar.app.google/8y4Xp8cMWiiwUT6F9"
const GITHUB_USER = "SamanthaJeanneb"

interface StatusData {
  currentActivity: string | null
  currentActivityEndTime: string | null
  recentCommit: {
    repo: string
    repoFullName?: string
    message: string
    date: string
  } | null
  nextEvent: {
    title: string
    date: string
    daysUntil: number
  } | null
  isAvailable: boolean
}

export function DynamicStatus() {
  const [status, setStatus] = useState<StatusData>({
    currentActivity: null,
    currentActivityEndTime: null,
    recentCommit: null,
    nextEvent: null,
    isAvailable: true,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/status")
        if (response.ok) {
          const data = await response.json()
          setStatus(data)
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.error("Status API error:", response.status, errorData)
        }
      } catch (error) {
        console.error("Failed to fetch status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full border border-border p-3 mb-4 space-y-3 text-left">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-white hover:text-zinc-300 transition-colors group"
      >
        <Calendar className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white shrink-0" />
        <span className="underline underline-offset-2">Book a meeting</span>
        <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
      </a>

      {loading ? (
        <div className="space-y-2">
          <div className="h-3 w-40 bg-surface-alt animate-pulse rounded-sm" />
          <div className="h-3 w-full max-w-[220px] bg-surface-alt animate-pulse rounded-sm" />
        </div>
      ) : (
        <>
          {status.recentCommit ? (
            <a
              href={`https://github.com/${status.recentCommit.repoFullName ?? `${GITHUB_USER}/${status.recentCommit.repo}`}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group"
            >
              <Github className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span className="min-w-0">
                <span className="text-muted-foreground group-hover:text-white">
                  {status.recentCommit.repo}
                </span>
                {status.recentCommit.message ? (
                  <span className="text-zinc-600"> — {status.recentCommit.message}</span>
                ) : null}
              </span>
            </a>
          ) : (
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group"
            >
              <Github className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>
                <span className="text-muted-foreground group-hover:text-white">Latest activity on GitHub</span>
              </span>
            </a>
          )}

          {status.nextEvent && (
            <div className="flex items-start gap-2 text-xs text-zinc-500">
              <Users className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span className="min-w-0">
                {status.nextEvent.title}
                <span className="text-zinc-600"> — in {status.nextEvent.daysUntil}d</span>
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
