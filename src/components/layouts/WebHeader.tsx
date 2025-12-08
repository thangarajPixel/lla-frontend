"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getEssentialsData } from "@/app/api/server";
import { Logo, LogoBlack } from "@/helpers/ImageHelper";
import ContainerWidget from "../widgets/ContainerWidget";
import ImageWidget from "../widgets/ImageWidget";
import LinkWidget from "../widgets/LinkWidget";
import AdmissionButton from "./utils/AdmissionButton";
import AdmissionRequestButton from "./utils/AdmissionRequestButton";
import DropdownMenu from "./utils/DropdownMenu";
import MobileMenu from "./utils/MobileMenu";
import NavLink from "./utils/NavLink";
import type {
  DropdownMenu as DropdownMenuType,
  MenuItem,
  WebHeaderResponse,
} from "./utils/types";

const menuItems: (MenuItem | DropdownMenuType)[] = [
  {
    label: "Courses",
    pathPrefix: "/courses",
    items: [
      {
        href: "/courses/pg-diploma-in-professional-photography-digital-production",
        label: "PG Diploma in Professional Photography & Digital Production",
      },
      {
        href: "/courses/pg-diploma-in-documentary-corporate-filmmaking",
        label: "PG Diploma in Documentary & Corporate Filmmaking",
      },
    ],
  },
  { href: "/campus", label: "Campus" },
  { href: "/faculty", label: "Faculty" },
  { href: "/gallery", label: "Gallery" },
  {
    label: "More",
    pathPrefix: "/more",
    items: [
      { href: "/more/about-us", label: "About us" },
      { href: "/more/life-at-lla", label: "Life at LLA" },
      { href: "/more/blogs", label: "Blog" },
      { href: "/more/contact-us", label: "Contact Us" },
      { href: "/more/faq", label: "FAQ" },
    ],
  },
];

const WebHeader = ({ response }: { response: WebHeaderResponse }) => {

  console.log(response);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (pathname) {
      setOpenDropdown(null);
    }
  }, [pathname]);

  useEffect(() => {
    const getAdmissionData = async () => {
      const { data: res } = await getEssentialsData();
      setIsAdmissionOpen(res?.isAdmission);
    };
    getAdmissionData();
  }, []);

  const isDropdown = (
    item: MenuItem | DropdownMenuType,
  ): item is DropdownMenuType => "items" in item;

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isHomePage
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
                className={
                  isSticky
                    ? "mt-2 md:mt-0 w-60 2xl:w-70 3xl:w-[348px] 3xl:h-[69px] h-auto relative"
                    : "mt-2 md:mt-0 w-60 2xl:w-70 3xl:w-[348px] 3xl:h-[69px] h-auto relative md:top-[7px]"
                }
              />
            </LinkWidget>

            <ul className="hidden lg:flex items-center gap-7 lg:gap-[14px] xl:gap-[18px] 2xl:gap-[46px] text-[14px] 2xl:text-[14px] 3xl:text-[18px]">
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
                {isAdmissionOpen ? (
                  <AdmissionButton />
                ) : (
                  <AdmissionRequestButton />
                )}
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
