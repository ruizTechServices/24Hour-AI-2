import Logout from '@/components/auth/Logout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
      <Button asChild><Link href="/">Home</Link></Button>
      <h1>Welcome to your dashboard!</h1>
      <Logout />
    </div>
  )
}
