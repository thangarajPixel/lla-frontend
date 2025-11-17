"use client";

import { usePathname } from "next/navigation";
import { TopArrowIcon } from "@/helpers/ImageHelper";
import ImageWidget from "../../widgets/ImageWidget";
import LinkWidget from "../../widgets/LinkWidget";
import type { ChevronIconProps, DropdownMenuProps } from "./types";

const ACTIVE_COLOR = "text-[#E97451]";
const NAV_LINK_CLASS = "";

const ChevronIcon = ({ isOpen, isSticky = false }: ChevronIconProps) => (
  <ImageWidget
    src={TopArrowIcon}
    alt="Arrow"
    className={`ml-3 w-[13px] h-[13px] transition-transform duration-500 ease-out ${
      isSticky ? "brightness-0" : ""
    } ${isOpen ? "rotate-180" : "rotate-0"}`}
  />
);

const DropdownMenu = ({
  menu,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  isSticky = false,
}: DropdownMenuProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(menu.pathPrefix);

  return (
    <li
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`flex items-center hover:opacity-80 cursor-pointer ${
          isActive ? ACTIVE_COLOR : ""
        }`}
      >
        {menu.label}
        <ChevronIcon isOpen={isOpen} isSticky={isSticky} />
      </div>
      <div
        className={`absolute top-full left-0 pt-4 min-w-[200px] origin-top ${
          isOpen
            ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto"
            : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
        } transition-all duration-500 ease-out`}
      >
        <ul
          className={`${
            isSticky
              ? "bg-white shadow-lg rounded-md py-2"
              : "bg-black shadow-lg rounded-md py-2"
          }`}
        >
          {menu.items.map((item) => (
            <li key={item.href}>
              <LinkWidget
                href={item.href}
                className={`block px-4 py-2 whitespace-nowrap ${NAV_LINK_CLASS} ${
                  pathname === item.href
                    ? ACTIVE_COLOR
                    : isSticky
                      ? "text-black hover:bg-black/10"
                      : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </LinkWidget>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropdownMenu;
