"use client"

import { useState, useMemo } from "react"
import { Star } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useT } from "@/lib/i18n"

type Review = {
  name: string
  business: string
  city: string
  niche: string
  region: "us-uk" | "francophone"
  rating: number
  text: string
  date: string
}

const REVIEWS: Review[] = [
  {
    name: "Joe M.",
    business: "Joe's Barbershop",
    city: "Charlotte, NC",
    niche: "Barbershop",
    region: "us-uk",
    rating: 5,
    text:
      "Before Powell, I was a pin on Google Maps and that's it. Now my site shows up, people book online, I get 3-4 new walk-ins a week that mention the website. Worth every dollar.",
    date: "Mar 2026",
  },
  {
    name: "Tanesha R.",
    business: "Smooth Fades Studio",
    city: "Charlotte, NC",
    niche: "Barbershop",
    region: "us-uk",
    rating: 5,
    text:
      "Delivered in 3 days. Looks better than my friend's $3k agency site. Powell just gets what small shops actually need — no fluff.",
    date: "Feb 2026",
  },
  {
    name: "Harold B.",
    business: "The Gentleman's Corner",
    city: "Birmingham, UK",
    niche: "Barbershop",
    region: "us-uk",
    rating: 5,
    text:
      "Communication was excellent despite the time zone. Site loads blazingly fast on mobile and I've finally got a proper online presence. Highly recommend.",
    date: "Jan 2026",
  },
  {
    name: "Aminata D.",
    business: "Chez Fatou Coiffure",
    city: "Cotonou, BJ",
    niche: "Coiffure",
    region: "francophone",
    rating: 5,
    text:
      "Site livré en 4 jours, en français, adapté au marché local. Les clientes me trouvent maintenant sur Google et prennent rendez-vous directement. Merci Powell !",
    date: "Mar 2026",
  },
  {
    name: "Marc L.",
    business: "Garage du Rhône",
    city: "Lyon, FR",
    niche: "Garage",
    region: "francophone",
    rating: 4.5,
    text:
      "Très professionnel. Le site est clair, rapide et optimisé pour Google Lyon. J'ai eu 8 appels la première semaine après la mise en ligne.",
    date: "Feb 2026",
  },
  {
    name: "Ray K.",
    business: "Ray's Auto Repair",
    city: "Charlotte, NC",
    niche: "Auto Repair",
    region: "us-uk",
    rating: 5,
    text:
      "Straight-shooter. Told me what I needed, skipped what I didn't. Site was live in 5 days and I already rank for 'oil change near me' in my zip.",
    date: "Jan 2026",
  },
]

function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full
        const isHalf = !isFull && i === full && half
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={
              isFull || isHalf
                ? "fill-accent text-accent"
                : "fill-muted text-muted-foreground/40"
            }
            strokeWidth={1}
          />
        )
      })}
    </div>
  )
}

type FilterKey = "all" | "us-uk" | "francophone"

export function Reviews() {
  const [filter, setFilter] = useState<FilterKey>("all")
  const t = useT()

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.reviews.filterAll },
    { key: "us-uk", label: t.reviews.filterUsUk },
    { key: "francophone", label: t.reviews.filterFrancophone },
  ]

  const filtered = useMemo(
    () => (filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.region === filter)),
    [filter],
  )

  const avg = useMemo(() => {
    const sum = REVIEWS.reduce((s, r) => s + r.rating, 0)
    return (sum / REVIEWS.length).toFixed(1)
  }, [])

  return (
    <section id="reviews" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t.reviews.label}
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl font-bold sm:text-5xl">
              {t.reviews.title}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
              {t.reviews.description}
            </p>
          </div>

          {/* Rating summary card */}
          <Reveal className="flex items-center gap-6 rounded-2xl border border-border bg-card p-6 lg:col-span-5">
            <div className="flex flex-col">
              <span className="font-display text-6xl font-bold leading-none text-accent">
                {avg}
              </span>
              <div className="mt-2">
                <RatingStars rating={parseFloat(avg)} size={18} />
              </div>
            </div>
            <div className="flex flex-col gap-1 border-l border-border pl-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.reviews.basedOn} {REVIEWS.length} {t.reviews.reviewsWord}
              </span>
              <span className="text-sm text-foreground">
                {t.reviews.acrossText}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {t.reviews.lastUpdated}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = f.key === filter
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-all ${
                  active
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                aria-pressed={active}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Masonry-ish grid */}
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filtered.map((r, i) => (
            <Reveal
              key={r.business}
              as="article"
              delay={(i % 3) * 80}
              className="mb-6 break-inside-avoid rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <RatingStars rating={r.rating} />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {r.niche}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{r.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {r.business} · {r.city}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {r.date}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
