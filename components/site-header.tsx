"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale, useT } from "@/lib/i18n"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { locale, setLocale } = useLocale()
  const t = useT()

  const links = [
    { href: "#how", label: t.nav.howItWorks },
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#services", label: t.nav.services },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#contact", label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2" aria-label="Powell Digital home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
            <span className="font-display text-sm font-bold tracking-tight text-foreground">
              PD
            </span>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-bold">Powell Digital</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              Cotonou → Worldwide
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-0.5">
            <button
              onClick={() => setLocale("en")}
              className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-all ${
                locale === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("fr")}
              className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-all ${
                locale === "fr"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              FR
            </button>
          </div>
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href="#contact">{t.nav.startProject}</a>
          </Button>
        </div>

        <button
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 px-3">
              <button
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-1.5 font-mono text-xs transition-all ${
                  locale === "en"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("fr")}
                className={`rounded-full px-3 py-1.5 font-mono text-xs transition-all ${
                  locale === "fr"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                FR
              </button>
            </div>
            <Button
              asChild
              className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="#contact" onClick={() => setOpen(false)}>
                {t.nav.startProject}
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
