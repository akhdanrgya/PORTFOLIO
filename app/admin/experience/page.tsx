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

function formatDate(d: string | null) {
  if (!d) return "Present";
  return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

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

  const resetForm = () => { setForm(emptyForm); setEditId(null); setShowForm(false); };

  const startEdit = (exp: Experience) => {
    setForm({ company: exp.company, role: exp.role, description: exp.description, start_date: exp.start_date, end_date: exp.end_date, logo_url: exp.logo_url });
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
        body: JSON.stringify({ ...form, logo_url: form.logo_url || null, description: form.description || null, start_date: form.start_date || null, end_date: form.end_date || null }),
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
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Experience</h1>
          <p>{experiences.length} entries</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); else setEditId(null); }}
          className="btn-glow px-4 py-2.5 text-sm shrink-0"
        >
          <span className="flex items-center gap-1.5">
            {showForm && !editId ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-3.5 h-3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                Close
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-3.5 h-3.5"><path d="M12 5v14M5 12h14" /></svg>
                Add Experience
              </>
            )}
          </span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-section">
          <h2 className="form-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-purple-400">
              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
            {editId ? "Edit Experience" : "Add New Experience"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Company <span>*</span></label>
              <input type="text" value={form.company ?? ""} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Company name" className="admin-input" />
            </div>
            <div>
              <label className="form-label">Role / Position <span>*</span></label>
              <input type="text" value={form.role ?? ""} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="e.g. Frontend Developer" className="admin-input" />
            </div>
            <div>
              <label className="form-label">Start Date</label>
              <input type="date" value={form.start_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} className="admin-input" />
            </div>
            <div>
              <label className="form-label">End Date <span className="text-slate-600 font-normal">(leave empty = Present)</span></label>
              <input type="date" value={form.end_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} className="admin-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Description</label>
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

          <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}>
            <button onClick={handleSave} disabled={saving} className="btn-glow px-5 py-2.5 text-sm disabled:opacity-50">
              <span>{saving ? "Saving..." : editId ? "Update" : "Add Experience"}</span>
            </button>
            <button onClick={resetForm} className="btn-outline px-4 py-2.5 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="spinner" />
        </div>
      ) : experiences.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500">No experience entries yet</p>
          <p className="text-xs text-slate-600 mt-1">Click &quot;Add Experience&quot; to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="list-item flex items-center gap-4">
              {/* Logo */}
              <div className="shrink-0">
                {exp.logo_url ? (
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-purple-500/20">
                    <Image src={exp.logo_url} alt={exp.company} fill className="object-contain p-1" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                    {exp.company.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-slate-100 font-semibold text-sm">{exp.role}</h3>
                  <span className="tag">{exp.company}</span>
                </div>
                <p className="text-slate-600 text-xs mt-0.5">{formatDate(exp.start_date)} — {formatDate(exp.end_date)}</p>
                {exp.description && <p className="text-slate-500 text-xs mt-1 line-clamp-1">{exp.description}</p>}
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(exp)} className="btn-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  Edit
                </button>
                <button onClick={() => handleDelete(exp.id, exp.role)} className="btn-delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
