"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, MailOpen, Trash2, User, Calendar, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await (supabase as any).from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  }

  async function toggleRead(id: string, current: boolean) {
    await (supabase as any).from("contact_messages").update({ is_read: !current }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: !current } : m)));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await (supabase as any).from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  const unread = messages.filter((m) => !m.is_read).length;

  if (loading) return <p className="text-[#94A3B8] font-mono text-sm">Loading...</p>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white font-mono">Contact Messages</h1>
        <p className="text-sm text-[#94A3B8] font-mono mt-1">{messages.length} total · {unread} unread</p>
      </div>

      {messages.length === 0 ? (
        <p className="text-[#94A3B8] font-mono text-sm">No messages yet.</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.is_read) toggleRead(msg.id, false); }}
                className={`w-full text-left bg-[#111827]/60 border rounded-lg px-4 py-3 hover:border-[#00E5FF]/20 transition-all ${selected?.id === msg.id ? "border-[#00E5FF]/30" : "border-[rgba(0,229,255,0.06)]"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {msg.is_read ? <MailOpen size={14} className="text-[#94A3B8]" /> : <Mail size={14} className="text-[#00E5FF]" />}
                    <span className={`text-sm ${msg.is_read ? "text-[#94A3B8]" : "text-white font-semibold"}`}>{msg.name}</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#94A3B8]">{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-[#94A3B8] truncate pl-6">{msg.subject || "No subject"}</p>
              </button>
            ))}
          </div>

          <div>
            {selected ? (
              <div className="bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/10">
                      <User size={14} className="text-[#00E5FF]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{selected.name}</h3>
                      <p className="text-[10px] font-mono text-[#94A3B8]">{selected.email}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(selected.id)} className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FF4D6D] hover:bg-[#FF4D6D]/5 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mb-3 flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <Calendar size={12} />
                  {new Date(selected.created_at).toLocaleString()}
                </div>
                {selected.subject && (
                  <div className="mb-3">
                    <p className="text-[10px] font-mono text-[#94A3B8] mb-1">Subject</p>
                    <p className="text-sm text-white">{selected.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-mono text-[#94A3B8] mb-1 flex items-center gap-1"><MessageSquare size={12} /> Message</p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>
            ) : (
              <div className="bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg p-8 text-center">
                <MessageSquare size={24} className="mx-auto text-[#94A3B8]/40 mb-2" />
                <p className="text-sm text-[#94A3B8] font-mono">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
