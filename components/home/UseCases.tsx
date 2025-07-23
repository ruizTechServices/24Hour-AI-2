import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Briefcase, Code2 } from "lucide-react"

const useCases = [
  {
    icon: Briefcase,
    title: "For Office Workers",
    emoji: "👨‍💼",
    features: [
      "Draft emails, reports, and presentations",
      "Analyze data and create summaries",
      "Brainstorm solutions and strategies",
      "Automate repetitive writing tasks",
      "Generate meeting notes and action items",
      "Create professional documentation"
    ],
    cta: "Start Boosting Productivity",
    gradient: "from-blue-500/20 to-indigo-500/20",
    borderGradient: "from-blue-400/30 to-indigo-400/30"
  },
  {
    icon: Code2,
    title: "For Developers",
    emoji: "👨‍💻",
    features: [
      "Debug complex code issues instantly",
      "Generate clean, optimized code",
      "Review and refactor existing projects",
      "Learn new frameworks and languages",
      "Create comprehensive documentation",
      "Optimize performance and architecture"
    ],
    cta: "Accelerate Development",
    gradient: "from-purple-500/20 to-violet-500/20",
    borderGradient: "from-purple-400/30 to-violet-400/30"
  }
]

export function UseCases() {
  return (
    <section className="relative py-24 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-violet-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Built for 
            </span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Whether you're managing teams or building the future, 24Hour-AI adapts to your workflow 
            and amplifies your capabilities.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl hover:bg-white/[0.04] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Border Gradient Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${useCase.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
              
              <CardContent className="relative z-10 p-8 md:p-12">
                {/* Header */}
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.1] to-white/[0.05] backdrop-blur-sm border border-white/[0.1] mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{useCase.emoji}</span>
                    </div>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-indigo-100 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10">
                  {useCase.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-start group/item"
                      style={{ animationDelay: `${featureIndex * 100}ms` }}
                    >
                      <div className="flex-shrink-0 mt-1 mr-4">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-slate-200 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  className="group/btn relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {useCase.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse delay-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1]">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 border-2 border-white/20"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white/20"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 border-2 border-white/20"></div>
            </div>
            <span className="text-sm text-slate-300">Join 10,000+ professionals already using 24Hour-AI</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Save this component as: components/home/UseCases.tsx
