import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Zap, Target } from "lucide-react"

const features = [
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "Pay a fraction of what you'd spend on individual AI subscriptions",
    gradient: "from-emerald-400/20 to-teal-400/20"
  },
  {
    icon: Zap,
    title: "Always Available",
    description: "24/7 access to multiple AI models when you need them most",
    gradient: "from-amber-400/20 to-orange-400/20"
  },
  {
    icon: Target,
    title: "Purpose-Built",
    description: "Optimized for professionals, developers, and students",
    gradient: "from-rose-400/20 to-pink-400/20"
  }
]

export function ValueProposition() {
  return (
    <section className="relative py-24 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Container with Glass Effect */}
        <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl p-12 md:p-16 shadow-2xl">
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                  Why Choose 
                </span>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  24Hour-AI?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Experience the perfect blend of affordability, reliability, and performance 
                in one comprehensive AI platform.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="group relative overflow-hidden bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Card Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardContent className="relative z-10 p-8 text-center">
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.1] to-white/[0.05] backdrop-blur-sm border border-white/[0.1] group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                      </div>
                      {/* Floating Glow */}
                      <div className="absolute inset-0 rounded-2xl bg-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white group-hover:text-indigo-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Effect Lines */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom Accent */}
            <div className="flex justify-center mt-12">
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Save this component as: components/home/ValueProposition.tsx
