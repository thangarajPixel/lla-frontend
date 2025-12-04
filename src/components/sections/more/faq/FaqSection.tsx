"use client";

import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContainerWidget from "@/components/widgets/ContainerWidget";

type FaqCategory = {
  id: string;
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

const faqData: FaqCategory[] = [
  {
    id: "general",
    title: "General FAQ",
    questions: [
      {
        question: "How do you reach Light & Life Academy?",
        answer:
          "Light & Life Academy is located 9kms from Ooty, Nilgiris. Ooty is accessible by train and road. The nearest airport is 90 km away in Coimbatore, Tamil Nadu. The closest metro is Bangalore, about 7 hours via road.\n\nFind the exact Google map location here.",
      },
      {
        question: "Can I visit the campus?",
        answer:
          "Yes, campus visits are welcome. Please contact us in advance to schedule your visit.",
      },
      {
        question: "What is the weather like in Nilgiris?",
        answer:
          "Nilgiris has a pleasant climate throughout the year with cool temperatures ranging from 10°C to 25°C.",
      },
      {
        question:
          "What is a typical week in college like for full time PG Diploma students?",
        answer:
          "Students engage in practical sessions, theory classes, assignments, and collaborative projects throughout the week.",
      },
      {
        question: "What is the language of instruction?",
        answer: "The primary language of instruction is English.",
      },
      {
        question: "What kind of careers are the alumni in?",
        answer:
          "Our alumni work in various fields including photography, filmmaking, media, advertising, and creative industries.",
      },
    ],
  },
  {
    id: "facilities",
    title: "Facilities and Faculty",
    questions: [
      {
        question: "Does LLA provide hostel facilities?",
        answer:
          "Yes, we provide comfortable hostel facilities for both male and female students with all necessary amenities.",
      },
      {
        question: "Does LLA provide food and transport?",
        answer:
          "Yes, we provide nutritious meals and transportation facilities for students.",
      },
      {
        question: "What is Light & Life Academy's studio access policy?",
        answer:
          "Students have access to our studios during designated hours with proper supervision and booking procedures.",
      },
      {
        question: "Who will be teaching me at LLA?",
        answer:
          "Our faculty consists of experienced professionals and industry experts in photography and visual arts.",
      },
      {
        question: "Can I speak to current faculty members/students?",
        answer:
          "Yes, we can arrange interactions with current faculty and students during campus visits or open house events.",
      },
      {
        question: "Does Light & Life Academy provide placements?",
        answer:
          "We provide career guidance, portfolio development support, and connect students with industry opportunities.",
      },
    ],
  },
  {
    id: "course",
    title: "Course",
    questions: [
      {
        question: "What are the courses offered?",
        answer:
          "We offer PG Diploma in Photography, specialized workshops, and short-term courses in various photography genres.",
      },
      {
        question: "What are the course durations?",
        answer:
          "The PG Diploma is a full-time program. Workshop durations vary from a few days to several weeks.",
      },
      {
        question: "Can I do these courses online?",
        answer:
          "Currently, our courses are primarily in-person to provide hands-on practical experience. Some theory sessions may be available online.",
      },
      {
        question: "Are courses by Light & Life Academy recognised?",
        answer:
          "Our courses are industry-recognized and our alumni are well-regarded in the professional photography community.",
      },
      {
        question: "What is the language of instruction?",
        answer: "The primary language of instruction is English.",
      },
      {
        question: "What kind of careers are the alumni in?",
        answer:
          "Our alumni work as professional photographers, cinematographers, photo editors, visual artists, and in various creative roles.",
      },
    ],
  },
  {
    id: "pg-diploma-details",
    title: "PG Diploma Course Details",
    questions: [
      {
        question: "What is covered in the PG Diploma program?",
        answer:
          "The program covers technical photography skills, visual storytelling, lighting techniques, post-processing, portfolio development, and professional practices.",
      },
      {
        question: "What equipment will I need?",
        answer:
          "Students are required to have their own DSLR or mirrorless camera. The academy provides studio equipment and lighting for practical sessions.",
      },
      {
        question: "Is there any practical training included?",
        answer:
          "Yes, the program is heavily focused on practical training with studio sessions, outdoor shoots, and real-world projects.",
      },
      {
        question: "Will I get a certificate upon completion?",
        answer:
          "Yes, students receive a PG Diploma certificate from Light & Life Academy upon successful completion of the program.",
      },
    ],
  },
  {
    id: "pg-diploma-fees",
    title: "PG Diploma Course Fees",
    questions: [
      {
        question: "What is the fee structure for the PG Diploma?",
        answer:
          "Please contact our admissions office for detailed fee structure and payment plans.",
      },
      {
        question: "Are there any scholarships available?",
        answer:
          "We offer merit-based scholarships and financial assistance to deserving students. Please inquire during the admission process.",
      },
      {
        question: "What does the fee include?",
        answer:
          "The fee includes tuition, access to facilities, basic materials, and hostel accommodation (if opted).",
      },
      {
        question: "Are there any additional costs?",
        answer:
          "Additional costs may include personal equipment, specialized materials for projects, and optional field trips.",
      },
    ],
  },
  {
    id: "pg-diploma-admission",
    title: "PG Diploma Admission Requirements",
    questions: [
      {
        question: "What are the eligibility criteria?",
        answer:
          "Applicants should have completed their undergraduate degree in any discipline. A passion for photography and creative aptitude are essential.",
      },
      {
        question: "How do I apply?",
        answer:
          "You can apply online through our website by filling out the application form and submitting the required documents.",
      },
      {
        question: "Is there an entrance exam or interview?",
        answer:
          "Yes, shortlisted candidates will be called for a portfolio review and personal interview.",
      },
      {
        question: "When does the admission process start?",
        answer:
          "Admissions typically open in early spring. Please check our website for specific dates and deadlines.",
      },
      {
        question: "What documents are required?",
        answer:
          "Required documents include academic transcripts, ID proof, passport-size photographs, and a portfolio of your work (if available).",
      },
    ],
  },
];

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full bg-white py-10 md:py-15">
      <ContainerWidget>
        <div className="max-w-6xl mx-auto">
          <h1 className="font-urbanist font-noraml text-[32px] md:text-[40px] xl:text-[48px] 2xl:text-[56px] 3xl:text-[64px] text-black mb-12 text-left">
            Frequently Asked Questions
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="hidden md:block lg:col-span-1">
              <nav className="space-y-2 lg:sticky lg:top-24">
                {faqData.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => scrollToCategory(category.id)}
                    className={`w-full text-left px-2 py-2  transition-colors cursor-pointer text-[16px] md:text-[15px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[18px] ${
                      activeCategory === category.id
                        ? "text-[#E97451] font-normal "
                        : "text-black hover:bg-gray-50 "
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </nav>
            </div>
            <div className="lg:col-span-3">
              {faqData.map((category) => (
                <div
                  key={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el;
                  }}
                  className="scroll-mt-24"
                >
                  <div className="bg-white p-0 md:p-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
                      {category.title}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((item, index) => (
                        <AccordionItem
                          key={`question-${index + 1}`}
                          value={`${category.id}-item-${index}`}
                          className="bg-white border-none"
                        >
                          <AccordionTrigger className="py-4 text-left hover:no-underline cursor-pointer">
                            <span className="text-black font-medium">
                              {item.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-black leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FaqSection;
