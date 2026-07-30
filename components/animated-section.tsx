import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  animation?: string
  delay?: number
  className?: string
  threshold?: number
  rootMargin?: string
  id?: string
  forceAnimate?: boolean
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  return (
    <section className={className} id={id}>
      {children}
    </section>
  )
}
