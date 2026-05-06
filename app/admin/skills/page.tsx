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
      toast("Skill added successfully!", "success");
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Skills</h1>
          <p className="text-slate-500 mt-1">{skills.length} skills registered</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-glow px-5 py-2.5 text-sm">
          <span>{showForm ? "× Close" : "+ Add Skill"}</span>
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Add New Skill</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="React, TypeScript, Figma..."
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
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
            label="Skill Icon (or devicons URL)"
            aspectRatio="aspect-square max-w-[120px]"
          />
          <p className="text-xs text-slate-500">
            Tip: You can use URL from{" "}
            <a href="https://devicon.dev" target="_blank" className="text-purple-400 hover:underline">devicon.dev</a>
            {" "}example: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
          </p>

          <div className="flex gap-3 pt-2">
            <button onClick={handleAdd} disabled={saving} className="btn-glow px-6 py-2.5 text-sm disabled:opacity-50">
              <span>{saving ? "Saving..." : "Add Skill"}</span>
            </button>
            <button onClick={() => setShowForm(false)} className="btn-outline px-5 py-2.5 text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Skills grid */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {skills.map((skill) => (
            <div key={skill.id} className="glass-card p-4 flex flex-col items-center gap-2 group relative">
              <div className="w-10 h-10 relative">
                {skill.icon_url ? (
                  <Image src={skill.icon_url} alt={skill.name} fill className="object-contain" />
                ) : (
                  <div className="w-full h-full rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs">
                    {skill.name.slice(0, 2)}
                  </div>
                )}
              </div>
              <span className="text-xs text-slate-400 text-center font-medium">{skill.name}</span>
              {skill.category && (
                <span className="text-[10px] text-slate-600">{skill.category}</span>
              )}
              <button
                onClick={() => handleDelete(skill.id, skill.name)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/0 text-red-500/0 group-hover:bg-red-500/20 group-hover:text-red-400 flex items-center justify-center text-xs transition-all duration-200"
              >
                ×
              </button>
            </div>
          ))}

          {skills.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-600">
              No skills yet. Click &quot;Add Skill&quot; to start.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
