import Link from "next/link";
import type { LinkWidgetProps } from "./utils/widget";

const LinkWidget = ({ children, ...props }: LinkWidgetProps) => {
  return <Link {...props}>{children}</Link>;
};

export default LinkWidget;
