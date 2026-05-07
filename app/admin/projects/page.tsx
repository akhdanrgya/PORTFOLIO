"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TagInput from "@/components/ui/TagInput";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/Toast";
import type { Project } from "@/lib/supabase";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Project> & { tech_stack: string[] }>({
    title: "", description: "", tech_stack: [], live_url: "", github_url: "", thumbnail_url: "", category: "", featured: false,
  });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchProjects = () =>
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .finally(() => setLoading(false));

  useEffect(() => { fetchProjects(); }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", tech_stack: [], live_url: "", github_url: "", thumbnail_url: "", category: "", featured: false });
    setEditId(null);
    setShowForm(false);
  };

  const startEdit = (project: Project) => {
    setForm({ ...project, tech_stack: project.tech_stack ?? [] });
    setEditId(project.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!form.title) { toast("Project title is required", "error"); return; }
    setSaving(true);
    try {
      const url = editId ? `/api/projects/${editId}` : "/api/projects";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, live_url: form.live_url || null, github_url: form.github_url || null, thumbnail_url: form.thumbnail_url || null, category: form.category || null }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast(editId ? "Project updated!" : "Project added!", "success");
      resetForm();
      fetchProjects();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete project "${title}"?`)) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      toast("Project deleted", "success");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to delete", "error");
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setProjects((prev) => prev.map((p) => p.id === project.id ? { ...p, featured: !p.featured } : p));
      toast(`${!project.featured ? "Marked" : "Unmarked"} as featured`, "success");
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to update", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>{projects.length} projects registered</p>
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
                Add Project
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
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            {editId ? "Edit Project" : "Add New Project"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="form-label">Project Title <span>*</span></label>
              <input type="text" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Project name" className="admin-input" />
            </div>
            <div>
              <label className="form-label">Category</label>
              <input type="text" value={form.category ?? ""} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Web App, Mobile, API..." className="admin-input" />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <div
                onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                className={`relative w-10 h-5.5 rounded-full cursor-pointer transition-all duration-300 ${form.featured ? "bg-purple-600" : "bg-slate-700"}`}
                style={{ height: "22px" }}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${form.featured ? "left-5" : "left-0.5"}`}
                />
              </div>
              <label className="text-sm text-slate-300 cursor-pointer select-none" onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}>
                Mark as Featured ★
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Description</label>
              <textarea value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Short project description..." rows={3} className="admin-input resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Tech Stack</label>
              <TagInput value={form.tech_stack} onChange={(tags) => setForm((f) => ({ ...f, tech_stack: tags }))} placeholder="React, Node.js, PostgreSQL — type then Enter or comma" />
            </div>
            <div>
              <label className="form-label">Live URL</label>
              <input type="url" value={form.live_url ?? ""} onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))} placeholder="https://..." className="admin-input" />
            </div>
            <div>
              <label className="form-label">GitHub URL</label>
              <input type="url" value={form.github_url ?? ""} onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))} placeholder="https://github.com/..." className="admin-input" />
            </div>
          </div>

          <ImageUpload
            value={form.thumbnail_url ?? null}
            onChange={(url) => setForm((f) => ({ ...f, thumbnail_url: url }))}
            folder="projects"
            label="Project Thumbnail"
            aspectRatio="aspect-video"
          />

          <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}>
            <button onClick={handleSave} disabled={saving} className="btn-glow px-5 py-2.5 text-sm disabled:opacity-50">
              <span>{saving ? "Saving..." : editId ? "Update Project" : "Add Project"}</span>
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
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500">No projects yet</p>
          <p className="text-xs text-slate-600 mt-1">Click &quot;Add Project&quot; to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="list-item flex items-center gap-4">
              {/* Thumbnail */}
              <div className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 border border-white/5">
                {project.thumbnail_url ? (
                  <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800/50 text-slate-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-slate-100 font-semibold text-sm truncate">{project.title}</h3>
                  {project.featured && <span className="tag bg-yellow-500/10 border-yellow-500/25 text-yellow-400 text-[10px]">★ Featured</span>}
                  {project.category && <span className="tag text-[10px]">{project.category}</span>}
                </div>
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tech_stack.slice(0, 5).map((t) => (
                      <span key={t} className="text-[11px] text-slate-600">{t}</span>
                    ))}
                    {project.tech_stack.length > 5 && <span className="text-[11px] text-slate-700">+{project.tech_stack.length - 5}</span>}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleFeatured(project)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    project.featured
                      ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25"
                      : "bg-white/5 text-slate-600 border border-white/5 hover:bg-white/8 hover:text-slate-400"
                  }`}
                  title={project.featured ? "Unmark featured" : "Mark as featured"}
                >
                  ★
                </button>
                <button onClick={() => startEdit(project)} className="btn-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id, project.title)} className="btn-delete">
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
