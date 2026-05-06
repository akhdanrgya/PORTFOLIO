"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TagInput from "@/components/ui/TagInput";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/Toast";
import type { Project } from "@/lib/supabase";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Project> & { tech_stack: string[] }>({
    title: "",
    description: "",
    tech_stack: [],
    live_url: "",
    github_url: "",
    thumbnail_url: "",
    category: "",
    featured: false,
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
        body: JSON.stringify({
          ...form,
          tech_stack: form.tech_stack,
          live_url: form.live_url || null,
          github_url: form.github_url || null,
          thumbnail_url: form.thumbnail_url || null,
          category: form.category || null,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast(editId ? "Project updated successfully!" : "Project added successfully!", "success");
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
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Projects</h1>
          <p className="text-slate-500 mt-1">{projects.length} projects registered</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); }} className="btn-glow px-5 py-2.5 text-sm">
          <span>{showForm && !editId ? "× Close" : "+ Add Project"}</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-bold text-white">{editId ? "Edit Project" : "Add New Project"}</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Project Title *</label>
              <input type="text" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Project name..." className="admin-input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <input type="text" value={form.category ?? ""} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Web App, Mobile, API..." className="admin-input" />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured ?? false}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 accent-purple-500"
              />
              <label htmlFor="featured" className="text-sm text-slate-300">Mark as Featured ★</label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Short project description..." rows={3} className="admin-input resize-none" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack</label>
              <TagInput value={form.tech_stack} onChange={(tags) => setForm((f) => ({ ...f, tech_stack: tags }))} placeholder="React, Node.js, PostgreSQL — type then Enter" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Live URL</label>
              <input type="url" value={form.live_url ?? ""} onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))} placeholder="https://..." className="admin-input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
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

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="btn-glow px-6 py-2.5 text-sm disabled:opacity-50">
              <span>{saving ? "Saving..." : editId ? "Update Project" : "Add Project"}</span>
            </button>
            <button onClick={resetForm} className="btn-outline px-5 py-2.5 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Projects table */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="glass-card p-4 flex items-center gap-4">
              {/* Thumbnail */}
              <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-dark-300">
                {project.thumbnail_url ? (
                  <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 text-xl">◈</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-semibold truncate">{project.title}</h3>
                  {project.featured && <span className="tag text-[10px] bg-yellow-500/10 border-yellow-500/30 text-yellow-300">★ Featured</span>}
                  {project.category && <span className="tag text-[10px]">{project.category}</span>}
                </div>
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {project.tech_stack.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] text-slate-500">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleFeatured(project)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${project.featured ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}>
                  ★
                </button>
                <button onClick={() => startEdit(project)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id, project.title)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                  Delete
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-16 text-slate-600">
              No projects yet. Click &quot;Add Project&quot; to start.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
