"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo, LogoBlack } from "@/helpers/ImageHelper";
import ContainerWidget from "../widgets/ContainerWidget";
import ImageWidget from "../widgets/ImageWidget";
import LinkWidget from "../widgets/LinkWidget";
import AdmissionButton from "./utils/AdmissionButton";
import DropdownMenu from "./utils/DropdownMenu";
import MobileMenu from "./utils/MobileMenu";
import NavLink from "./utils/NavLink";
import type { DropdownMenu as DropdownMenuType, MenuItem } from "./utils/types";

const menuItems: (MenuItem | DropdownMenuType)[] = [
  { href: "/about-us", label: "About us" },
  {
    label: "Courses",
    pathPrefix: "/courses",
    items: [
      {
        href: "/courses/professional-photography",
        label: "PG Diploma in Professional Photography & Digital Production",
      },
      {
        href: "/courses/documentary-filmmaking",
        label: "PG Diploma in Documentary & Corporate Filmmaking",
      },
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
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsSticky(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsSticky(scrollPosition > viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isDropdown = (
    item: MenuItem | DropdownMenuType,
  ): item is DropdownMenuType => "items" in item;

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${isHomePage
        ? isSticky
          ? "fixed top-0 left-0 bg-white backdrop-blur-sm shadow-lg text-black"
          : "absolute top-0 left-0 bg-transparent text-white"
        : "fixed top-0 left-0 bg-white backdrop-blur-sm shadow-lg text-black"
        }`}
    >
      <nav>
        <ContainerWidget>
          <div className="flex items-center justify-between py-3 pt-2!">
            <LinkWidget href="/">
              <ImageWidget
                src={isHomePage ? (isSticky ? LogoBlack : Logo) : LogoBlack}
                alt="Logo"
                className="mt-2 md:mt-0 w-60 2xl:w-70 3xl:w-[348px] h-auto"
              />
            </LinkWidget>

            <ul className="hidden lg:flex items-center gap-3 xl:gap-[38px] 2xl:gap-[46px] text-[14px] 2xl:text-[14px] 3xl:text-[18px]">
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
                      isSticky={isHomePage ? isSticky : true}
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
                <AdmissionButton />
              </li>
            </ul>
            <MobileMenu
              menuItems={menuItems}
              isSticky={isHomePage ? isSticky : true}
            />
          </div>
        </ContainerWidget>
      </nav>
    </header>
  );
};

export default WebHeader;
