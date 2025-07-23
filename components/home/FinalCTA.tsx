import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Glass Container */}
        <div className="relative backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl">
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02] pointer-events-none"></div>
          
          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/[0.1] mb-8">
              <Sparkles className="w-10 h-10 text-indigo-400" />
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                Ready to Transform 
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Your Workflow?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
              Join thousands of professionals who've already discovered the power of 24Hour-AI
            </p>

            <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Start your free trial today and experience the future of AI-powered productivity. 
              No credit card required, cancel anytime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button 
                size="lg" 
                className="group relative px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-0 text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-10 py-5 bg-white/[0.05] backdrop-blur-sm border border-white/[0.15] text-slate-200 hover:bg-white/[0.08] hover:text-white font-bold rounded-full transition-all duration-300 text-lg"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {[
                "✓ 14-day free trial",
                "✓ No setup fees",
                "✓ Cancel anytime"
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-slate-300">
                  <span className="text-emerald-400">{feature.split(' ')[0]}</span>
                  <span>{feature.substring(2)}</span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                ))}
              </div>
              <span className="text-sm text-slate-300">Rated 4.9/5 by 1000+ users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-indigo-400/60 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce delay-1500"></div>
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-violet-400/60 rounded-full animate-bounce delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce delay-2500"></div>
    </section>
  )
}

// Save this component as: components/home/FinalCTA.tsx
