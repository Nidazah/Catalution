"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    // Debug logging
    console.log("📤 Uploading file:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      sizeBytes: file.size
    });

    // Validate before upload
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError(`Unsupported file type: ${file.type}. Use JPG, PNG, WEBP, GIF or SVG.`);
      return;
    }

    if (file.size > maxSize) {
      setError(`File is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 5MB.`);
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Debug: Check FormData
      console.log("📦 FormData entries:");
      for (let pair of formData.entries()) {
        console.log(`  ${pair[0]}:`, pair[1] instanceof File ? `File(${pair[1].name}, ${pair[1].size} bytes)` : pair[1]);
      }

      const res = await fetch("/api/upload", { 
        method: "POST", 
        body: formData 
      });

      const data = await res.json();
      
      console.log("📥 Response:", {
        status: res.status,
        ok: res.ok,
        data: data
      });

      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }

      onChange(data.url);
      console.log("✅ Upload successful:", data.url);
    } catch (error) {
      console.error("❌ Upload error:", error);
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset so selecting the same file again still fires onChange
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="grid min-w-0 gap-1">
      <span className="text-[10.5px] font-semibold text-[#24133f]">{label}</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={onInputChange}
        className="hidden"
      />

      {value ? (
        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[#ddd6eb] p-2">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#f5f1fb]">
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="truncate whitespace-nowrap text-[10.5px] text-[#6b7280]" title={value}>{value}</p>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="text-[10.5px] font-semibold text-[#481d96] hover:underline disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Replace"}
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                disabled={uploading}
                className="inline-flex items-center gap-0.5 text-[10.5px] font-semibold text-red-500 hover:underline disabled:opacity-60"
              >
                <X size={11} /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed p-5 text-center transition-colors ${
            uploading
              ? "cursor-not-allowed border-[#d8c9f4] bg-[#faf7ff]"
              : "border-[#d8c9f4] hover:border-[#8b5cf6] hover:bg-[#faf7ff]"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={18} className="animate-spin text-[#8b5cf6]" />
              <span className="text-[10.5px] text-[#7b8190]">Uploading...</span>
            </>
          ) : (
            <>
              <ImagePlus size={18} className="text-[#c4b2e8]" />
              <span className="text-[10.5px] text-[#7b8190]">
                Click to upload, or drag an image here
              </span>
              <span className="text-[9.5px] text-[#a8a2b5]">JPG, PNG, WEBP, GIF or SVG · up to 5MB</span>
            </>
          )}
        </div>
      )}

      {error && <p className="text-[10.5px] text-red-600">{error}</p>}
    </div>
  );
}