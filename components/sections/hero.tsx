"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useT } from "@/lib/i18n"

const GlobeScene = dynamic(
  () => import("@/components/three/globe-scene").then((m) => m.GlobeScene),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
)

export function Hero() {
  const t = useT()

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/* Animated mesh + grid bg */}
      <div aria-hidden className="absolute inset-0 mesh-bg" />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div aria-hidden className="noise-overlay" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12">
        {/* Left content */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {t.hero.available}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t.hero.titlePart1}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">{t.hero.titleHighlight}</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-accent/20 blur-[2px]"
              />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              asChild
              className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
            >
              <a href="#contact" className="group">
                {t.hero.ctaPrimary}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="h-12 border-border bg-transparent px-6 text-base text-foreground hover:bg-card"
            >
              <a href="#portfolio">{t.hero.ctaSecondary}</a>
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6"
          >
            {t.hero.kpis.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="font-display text-2xl font-bold text-foreground">
                  {s.kpi}
                </dt>
                <dd className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: 3D globe */}
        <div className="relative h-[420px] w-full sm:h-[520px] lg:col-span-6 lg:h-[640px]">
          {/* Corner labels */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t.hero.liveNetwork}
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t.hero.cities}
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t.hero.cityList}
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              v1.0 · 2026
            </div>
          </div>
          <GlobeScene />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#how"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t.hero.scroll}</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </motion.a>
    </section>
  )
}
