"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatbotProps {
  organizationId: string | null;
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot({ organizationId }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const content = input.trim();
    if (!content) return;

    // Optimistically add the user message
    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setLoading(true);

    try {
      const supabase = supabaseBrowser();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [...messages, { role: "user", content }],
          temperature: 0.7,
          maxTokens: 1024,
          organizationId,
        }),
      });

      let data: any = null;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await res.json();
        } catch {
          // fallthrough – will be handled below
        }
      }

      if (!res.ok || !data) {
        // Try to read plain text for better debugging
        const text = await res.text();
        throw new Error(
          (data && data.error) || text || 'Unexpected response from AI service'
        );
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content as string },
      ]);
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 border border-white/10 rounded-lg bg-white/[0.03] backdrop-blur-md">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <p
              className={`inline-block px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-100"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-slate-400">
            Ask me anything to get started!
          </p>
        )}
      </div>

      <div className="mt-4 flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none"
          rows={2}
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
