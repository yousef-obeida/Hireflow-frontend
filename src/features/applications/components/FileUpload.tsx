import React, { useCallback, useRef, useState } from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

interface FileUploadProps {
  id: string;
  accept?: string;
  maxSizeMB?: number;
  value?: File | null;
  error?: string;
  onChange: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  accept = ".pdf,.docx",
  maxSizeMB = 10,
  value,
  error,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) onChange(file);
    },
    [onChange],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      onChange(file);
      // Reset so the same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    },
    [onChange],
  );

  const handleRemove = useCallback(() => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [onChange]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleFileChange}
        tabIndex={-1}
      />

      {/* Drop zone */}
      {!value ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload resume"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          className={`
            group flex flex-col items-center justify-center gap-3
            w-full min-h-[160px] rounded-xl border-2 border-dashed
            cursor-pointer transition-all duration-200 outline-none
            focus-visible:ring-4 focus-visible:ring-[#0058bc]/10
            ${
              isDragging
                ? "border-[#0058bc] bg-[#0058bc]/5"
                : error
                  ? "border-[#ba1a1a]/40 bg-[#ba1a1a]/[0.02] hover:border-[#ba1a1a]/60"
                  : "border-[#c1c6d7] bg-[#f9f9ff] hover:border-[#0058bc]/50 hover:bg-[#f0f3ff]/60"
            }
          `}
        >
          <div
            className={`
            flex items-center justify-center w-11 h-11 rounded-full transition-colors
            ${isDragging ? "bg-[#0058bc]/10 text-[#0058bc]" : "bg-[#e7eeff] text-[#717786] group-hover:text-[#0058bc]"}
          `}
          >
            <UploadCloud className="w-5 h-5" />
          </div>

          <div className="text-center">
            <p className="text-sm text-[#414755]">
              Drag and drop your resume here, or{" "}
              <span className="text-[#0058bc] font-semibold hover:underline">
                browse files
              </span>
            </p>
            <p className="text-xs text-[#717786] mt-1">
              Supported formats: PDF, DOCX (Max {maxSizeMB}MB)
            </p>
          </div>
        </div>
      ) : (
        /* File preview */
        <div className="flex items-center gap-3 w-full rounded-xl border border-[#c1c6d7] bg-[#f0f3ff] px-4 py-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0058bc]/10 text-[#0058bc] shrink-0">
            <FileIcon className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium text-[#111c2d] truncate">
              {value.name}
            </span>
            <span className="text-xs text-[#717786]">
              {formatSize(value.size)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-[#717786] hover:bg-[#ba1a1a]/10 hover:text-[#ba1a1a] transition-colors"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <span className="text-xs font-medium text-[#ba1a1a] mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};
