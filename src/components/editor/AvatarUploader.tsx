import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, AlertCircle, Check, RefreshCw, FileImage, Trash2 } from "lucide-react";

interface AvatarUploaderProps {
  currentUrl: string;
  onChangeUrl: (url: string) => void;
  token: string | null;
}

export function AvatarUploader({ currentUrl, onChangeUrl, token }: AvatarUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }
    
    // Validate size limit (~10MB safety)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image search size exceeded. Limit is 10MB of storage allocation.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      // Read the file as base64 string
      const reader = new FileReader();
      
      const fileLoadedPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Unable to read local binary file."));
        reader.readAsDataURL(file);
      });

      const base64Data = await fileLoadedPromise;

      // POST to backend API
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ image: base64Data })
      });

      if (!response.ok) {
        const errDetails = await response.json();
        throw new Error(errDetails.error || "The gateway refused image file serialization.");
      }

      const resData = await response.json();
      if (resData.imageUrl) {
        onChangeUrl(resData.imageUrl);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e: any) {
      setError(e.message || "Failed to finalize image uploads.");
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const triggerInputClick = () => {
    fileInputRef.current?.click();
  };

  const clearAvatar = () => {
    onChangeUrl("");
  };

  return (
    <div className="space-y-3" id="profile-avatar-uploader-section">
      <div className="flex items-center gap-4">
        {/* Left Side: Avatar Rounded Thumbnail */}
        <div className="relative group w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0 flex items-center justify-center">
          {currentUrl ? (
            <img 
              src={currentUrl} 
              alt="Avatar Preview" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FileImage className="w-6 h-6 text-zinc-650" />
          )}

          {uploading && (
            <div className="absolute inset-0 bg-[#000]/70 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
            </div>
          )}
        </div>

        {/* Right Side: Quick Action Triggers */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white tracking-tight">Profile Portrait Image</p>
          <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">Drag to drop your photo, upload from disk, or enter an active image URL below.</p>
          
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={triggerInputClick}
              disabled={uploading}
              className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-bold text-zinc-300 hover:text-white hover:bg-zinc-850 hover:border-zinc-705 transition-all cursor-pointer disabled:opacity-50"
            >
              Select File
            </button>
            {currentUrl && (
              <button
                type="button"
                onClick={clearAvatar}
                className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300 transition-all font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Avatar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Drag & Drop Visual Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={triggerInputClick}
        className={`relative h-28 border rounded-xl flex flex-col items-center justify-center text-center p-4 transition-all cursor-pointer select-none group ${
          isDragActive 
            ? "border-blue-500 bg-blue-950/10" 
            : "border-dashed border-zinc-800 bg-[#0c0a0e] hover:border-zinc-700"
        }`}
      >
        {uploading ? (
          <div className="space-y-1.5 flex flex-col items-center">
            <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
            <span className="text-[11px] font-bold text-zinc-350">Uploading Image Asset...</span>
            <span className="text-[9px] text-zinc-500">Writing file streams to platform persistence</span>
          </div>
        ) : success ? (
          <div className="space-y-1.5 flex flex-col items-center animate-in fade-in scale-in-95 duration-200">
            <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center border border-emerald-500/20">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[11px] font-bold text-emerald-400">Avatar Synced Successfully!</span>
            <span className="text-[9px] text-zinc-500">Saved and linked to developer portfolio</span>
          </div>
        ) : (
          <div className="space-y-1.5 flex flex-col items-center">
            <UploadCloud className={`w-7 h-7 transition-transform duration-200 group-hover:-translate-y-0.5 ${
              isDragActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
            }`} />
            <span className="text-[11px] font-bold text-zinc-350 group-hover:text-zinc-200">
              {isDragActive ? "Drop profile picture here" : "Drag & Drop Image File"}
            </span>
            <span className="text-[9px] text-zinc-650 font-mono">PNG, JPG, WEBP up to 10MB</span>
          </div>
        )}
      </div>

      {/* Error notification banner */}
      {error && (
        <div className="flex items-start gap-2 bg-red-950/30 border border-red-500/10 p-3 rounded-lg text-[11px] text-red-400 font-sans animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Compression or network alert:</span>
            <p className="text-zinc-400 leading-normal">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
