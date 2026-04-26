"use client"

import dynamic from "next/dynamic"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { useT } from "@/lib/i18n"

const ServiceCards3D = dynamic(
  () => import("@/components/three/service-cards-3d").then((m) => m.ServiceCards3D),
  { ssr: false, loading: () => null },
)

const HIGHLIGHTS = [false, false, true, false]

export function Services() {
  const t = useT()

  return (
    <section id="services" className="relative isolate overflow-hidden border-t border-border py-28">
      {/* 3D particle backdrop */}
      <div aria-hidden className="absolute inset-0 opacity-60">
        <ServiceCards3D />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.services.label}
          </span>
          <h2 className="mt-3 max-w-3xl text-balance font-display text-4xl font-bold sm:text-5xl">
            <span className="block">{t.services.titleLine1}</span>
            <span className="block">{t.services.titleLine2}</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {t.services.description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.services.plans.map((plan, i) => {
            const highlight = HIGHLIGHTS[i]
            return (
              <Reveal
                key={plan.name}
                delay={i * 100}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-8 backdrop-blur-xl transition-all ${
                  highlight
                    ? "border-accent/40 bg-gradient-to-b from-accent/5 to-card shadow-[0_0_60px_-20px_rgba(245,158,11,0.35)]"
                    : "border-border bg-card/60 hover:border-primary/40"
                }`}
              >
                {highlight && (
                  <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    <Sparkles className="h-3 w-3" />
                    {t.services.mostPopular}
                  </div>
                )}

                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  PLAN {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold">{plan.name}</h3>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    /{plan.cadence}
                  </span>
                </div>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                          highlight
                            ? "bg-accent/15 text-accent"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-10 h-11 ${
                    highlight
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  <a href="#contact">{plan.cta}</a>
                </Button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
