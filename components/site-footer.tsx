"use client"

import Link from "next/link"
import { Github, Linkedin, Hash } from "lucide-react"
import { useLocale, useT } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

export function SiteFooter() {
  const { locale, setLocale } = useLocale()
  const t = useT()

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
                <span className="font-display text-sm font-bold">PD</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-sm font-bold">Powell Digital</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {t.footer.tagline}
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t.footer.explore}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#portfolio" className="text-foreground/80 hover:text-foreground">
                  {t.footer.portfolioLink}
                </a>
              </li>
              <li>
                <a href="#services" className="text-foreground/80 hover:text-foreground">
                  {t.footer.pricingLink}
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-foreground/80 hover:text-foreground">
                  {t.footer.reviewsLink}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/80 hover:text-foreground">
                  {t.footer.contactLink}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t.footer.language}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {(["en", "fr"] as Locale[]).map((l) => (
                <li key={l}>
                  <button
                    onClick={() => setLocale(l)}
                    className={`transition-colors ${
                      locale === l
                        ? "font-semibold text-accent"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {l === "en" ? "EN · English" : "FR · Français"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t.footer.social}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/treasure-powell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/treasure-powell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.indiehackers.com/treasure-powell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
                >
                  <Hash className="h-4 w-4" />
                  Indie Hackers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {t.footer.copyright}
          </span>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            <span>{t.footer.status}</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
