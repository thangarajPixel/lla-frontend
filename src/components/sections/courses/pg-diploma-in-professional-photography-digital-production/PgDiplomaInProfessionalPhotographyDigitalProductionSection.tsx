"use client";

import TestimonialSection from "@/components/sections/home/TestimonialSection";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import CourseContentSection from "./utils/CourseContentSection";
import FaqSection from "./utils/FaqSection";
import GallerySection from "./utils/GallerySection";
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

  const studentData = {
    __component: "student-section",
    id: 1,
    Title: "Student Testimonials",
    Heading: "Hear from",
    SubHeading: "Our Community",
    Description:
      "Over the years, Light & Life Academy has grown into a close-knit community. Here, they share their stories of discovery, growth, and the many ways their time at the Academy shaped who they are today.",
    Card: [
      {
        id: 1,
        Title: "Ajith S",
        Description: "Batch - ‘09 - ‘10",
        Image: [{ id: 1, name: "Student Testimonials", url: "/dummy.mp4" }],
      },
      {
        id: 2,
        Title: "Rajesh K S",
        Description: "Batch - ‘09 - ‘10",
        Image: [{ id: 2, name: "Student Testimonials", url: "/dummy.mp4" }],
      },
      {
        id: 3,
        Title: "Harshad K S",
        Description: "Batch - ‘09 - ‘10",
        Image: [{ id: 3, name: "Student Testimonials", url: "/dummy.mp4" }],
      },
    ],
  };

  const testimonialData = {
    __component: "home.lla-testimonials",
    id: 1,
    Title: "Testimonials",
    Heading: "25 Years,",
    Description:
      "Over the last twenty-five years, LLA has become more than a photography school—it’s a space that has shaped and been shaped by everyone who’s walked through it. Here are words from those who’ve shared this journey with us—friends, mentors, industry voices, and visitors whose encounters with LLA have left a lasting impression.",
    SubHeading: "Countless Connections",
    Slider: [
      {
        id: 1,
        Description:
          "I was awestruck to see the beauty and energy of this place. The campus is like a cultural hub. Nature, the community and the people have merged and come together like a beautiful identity of the Nilgiris. I salute the spirit of this place.",
        Name: "– Supriya Sahu,",
        Batch:
          "Principal Secretary to Government, Department of Health, Government of Tamil Nadu.",
      },
      {
        id: 25,
        Description:
          "In a display like this, it’s very difficult to single out any one talent. What I do find amazing is that LLA is one photography institute that has managed to make so many different styles emerge. It takes a lot to impart skill / knowledge without stamping on creativity! Well done.\n",
        Name: "– Sudha Panchapakesan, ",
        Batch: "Qube Digital – Chennai",
      },
      {
        id: 124,
        Description:
          "For me, Light and Life is home. I always have a great time talking with Iqbal Sir, listening to his array of stories and enjoying his brilliant sense of humour.. I believe every student who goes out of LLA becomes an artist. Thank you LLA for bringing artists to this world.",
        Name: "– Nachiket Pimprikar, ",
        Batch: "Alumnus, Batch 12  ",
      },
      {
        id: 128,
        Description:
          "It is not often that education rises beyond the boundaries of academics and pushes its students towards the path of self- actualization. This is a rare and commendable effort.",
        Name: "– Agnello Dias,",
        Batch: "Advertising Guru, Ex-Chairman and Co-Founder, Taproot India.",
      },
      {
        id: 133,
        Description:
          "This has to be a photographer’s dream come true. To find such a well-designed educational facility with such committed individuals; Iqbal and Anuradha you are to be complimented and I’m sure, scores of aspiring photographers will thank you for years to come.\n\n",
        Name: "– Frans Lanting,",
        Batch: "Santa Cruz, California",
      },
    ],
  };

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

      <aside className="hidden lg:block fixed left-0 top-18 w-54 border-r border-b border-gray-200 z-50 bg-white">
        <div className="h-full overflow-y-auto">
          <nav className="py-6 px-4">{renderMenuItems()}</nav>
        </div>
      </aside>

      <div className="lg:hidden fixed top-18 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
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
          <OverviewSection />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="course-content" className="scroll-mt-[-40px]">
          <CourseContentSection />
        </section>
        <section id="other-info" className="scroll-mt-[-40px]">
          <OtherInfoSection />
        </section>
        <StudentSection data={studentData} />
        <TestimonialSection data={testimonialData} />
        <section id="how-to-apply" className="scroll-mt-[-40px]">
          <HowtoApplySection />
        </section>
        <section id="faqs" className="scroll-mt-[-40px]">
          <FaqSection />
        </section>
      </main>
    </div>
  );
};

export default PgDiplomaInProfessionalPhotographyDigitalProductionSection;
