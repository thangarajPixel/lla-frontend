export type MenuItem = {
  href: string;
  label: string;
};

export type DropdownMenu = {
  label: string;
  pathPrefix: string;
  items: MenuItem[];
};

export type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export type DropdownMenuProps = {
  menu: DropdownMenu;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export type ChevronIconProps = {
  isOpen: boolean;
};

