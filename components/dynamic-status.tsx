"use client"

import { useState, useEffect } from "react"
import { Calendar, Github, Users, CheckCircle, Clock } from "lucide-react"

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
        }
      } catch (error) {
        console.error('Failed to fetch status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    // Refresh every 5 minutes
    const interval = setInterval(fetchStatus, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-zinc-800/30 rounded-lg p-3 mb-4">
        <p className="text-sm text-zinc-400">Loading status...</p>
      </div>
    )
  }

  return (
    <div className="bg-zinc-800/30 rounded-lg p-3 mb-4 space-y-2">
      <p className="text-sm font-medium">Hi, I'm Samantha.</p>
      
      {/* Availability Status */}
      <div className="flex items-center text-sm">
        {status.currentActivity ? (
          <>
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            <span className="text-zinc-300">
              Currently busy with{" "}
              <a 
                href="https://calendar.google.com/calendar/u/0?cid=c2FtYW50aGFqZWFubmViQGdtYWlsLmNvbQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 font-medium hover:text-purple-300 transition-colors underline decoration-purple-400/50 hover:decoration-purple-300"
              >
                {status.currentActivity}
              </a>
              {status.currentActivityEndTime && (
                <span className="text-zinc-300"> until {status.currentActivityEndTime}</span>
              )}
            </span>
          </>
        ) : (
          <>
            <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
            <a 
              href="https://calendar.google.com/calendar/u/0?cid=c2FtYW50aGFqZWFubmViQGdtYWlsLmNvbQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-green-200 transition-colors underline decoration-green-400/50 hover:decoration-green-200"
            >
              Available to chat
            </a>
          </>
        )}
      </div>
      
      <div className="space-y-1 text-sm text-zinc-300">
        {status.recentCommit && (
          <div className="flex items-center">
            <Github className="w-3 h-3 mr-2 text-purple-400" />
            <span>
              Recently pushed a commit to{" "}
              <a 
                href={`https://github.com/SamanthaJeanneb/${status.recentCommit.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 font-medium hover:text-purple-300 transition-colors underline decoration-purple-400/50 hover:decoration-purple-300"
              >
                {status.recentCommit.repo}
              </a>
              {status.recentCommit.message && `: "${status.recentCommit.message}"`}
            </span>
          </div>
        )}
        
        {status.nextEvent && (
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-2 text-purple-400" />
            <span>
              Attending {" "}
              <span className="text-purple-400 font-medium">{status.nextEvent.title}</span>
              {" "}in {status.nextEvent.daysUntil} {status.nextEvent.daysUntil === 1 ? 'day' : 'days'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
