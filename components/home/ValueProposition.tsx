"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  DollarSign,
  Shuffle,
  TrendingUp,
  ShieldCheck,
  Rocket,
  GraduationCap,
  PenLine,
  Code,
  Building2,
} from "lucide-react"

/* ----------------------------------------------------------------–
   DATA MODELS
------------------------------------------------------------------*/

// Five core benefits (top grid)
// Five core benefits (top grid)
const benefits = [
  {
    icon: DollarSign,
    title: "One-Dollar Door-Opener",
    bullets: [
      "Try premium AI on real work—no subscription lock-in.",
      "Zero risk: pay $1, use it for 24 hours, walk away anytime.",
    ],
    gradient: "from-emerald-400/20 to-teal-400/20",
  },
  {
    icon: Shuffle,
    title: "Smart Router (Optional)",
    bullets: [
      "Toggle it on to auto-match every prompt to the ideal LLM.",
      "Leave it off and pick your own model from the dropdown—your call.",
    ],
    gradient: "from-cyan-400/20 to-sky-400/20",
  },
  {
    icon: TrendingUp,
    title: "Scale at Your Pace",
    bullets: [
      "Upgrade to $5 / $50 / $100 tiers only when you need more firepower.",
      "Flat-rate billing—never any surprise overages.",
    ],
    gradient: "from-amber-400/20 to-orange-400/20",
  },
  {
    icon: ShieldCheck,
    title: "Rock-Solid Security & Control",
    bullets: [
      "One-click onboarding.",
      "Own your data—export JSONL before expiry or keep it synced.",
    ],
    gradient: "from-indigo-400/20 to-purple-400/20",
  },
  {
    icon: Rocket,
    title: "Built for Speed & Reliability",
    bullets: [
      "Modern Next.js stack, Redis caching, Google Cloud hosting.",
      "Multi-provider LLM pool keeps replies sub-second, 99.9 % uptime.",
    ],
    gradient: "from-fuchsia-400/20 to-pink-400/20",
  },
]


// Four real-world personas (bottom row)
const wins = [
  {
    icon: GraduationCap,
    title: "Students & Educators",
    desc: "Draft essays, get step-by-step solutions, or practice a new language—no tutoring fees.",
  },
  {
    icon: PenLine,
    title: "Creators & Marketers",
    desc: "Generate catchy headlines, social posts, and SEO copy in seconds.",
  },
  {
    icon: Code,
    title: "Developers & Analysts",
    desc: "Auto-generate code, debug, or summarise data—cut dev time in half.",
  },
  {
    icon: Building2,
    title: "Businesses of Any Size",
    desc: "Power custom chatbots, automate support, prototype features—without breaking the bank.",
  },
]

/* ----------------------------------------------------------------–
   COMPONENT
------------------------------------------------------------------*/

export function ValueProposition() {
  return (
    <section className="relative py-24 px-6">
      {/* Soft gradient blobs behind the glass container */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Glassy wrapper */}
        <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl p-12 md:p-16 shadow-2xl">
          {/* subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none" />

          <div className="relative z-10">
            {/* Headline */}
            <header className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                  Unlock&nbsp;AI&nbsp;Superpowers—
                </span>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Just&nbsp;$1 for&nbsp;24 Hours
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                Instant, on-demand access to top language models—no subscriptions, no surprises.
              </p>
            </header>

            {/* Benefits grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map(({ icon: Icon, title, bullets, gradient }, i) => (
                <Card
                  key={i}
                  className="group relative overflow-hidden bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
                >
                  {/* Hover gradient flash */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <CardContent className="relative z-10 p-8">
                    {/* Icon */}
                    <div className="mb-6 flex items-center justify-center">
                      <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur border border-white/10 group-hover:scale-110 transition-transform">
                        <Icon className="size-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-100 transition-colors">
                      {title}
                    </h3>
                    {/* Bullet list */}
                    <ul className="space-y-2 text-slate-400 group-hover:text-slate-300 leading-relaxed">
                      {bullets.map((b, j) => (
                        <li key={j} className="relative pl-5">
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-indigo-400/70" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Divider */}
            <div className="flex justify-center my-16">
              <span className="w-28 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60" />
            </div>

            {/* Real-world wins */}
            <div className="grid md:grid-cols-2 gap-10">
              {wins.map(({ icon: Icon, title, desc }, k) => (
                <div key={k} className="flex items-start space-x-4">
                  <span className="mt-1 inline-flex size-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/10">
                    <Icon className="size-5 text-indigo-300" />
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
                    <p className="text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-lg font-bold shadow-lg transition-all"
              >
                Get&nbsp;Started&nbsp;for&nbsp;$1
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
