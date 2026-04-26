"use client"

import { ExternalLink, MapPin, Scissors } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import { useT } from "@/lib/i18n"

type Project = {
  name: string
  city: string
  country: string
  niche: string
  days: number
  before: string
  after: string
  href: string
}

const PROJECTS: Project[] = [
  {
    name: "Joe's Barbershop",
    city: "Charlotte",
    country: "NC",
    niche: "Barbershop",
    days: 4,
    before: "/portfolio/joes-before.jpg",
    after: "/portfolio/joes-after.jpg",
    href: "#",
  },
  {
    name: "Smooth Fades Studio",
    city: "Charlotte",
    country: "NC",
    niche: "Barbershop",
    days: 3,
    before: "/portfolio/smooth-before.jpg",
    after: "/portfolio/smooth-after.jpg",
    href: "#",
  },
  {
    name: "The Gentleman's Corner",
    city: "Birmingham",
    country: "UK",
    niche: "Barbershop",
    days: 5,
    before: "/portfolio/gentleman-before.jpg",
    after: "/portfolio/gentleman-after.jpg",
    href: "#",
  },
]

function ProjectCard({ p, i, t }: { p: Project; i: number; t: ReturnType<typeof useT>["portfolio"] }) {
  return (
    <Reveal as="article" delay={i * 100} className="group relative flex flex-col gap-5">
      {/* Flip container */}
      <div className="group/flip [perspective:1200px]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-700 [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)]">
          {/* Before face */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
            <img
              src={p.before || "/placeholder.svg"}
              alt={`${p.name} Google Maps listing — before`}
              className="h-full w-full object-cover grayscale brightness-75"
            />
            <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.beforeLabel}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {p.city}, {p.country}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t.hover}
              </span>
            </div>
          </div>

          {/* After face */}
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <img
              src={p.after || "/placeholder.svg"}
              alt={`${p.name} new website — after`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {t.afterPrefix} {p.days} {t.afterSuffix}
              </span>
            </div>
            <a
              href={p.href}
              className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t.viewLive} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold">{p.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {p.city}, {p.country}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Badge
            variant="secondary"
            className="gap-1 bg-secondary font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-muted-foreground"
          >
            <Scissors className="h-3 w-3" />
            {p.niche}
          </Badge>
          <Badge className="border-0 bg-primary/10 font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-primary">
            {p.days}d delivery
          </Badge>
        </div>
      </div>
    </Reveal>
  )
}

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
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
