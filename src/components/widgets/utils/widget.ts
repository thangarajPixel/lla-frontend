import type Image from "next/image";
import type Link from "next/link";
import type { ReactNode } from "react";
import type { RippleButton } from "@/components/ui/ripple-button";
import type { ScrollWidgetProps } from "../ScrollWidget";

export type ImageWidgetProps = React.ComponentProps<typeof Image>;
export type LinkWidgetProps = React.ComponentProps<typeof Link>;
export type ButtonWidgetProps = React.ComponentProps<typeof RippleButton>;
export type { ScrollWidgetProps };

export type DialogWidgetProps = {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  cancelText?: string;
  showCancel?: boolean;
  showCloseButton?: boolean;
  customCloseButton?: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
};

export type OrangeButtonWidgetProps = {
  content: string;
  className?: string;
  onClick?: () => void;
};
