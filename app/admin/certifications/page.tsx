"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/Toast";
import type { Certification } from "@/lib/supabase";

type FormData = Omit<Partial<Certification>, "id" | "created_at" | "order_index">;

const emptyForm: FormData = {
  title: "",
  issuer: "",
  issue_date: "",
  cert_url: "",
  image_url: "",
};

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

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

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
        body: JSON.stringify({
          ...form,
          image_url: form.image_url || null,
          cert_url: form.cert_url || null,
          issue_date: form.issue_date || null,
        }),
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Certifications</h1>
          <p className="text-slate-500 mt-1">{certifications.length} certifications registered</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); }} className="btn-glow px-5 py-2.5 text-sm">
          <span>{showForm && !editId ? "× Close" : "+ Add Certification"}</span>
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">{editId ? "Edit Certification" : "Add Certification"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Certification Title *</label>
              <input type="text" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="AWS Cloud Practitioner..." className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Issuer *</label>
              <input type="text" value={form.issuer ?? ""} onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))} placeholder="Amazon Web Services, Google..." className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Issue Date</label>
              <input type="date" value={form.issue_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, issue_date: e.target.value }))} className="admin-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Certificate Link (URL)</label>
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
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="glass-card p-5 flex gap-4 items-start">
              <div className="shrink-0">
                {cert.image_url ? (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-purple-500/20">
                    <Image src={cert.image_url} alt={cert.title} fill className="object-contain p-1" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">◉</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm leading-tight">{cert.title}</h3>
                <p className="text-purple-400 text-xs font-medium mt-0.5">{cert.issuer}</p>
                {cert.issue_date && <p className="text-slate-500 text-xs mt-0.5">{new Date(cert.issue_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>}
                {cert.cert_url && <a href={cert.cert_url} target="_blank" className="text-xs text-purple-400 hover:underline mt-1 block">View Certificate ↗</a>}
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => startEdit(cert)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all">Edit</button>
                <button onClick={() => handleDelete(cert.id, cert.title)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">Delete</button>
              </div>
            </div>
          ))}
          {certifications.length === 0 && (
            <div className="col-span-2 text-center py-16 text-slate-600">No certifications yet. Click &quot;Add Certification&quot; to start.</div>
          )}
        </div>
      )}
    </div>
  );
}
