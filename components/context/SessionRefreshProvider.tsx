'use client'
import { ReactNode } from 'react'
import useSessionRefresh from '@/hooks/useSessionRefresh'

export default function SessionRefreshProvider({ children }: { children: ReactNode }) {
  useSessionRefresh()
  return <>{children}</>
}
