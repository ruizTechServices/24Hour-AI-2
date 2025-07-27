//I need to create a hero component
// the hero component must include the following:

// - a burger menu that opens a sidebar that contains the navigation menu
// - a button that is onky text and it says `Register`, but only if the user is not logged in
// - a call to action button that takes the user to the register page if the user is not logged in, and to the dashboard if the user is logged in
// - a hero image that is responsive and is an image of something related to AI
// - a hero title that is responsive and is a heading of size 1 it should be the name of the app
// - a hero subtitle that is responsive and is a heading of size 2 it should be a copywrite of the app that compels users to spend money on the app
// - a button next to the `Register` button that says `Login` it looks like a button and it is animated
// - the hero icon should be the `C:\Users\giost\CascadeProjects\websites\24Hour-ai\new_main_2\public\icon128-gradient.svg` image. 

'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ArrowRight, Sparkles, Menu, Home, Settings, User, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const [user, setUser] = useState<null | { id: string }>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
  }

  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden">
      {/* Header with Burger Menu and Auth Buttons */}
      <header className="relative z-30 flex items-center justify-between p-6 md:p-8">
        {/* Burger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="backdrop-blur-sm bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[300px] bg-slate-900/95 backdrop-blur-xl border-slate-800"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              {/* Logo in Sidebar */}
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                <div className="relative w-8 h-8">
                  <Image
                    src="/icon128-gradient.svg"
                    alt="24Hour-AI Logo"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  24Hour-AI
                </span>
              </div>
              
              {/* Navigation Menu */}
              <nav className="flex-1 py-6">
                <div className="space-y-2">
                  <Link 
                    href="/" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  {user && (
                    <Link 
                      href="/dashboard" 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    href="/help" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HelpCircle className="h-4 w-4" />
                    Help
                  </Link>
                  <Link 
                    href="/settings" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
              </nav>
              
              {/* Auth Actions in Sidebar */}
              <div className="border-t border-slate-800 pt-6">
                {user ? (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-red-500/20"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" className="block" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/10">
                        <User className="h-4 w-4 mr-3" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" className="block" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Top Right Auth Buttons */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link href="/signup">
              <span className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium">
                Register
              </span>
            </Link>
            <Link href="/login">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/dashboard">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Dashboard
            </Button>
          </Link>
        )}
      </header>

      {/* Hero Content Area */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Hero Icon */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/icon128-gradient.svg"
                  alt="24Hour-AI Logo"
                  width={80}
                  height={80}
                  className="w-full h-full drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.1]">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-slate-300">Powered by Advanced AI</span>
            </div>

            {/* Main Heading (H1) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                24Hour
              </span>
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                -AI
              </span>
            </h1>

            {/* Subtitle (H2) */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-300 font-light leading-relaxed">
              Transform Your Productivity with AI That Never Sleeps
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Unlock premium AI capabilities at affordable prices. Write better code, boost productivity, 
              and accelerate learning with our 24/7 AI assistant designed for professionals who demand excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4">
              {!user ? (
                <Link href="/signup">
                  <Button 
                    size="lg" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Free
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="outline"
                size="lg" 
                asChild
                className="px-8 py-4 bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] text-slate-200 hover:bg-white/[0.08] hover:text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative lg:block hidden">
            <div className="relative backdrop-blur-2xl bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 shadow-2xl">
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none"></div>
              
              {/* AI-Related Hero Image Placeholder */}
              <div className="relative z-10 aspect-square bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 animate-pulse"></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-indigo-400/60 to-purple-400/60 rounded-full w-32 mx-auto animate-pulse"></div>
                    <div className="h-2 bg-gradient-to-r from-purple-400/60 to-violet-400/60 rounded-full w-24 mx-auto animate-pulse delay-200"></div>
                    <div className="h-2 bg-gradient-to-r from-violet-400/60 to-pink-400/60 rounded-full w-28 mx-auto animate-pulse delay-400"></div>
                  </div>
                  <p className="text-slate-300 text-sm font-medium">AI Processing...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-indigo-400/60 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce delay-1500"></div>
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-violet-400/60 rounded-full animate-bounce delay-2000"></div>
    </section>
  )
}

// Save this component as: components/home/HeroSection.tsx
