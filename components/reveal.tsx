"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
  as?: "div" | "article" | "section" | "li" | "span" | "header"
  style?: CSSProperties
}

/**
 * A visibility-safe reveal wrapper.
 * - Starts hidden, but has a hard-fallback timer so content ALWAYS becomes visible
 *   even if IntersectionObserver never fires (headless screenshots, low-powered
 *   browsers, extreme scroll-anchoring cases, etc.)
 * - Respects prefers-reduced-motion (skips the transition).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 600,
  className = "",
  as = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)

    // Hard fallback: guarantee visibility within 1.2s regardless.
    const failsafe = window.setTimeout(() => setVisible(true), 1200)

    const node = ref.current
    if (!node) return () => window.clearTimeout(failsafe)

    // If already in viewport on mount, show immediately.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      window.clearTimeout(failsafe)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            window.clearTimeout(failsafe)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    )
    observer.observe(node)

    return () => {
      window.clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [])

  const Tag = as as any
  const effectiveY = reducedMotion ? 0 : y
  const effectiveDuration = reducedMotion ? 0 : duration

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0, ${effectiveY}px, 0)`,
        transition: `opacity ${effectiveDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${effectiveDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
