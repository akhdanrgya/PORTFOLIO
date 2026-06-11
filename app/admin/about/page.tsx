"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/Toast";
import type { About } from "@/lib/supabase";

export default function AboutAdminPage() {
  const [data, setData] = useState<Partial<About>>({});
  const [bannerPhotos, setBannerPhotos] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => {
        if (d) { setData(d); setBannerPhotos(d.banner_photos ?? []); }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, banner_photos: bannerPhotos }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast("About saved successfully!", "success");
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const addBannerSlot = () => setBannerPhotos((prev) => [...prev, ""]);
  const removeBanner = (i: number) => setBannerPhotos((prev) => prev.filter((_, idx) => idx !== i));
  const updateBanner = (i: number, url: string) => setBannerPhotos((prev) => prev.map((p, idx) => idx === i ? url : p));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>About & Banner</h1>
          <p>Edit profile information and banner photos</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50 shrink-0"
        >
          <span className="flex items-center gap-1.5">
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Changes
              </>
            )}
          </span>
        </button>
      </div>

      {/* Profile Photo */}
      <div className="form-section">
        <h2 className="form-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-accent">
            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          Profile Photo
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          <ImageUpload
            value={data.profile_photo_url ?? null}
            onChange={(url) => setData((d) => ({ ...d, profile_photo_url: url }))}
            folder="profile"
            label="Profile Photo"
            aspectRatio="aspect-square max-w-[140px]"
          />
          {data.profile_photo_url && (
            <div className="shrink-0">
              <p className="form-label mb-2">Preview</p>
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-accent/40">
                <Image src={data.profile_photo_url} alt="Profile preview" fill className="object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bio & Tagline */}
      <div className="form-section">
        <h2 className="form-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-accent">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Bio & Tagline
        </h2>
        <div className="space-y-6">
          <div>
            <label className="form-label">Tagline</label>
            <input
              type="text"
              value={data.tagline ?? ""}
              onChange={(e) => setData((d) => ({ ...d, tagline: e.target.value }))}
              placeholder="Short tagline shown in the hero section..."
              className="admin-input"
            />
            <p className="text-xs text-slate-600 mt-1.5">Displayed in the hero section below your name</p>
          </div>
          <div>
            <label className="form-label">Bio</label>
            <textarea
              value={data.bio ?? ""}
              onChange={(e) => setData((d) => ({ ...d, bio: e.target.value }))}
              placeholder="A short story about yourself..."
              rows={5}
              className="admin-input resize-none"
            />
            <p className="text-xs text-slate-600 mt-1.5">Displayed in the About section</p>
          </div>
        </div>
      </div>

      {/* Banner Photos */}
      <div className="form-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="form-section-title mb-0" style={{ borderBottom: "none", paddingBottom: 0 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-accent">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Banner / Gallery Photos
          </h2>
          <button onClick={addBannerSlot} className="btn-outline px-3 py-2 text-sm">
            + Add Photo
          </button>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          First photo is used as hero background. Others appear in the About section gallery.
        </p>

        {bannerPhotos.length === 0 ? (
          <div
            className="text-center py-8 text-slate-600 text-sm rounded-xl cursor-pointer hover:border-emerald-accent/30 transition-colors"
            style={{ border: "1px dashed rgba(16,185,129,0.15)" }}
            onClick={addBannerSlot}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-8 h-8 mx-auto mb-2 text-slate-700">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
            No banner photos yet — click to add
          </div>
        ) : (
          <div className="space-y-6">
            {bannerPhotos.map((photo, i) => (
              <div key={i} className="relative p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500 font-medium">
                    Banner {i + 1}
                    {i === 0 && <span className="ml-2 tag text-[10px]">Hero Background</span>}
                  </span>
                  <button
                    onClick={() => removeBanner(i)}
                    className="text-xs text-red-500/60 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-3.5 h-3.5">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                    Remove
                  </button>
                </div>
                <ImageUpload
                  value={photo || null}
                  onChange={(url) => updateBanner(i, url)}
                  folder="banners"
                  label={`Upload Photo ${i + 1}`}
                  aspectRatio="aspect-video"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save button (bottom) */}
      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary px-6 py-3 text-sm disabled:opacity-50"
        >
          <span>{saving ? "Saving..." : "Save All Changes"}</span>
        </button>
      </div>
    </div>
  );
}
