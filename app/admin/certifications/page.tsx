"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/Toast";
import type { Certification } from "@/lib/supabase";

type FormData = Omit<Partial<Certification>, "id" | "created_at" | "order_index">;

const emptyForm: FormData = { title: "", issuer: "", issue_date: "", cert_url: "", image_url: "" };

export default function CertificationsAdminPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = () =>
    fetch("/api/certifications")
      .then((r) => r.json())
      .then(setCertifications)
      .finally(() => setLoading(false));

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm(emptyForm); setEditId(null); setShowForm(false); };

  const startEdit = (cert: Certification) => {
    setForm({ title: cert.title, issuer: cert.issuer, issue_date: cert.issue_date, cert_url: cert.cert_url, image_url: cert.image_url });
    setEditId(cert.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!form.title || !form.issuer) { toast("Title and issuer are required", "error"); return; }
    setSaving(true);
    try {
      const url = editId ? `/api/certifications/${editId}` : "/api/certifications";
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image_url: form.image_url || null, cert_url: form.cert_url || null, issue_date: form.issue_date || null }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast(editId ? "Certification updated!" : "Certification added!", "success");
      resetForm();
      fetchData();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/certifications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      toast("Certification deleted", "success");
      setCertifications((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to delete", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Certifications</h1>
          <p>{certifications.length} entries</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); else setEditId(null); }}
          className="btn-primary px-4 py-2.5 text-sm shrink-0"
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
                Add Certification
              </>
            )}
          </span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-section">
          <h2 className="form-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-accent">
              <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            {editId ? "Edit Certification" : "Add Certification"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="sm:col-span-2">
              <label className="form-label">Certification Title <span>*</span></label>
              <input type="text" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="AWS Cloud Practitioner..." className="admin-input" />
            </div>
            <div>
              <label className="form-label">Issuer <span>*</span></label>
              <input type="text" value={form.issuer ?? ""} onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))} placeholder="Amazon Web Services, Google..." className="admin-input" />
            </div>
            <div>
              <label className="form-label">Issue Date</label>
              <input type="date" value={form.issue_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, issue_date: e.target.value }))} className="admin-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Certificate URL</label>
              <input type="url" value={form.cert_url ?? ""} onChange={(e) => setForm((f) => ({ ...f, cert_url: e.target.value }))} placeholder="https://..." className="admin-input" />
            </div>
          </div>

          <ImageUpload
            value={form.image_url ?? null}
            onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
            folder="certifications"
            label="Badge / Certificate Image"
            aspectRatio="aspect-square max-w-[140px]"
          />

          <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: "1px solid rgba(16,185,129,0.1)" }}>
            <button onClick={handleSave} disabled={saving} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50">
              <span>{saving ? "Saving..." : editId ? "Update" : "Add Certification"}</span>
            </button>
            <button onClick={resetForm} className="btn-secondary px-4 py-2.5 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="spinner" />
        </div>
      ) : certifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500">No certifications yet</p>
          <p className="text-xs text-slate-600 mt-1">Click &quot;Add Certification&quot; to get started</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="list-item flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Badge */}
              <div className="shrink-0">
                {cert.image_url ? (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-accent/20">
                    <Image src={cert.image_url} alt={cert.title} fill className="object-contain p-1" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center text-emerald-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-6 h-6">
                      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-100 font-semibold text-sm leading-tight line-clamp-1">{cert.title}</h3>
                <p className="text-emerald-accent text-xs font-medium mt-0.5">{cert.issuer}</p>
                {cert.issue_date && (
                  <p className="text-slate-600 text-xs mt-0.5">
                    {new Date(cert.issue_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                )}
                {cert.cert_url && (
                  <a href={cert.cert_url} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-accent hover:text-emerald-400 mt-0.5 inline-block">
                    View ↗
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 shrink-0 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                <button onClick={() => startEdit(cert)} className="btn-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  Edit
                </button>
                <button onClick={() => handleDelete(cert.id, cert.title)} className="btn-delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
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
