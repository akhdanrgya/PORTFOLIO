"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/Toast";
import type { Experience } from "@/lib/supabase";

type FormData = Omit<Partial<Experience>, "id" | "created_at" | "order_index">;

const emptyForm: FormData = {
  company: "",
  role: "",
  description: "",
  start_date: "",
  end_date: "",
  logo_url: "",
};

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = () =>
    fetch("/api/experience")
      .then((r) => r.json())
      .then(setExperiences)
      .finally(() => setLoading(false));

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const startEdit = (exp: Experience) => {
    setForm({
      company: exp.company,
      role: exp.role,
      description: exp.description,
      start_date: exp.start_date,
      end_date: exp.end_date,
      logo_url: exp.logo_url,
    });
    setEditId(exp.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!form.company || !form.role) { toast("Company and role are required", "error"); return; }
    setSaving(true);
    try {
      const url = editId ? `/api/experience/${editId}` : "/api/experience";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          logo_url: form.logo_url || null,
          description: form.description || null,
          start_date: form.start_date || null,
          end_date: form.end_date || null,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast(editId ? "Experience updated!" : "Experience added!", "success");
      resetForm();
      fetchData();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, role: string) => {
    if (!confirm(`Delete "${role}"?`)) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      toast("Experience deleted", "success");
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to delete", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Experience</h1>
          <p className="text-slate-500 mt-1">{experiences.length} experiences registered</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); }} className="btn-glow px-5 py-2.5 text-sm">
          <span>{showForm && !editId ? "× Close" : "+ Add Experience"}</span>
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">{editId ? "Edit Experience" : "Add Experience"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Company *</label>
              <input type="text" value={form.company ?? ""} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Company name..." className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role / Position *</label>
              <input type="text" value={form.role ?? ""} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="Frontend Developer..." className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
              <input type="date" value={form.start_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">End Date (leave empty if present)</label>
              <input type="date" value={form.end_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} className="admin-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Responsibilities and achievements..." rows={3} className="admin-input resize-none" />
            </div>
          </div>
          <ImageUpload
            value={form.logo_url ?? null}
            onChange={(url) => setForm((f) => ({ ...f, logo_url: url }))}
            folder="companies"
            label="Company Logo"
            aspectRatio="aspect-square max-w-[100px]"
          />
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="btn-glow px-6 py-2.5 text-sm disabled:opacity-50">
              <span>{saving ? "Saving..." : editId ? "Update" : "Add"}</span>
            </button>
            <button onClick={resetForm} className="btn-outline px-5 py-2.5 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-card p-5 flex items-start gap-4">
              <div className="shrink-0">
                {exp.logo_url ? (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-purple-500/20">
                    <Image src={exp.logo_url} alt={exp.company} fill className="object-contain p-1" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                    {exp.company.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold">{exp.role}</h3>
                <p className="text-purple-400 text-sm">{exp.company}</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {exp.start_date ? new Date(exp.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "-"} — {exp.end_date ? new Date(exp.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                </p>
                {exp.description && <p className="text-slate-400 text-sm mt-2 line-clamp-2">{exp.description}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(exp)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all">Edit</button>
                <button onClick={() => handleDelete(exp.id, exp.role)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">Delete</button>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <div className="text-center py-16 text-slate-600">No experience yet. Click &quot;Add Experience&quot; to start.</div>
          )}
        </div>
      )}
    </div>
  );
}
