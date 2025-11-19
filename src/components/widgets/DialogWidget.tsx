"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DialogWidgetProps } from "./utils/widget";

const DialogWidget = ({
  trigger,
  title,
  description,
  children,
  footer,
  cancelText = "Cancel",
  showCancel = true,
  showCloseButton = true,
  customCloseButton,
  onSubmit,
  onOpenChange,
  className = "",
  contentClassName = "",
}: DialogWidgetProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  useEffect(() => {
    if (open && contentRef.current) {
      const video = contentRef.current.querySelector("video");
      if (video) {
        video.play().catch(() => {});
      }
    } else if (!open && contentRef.current) {
      const video = contentRef.current.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <form
        onSubmit={onSubmit ? handleSubmit : undefined}
        className={className}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={`data-[state=open]:duration-600 sm:max-w-[425px] ${contentClassName}`}
          showCloseButton={showCloseButton}
        >
          <div ref={contentRef}>
            {customCloseButton && (
              <div className="absolute top-4 right-4 z-50">
                {customCloseButton}
              </div>
            )}
            <DialogHeader>
              <DialogTitle className="hidden">{title}</DialogTitle>
              <DialogDescription className="hidden">
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
            {footer !== undefined
              ? footer
              : showCancel && (
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" type="button">
                        {cancelText}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                )}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DialogWidget;
