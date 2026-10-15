"use client";

import { useState, useRef, useEffect } from "react";

interface MediaUploaderProps {
  name?: string;
  defaultValue?: string;
  acceptedTypes?: "any" | "image-only";
  label?: string;
  onUrlChange?: (url: string) => void;
  onMediaTypeChange?: (mediaType: "IMAGE" | "VIDEO") => void;
  onThumbnailChange?: (thumbUrl: string) => void;
  helperText?: string;
}

export default function MediaUploader({
  name = "mediaUrl",
  defaultValue = "",
  acceptedTypes = "any",
  label = "Upload Image or Video",
  onUrlChange,
  onMediaTypeChange,
  onThumbnailChange,
  helperText,
}: MediaUploaderProps) {
  const [mediaUrl, setMediaUrl] = useState<string>(defaultValue);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [configMessage, setConfigMessage] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState<boolean>(!defaultValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with defaultValue when editing an item (React recommended pattern)
  const [prevDefault, setPrevDefault] = useState<string>(defaultValue);
  if (defaultValue !== prevDefault) {
    setPrevDefault(defaultValue);
    setMediaUrl(defaultValue);
  }

  // Check upload configuration status on mount
  useEffect(() => {
    async function checkConfig() {
      try {
        const res = await fetch("/api/cloudinary/sign", { method: "POST" });
        if (res.status === 401) {
          setIsConfigured(false);
          setConfigMessage("Session expired. Please log in again to upload media.");
          return;
        }
        const data = await res.json();
        if (data.configured) {
          setIsConfigured(true);
        } else {
          setIsConfigured(false);
          setConfigMessage(
            data.message || "Media upload is not configured yet. You can continue using a media URL."
          );
        }
      } catch {
        setIsConfigured(false);
        setConfigMessage("Media upload is not configured yet. You can continue using a media URL.");
      }
    }
    checkConfig();
  }, []);

  const isVideo = (url: string): boolean => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      lower.endsWith(".mp4") ||
      lower.endsWith(".mov") ||
      lower.endsWith(".webm") ||
      lower.includes("/video/upload/")
    );
  };

  const handleUrlUpdate = (newUrl: string) => {
    setMediaUrl(newUrl);
    onUrlChange?.(newUrl);

    if (isVideo(newUrl)) {
      onMediaTypeChange?.("VIDEO");
      // Cloudinary automatic video thumbnail generation
      if (newUrl.includes("res.cloudinary.com") && newUrl.includes("/video/upload/")) {
        const thumbUrl = newUrl.replace(/\.[^/.]+$/, ".jpg");
        onThumbnailChange?.(thumbUrl);
      }
    } else if (newUrl) {
      onMediaTypeChange?.("IMAGE");
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(false);

    // Validate mime type
    const isImageFile = file.type.startsWith("image/");
    const isVideoFile = file.type.startsWith("video/");

    if (acceptedTypes === "image-only" && !isImageFile) {
      setUploadError("Please select an image file (JPG, PNG, or WebP).");
      return;
    }

    if (!isImageFile && !isVideoFile) {
      setUploadError("Unsupported format. Please select an image (JPG, PNG, WebP) or video (MP4, MOV, WebM).");
      return;
    }

    // Maximum file sizes: 15MB for images, 100MB for video
    const maxSizeBytes = isVideoFile ? 100 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError(`File is too large. Maximum size is ${isVideoFile ? "100MB for video" : "15MB for images"}.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // 1. Get secure upload signature from server
      const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
      const signData = await signRes.json();

      if (!signData.configured) {
        setIsConfigured(false);
        setConfigMessage(signData.message || "Media upload is not configured yet. You can continue using a media URL.");
        setUploadError(signData.message || "Cloudinary media upload is not configured yet.");
        setIsUploading(false);
        return;
      }

      const { cloudName, apiKey, timestamp, folder, signature } = signData;
      const resourceType = isVideoFile ? "video" : "image";

      // 2. Direct client-to-Cloudinary upload with progress tracking
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("folder", folder);
      formData.append("signature", signature);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 90);
          setUploadProgress(Math.max(10, percent));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            const hostedUrl = response.secure_url || response.url;
            setUploadProgress(100);
            setUploadSuccess(true);
            handleUrlUpdate(hostedUrl);
          } catch {
            setUploadError("Uploaded successfully, but failed to parse response.");
          }
        } else {
          try {
            const errResp = JSON.parse(xhr.responseText);
            setUploadError(errResp.error?.message || "Failed to upload to Cloudinary.");
          } catch {
            setUploadError(`Upload failed with status code ${xhr.status}.`);
          }
        }
        setIsUploading(false);
      };

      xhr.onerror = () => {
        setUploadError("Network connection error during upload. Please check your network and try again.");
        setIsUploading(false);
      };

      xhr.send(formData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error";
      setUploadError(msg);
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearMedia = () => {
    setMediaUrl("");
    setUploadSuccess(false);
    setUploadError(null);
    onUrlChange?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {/* Label & Type Hint */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", margin: 0 }}>
          {label} *
        </label>
        <span style={{ fontSize: "0.75rem", color: "var(--wh-text-muted)" }}>
          {acceptedTypes === "image-only" ? "JPG, PNG, WebP" : "Images (JPG, PNG, WebP) or Videos (MP4, MOV, WebM)"}
        </span>
      </div>

      {/* Hidden input to ensure native form submission captures mediaUrl */}
      <input type="hidden" name={name} value={mediaUrl} />

      {/* Unconfigured Alert Message */}
      {isConfigured === false && (
        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "1px solid #FDE68A",
            color: "#92400E",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "0.82rem",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-info-circle"></i>
          <span>{configMessage || "Media upload is not configured yet. You can continue using a media URL."}</span>
        </div>
      )}

      {/* Media Preview Box (If media is selected) */}
      {mediaUrl ? (
        <div
          style={{
            border: "1.5px solid var(--wh-pale-sky)",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "var(--wh-warm-white)",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "200px",
              backgroundColor: "#0A1D33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {isVideo(mediaUrl) ? (
              <video
                src={mediaUrl}
                controls
                playsInline
                preload="metadata"
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaUrl}
                alt="Uploaded media preview"
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
              />
            )}
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "rgba(0, 34, 67, 0.85)",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <i className={`fas ${isVideo(mediaUrl) ? "fa-video" : "fa-image"}`} style={{ marginRight: "4px" }}></i>
              {isVideo(mediaUrl) ? "Video Attached" : "Image Attached"}
            </span>
          </div>

          <div
            style={{
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid var(--wh-pale-sky)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--wh-text-muted)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "320px",
              }}
              title={mediaUrl}
            >
              {mediaUrl}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isConfigured === false}
                style={{
                  padding: "4px 10px",
                  fontSize: "0.78rem",
                  borderRadius: "4px",
                  border: "1px solid var(--wh-pale-sky)",
                  backgroundColor: "#FFFFFF",
                  color: "var(--wh-navy)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <i className="fas fa-arrows-rotate"></i> Replace
              </button>
              <button
                type="button"
                onClick={clearMedia}
                disabled={isUploading}
                style={{
                  padding: "4px 10px",
                  fontSize: "0.78rem",
                  borderRadius: "4px",
                  border: "1px solid var(--wh-danger-border)",
                  backgroundColor: "var(--wh-danger-bg)",
                  color: "var(--wh-danger)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <i className="fas fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Dropzone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => {
            if (isConfigured !== false && !isUploading) {
              fileInputRef.current?.click();
            }
          }}
          style={{
            border: `2px dashed ${isDragging ? "var(--wh-blue-primary)" : "var(--wh-pale-sky)"}`,
            borderRadius: "8px",
            padding: "24px 16px",
            textAlign: "center",
            backgroundColor: isDragging ? "rgba(0, 34, 67, 0.03)" : "var(--wh-warm-white)",
            cursor: isConfigured === false ? "default" : "pointer",
            transition: "all 0.2s ease",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 34, 67, 0.07)",
              color: "var(--wh-navy)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
              fontSize: "18px",
            }}
          >
            <i className={`fas ${acceptedTypes === "image-only" ? "fa-cloud-arrow-up" : "fa-photo-film"}`}></i>
          </div>

          <p style={{ margin: "0 0 4px", fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)" }}>
            {isUploading
              ? "Uploading to Cloudinary..."
              : isConfigured === false
              ? "Direct upload unavailable"
              : "Click to select a file or drag and drop"}
          </p>

          <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>
            {acceptedTypes === "image-only"
              ? "Supports JPG, JPEG, PNG, or WebP up to 15MB"
              : "Supports JPG, PNG, WebP images (15MB) or MP4, MOV, WebM videos (100MB)"}
          </p>

          {/* Progress Bar */}
          {isUploading && (
            <div style={{ marginTop: "14px" }}>
              <div
                style={{
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(0, 34, 67, 0.12)",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "280px",
                  margin: "0 auto 6px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${uploadProgress}%`,
                    backgroundColor: "var(--wh-community-green)",
                    transition: "width 0.2s ease",
                  }}
                ></div>
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-navy)" }}>
                {uploadProgress}% Uploaded
              </span>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        accept={
          acceptedTypes === "image-only"
            ? "image/jpeg,image/png,image/webp"
            : "image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
        }
        style={{ display: "none" }}
      />

      {/* Upload Feedback Alerts */}
      {uploadSuccess && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--wh-community-green)",
            fontWeight: 600,
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <i className="fas fa-check-circle"></i> Media uploaded and hosted successfully!
        </div>
      )}

      {uploadError && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--wh-danger)",
            fontWeight: 600,
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <i className="fas fa-exclamation-triangle"></i> {uploadError}
        </div>
      )}

      {/* Manual URL Input Fallback Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: "var(--wh-blue-primary)",
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "underline",
            marginBottom: "6px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <i className={`fas ${showManualInput ? "fa-chevron-up" : "fa-link"}`}></i>
          {showManualInput ? "Hide manual URL input" : "Or enter media URL manually"}
        </button>

        {showManualInput && (
          <div style={{ marginTop: "4px" }}>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => handleUrlUpdate(e.target.value)}
              placeholder="e.g. https://res.cloudinary.com/... or /images/..."
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.85rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span style={{ fontSize: "0.72rem", color: "var(--wh-text-muted)", display: "block", marginTop: "3px" }}>
              {helperText || "You can paste a Cloudinary hosted URL, external media URL, or local path (/images/...)"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
