"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/Toast";
import type { Skill } from "@/lib/supabase";

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", icon_url: "", category: "" });
  const [saving, setSaving] = useState(false);

  const fetchSkills = () =>
    fetch("/api/skills")
      .then((r) => r.json())
      .then(setSkills)
      .finally(() => setLoading(false));

  useEffect(() => { fetchSkills(); }, []);

  const handleAdd = async () => {
    if (!form.name) { toast("Skill name is required", "error"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, icon_url: form.icon_url || null, category: form.category || null }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast("Skill added!", "success");
      setForm({ name: "", icon_url: "", category: "" });
      setShowForm(false);
      fetchSkills();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to add skill", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      toast("Skill deleted", "success");
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to delete", "error");
    }
  };

  const categories = [...new Set(skills.map((s) => s.category).filter(Boolean))] as string[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Skills</h1>
          <p>{skills.length} skills registered</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-glow px-4 py-2.5 text-sm shrink-0"
        >
          <span className="flex items-center gap-1.5">
            {showForm ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-3.5 h-3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                Close
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-3.5 h-3.5"><path d="M12 5v14M5 12h14" /></svg>
                Add Skill
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
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Add New Skill
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="form-label">Skill Name <span>*</span></label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="React, TypeScript, Figma..."
                className="admin-input"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div>
              <label className="form-label">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Framework, Language, Tools..."
                list="category-list"
                className="admin-input"
              />
              <datalist id="category-list">
                {categories.map((c) => <option key={c} value={c} />)}
                <option value="Language" />
                <option value="Framework" />
                <option value="Backend" />
                <option value="Database" />
                <option value="Tools" />
                <option value="Design" />
              </datalist>
            </div>
          </div>

          <ImageUpload
            value={form.icon_url || null}
            onChange={(url) => setForm((f) => ({ ...f, icon_url: url }))}
            folder="skills"
            label="Skill Icon"
            aspectRatio="aspect-square max-w-[120px]"
          />
          <p className="text-xs text-slate-600 mt-2">
            Tip: Use devicons URL e.g.{" "}
            <a href="https://devicon.dev" target="_blank" className="text-purple-500 hover:text-purple-400">devicon.dev</a>
          </p>

          <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}>
            <button onClick={handleAdd} disabled={saving} className="btn-glow px-5 py-2.5 text-sm disabled:opacity-50">
              <span>{saving ? "Saving..." : "Add Skill"}</span>
            </button>
            <button onClick={() => setShowForm(false)} className="btn-outline px-4 py-2.5 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Skills grid */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="spinner" />
        </div>
      ) : skills.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500">No skills yet</p>
          <p className="text-xs text-slate-600 mt-1">Click &quot;Add Skill&quot; to get started</p>
        </div>
      ) : (
        <div className="space-y-10">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag">{cat}</span>
                  <span className="text-xs text-slate-600">{skills.filter(s => s.category === cat).length} skills</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5">
                  {skills.filter((s) => s.category === cat).map((skill) => (
                    <SkillCard key={skill.id} skill={skill} onDelete={handleDelete} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SkillCard({ skill, onDelete }: { skill: Skill; onDelete: (id: string, name: string) => void }) {
  return (
    <div className="group relative list-item p-3 flex flex-col items-center gap-2 text-center">
      <div className="w-9 h-9 relative">
        {skill.icon_url ? (
          <Image src={skill.icon_url} alt={skill.name} fill className="object-contain" />
        ) : (
          <div className="w-full h-full rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-300 font-bold text-xs">
            {skill.name.slice(0, 2)}
          </div>
        )}
      </div>
      <span className="text-[11px] text-slate-400 font-medium leading-tight">{skill.name}</span>
      <button
        onClick={() => onDelete(skill.id, skill.name)}
        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/35"
        title="Delete skill"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-2.5 h-2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
