"use client"

import { useT } from "@/lib/i18n"

export function Portfolio() {
  const { portfolio: t } = useT()

  return (
    <section id="portfolio" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t.label}
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl font-bold sm:text-5xl">
              {t.title}
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            {t.description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Intentionally empty for now */}
        </div>
      </div>
    </section>
  )
}
