'use client'
import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Session } from '@supabase/auth-js'

export default function useSessionRefresh() {
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const schedule = (session: Session | null) => {
      if (!session?.expires_at) return
      const msUntilExpiry = session.expires_at * 1000 - Date.now()
      // Refresh one minute before actual expiry
      const refreshIn = Math.max(msUntilExpiry - 60_000, 5_000)
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current)
      refreshTimeout.current = setTimeout(async () => {
        await supabase.auth.refreshSession()
      }, refreshIn)
    }

    // Initial schedule
    supabase.auth.getSession().then(({ data }) => schedule(data.session))

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      schedule(session)
    })

    return () => {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current)
      listener.subscription.unsubscribe()
    }
  }, [])
}
