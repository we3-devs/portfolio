"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  status: string;
  issue_date: string;
}

export default function AdminCertifications() {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", issuer: "", issue_date: "", credential_id: "", verification_url: "", image_url: "", status: "Verified" as const });

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await (supabase as any).from("certifications").select("*").order("issue_date", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  }

  function resetForm() {
    setForm({ title: "", issuer: "", issue_date: "", credential_id: "", verification_url: "", image_url: "", status: "Verified" });
    setEditId(null);
    setShowForm(false);
  }

  async function handleSave() {
    const payload = { ...form, issue_date: form.issue_date ? new Date(form.issue_date).toISOString() : null };
    if (editId) {
      await (supabase as any).from("certifications").update(payload).eq("id", editId);
    } else {
      await (supabase as any).from("certifications").insert([payload]);
    }
    resetForm();
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certification?")) return;
    await (supabase as any).from("certifications").delete().eq("id", id);
    load();
  }

  function handleEdit(item: any) {
    setForm({ title: item.title, issuer: item.issuer || "", issue_date: item.issue_date?.split("T")[0] || "", credential_id: item.credential_id || "", verification_url: item.verification_url || "", image_url: item.image_url || "", status: item.status || "Verified" });
    setEditId(item.id);
    setShowForm(true);
  }

  if (loading) return <p className="text-[#94A3B8] font-mono text-sm">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white font-mono">Certifications</h1><p className="text-sm text-[#94A3B8] font-mono mt-1">{items.length} certifications</p></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all"><Plus size={16} /> New</button>
      </div>

      {showForm && (
        <div className="bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg p-4 mb-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Title" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <input type="text" value={form.issuer} onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))} placeholder="Issuer" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <input type="date" value={form.issue_date} onChange={(e) => setForm((f) => ({ ...f, issue_date: e.target.value }))} className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <input type="text" value={form.credential_id} onChange={(e) => setForm((f) => ({ ...f, credential_id: e.target.value }))} placeholder="Credential ID" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <input type="text" value={form.verification_url} onChange={(e) => setForm((f) => ({ ...f, verification_url: e.target.value }))} placeholder="Verification URL" className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" />
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))} className="px-3 py-2 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30">
              <option value="Verified">Verified</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all">{editId ? "Update" : "Create"}</button>
            <button onClick={resetForm} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono hover:bg-white/10 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {items.length === 0 ? <p className="text-[#94A3B8] font-mono text-sm">No certifications yet.</p> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg px-4 py-3 hover:border-[#00E5FF]/20 transition-all">
              <div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-[10px] font-mono text-[#94A3B8]">{item.issuer} · {item.status}</p>
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
