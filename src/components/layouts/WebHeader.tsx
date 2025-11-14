"use client";

import { useState } from "react";
import { ArrowRight, Logo } from "@/helpers/ImageHelper";
import ButtonWidget from "../widgets/ButtonWidget";
import ContainerWidget from "../widgets/ContainerWidget";
import ImageWidget from "../widgets/ImageWidget";
import LinkWidget from "../widgets/LinkWidget";
import NavLink from "./utils/NavLink";
import DropdownMenu from "./utils/DropdownMenu";
import type { MenuItem, DropdownMenu as DropdownMenuType } from "./utils/types";

const menuItems: (MenuItem | DropdownMenuType)[] = [
  { href: "/about-us", label: "About us" },
  {
    label: "Courses",
    pathPrefix: "/courses",
    items: [
      { href: "/courses/undergraduate", label: "Undergraduate" },
      { href: "/courses/graduate", label: "Graduate" },
      { href: "/courses/certificate", label: "Certificate Programs" },
    ],
  },
  {
    label: "Campus",
    pathPrefix: "/campus",
    items: [
      { href: "/campus/location", label: "Location" },
      { href: "/campus/facilities", label: "Facilities" },
      { href: "/campus/tours", label: "Campus Tours" },
    ],
  },
  { href: "/faculty", label: "Faculty" },
];

const WebHeader = () => {
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isDropdown = (item: MenuItem | DropdownMenuType): item is DropdownMenuType =>
    "items" in item;

  return (
    <header className="w-full bg-black text-white">
      <nav>
        <ContainerWidget>
          <div className="flex items-center justify-between">
            <LinkWidget href="/">
              <ImageWidget
                src={Logo}
                alt="Logo"
                className="3xl:w-[348px] 3xl:h-[69px]"
              />
            </LinkWidget>
            <ul className="flex items-center gap-8 text-xs 2xl:text-[14px] 3xl:text-[18px]">
              {menuItems.map((item) => {
                if (isDropdown(item)) {
                  const menuId = item.label.toLowerCase();
                  return (
                    <DropdownMenu
                      key={menuId}
                      menu={item}
                      isOpen={openDropdown === menuId}
                      onMouseEnter={() => setOpenDropdown(menuId)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    />
                  );
                }
                return (
                  <li key={item.href}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                  </li>
                );
              })}
              <li>
                <ButtonWidget className="orange-button group rounded-[60px] px-5 py-2 text-xs 2xl:text-[14px] 3xl:text-[18px]">
                  Admission Open
                  <ImageWidget
                    src={ArrowRight}
                    alt="Arrow Right"
                    className="lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </ButtonWidget>
              </li>
            </ul>
          </div>
        </ContainerWidget>
      </nav>
    </header>
  );
};

export default WebHeader;