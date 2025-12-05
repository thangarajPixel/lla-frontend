"use client";

import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import TestimonialSection from "@/components/sections/courses/pg-diploma-in-professional-photography-digital-production/utils/TestimonialSection";
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
import type { PgDiplomaData } from "./utils/types";

const sidebarMenuItems = [
  { href: "#overview", label: "Overview" },
  { href: "#course-content", label: "Course Content" },
  { href: "#other-info", label: "Other Info" },
  { href: "#how-to-apply", label: "How to Apply" },
  { href: "#faqs", label: "FAQ's" },
];

const PgDiplomaInProfessionalPhotographyDigitalProductionSection = ({
  data,
}: {
  data: PgDiplomaData;
}) => {
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

  const renderMenuItems = () => (
    <>
      <span className="block px-4 py-3 text-[15px] 3xl:text-lg text-[#E97451] font-semibold">
        Menu
      </span>
      <ul>
        {sidebarMenuItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <li key={item.href}>
              <LinkWidget
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`block px-4 py-3 text-[15px] 3xl:text-lg transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#E97451] font-semibold"
                    : "hover:text-[#E97451]"
                }`}
              >
                {item.label}
              </LinkWidget>
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <div className="bg-white">
      <aside className="hidden xl:block shadow-lg fixed left-0 top-18 w-54 xl:w-45 2xl:w-54 border-r border-b border-gray-200 z-30 bg-white">
        <div className="h-full overflow-y-auto">
          <nav className="py-6 px-4">{renderMenuItems()}</nav>
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
          <OverviewSection data={data?.Menu} />
        </section>
        <section id="gallery">
          <GallerySection data={data?.Overview} />
        </section>
        <section id="course-content" className="scroll-mt-[-40px]">
          <CourseContentSection data={data?.Course_content} />
        </section>
        <section id="other-info" className="scroll-mt-[-40px]">
          <OtherInfoSection data={data?.Other_Info} />
        </section>
        <StudentSection data={data?.Student_testimonial} />
        <TestimonialSection data={data?.Testimonial} />
        <section id="how-to-apply" className="scroll-mt-[-40px]">
          <HowtoApplySection data={data?.HowToApply} />
        </section>
        <section id="faqs" className="scroll-mt-[-40px]">
          <FaqSection data={data?.Faq} />
        </section>
      </main>
    </div>
  );
};

export default PgDiplomaInProfessionalPhotographyDigitalProductionSection;
