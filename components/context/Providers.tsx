'use client'
import { ReactNode } from 'react'
import SessionRefreshProvider from './SessionRefreshProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return <SessionRefreshProvider>{children}</SessionRefreshProvider>
}
