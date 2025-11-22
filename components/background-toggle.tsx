"use client"

import { useState, useEffect } from "react"
import { Grid3x3, Grid3x3Off } from "lucide-react"
import { cn } from "@/lib/utils"

export function BackgroundToggle() {
  const [backgroundVisible, setBackgroundVisible] = useState(true)

  useEffect(() => {
    // Load preference from localStorage
    const saved = localStorage.getItem("backgroundVisible")
    if (saved !== null) {
      setBackgroundVisible(saved === "true")
    }
  }, [])

  useEffect(() => {
    // Apply to all background grid elements
    const gridElements = document.querySelectorAll('[data-background-grid]')
    gridElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = backgroundVisible ? "block" : "none"
      }
    })
    
    // Save preference to localStorage
    localStorage.setItem("backgroundVisible", String(backgroundVisible))
  }, [backgroundVisible])

  const toggleBackground = () => {
    setBackgroundVisible(!backgroundVisible)
  }

  return (
    <button
      onClick={toggleBackground}
      className={cn(
        "p-2 rounded-md text-zinc-400 hover:text-white transition-all duration-300",
        "hover:bg-zinc-800/50 relative group"
      )}
      aria-label={backgroundVisible ? "Hide background" : "Show background"}
      title={backgroundVisible ? "Hide background grid" : "Show background grid"}
    >
      {backgroundVisible ? (
        <Grid3x3 className="w-4 h-4" />
      ) : (
        <Grid3x3Off className="w-4 h-4" />
      )}
      <span className="absolute inset-0 scale-0 rounded-md bg-zinc-700/50 group-hover:scale-100 transition-transform duration-300"></span>
    </button>
  )
}




