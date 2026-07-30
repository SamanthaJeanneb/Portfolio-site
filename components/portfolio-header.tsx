"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getNavItems, getPersonalInfo } from "@/lib/data"

export function PortfolioHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mounted, setMounted] = useState(false)

  const navItems = getNavItems()
  const personalInfo = getPersonalInfo()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navItems.filter((item) => item.href.startsWith("#")).map((item) => item.href.substring(1))

      const HEADER_THRESHOLD = 220
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= HEADER_THRESHOLD && rect.bottom > 20) {
            setActiveSection(section)
            break
          }
        }
      }

      if (window.scrollY < 120) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])

  const mobileMenu =
    mounted && mobileMenuOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex flex-col md:hidden bg-black pt-[4.5rem] px-5"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/" ? activeSection === "" : activeSection === item.href.substring(1)
                const target = item.href.startsWith("#") ? item.href.substring(1) : ""

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "py-4 text-lg border-b border-border transition-colors",
                      isActive ? "text-white" : "text-zinc-400 active:text-white",
                    )}
                    onClick={() => {
                      closeMenu()
                      if (target) setActiveSection(target)
                      else setActiveSection("")
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>,
          document.body,
        )
      : null

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[300] transition-all duration-300",
        mobileMenuOpen
          ? "bg-black border-b border-border py-2"
          : scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-border py-2"
            : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 group min-w-0">
          <span className="text-white font-bold text-lg sm:text-xl tracking-tight truncate">
            {personalInfo.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? activeSection === "" : activeSection === item.href.substring(1)
            const target = item.href.startsWith("#") ? item.href.substring(1) : ""

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  if (target) setActiveSection(target)
                  else setActiveSection("")
                }}
                className={cn(
                  "px-3 py-2 text-sm transition-colors",
                  isActive ? "text-white" : "text-zinc-500 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="md:hidden relative z-[400] p-2 -mr-2 text-zinc-300 hover:text-white"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenu}
    </header>
  )
}
