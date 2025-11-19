"use client";

import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo, LogoBlack, TopArrowIcon } from "@/helpers/ImageHelper";
import ButtonWidget from "../../widgets/ButtonWidget";
import ImageWidget from "../../widgets/ImageWidget";
import LinkWidget from "../../widgets/LinkWidget";
import AdmissionButton from "./AdmissionButton";
import type { DropdownMenu as DropdownMenuType, MenuItem } from "./types";

type MobileMenuProps = {
  menuItems: (MenuItem | DropdownMenuType)[];
  isSticky?: boolean;
};

const MobileMenu = ({ menuItems, isSticky = false }: MobileMenuProps) => {
  const pathname = usePathname();
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isDropdown = (
    item: MenuItem | DropdownMenuType,
  ): item is DropdownMenuType => "items" in item;

  const toggleMobileDropdown = (menuId: string) => {
    setOpenMobileDropdown(openMobileDropdown === menuId ? null : menuId);
  };

  useEffect(() => {
    if (isSheetOpen) {
      setOpenMobileDropdown(null);
    }
  }, [isSheetOpen]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <ButtonWidget
          className="py-2.5 px-0  bg-transparent hover:bg-transparent transition-all duration-300 rounded-lg"
          aria-label="Open menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`block h-0.5 w-full transition-all duration-300 ${
                isSticky ? "bg-black" : "bg-white"
              }`}
            />
            <span
              className={`block h-0.5 w-full transition-all duration-300 ${
                isSticky ? "bg-black" : "bg-white"
              }`}
            />
            <span
              className={`block h-0.5 w-full transition-all duration-300 ${
                isSticky ? "bg-black" : "bg-white"
              }`}
            />
          </div>
        </ButtonWidget>
      </SheetTrigger>
      <SheetContent
        side="top"
        className={`w-full! max-w-full! overflow-y-auto p-0 h-auto max-h-[90vh] transition-all duration-300 [&_button.absolute]:hidden ${
          isSticky
            ? "bg-white text-black border-b border-black/10"
            : "bg-black text-white border-b border-white/10"
        }`}
      >
        <DialogTitle className="hidden" />
        <DialogContent className="hidden" />
        <div className="flex flex-col h-full">
          <div
            className={`px-6 py-6 border-b ${
              isSticky ? "border-black/10" : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <LinkWidget href="/" onClick={() => setIsSheetOpen(false)}>
                <ImageWidget
                  src={isSticky ? LogoBlack : Logo}
                  alt="Logo"
                  className="w-60 sm:w-40 md:w-48 lg:w-56 xl:w-64 2xl:w-80 3xl:w-[348px] h-auto"
                />
              </LinkWidget>
              <SheetClose asChild>
                <ButtonWidget
                  className={`p-2 bg-transparent hover:bg-transparent transition-all duration-300 rounded-lg ${
                    isSticky ? "text-black" : "text-white"
                  }`}
                  aria-label="Close menu"
                >
                  <XIcon className="w-6 h-6" />
                </ButtonWidget>
              </SheetClose>
            </div>
          </div>

          <div className="flex flex-col flex-1 px-6 py-4">
            {menuItems.map((item) => {
              if (isDropdown(item)) {
                const menuId = item.label.toLowerCase();
                const isOpen = openMobileDropdown === menuId;
                const isActive = pathname.startsWith(item.pathPrefix);
                return (
                  <div
                    key={menuId}
                    className={`flex flex-col border-b last:border-0 ${
                      isSticky ? "border-black/10" : "border-white/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(menuId)}
                      className={`flex items-center justify-between text-left py-4 transition-all duration-300 ${
                        isActive
                          ? "text-[#E97451]"
                          : isSticky
                            ? "text-black hover:text-[#E97451]"
                            : "text-white hover:text-[#E97451]"
                      }`}
                    >
                      <span className="text-base font-medium">
                        {item.label}
                      </span>
                      <ImageWidget
                        src={TopArrowIcon}
                        alt="Arrow"
                        className={`w-[13px] h-[13px] transition-transform duration-500 ease-out ${
                          isSticky ? "brightness-0" : ""
                        } ${isOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 pr-2 pb-4 space-y-1">
                        {item.items.map((subItem) => {
                          const isSubItemActive = pathname === subItem.href;
                          return (
                            <LinkWidget
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsSheetOpen(false)}
                              className={`block py-3 text-sm transition-all duration-300 ${
                                isSubItemActive
                                  ? "text-[#E97451]"
                                  : isSticky
                                    ? "text-black/80 hover:text-[#E97451]"
                                    : "text-white/80 hover:text-[#E97451]"
                              }`}
                            >
                              {subItem.label}
                            </LinkWidget>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              const isItemActive = pathname === item.href;
              return (
                <LinkWidget
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSheetOpen(false)}
                  className={`flex items-center py-4 text-base font-medium transition-all duration-300 border-b last:border-0 ${
                    isSticky ? "border-black/10" : "border-white/10"
                  } ${
                    isItemActive
                      ? "text-[#E97451]"
                      : isSticky
                        ? "text-black hover:text-[#E97451]"
                        : "text-white hover:text-[#E97451]"
                  }`}
                >
                  {item.label}
                </LinkWidget>
              );
            })}
          </div>

          <div
            className={`px-6 pt-6 pb-6 border-t ${
              isSticky ? "border-black/10" : "border-white/10"
            }`}
          >
            <AdmissionButton
              className="px-6 py-3.5 h-10 text-sm w-full justify-center font-semibold"
              iconClassName="w-4 h-4"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
