import type Image from "next/image";
import type Link from "next/link";
import type { RippleButton } from "@/components/ui/ripple-button";
import type { ScrollWidgetProps } from "../ScrollWidget";

export type ImageWidgetProps = React.ComponentProps<typeof Image>;
export type LinkWidgetProps = React.ComponentProps<typeof Link>;
export type ButtonWidgetProps = React.ComponentProps<typeof RippleButton>;
export type { ScrollWidgetProps };
