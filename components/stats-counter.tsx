"use client"

import { useEffect, useRef, useState } from "react"
import { useT } from "@/lib/i18n"

function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  start,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  start: boolean
}) {
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!start) {
      // Pre-render the final value as a fallback so content is never blank.
      setDisplay(value.toFixed(decimals))
      return
    }
    const duration = 1800
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      // easeOutExpo-ish
      const eased = 1 - Math.pow(1 - t, 4)
      setDisplay((value * eased).toFixed(decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    // kick from 0
    setDisplay((0).toFixed(decimals))
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, decimals, start])

  return (
    <span className="font-display tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

const STAT_VALUES = [
  { value: 12, suffix: "", decimals: 0, color: "text-primary" },
  { value: 4, suffix: "", decimals: 0, color: "text-foreground" },
  { value: 4.9, suffix: "★", decimals: 1, color: "text-accent" },
  { value: 500, prefix: "$", decimals: 0, color: "text-foreground" },
]

export function StatsCounter() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const t = useT()

  useEffect(() => {
    const failsafe = window.setTimeout(() => setInView(true), 1400)
    const node = ref.current
    if (!node) return () => window.clearTimeout(failsafe)

    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true)
      window.clearTimeout(failsafe)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            window.clearTimeout(failsafe)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(node)
    return () => {
      window.clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="stats"
      className="relative border-y border-border bg-card/30 py-24"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.stats.label}
          </span>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-bold sm:text-5xl">
            {t.stats.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STAT_VALUES.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-3 bg-card p-8 md:p-10"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translate3d(0,0,0)" : "translate3d(0, 14px, 0)",
                transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms`,
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · metric
              </span>
              <div className={`text-5xl font-bold md:text-6xl ${s.color}`}>
                <AnimatedNumber
                  value={s.value}
                  decimals={s.decimals}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  start={inView}
                />
              </div>
              <span className="text-sm text-muted-foreground">{t.stats.metrics[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
