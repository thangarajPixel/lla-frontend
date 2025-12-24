"use client";
import {
  Archive,
  File,
  FileCode,
  FileJson,
  FileSpreadsheet,
  FileText,
  ImageIcon,
  Music,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import ImageWidget from "@/components/widgets/ImageWidget";
// import { validateDimensions } from "@/helpers/ConstantHelper";
import { UploadIconImg } from "@/helpers/ImageHelper";
import { cn } from "@/lib/utils";

type FileUploadButtonProps = {
  placeholder?: string;
  maxSize?: string;
  variant?: "dark" | "light";
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  defaultValue?: DocumentFile | null;
  inputClassName?: string;
  hideDescription?: boolean;
};

const generateDocumentPreview = (file: File): string => {
  const fileName = file.name;
  const fileExtension = fileName.split(".").pop()?.toUpperCase() || "FILE";

  const svg = `
    <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <rect width="96" height="96" fill="#f5f5f5" rx="8"/>
      <rect x="8" y="8" width="80" height="80" fill="white" rx="4" stroke="#e5e5e5" strokeWidth="1"/>
      <text x="48" y="45" fontSize="32" fontWeight="bold" textAnchor="middle" fill="#666" fontFamily="system-ui">${fileExtension.slice(0, 3)}</text>
      <line x1="16" y1="58" x2="80" y2="58" stroke="#e5e5e5" strokeWidth="1"/>
      <line x1="16" y1="66" x2="80" y2="66" stroke="#e5e5e5" strokeWidth="1"/>
      <line x1="16" y1="74" x2="70" y2="74" stroke="#e5e5e5" strokeWidth="1"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
};

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) {
    return <ImageIcon className="w-4 h-4" />;
  } else if (fileType.startsWith("audio/")) {
    return <Music className="w-4 h-4" />;
  } else if (fileType.includes("pdf")) {
    return <FileText className="w-4 h-4 text-red-500" />;
  } else if (fileType.includes("word") || fileType.includes("document")) {
    return <FileText className="w-4 h-4 text-blue-500" />;
  } else if (
    fileType.includes("spreadsheet") ||
    fileType.includes("excel") ||
    fileType.includes("csv")
  ) {
    return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
  } else if (fileType.includes("json")) {
    return <FileJson className="w-4 h-4" />;
  } else if (
    fileType.includes("code") ||
    fileType.includes("javascript") ||
    fileType.includes("typescript") ||
    fileType.includes("python")
  ) {
    return <FileCode className="w-4 h-4" />;
  } else if (fileType.includes("text")) {
    return <FileText className="w-4 h-4" />;
  } else if (fileType.includes("zip") || fileType.includes("compressed")) {
    return <Archive className="w-4 h-4" />;
  }
  return <File className="w-4 h-4" />;
};

export function FileUploadButton({
  placeholder,
  maxSize = "2MB",
  variant,
  onUpload,
  onRemove,
  defaultValue,
  inputClassName,
  hideDescription,
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ALLOWED_MIME_TYPES = [
      "application/pdf",
      // "application/msword",
      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error("Only PDF, JPG, JPEG, PNG files are allowed.", {
        position: "bottom-right",
      });
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB.", {
        position: "bottom-right",
      });
      e.target.value = "";
      return;
    }

    setIsRemoved(false);

    if (file.type.startsWith("image/")) {
      // const valid = await validateDimensions(file);
      // if (!valid) {
      //   e.target.value = "";
      //   return;
      // }

      const url = URL.createObjectURL(file);
      setPreview(url);
      onUpload?.(file);
    } else {
      setPreview(generateDocumentPreview(file));
      onUpload?.(file);
    }

    setSelectedFile(file);
  };

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`flex items-center justify-center gap-2 w-full py-2 cursor-pointer rounded-lg transition-colors ${
          variant === "light"
            ? "border border-border text-muted-foreground hover:bg-muted"
            : "bg-gray-100 border border-[#969696]"
        } ${inputClassName}`}
      >
        <ImageWidget src={UploadIconImg} alt="Upload Icon" className="size-6" />
        <span className="text-sm font-light lg:font-normal">{placeholder}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      <p
        className={cn(
          "text-xs text-muted-foreground mt-4",
          hideDescription && "hidden",
        )}
      >
        Max. file size not more than {maxSize}.
      </p>

      <div className="flex-1 min-w-0">
        {!isRemoved &&
          (preview || defaultValue?.mime?.startsWith("image/") ? (
            <div className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                width={100}
                height={100}
                src={preview || defaultValue?.url || "/placeholder.svg"}
                alt={selectedFile?.name ?? ""}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ) : (
            <div className="text-muted-foreground mt-2">
              {selectedFile &&
                getFileIcon(selectedFile?.type ?? defaultValue?.mime ?? "")}
            </div>
          ))}

        {(selectedFile || defaultValue) && !isRemoved && (
          <>
            <p className="text-sm font-medium truncate text-foreground">
              {selectedFile?.name ?? defaultValue?.name ?? ""}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>
                {formatFileSize(selectedFile?.size ?? defaultValue?.size ?? 0)}
              </span>
              {/* <span>•</span>
              <span>
                {selectedFile?.type || defaultValue?.mime || "unknown type"}
              </span> */}
              <button
                type="button"
                className="text-white bg-red-500 size-5 rounded-full p-1 text-sm flex items-center justify-center hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                  onRemove?.();
                  setIsRemoved(true);
                }}
              >
                X
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
