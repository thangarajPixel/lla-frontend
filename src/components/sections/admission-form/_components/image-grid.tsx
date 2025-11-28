import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGridProps {
  images: Array<{ id: string; url: string; file: File }>;
  onRemove: (id: string) => void;
}

export const ImageGrid = ({ images, onRemove }: ImageGridProps) => {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <div className="aspect-4/3 rounded-xl overflow-hidden bg-muted">
            <img
              src={image.url}
              alt="Portfolio upload"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            onClick={() => onRemove(image.id)}
            size="icon"
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
