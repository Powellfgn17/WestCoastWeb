"use client"

import { useState } from "react"
import { Calendar, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Reveal } from "@/components/reveal"
import { useT } from "@/lib/i18n"

export function CTAFinal() {
  const [submitting, setSubmitting] = useState(false)
  const t = useT()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to send")

      toast.success(t.cta.toastTitle, {
        description: t.cta.toastDesc.replace("{name}", String(data.name || "")),
      })
      form.reset()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left: headline + Calendly */}
          <Reveal className="lg:col-span-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t.cta.label}
            </span>
            <h2 className="mt-3 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {t.cta.title}
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
              {t.cta.description}
            </p>

            <div className="mt-10 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold">
                    {t.cta.bookCall}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t.cta.bookCallDesc}
                  </p>
                  <Button
                    asChild
                    className="mt-5 h-11 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <a
                      href="https://calendly.com/powell-digital/15min"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.cta.scheduleCalendly}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              <span className="uppercase tracking-[0.2em]">{t.cta.orSendMessage}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          {/* Right: contact form */}
          <Reveal delay={120} className="lg:col-span-6">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <FieldGroup>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="name">{t.cta.formName}</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder={t.cta.placeholderName}
                      className="h-11 bg-background"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">{t.cta.formEmail}</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t.cta.placeholderEmail}
                      className="h-11 bg-background"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="business_type">{t.cta.formBusinessType}</FieldLabel>
                  <Select name="business_type" defaultValue={t.cta.businessTypes[0]}>
                    <SelectTrigger id="business_type" className="h-11 bg-background">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {t.cta.businessTypes.map((bt) => (
                        <SelectItem key={bt} value={bt}>
                          {bt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="message">{t.cta.formMessage}</FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.cta.placeholderMessage}
                    className="resize-none bg-background"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="mt-2 h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submitting ? (
                    t.cta.submitting
                  ) : (
                    <>
                      {t.cta.submit}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t.cta.disclaimer}
                </p>
              </FieldGroup>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
