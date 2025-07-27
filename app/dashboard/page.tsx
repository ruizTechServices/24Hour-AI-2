"use client"
// Dashboard mockup with local CRUD logic. Replace mock data with Supabase queries when backend is ready.

import { useState } from "react"
import Link from "next/link"
import { v4 as uuid } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Logout from "@/components/auth/Logout"

/* ------------------------------------------------------------------
   TYPES & MOCK DATA
-------------------------------------------------------------------*/

type ChatSession = {
  id: string
  startedAt: string // ISO timestamp
  model: string
  messages: number
  tokens: number
  cost: number // USD
}

const mockSessions: ChatSession[] = [
  {
    id: "sess_01",
    startedAt: "2025-07-26T10:15:00Z",
    model: "gpt-4o",
    messages: 18,
    tokens: 4250,
    cost: 0.11,
  },
  {
    id: "sess_02",
    startedAt: "2025-07-26T22:30:00Z",
    model: "claude-3-sonnet",
    messages: 7,
    tokens: 1600,
    cost: 0.04,
  },
  {
    id: "sess_03",
    startedAt: "2025-07-27T13:42:00Z",
    model: "gemini-1.5-pro",
    messages: 12,
    tokens: 2980,
    cost: 0.06,
  },
]

/* ------------------------------------------------------------------
   DASHBOARD COMPONENT
-------------------------------------------------------------------*/

export default function Dashboard() {
  // Local state only – swap for useSWR / TanStack Query w/ Supabase later
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Aggregate metrics
  const totalChats = sessions.length
  const totalTokens = sessions.reduce((acc, s) => acc + s.tokens, 0)
  const totalCost = sessions.reduce((acc, s) => acc + s.cost, 0)

  /* CRUD: create demo session */
  function addMockSession() {
    const newSession: ChatSession = {
      id: uuid().slice(0, 8),
      startedAt: new Date().toISOString(),
      model: "mistral-large",
      messages: 5,
      tokens: 890,
      cost: 0.02,
    }
    setSessions([newSession, ...sessions])
    console.info("Added session", newSession)
  }

  /* CRUD: delete */
  function deleteSession(id: string) {
    if (confirm("Delete this chat session?")) {
      setSessions(sessions.filter((s) => s.id !== id))
    }
  }

  /* ----------------------------------------------------------------
     RENDER
  ----------------------------------------------------------------*/
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Nav */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">Your Dashboard</h1>
        </div>
        <Logout />
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Chats" value={totalChats.toString()} />
        <StatCard label="Tokens Used" value={totalTokens.toLocaleString()} />
        <StatCard label="Total Spend ($)" value={totalCost.toFixed(2)} />
      </div>

      {/* Actions */}
      <div className="flex justify-end mb-4">
        <Button onClick={addMockSession}>+ New Mock Session</Button>
      </div>

      {/* Sessions Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-white/[0.05] text-slate-300 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Started</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Messages</th>
              <th className="px-4 py-3">Tokens</th>
              <th className="px-4 py-3">Cost ($)</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr
                key={s.id}
                className="border-t border-white/10 hover:bg-white/[0.04] cursor-pointer"
                onClick={() => setSelectedId(s.id)}
              >
                <td className="px-4 py-2 font-mono text-xs text-indigo-300">{s.id}</td>
                <td className="px-4 py-2">{new Date(s.startedAt).toLocaleString()}</td>
                <td className="px-4 py-2">{s.model}</td>
                <td className="px-4 py-2">{s.messages}</td>
                <td className="px-4 py-2">{s.tokens}</td>
                <td className="px-4 py-2">{s.cost.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">
                  <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); deleteSession(s.id) }}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  No sessions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {selectedId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl w-full max-w-lg p-8 relative border border-white/10">
            <h2 className="text-xl font-semibold mb-4 text-white">Session Details</h2>
            <pre className="text-sm text-slate-300 overflow-auto max-h-96">
              {JSON.stringify(sessions.find((s) => s.id === selectedId), null, 2)}
            </pre>
            <Button
              className="absolute top-4 right-4"
              variant="outline"
              size="sm"
              onClick={() => setSelectedId(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------
   SMALL COMPONENTS
-------------------------------------------------------------------*/

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-white/[0.03] backdrop-blur-md border border-white/10">
      <CardContent className="p-6 text-center">
        <p className="text-slate-400 text-sm mb-2">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------
   SUPABASE SCHEMA DRAFT (for reference only – run as migration)
-------------------------------------------------------------------
-- Table: chat_sessions
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  model text not null,
  started_at timestamptz default now(),
  messages integer default 0,
  tokens integer default 0,
  cost numeric(10,4) default 0,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS placeholder (allow user to access own records)
-- create policy "Users can read own sessions" ...
------------------------------------------------------------------*/
