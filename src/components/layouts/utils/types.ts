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
  isSticky?: boolean;
};

export type ChevronIconProps = {
  isOpen: boolean;
  isSticky?: boolean;
};

export type CourseCard = {
  Slug: string;
  id: number;
  Title: string;
  Description: string;
  Btn_txt: string;
  Image: Array<{
    id: number;
    name: string;
    url: string;
  }>;
};

export type CourseSectionData = {
  __component?: string;
  id?: number;
  Title?: string;
  Description?: string;
  Heading?: string;
  SubHeading?: string;
  Card?: CourseCard[];
};

export type AdmissionButtonProps = {
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
};

export type CourseItem = {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};

export type LogoItem = {
  id: number;
  name: string;
  url: string;
};

export type IconItem = {
  id: number;
  name: string;
  url: string;
  href?: string;
  caption?: string;
};

export type WebHeaderResponse = {
  id: number;
  documentId: string;
  Title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  Description: string;
  Btn_txt: string;
  Copy_right_txt: string;
  Location: string | null;
  Logo: LogoItem[] | null;
  Icon: IconItem[] | null;
  course: CourseItem[];
};
