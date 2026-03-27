"use client"

import { useState, useEffect } from "react"
import { Github, Users } from "lucide-react"

interface StatusData {
  currentActivity: string | null
  currentActivityEndTime: string | null
  recentCommit: {
    repo: string
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
    isAvailable: true
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status')
        if (response.ok) {
          const data = await response.json()
          setStatus(data)
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.error('Status API error:', response.status, errorData)
        }
      } catch (error) {
        console.error('Failed to fetch status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="w-full border-t border-border pt-3 mt-1">
        <div className="h-3 w-24 bg-surface-alt animate-pulse" />
      </div>
    )
  }

  const hasContent = status.recentCommit || status.nextEvent

  if (!hasContent) return null

  return (
    <div className="w-full border-t border-border pt-3 mt-1 space-y-2">
      {status.recentCommit && (
        <a
          href={`https://github.com/SamanthaJeanneb/${status.recentCommit.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group"
        >
          <Github className="w-3 h-3 mt-0.5 shrink-0" />
          <span className="truncate">
            <span className="text-muted-foreground group-hover:text-white transition-colors">{status.recentCommit.repo}</span>
            {status.recentCommit.message && (
              <span className="text-zinc-600"> — {status.recentCommit.message}</span>
            )}
          </span>
        </a>
      )}

      {status.nextEvent && (
        <div className="flex items-start gap-2 text-xs text-zinc-500">
          <Users className="w-3 h-3 mt-0.5 shrink-0" />
          <span className="truncate">
            {status.nextEvent.title}
            <span className="text-zinc-600"> — {status.nextEvent.daysUntil}d</span>
          </span>
        </div>
      )}
    </div>
  )
}
