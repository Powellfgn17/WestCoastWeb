"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export type Locale = "en" | "fr"

const en = {
  nav: {
    howItWorks: "How it works",
    portfolio: "Portfolio",
    services: "Services",
    reviews: "Reviews",
    contact: "Contact",
    startProject: "Start project",
  },
  hero: {
    available: "Available · 2 slots open this month",
    titlePart1: "I build websites for local businesses in",
    titleHighlight: "5 days",
    description:
      "Barbershops, garages, restaurants — active businesses with no online presence. I find them, I build for them, I deliver fast.",
    ctaPrimary: "Start my project",
    ctaSecondary: "See my work",
    kpis: [
      { kpi: "5d", label: "Delivery" },
      { kpi: "$500", label: "Starter" },
      { kpi: "4.9★", label: "Average" },
    ],
    scroll: "scroll",
    liveNetwork: "// live network",
    cities: "5 countries",
    cityList: "Benin · United States · United Kingdom · France · Canada",
  },
  howItWorks: {
    label: "— How it works",
    title: "Three steps. Five days. One real website.",
    description:
      "A lean pipeline designed for solo operators who need results, not endless discovery calls.",
    steps: [
      {
        title: "I find you",
        body: "My AI system scans Google Maps for active businesses with no website. If you're busy but invisible online, I know.",
        tag: "Agent pipeline · Searcher → Validator",
      },
      {
        title: "I build for you",
        body: "Clean, mobile-first site in 5 business days. Content, hosting, Google Business Profile — all handled.",
        tag: "Next.js · Mobile-first · Local SEO",
      },
      {
        title: "You grow",
        body: "Customers find you on Google, call you, visit you. You focus on the work you actually like doing.",
        tag: "Google · Maps · Organic calls",
      },
    ],
  },
  portfolio: {
    label: "— Portfolio · Before / After",
    title: "From invisible to indexed.",
    description:
      "Each of these businesses had a pin on Google Maps — and nothing else. Hover a card to see the transformation.",
    beforeLabel: "Before · Google listing only",
    hover: "Hover →",
    afterPrefix: "After · Live in",
    afterSuffix: "days",
    viewLive: "View live site",
  },
  services: {
    label: "— Services & pricing",
    title: "Transparent pricing. No retainer traps.",
    description: "Pick the plan that fits your business. Upgrade or stop anytime.",
    mostPopular: "Most popular",
    plans: [
      {
        name: "Starter Pack",
        price: "$500",
        cadence: "one-time",
        features: [
          "5-page website",
          "Mobile responsive",
          "Google My Business setup",
          "1 year hosting included",
          "1 revision round",
        ],
        cta: "Choose Starter",
      },
      {
        name: "Growth Plan",
        price: "$200",
        cadence: "per month",
        features: [
          "Everything in Starter",
          "Monthly local SEO",
          "Unlimited content updates",
          "Priority support (48h)",
          "Monthly report",
        ],
        cta: "Choose Growth",
      },
      {
        name: "Custom Project",
        price: "Custom",
        cadence: "quote",
        features: [
          "All Starter services",
          "Full custom design",
          "Multi-market support",
          "OHADA-compliant contracts",
          "Tailored guidance",
        ],
        cta: "Request a quote",
      },
    ],
  },
  stats: {
    label: "— By the numbers",
    title: "Small operation. Real results.",
    metrics: ["Sites delivered", "Countries", "Avg. rating", "Starting price"],
  },
  reviews: {
    label: "— Client reviews",
    title: "What the shop owners say.",
    description: "Real reviews from real businesses. No made-up Lorem Ipsum.",
    filterAll: "All",
    filterUsUk: "US / UK",
    filterFrancophone: "Francophone",
    basedOn: "Based on",
    reviewsWord: "reviews",
    acrossText: "Across barbershops, garages & restaurants.",
    lastUpdated: "Last updated · Mar 2026",
  },
  cta: {
    label: "— Ready?",
    title: "Ready to exist online?",
    description:
      "Your customers are searching for you right now. Let\u2019s make sure they find you.",
    bookCall: "Book a free 15-min call",
    bookCallDesc:
      "Jump on a quick Zoom. I\u2019ll audit your current Google presence and tell you exactly what I\u2019d build.",
    scheduleCalendly: "Schedule on Calendly",
    orSendMessage: "Or send a message →",
    formName: "Your name",
    formEmail: "Email",
    formBusinessType: "Business type",
    formMessage: "Message",
    placeholderName: "Treasure Fagnon",
    placeholderEmail: "you@business.com",
    placeholderMessage:
      "Tell me about your business, your city, and what you'd like to achieve online.",
    submit: "Send message",
    submitting: "Sending…",
    disclaimer: "Reply within 24h · No spam · No sales pitches",
    toastTitle: "Message sent — I'll get back to you within 24h.",
    toastDesc: "Thanks {name}. Expect an email soon.",
    businessTypes: [
      "Barbershop",
      "Auto repair / Garage",
      "Restaurant",
      "Salon de coiffure",
      "Other",
    ],
  },
  footer: {
    tagline: "Built in Cotonou · Shipped worldwide",
    description:
      "Websites for local businesses that were invisible on Google. 5 days to live, from $500.",
    explore: "Explore",
    language: "Language",
    social: "Social",
    portfolioLink: "Portfolio",
    pricingLink: "Pricing",
    reviewsLink: "Reviews",
    contactLink: "Contact",
    copyright: "© 2026 WestCoastWeb · Built by Powell from Cotonou, Benin",
    status: "Status · All systems operational",
  },
}

