"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Briefcase, Code2, PenLine, GraduationCap } from "lucide-react"

/* ----------------------------------------------------------------–
   DATA
------------------------------------------------------------------*/

const useCases = [
  {
    icon: Briefcase,
    emoji: "👨‍💼",
    title: "Office Pros",
    features: [
      "Draft polished emails & reports",
      "Turn raw data into concise summaries",
      "Brainstorm solutions & strategies",
      "Generate meeting notes & action items",
      "Automate repetitive writing tasks",
    ],
    cta: "Boost My Productivity",
    gradient: "from-blue-500/20 to-indigo-500/20",
    borderGradient: "from-blue-400/30 to-indigo-400/30",
  },
  {
    icon: Code2,
    emoji: "👨‍💻",
    title: "Developers",
    features: [
      "Debug complex code instantly",
      "Generate clean, idiomatic snippets",
      "Refactor & document legacy projects",
      "Explore new frameworks & languages",
      "Optimize performance & architecture",
    ],
    cta: "Accelerate Dev Work",
    gradient: "from-purple-500/20 to-violet-500/20",
    borderGradient: "from-purple-400/30 to-violet-400/30",
  },
  {
    icon: PenLine,
    emoji: "🖋️",
    title: "Creators & Marketers",
    features: [
      "Spin up catchy headlines fast",
      "Draft SEO-optimized blog posts",
      "Batch-generate social media copy",
      "Brainstorm campaign ideas & hooks",
      "Refine tone for any audience",
    ],
    cta: "Create Magnetic Content",
    gradient: "from-pink-500/20 to-rose-500/20",
    borderGradient: "from-pink-400/30 to-rose-400/30",
  },
  {
    icon: GraduationCap,
    emoji: "🎓",
    title: "Students & Educators",
    features: [
      "Get step-by-step solutions",
      "Draft essays & citations",
      "Translate or practice languages",
      "Generate lesson plans & quizzes",
      "Summarize dense research papers",
    ],
    cta: "Study Smarter",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderGradient: "from-emerald-400/30 to-teal-400/30",
  },
]

/* ----------------------------------------------------------------–
   COMPONENT
------------------------------------------------------------------*/

export function UseCases() {
  return (
    <section className="relative py-24 px-6">
      {/* background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Built&nbsp;for&nbsp;
            </span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Real-World Results
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            24Hour-AI adapts to your workflow—whether you’re pushing code,
            creating content, leading teams, or acing exams.
          </p>
        </div>

        {/* grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {useCases.map((uc, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl hover:bg-white/[0.04] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* gradients */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${uc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${uc.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
              />

              <CardContent className="relative z-10 p-8 md:p-12">
                {/* title row */}
                <div className="flex items-center mb-8">
                  <div className="relative mr-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/10 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{uc.emoji}</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-indigo-100 transition-colors">
                    {uc.title}
                  </h3>
                </div>

                {/* features */}
                <ul className="space-y-4 mb-10">
                  {uc.features.map((f, j) => (
                    <li key={j} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-4">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-slate-200 leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button className="relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
                  <span className="relative z-10 flex items-center gap-2">
                    {uc.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* footer blurb */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1]">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 border-2 border-white/20" />
            </div>
            <span className="text-sm text-slate-300">
              Join 10,000+ professionals already using&nbsp;24Hour-AI
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
