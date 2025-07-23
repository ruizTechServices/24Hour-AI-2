'use client'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function Logout() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Log Out
    </Button>
  )
}   
    