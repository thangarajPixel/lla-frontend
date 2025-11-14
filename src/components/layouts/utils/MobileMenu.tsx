"use client";

import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight, TopArrowIcon } from "@/helpers/ImageHelper";
import ButtonWidget from "../../widgets/ButtonWidget";
import ImageWidget from "../../widgets/ImageWidget";
import LinkWidget from "../../widgets/LinkWidget";
import type { DropdownMenu as DropdownMenuType, MenuItem } from "./types";

interface MobileMenuProps {
  menuItems: (MenuItem | DropdownMenuType)[];
}

const MobileMenu = ({ menuItems }: MobileMenuProps) => {
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
          className="p-2.5 bg-transparent hover:bg-transparent transition-all duration-300 rounded-lg"
          aria-label="Open menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className="block h-0.5 w-full bg-white transition-all duration-300" />
            <span className="block h-0.5 w-full bg-white transition-all duration-300" />
            <span className="block h-0.5 w-full bg-white transition-all duration-300" />
          </div>
        </ButtonWidget>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="w-full! max-w-full! bg-black text-white border-b border-white/10 overflow-y-auto p-0 h-auto max-h-[90vh]"
      >
        <DialogTitle> </DialogTitle>
        <DialogContent></DialogContent>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
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
                    className="flex flex-col border-b border-white/10 last:border-0"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(menuId)}
                      className={`flex items-center justify-between text-left py-4 transition-all duration-300 ${
                        isActive
                          ? "text-[#E97451]"
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
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
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
                  className={`flex items-center py-4 text-base font-medium transition-all duration-300 border-b border-white/10 last:border-0 ${
                    isItemActive
                      ? "text-[#E97451]"
                      : "text-white hover:text-[#E97451]"
                  }`}
                >
                  {item.label}
                </LinkWidget>
              );
            })}
          </div>

          <div className="px-6 pt-6 pb-6 border-t border-white/10">
            <ButtonWidget
              className="orange-button group rounded-[60px] px-6 py-3.5 text-sm w-full justify-center font-semibold transition-all duration-300 hover:scale-[1.02]"
              onClick={() => setIsSheetOpen(false)}
            >
              Admission Open
              <ImageWidget
                src={ArrowRight}
                alt="Arrow Right"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </ButtonWidget>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
