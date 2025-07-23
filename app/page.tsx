import { HeroSection } from "@/components/home/HeroSection"
import { ValueProposition } from "@/components/home/ValueProposition"
import { UseCases } from "@/components/home/UseCases"
import { Testimonials } from "@/components/home/Testimonials"
import { FinalCTA } from "@/components/home/FinalCTA"
import { Footer } from "@/components/home/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 -z-50">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        
        {/* Large Floating Orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-r from-blue-500/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <ValueProposition />
        <UseCases />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
