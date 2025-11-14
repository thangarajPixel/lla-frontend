import { usePathname } from "next/navigation";
import LinkWidget from "../../widgets/LinkWidget";
import type { NavLinkProps } from "./types";

const ACTIVE_COLOR = "text-[#E97451]";
const NAV_LINK_CLASS = "transition-colors";

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <LinkWidget
      href={href}
      className={`${NAV_LINK_CLASS} ${pathname === href ? ACTIVE_COLOR : ""}`}
    >
      {children}
    </LinkWidget>
  );
};

export default NavLink;
