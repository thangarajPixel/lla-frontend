"use client";

import LinkWidget from "@/components/widgets/LinkWidget";
import { useEffect, useState } from "react";
import CourseContentSection from "./utils/CourseContentSection";
import FaqSection from "./utils/FaqSection";
import HowtoApplySection from "./utils/HowtoApplySection";
import OtherInfoSection from "./utils/OtherInfoSection";
import OverviewSection from "./utils/OverviewSection";
import StudentSection from "./utils/StudentSection";

const sidebarMenuItems = [
  { href: "#overview", label: "Overview" },
  { href: "#course-content", label: "Course Content" },
  { href: "#other-info", label: "Other Info" },
  { href: "#how-to-apply", label: "How to Apply" },
  { href: "#faqs", label: "FAQ's" },
];

const PgDiplomaInProfessionalPhotographyDigitalProductionSection = () => {
  const [activeSection, setActiveSection] = useState<string>("#overview");

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
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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

  const studentData = {
    __component: "student-section",
    id: 1,
    Title: "Student Testimonials",
    Heading: "Hear from",
    SubHeading: "Our Community",
    Description: "Over the years, Light & Life Academy has grown into a close-knit community. Here, they share their stories of discovery, growth, and the many ways their time at the Academy shaped who they are today.",
    Card: [
      {
        id: 1,
        Title: "Ajith S",
        Description: "Batch - ‘09 - ‘10",
        Image: [{ id: 1, name: "Student Testimonials", url:"/dummy.mp4" }],
      },
      {
        id: 2,
        Title: "Rajesh K S",
        Description: "Batch - ‘09 - ‘10",
        Image: [{ id: 2, name: "Student Testimonials", url:"/dummy.mp4" }],
      },
      {
        id: 3,
        Title: "Harshad K S",
        Description: "Batch - ‘09 - ‘10",
        Image: [{ id: 3, name: "Student Testimonials", url:"/dummy.mp4" }],
      },
    ],
  };

  return (
    <div className=" bg-white">
      <aside className="fixed left-0 top-18 w-54 border-r border-b border-gray-200 z-20 bg-white">
        <div className="h-full overflow-y-auto">
          <nav className="py-6 px-4">
            <span className="block px-4 py-3 text-[15px] 3xl:text-lg">Menu</span>
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
          </nav>
        </div>
      </aside>

      <main className="min-h-screen">
          <div className="py-8">
            <section id="overview" className="mb-12 scroll-mt-24">
              <OverviewSection />
            </section>

            <section id="course-content" className="mb-12 scroll-mt-24">
              <CourseContentSection />
            </section>

            <section id="other-info" className="mb-12 scroll-mt-24">
              <OtherInfoSection />
            </section>
            <StudentSection data={studentData} />
            <section id="how-to-apply" className="mb-12 scroll-mt-24">
              <HowtoApplySection />
            </section>

            <section id="faqs" className="mb-12 scroll-mt-24">
              <FaqSection />
            </section>
          </div>
      </main>
    </div>
  );
};

export default PgDiplomaInProfessionalPhotographyDigitalProductionSection;
