"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { toast } from "@/components/ui/Toast";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  aspectRatio?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  label = "Upload Image",
  aspectRatio = "aspect-video",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast("Only image files are allowed", "error");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast("Max file size is 5MB", "error");
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", "portfolio");
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        onChange(data.url);
        toast("Image uploaded successfully!", "success");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        toast(msg, "error");
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative ${aspectRatio} rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden ${
          dragging
            ? "border-purple-400 bg-purple-500/10"
            : "border-purple-500/30 bg-white/[0.02]"
        }`}
      >
        {value ? (
          <>
            <Image src={value} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer text-white text-sm font-medium bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors">
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
                />
              </label>
            </div>
          </>
        ) : (
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer gap-3">
            {uploading ? (
              <>
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-slate-400">Uploading...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-2xl">
                  ↑
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-300 font-medium">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP — max 5MB</p>
                </div>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
            />
          </label>
        )}
      </div>
      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or enter image URL..."
          className="admin-input text-xs"
        />
      )}
      {!value && (
        <input
          type="text"
          placeholder="Or manually enter image URL..."
          className="admin-input text-xs"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
