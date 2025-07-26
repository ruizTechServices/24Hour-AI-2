// File: app/login/page.tsx
'use client'
import Login from '@/components/auth/Login'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Global Background Effects - matching landing page */}
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
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        {/* Home Link - Top Left */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 text-white/80 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <svg 
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>
        
        <Login />
      </main>
      
    </div>
  )
}