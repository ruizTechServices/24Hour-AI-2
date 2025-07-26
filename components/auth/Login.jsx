'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import OAuthButtons from './OAuthButtons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      {/* Glassmorphic Card */}
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-lg -z-10"></div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2">Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
            />
          </div>

          <Button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* OAuth */}
        <OAuthButtons />

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
