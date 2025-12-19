"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

const WebHeader = ({
  response,
}: {
  response: WebHeaderResponse | undefined;
}) => {
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

  const menuItems: (MenuItem | DropdownMenuType)[] = useMemo(() => {
    if (!response?.course || !Array.isArray(response.course)) {
      return [
        { href: "/campus", label: "Campus" },
        { href: "/faculty", label: "Faculty" },
        { href: "/gallery", label: "Gallery" },
        {
          label: "More",
          pathPrefix: "",
          items: [
            { href: "/about-us", label: "About us" },
            { href: "/life-at-lla", label: "Life at LLA" },
            { href: "/blogs", label: "Blog" },
            { href: "/contact-us", label: "Contact Us" },
            { href: "/faq", label: "FAQ" },
          ],
        },
      ];
    }

    const courseItems: MenuItem[] = response.course.map((course) => ({
      href: `/courses/${course.Slug}`,
      label: course.Name,
    }));

    return [
      ...(courseItems.length > 0
        ? [
            {
              label: "Courses",
              pathPrefix: "/courses",
              items: courseItems,
            },
          ]
        : []),
      { href: "/campus", label: "Campus" },
      { href: "/faculty", label: "Faculty" },
      { href: "/gallery", label: "Gallery" },
      {
        label: "More",
        pathPrefix: "",
        items: [
          { href: "/about-us", label: "About us" },
          { href: "/life-at-lla", label: "Life at LLA" },
          { href: "/blogs", label: "Blog" },
          { href: "/contact-us", label: "Contact Us" },
          { href: "/faq", label: "FAQ" },
        ],
      },
    ];
  }, [response]);

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
          <div className="flex items-center justify-between md:gap-6 py-5 pt-3.5!">
            <LinkWidget href="/">
              <ImageWidget
                src={isHomePage ? (isSticky ? LogoBlack : Logo) : LogoBlack}
                alt="Logo"
                className={
                  isSticky
                    ? "mt-2 md:mt-0 w-60 md:w-80 2xxl:w-[341.26px] 2xxl:h-[69px] h-auto relative"
                    : "mt-2 md:mt-0 w-60 md:w-80 2xxl:w-[341.26px] 2xxl:h-[69px] h-auto relative md:top-0"
                }
              />
            </LinkWidget>

            <ul className="hidden lg:flex items-center text-[14px] 2xxl:text-[18px] 3xl:text-[18px] gap-4 md:gap-10">
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
