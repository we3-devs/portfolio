"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, GripVertical } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  display_order: number;
}

export default function AdminSkills() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "", level: 50, display_order: 0 });

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await (supabase as any).from("skills").select("*").order("display_order", { ascending: true });
    if (data) setItems(data);
    setLoading(false);
  }

  function resetForm() {
    setForm({ name: "", category: "", level: 50, display_order: 0 });
    setEditId(null);
    setShowForm(false);
  }

  async function handleSave() {
    if (editId) {
      await (supabase as any).from("skills").update(form).eq("id", editId);
    } else {
      await (supabase as any).from("skills").insert([form]);
    }
    resetForm();
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;
    await (supabase as any).from("skills").delete().eq("id", id);
    load();
  }

  function handleEdit(item: any) {
    setForm({ name: item.name, category: item.category || "", level: item.level || 50, display_order: item.display_order || 0 });
    setEditId(item.id);
    setShowForm(true);
  }

  if (loading) return <p className="text-[#94A3B8] font-mono text-sm">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white font-mono">Skills</h1><p className="text-sm text-[#94A3B8] font-mono mt-1">{items.length} skills</p></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all"><Plus size={16} /> New</button>
      </div>

      {showForm && (
        <div className="bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg p-4 mb-6 space-y-3">
          <div className="grid sm:grid-cols-4 gap-3">
            <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Skill name" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <input type="text" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Category" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <input type="number" value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) }))} placeholder="Level (0-100)" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <input type="number" value={form.display_order} onChange={(e) => setForm((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} placeholder="Order" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all">{editId ? "Update" : "Create"}</button>
            <button onClick={resetForm} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono hover:bg-white/10 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {items.length === 0 ? <p className="text-[#94A3B8] font-mono text-sm">No skills yet.</p> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg px-4 py-3 hover:border-[#00E5FF]/20 transition-all">
              <div className="flex items-center gap-3">
                <GripVertical size={14} className="text-[#94A3B8]/40" />
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                  <p className="text-[10px] font-mono text-[#94A3B8]">{item.category} · Level {item.level}% · Order {item.display_order}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FF4D6D] hover:bg-[#FF4D6D]/5 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
