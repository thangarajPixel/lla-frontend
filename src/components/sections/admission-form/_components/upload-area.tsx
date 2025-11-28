import { Upload } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

export const UploadArea = ({ onFilesSelected }: UploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      aria-hidden
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center gap-4 bg-card hover:border-primary/50 transition-colors"
    >
      <Upload className="w-12 h-12 text-primary" strokeWidth={1.5} />
      <p className="text-foreground/70 text-sm">Drag and Drop here</p>
      <Button
        onClick={handleSelectClick}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
      >
        Select File
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
};
