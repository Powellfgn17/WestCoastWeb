"use client"

import { Search, Hammer, TrendingUp } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useT } from "@/lib/i18n"

const ICONS = [Search, Hammer, TrendingUp]

export function HowItWorks() {
  const t = useT()

  return (
    <section id="how" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t.howItWorks.label}
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl font-bold sm:text-5xl">
              {t.howItWorks.title}
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            {t.howItWorks.description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.howItWorks.steps.map((s, i) => {
            const Icon = ICONS[i]
            const n = String(i + 1).padStart(2, "0")
            return (
              <Reveal
                key={n}
                as="article"
                delay={i * 100}
                className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    STEP {n}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-primary/50 group-hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>

                <div className="mt-auto border-t border-border pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                    {s.tag}
                  </span>
                </div>

                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
