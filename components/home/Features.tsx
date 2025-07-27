//I want a features section that describes all the features of 24Hour-AI
// The features section should contain:
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Shuffle, Slack, ShieldCheck, Rocket, Database } from "lucide-react"

/* ----------------------------------------------------------------–
   DATA
------------------------------------------------------------------*/

const features = [
  /* PRICING & PLANS */
  {
    icon: DollarSign,
    title: "Simple, Predictable Pricing",
    bullets: [
      "$1 Day-Pass: 24-hour, no-strings access",
      "Flat monthly tiers — $5, $50, $100",
      "No hidden fees or usage overages",
    ],
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderGradient: "from-emerald-400/30 to-teal-400/30",
  },
  /* MULTI-MODEL ACCESS */
  {
    icon: Slack,
    title: "Multi-Provider Model Pool",
    bullets: [
      "GPT-4o · Claude 3 · Gemini 1.5 Pro",
      "Mistral Large · DeepSeek · Meta Llama-3",
      "Image & vision endpoints included",
    ],
    gradient: "from-sky-500/20 to-cyan-500/20",
    borderGradient: "from-sky-400/30 to-cyan-400/30",
  },
  /* SMART ROUTER */
  {
    icon: Shuffle,
    title: "Smart Router (Optional)",
    bullets: [
      "Toggle on for auto-model selection",
      "Toggle off to pick manually",
      "Best accuracy ↔︎ lowest cost, every query",
    ],
    gradient: "from-indigo-500/20 to-purple-500/20",
    borderGradient: "from-indigo-400/30 to-purple-400/30",
  },
  /* SPEED & RELIABILITY */
  {
    icon: Rocket,
    title: "Blazing-Fast, 99.9 % Uptime",
    bullets: [
      "Edge-cached responses < 1 s",
      "Next.js & Redis on Google Cloud",
      "Zero-downtime rolling deploys",
    ],
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    borderGradient: "from-fuchsia-400/30 to-pink-400/30",
  },
  /* SECURITY & OWNERSHIP */
  {
    icon: ShieldCheck,
    title: "Own Your Data",
    bullets: [
      "End-to-end TLS + PBKDF2 hashing",
      "Export chats in JSONL anytime",
      "Local SQLite sync ↔︎ encrypted cloud",
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    borderGradient: "from-amber-400/30 to-orange-400/30",
  },
  /* CAPTURE & CONTEXT */
  {
    icon: Database,
    title: "Context-Aware Memory",
    bullets: [
      "PGVector embeddings on Supabase",
      "Automatic similarity search per chat",
      "Seamless Pinecone off-load on logout",
    ],
    gradient: "from-violet-500/20 to-rose-500/20",
    borderGradient: "from-violet-400/30 to-rose-400/30",
  },
]

/* ----------------------------------------------------------------–
   COMPONENT
------------------------------------------------------------------*/

export function Features() {
  return (
    <section className="relative py-24 px-6">
      {/* soft blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Everything&nbsp;You&nbsp;Get with&nbsp;
            </span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              24Hour-AI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            One platform, all the power you need—priced for humans, built for scale.
          </p>
        </div>

        {/* grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, bullets, gradient, borderGradient }, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl hover:bg-white/[0.04] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* hover gradients */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
              />

              <CardContent className="relative z-10 p-8 md:p-12">
                {/* title row */}
                <div className="flex items-center mb-6">
                  <span className="mr-4 inline-flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon className="size-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-indigo-100 transition-colors">
                    {title}
                  </h3>
                </div>

                {/* bullet list */}
                <ul className="space-y-3">
                  {bullets.map((b, j) => (
                    <li key={j} className="text-slate-300 group-hover:text-slate-200 leading-relaxed pl-4 relative">
                      <span className="absolute -left-1 top-2 size-1.5 rounded-full bg-indigo-400/70" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