const fr: typeof en = {
  nav: {
    howItWorks: "Comment ça marche",
    portfolio: "Portfolio",
    services: "Services",
    reviews: "Avis",
    contact: "Contact",
    startProject: "Lancer un projet",
  },
  hero: {
    available: "Disponible · 2 places ce mois-ci",
    titlePart1: "Je crée des sites pour les commerces locaux en",
    titleHighlight: "5 jours",
    description:
      "Barbershops, garages, restaurants — des commerces actifs sans présence en ligne. Je les trouve, je construis pour eux, je livre vite.",
    ctaPrimary: "Lancer mon projet",
    ctaSecondary: "Voir mes projets",
    kpis: [
      { kpi: "5j", label: "Livraison" },
      { kpi: "500 $", label: "À partir de" },
      { kpi: "4.9★", label: "Moyenne" },
    ],
    scroll: "défiler",
    liveNetwork: "// réseau actif",
    cities: "5 pays",
    cityList: "Bénin · États-Unis · Royaume-Uni · France · Canada",
  },
  howItWorks: {
    label: "— Comment ça marche",
    title: "Trois étapes. Cinq jours. Un vrai site.",
    description:
      "Un pipeline efficace conçu pour les entrepreneurs qui veulent des résultats, pas des réunions interminables.",
    steps: [
      {
        title: "Je vous trouve",
        body: "Mon système IA scanne Google Maps pour repérer les commerces actifs sans site web. Si vous êtes occupé mais invisible en ligne, je le sais.",
        tag: "Pipeline IA · Recherche → Validation",
      },
      {
        title: "Je construis pour vous",
        body: "Un site propre et mobile-first en 5 jours ouvrés. Contenu, hébergement, Google Business Profile — tout est géré.",
        tag: "Next.js · Mobile-first · SEO local",
      },
      {
        title: "Vous grandissez",
        body: "Les clients vous trouvent sur Google, vous appellent, vous rendent visite. Vous vous concentrez sur votre métier.",
        tag: "Google · Maps · Appels organiques",
      },
    ],
  },
  portfolio: {
    label: "— Portfolio · Avant / Après",
    title: "De l'invisible à l'indexé.",
    description:
      "Chacun de ces commerces n'avait qu'un point sur Google Maps — et rien d'autre. Survolez une carte pour voir la transformation.",
    beforeLabel: "Avant · Fiche Google uniquement",
    hover: "Survoler →",
    afterPrefix: "Après · En ligne en",
    afterSuffix: "jours",
    viewLive: "Voir le site",
  },
  services: {
    label: "— Services & tarifs",
    title: "Tarifs transparents. Pas de pièges.",
    description:
      "Choisissez le plan adapté à votre commerce. Évoluez ou arrêtez quand vous voulez.",
    mostPopular: "Le plus populaire",
    plans: [
      {
        name: "Pack Starter",
        price: "500 $",
        cadence: "unique",
        features: [
          "Site de 5 pages",
          "Design responsive mobile",
          "Configuration Google My Business",
          "1 an d'hébergement inclus",
          "1 cycle de révision",
        ],
        cta: "Choisir Starter",
      },
      {
        name: "Plan Croissance",
        price: "200 $",
        cadence: "par mois",
        features: [
          "Tout le pack Starter",
          "SEO local mensuel",
          "Mises à jour illimitées",
          "Support prioritaire (48h)",
          "Rapport mensuel",
        ],
        cta: "Choisir Croissance",
      },
      {
        name: "Projet sur mesure",
        price: "Sur devis",
        cadence: "personnalisé",
        features: [
          "Tous les services Starter",
          "Design entièrement personnalisé",
          "Support multi-marchés",
          "Contrats OHADA compatibles",
          "Accompagnement sur mesure",
        ],
        cta: "Demander un devis",
      },
    ],
  },
  stats: {
    label: "— En chiffres",
    title: "Petite structure. Vrais résultats.",
    metrics: ["Sites livrés", "Pays", "Note moyenne", "Prix de départ"],
  },
  reviews: {
    label: "— Avis clients",
    title: "Ce que disent les commerçants.",
    description: "De vrais avis de vrais commerces. Pas de Lorem Ipsum inventé.",
    filterAll: "Tous",
    filterUsUk: "US / UK",
    filterFrancophone: "Francophone",
    basedOn: "Basé sur",
    reviewsWord: "avis",
    acrossText: "Barbershops, garages et restaurants confondus.",
    lastUpdated: "Dernière mise à jour · Mars 2026",
  },
  cta: {
    label: "— Prêt ?",
    title: "Prêt à exister en ligne ?",
    description:
      "Vos clients vous cherchent en ce moment. Faisons en sorte qu\u2019ils vous trouvent.",
    bookCall: "Réserver un appel gratuit de 15 min",
    bookCallDesc:
      "Un rapide appel Zoom. J\u2019audite votre présence Google actuelle et je vous dis exactement ce que je construirais.",
    scheduleCalendly: "Réserver sur Calendly",
    orSendMessage: "Ou envoyer un message →",
    formName: "Votre nom",
    formEmail: "Email",
    formBusinessType: "Type de commerce",
    formMessage: "Message",
    placeholderName: "Treasure Fagnon",
    placeholderEmail: "vous@commerce.com",
    placeholderMessage:
      "Parlez-moi de votre commerce, votre ville, et ce que vous aimeriez accomplir en ligne.",
    submit: "Envoyer le message",
    submitting: "Envoi en cours…",
    disclaimer: "Réponse sous 24h · Pas de spam · Pas de démarchage",
    toastTitle: "Message envoyé — je reviens vers vous sous 24h.",
    toastDesc: "Merci {name}. Attendez-vous à un email bientôt.",
    businessTypes: [
      "Barbershop",
      "Garage auto",
      "Restaurant",
      "Salon de coiffure",
      "Autre",
    ],
  },
  footer: {
    tagline: "Construit à Cotonou · Livré dans le monde entier",
    description:
      "Des sites pour les commerces locaux invisibles sur Google. 5 jours pour être en ligne, à partir de 500 $.",
    explore: "Explorer",
    language: "Langue",
    social: "Social",
    portfolioLink: "Portfolio",
    pricingLink: "Tarifs",
    reviewsLink: "Avis",
    contactLink: "Contact",
    copyright: "© 2026 WestCoastWeb · Créé par Powell depuis Cotonou, Bénin",
    status: "Statut · Tous les systèmes opérationnels",
  },
}

const dictionaries = { en, fr } as const

export type Dict = typeof en

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = localStorage.getItem("powell-locale") as Locale | null
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem("powell-locale", l)
    document.documentElement.lang = l
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}

export function useT() {
  return useLocale().t
}
