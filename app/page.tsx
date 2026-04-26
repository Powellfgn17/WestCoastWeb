import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Portfolio } from "@/components/sections/portfolio"
import { Services } from "@/components/sections/services"
import { StatsCounter } from "@/components/stats-counter"
import { Reviews } from "@/components/sections/reviews"
import { CTAFinal } from "@/components/sections/cta-final"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <HowItWorks />
        <Portfolio />
        <Services />
        <StatsCounter />
        <Reviews />
        <CTAFinal />
      </main>
      <SiteFooter />
    </>
  )
}
