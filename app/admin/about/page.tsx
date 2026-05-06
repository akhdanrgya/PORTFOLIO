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
        if (d) {
          setData(d);
          setBannerPhotos(d.banner_photos ?? []);
        }
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
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">About & Banner</h1>
          <p className="text-slate-500 mt-1">Edit profile information and banner photos</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-glow px-6 py-2.5 text-sm disabled:opacity-50"
        >
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {/* Profile Photo */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Profile Photo</h2>
        <ImageUpload
          value={data.profile_photo_url ?? null}
          onChange={(url) => setData((d) => ({ ...d, profile_photo_url: url }))}
          folder="profile"
          label="Profile Photo"
          aspectRatio="aspect-square max-w-xs"
        />
      </div>

      {/* Banner Photos */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Banner / Gallery Photos</h2>
          <button
            onClick={addBannerSlot}
            className="btn-outline px-4 py-2 text-sm"
          >
            + Add Photo
          </button>
        </div>
        <p className="text-slate-500 text-sm">First photo is used as hero background. Others appear in the About section.</p>

        <div className="space-y-4">
          {bannerPhotos.map((photo, i) => (
            <div key={i} className="relative">
              <ImageUpload
                value={photo || null}
                onChange={(url) => updateBanner(i, url)}
                folder="banners"
                label={`Banner ${i + 1}${i === 0 ? " (Hero Background)" : ""}`}
                aspectRatio="aspect-video"
              />
              <button
                onClick={() => removeBanner(i)}
                className="absolute top-8 right-0 text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded-lg hover:bg-red-500/10 transition-all"
              >
                Delete
              </button>
            </div>
          ))}
          {bannerPhotos.length === 0 && (
            <div className="text-center py-8 text-slate-600 border border-dashed border-slate-700 rounded-xl">
              No banner photos yet. Click &quot;Add Photo&quot; to add.
            </div>
          )}
        </div>
      </div>

      {/* Bio & Tagline */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Bio & Tagline</h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Tagline</label>
          <input
            type="text"
            value={data.tagline ?? ""}
            onChange={(e) => setData((d) => ({ ...d, tagline: e.target.value }))}
            placeholder="Short tagline that appears in the hero section..."
            className="admin-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
          <textarea
            value={data.bio ?? ""}
            onChange={(e) => setData((d) => ({ ...d, bio: e.target.value }))}
            placeholder="A short story about yourself..."
            rows={6}
            className="admin-input resize-none"
          />
        </div>
      </div>

      {/* Preview */}
      {data.profile_photo_url && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-white mb-4">Profile Photo Preview</h2>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/40">
            <Image src={data.profile_photo_url} alt="Profile preview" fill className="object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
