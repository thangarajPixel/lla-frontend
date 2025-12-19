"use client";

import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import CourseContentSection from "./utils/CourseContentSection";
import FaqSection from "./utils/FaqSection";
import GallerySection from "./utils/GallerySection";
import HowtoApplySection from "./utils/HowtoApplySection";
import OtherInfoSection from "./utils/OtherInfoSection";
import OverviewSection from "./utils/OverviewSection";
import StudentSection from "./utils/StudentSection";
import TestimonialSection from "./utils/TestimonialSection";
import type { ContentCard, PgDiplomaData } from "./utils/types";

const sidebarMenuItems = [
  { href: "#overview", label: "Overview" },
  { href: "#course-content", label: "Course Content" },
  { href: "#other-info", label: "Other Info" },
  { href: "#how-to-apply", label: "How to Apply" },
  { href: "#faqs", label: "FAQ's" },
];

const CourseSection = ({ data }: { data: PgDiplomaData }) => {
  const [activeSection, setActiveSection] = useState<string>("#overview");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const scrollMarginTop = parseFloat(
        window.getComputedStyle(targetElement).scrollMarginTop || "96",
      );
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset - scrollMarginTop;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
      setIsSheetOpen(false);
    }
  };

  const handleOuterTitleScroll = (
    e: React.MouseEvent<HTMLElement>,
    cardId: number,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(`course-content-${cardId}`);

    if (!targetElement) {
      setIsSheetOpen(false);
      return;
    }

    let stickyContainer = targetElement.parentElement;
    while (stickyContainer && !stickyContainer.classList.contains("sticky")) {
      stickyContainer = stickyContainer.parentElement;
    }

    const elementToScroll = stickyContainer || targetElement;
    const headerOffset = 100;

    if (stickyContainer) {
      const originalClass = stickyContainer.className;
      stickyContainer.className = originalClass
        .replace(/\bsticky\b/g, "")
        .trim();

      void stickyContainer.offsetHeight;

      const rect = stickyContainer.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const absoluteTop = rect.top + scrollTop;

      stickyContainer.className = originalClass;

      const scrollMarginTop = parseFloat(
        window.getComputedStyle(stickyContainer).scrollMarginTop || "0",
      );
      const offsetPosition = absoluteTop - headerOffset - scrollMarginTop;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    } else {
      const elementPosition = elementToScroll.getBoundingClientRect().top;
      const scrollMarginTop = parseFloat(
        window.getComputedStyle(elementToScroll).scrollMarginTop || "0",
      );
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset - scrollMarginTop;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
    setIsSheetOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarMenuItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMenuItems = () => {
    const groupedByOuterTitle =
      data?.Course_content?.Content_card?.reduce(
        (acc, card) => {
          const outerTitle = card.OuterTitle || "";
          if (!acc[outerTitle]) {
            acc[outerTitle] = [];
          }
          acc[outerTitle].push(card);
          return acc;
        },
        {} as Record<string, ContentCard[]>,
      ) || {};

    return (
      <>
        <span className="block px-4 py-3 md:pb-1 text-[16px] md:text-[17px] 3xl:text-[18px] text-[#E97451] font-semibold">
          Menu
        </span>
        <ul>
          {sidebarMenuItems.map((item) => {
            const isActive = activeSection === item.href;
            const isCourseContent = item.href === "#course-content";

            return (
              <li key={item.href}>
                <LinkWidget
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`block px-4 py-3 md:pb-1 text-[16px] md:text-[17px] 3xl:text-[18px] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#E97451] font-semibold"
                      : "hover:text-[#E97451]"
                  }`}
                >
                  {item.label}
                </LinkWidget>
                {isCourseContent &&
                  Object.keys(groupedByOuterTitle).length > 0 && (
                    <ul className="ml-4">
                      {Object.entries(groupedByOuterTitle).map(
                        ([outerTitle, cards]) =>
                          outerTitle !== "" && (
                            <li key={outerTitle}>
                              <LinkWidget
                                href={`#course-content-${cards[0]?.id || 0}`}
                                onClick={(e) => {
                                  if (cards[0]?.id) {
                                    handleOuterTitleScroll(e, cards[0].id);
                                  }
                                }}
                                className="block px-4 py-2 text-[16px] md:text-[16px] 3xl:text-[17px] text-black font-medium transition-colors duration-200 cursor-pointer hover:text-[#E97451]"
                              >
                                {outerTitle}
                              </LinkWidget>
                            </li>
                          ),
                      )}
                    </ul>
                  )}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <div className="bg-white">
      <aside className="hidden xl:block shadow-lg fixed left-0 top-18 w-54 xl:w-45 2xl:w-54 2xxl:w-68 border-r border-b border-gray-200 z-30 bg-white">
        <div className="h-full overflow-y-auto">
          <nav className="py-6 2xxl:pt-13 px-4">{renderMenuItems()}</nav>
        </div>
      </aside>

      <div className="hidden xss:hidden xl:hidden fixed top-18 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <ButtonWidget
              className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-gray-100 text-black"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
              <span className="text-[15px] font-semibold">Menu</span>
            </ButtonWidget>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
            <DialogTitle className="hidden" />
            <DialogContent className="hidden" />
            <div className="h-full overflow-y-auto">
              <nav className="pt-20 px-4">{renderMenuItems()}</nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <main className="min-h-screen">
        <section id="overview">
          {data?.Menu && <OverviewSection data={data?.Menu} />}
        </section>
        {data?.Overview && (
          <section id="gallery">
            <GallerySection data={data?.Overview} />
          </section>
        )}
        <section id="course-content" className="scroll-mt-[-40px]">
          {data?.Course_content && (
            <CourseContentSection data={data?.Course_content} />
          )}
        </section>
        <section id="other-info" className="scroll-mt-[-40px]">
          {data?.Other_Info && <OtherInfoSection data={data?.Other_Info} />}
        </section>
        {data?.Student_testimonial?.length > 0 && (
          <StudentSection data={data?.Student_testimonial} />
        )}
        {data?.Testimonial?.length > 0 && (
          <TestimonialSection data={data?.Testimonial} />
        )}
        <section id="how-to-apply" className="scroll-mt-[-40px]">
          {data?.HowToApply && <HowtoApplySection data={data?.HowToApply} />}
        </section>
        <section id="faqs" className="scroll-mt-[-40px]">
          {data?.Faq && <FaqSection data={data?.Faq} />}
        </section>
      </main>
    </div>
  );
};

export default CourseSection;
