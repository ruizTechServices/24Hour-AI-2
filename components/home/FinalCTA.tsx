import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* background blobs */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* glass card */}
        <div className="relative backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02] pointer-events-none" />

          <div className="relative z-10 text-center">
            {/* icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/[0.1] mb-8">
              <Sparkles className="w-10 h-10 text-indigo-400" />
            </div>

            {/* heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                Ready to Unlock&nbsp;
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                24-Hour&nbsp;AI Power?
              </span>
            </h2>

            {/* sub-copy */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
              Join thousands of pros who pay just&nbsp;$1 for a full day of top-tier AI—or pick a flat
              monthly plan when you’re ready to scale.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button
                size="lg"
                className="group relative px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Get 24-Hour Access ($1)
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              {/* This is supposed to route the user to the signup page */}

              <Button
                variant="outline"
                size="lg"
                className="px-10 py-5 bg-white/[0.05] backdrop-blur-sm border border-white/[0.15] text-slate-200 hover:bg-white/[0.08] hover:text-white font-bold rounded-full transition-all duration-300 text-lg"
              >
                View Monthly Plans
              </Button>
              {/* This is supposed to route the user to the pricing section */}
            </div>

            {/* key points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {[
                "✓ $1 Day-Pass (24-Hour Access)",
                "✓ Flat-Rate Monthly Tiers",
                "✓ Cancel or Upgrade Anytime",
              ].map((point, i) => (
                <div key={i} className="flex items-center justify-center gap-2 text-slate-300">
                  <span className="text-emerald-400">{point.split(" ")[0]}</span>
                  <span>{point.substring(2)}</span>
                </div>
              ))}
            </div>

            {/* trust badge */}
            <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                ))}
              </div>
              <span className="text-sm text-slate-300">
                Rated 4.9/5 by 1,000+ paying users
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* floating dots */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-indigo-400/60 rounded-full animate-bounce delay-1000" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce delay-1500" />
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-violet-400/60 rounded-full animate-bounce delay-2000" />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce delay-2500" />
    </section>
  )
}
