"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCoursesListData } from "@/app/api/server";
import CourseApplicationFormModel from "@/components/sections/courses/utils/CourseApplicationFormModel";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeBorderButtonWidget from "@/components/widgets/OrangeBorderButtonWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { CourseCard } from "@/components/layouts/utils/types";

type CourseDetailsPopupProps = {
  redirectToHome?: boolean;
};

const CourseDetailsPopup = ({ redirectToHome = false }: CourseDetailsPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<CourseCard[]>();
  const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseCard>();
  const [imageIndices, setImageIndices] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Check if we're on the admission page
  const isAdmissionPage = pathname === "/admission";

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: res } = await getCoursesListData();
        setData(res);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };
    if (isMounted) {
      loadData();
    }
  }, [isMounted]);

  useEffect(() => {
    if (data && data.length > 0) {
      setImageIndices(
        data.map((card: CourseCard) => {
          const images = card?.Image || [];
          return images.length > 0
            ? Math.floor(Math.random() * images.length)
            : 0;
        }),
      );
    }
  }, [data]);

  const handleClose = () => {
    setIsOpen(false);
    // Navigate based on context
  };

  const handleApplyNow = (card: CourseCard) => {
    setSelectedCourse(card);
    setIsOpen(false);
    // Add a small delay to ensure the course popup closes first
    setTimeout(() => {
      setIsApplicationOpen(true);
    }, 100);
  };

  const handleApplicationClose = () => {
    setIsApplicationOpen(false);
    // When application form closes, also redirect to home if on admission page
    if (isAdmissionPage || redirectToHome) {
      // setTimeout(() => {
      //   if (typeof window !== "undefined") {
      //     window.location.href = "/";
      //   }
      // }, 300);
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Custom Modal for Course Selection */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9998 }}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={handleClose}
          />
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl h-[80vh] md:h-auto sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] p-4 sm:p-6 lg:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-5 h-[75vh] overflow-y-auto md:h-auto">
              {data && data.length > 0
                ? data.map((card, index) => {
                    const images = card?.Image || [];
                    const imageIndex = imageIndices[index] ?? 0;
                    const selectedImage = images[imageIndex];
                    const imageUrl = selectedImage?.url
                      ? getS3Url(selectedImage.url)
                      : undefined;

                    return (
                      <div
                        key={card.id || index}
                        className="flex-1 flex flex-col gap-3 sm:gap-4"
                      >
                        {imageUrl && (
                          <div className="relative w-full aspect-4/3 overflow-hidden">
                            <ImageWidget
                              src={imageUrl}
                              alt={card.Title || `Course ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-xl md:text-xl lg:text-2xl xl:text-[20px] 2xl:text-[24px] 3xl:text-[25px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight">
                          {card.Title}
                        </h3>
                        <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
                          {card.Description}
                        </p>
                        <div className="self-start flex gap-2">
                          <div
                            onClick={() => handleApplyNow(card)}
                            className="inline-block cursor-pointer"
                          >
                            <OrangeButtonWidget content="Apply now" />
                          </div>
                          <LinkWidget href={`/courses/${card.Slug}`}>
                            <OrangeBorderButtonWidget
                              content={card.Btn_txt || "Course Detail"}
                            />
                          </LinkWidget>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      )}

      {isApplicationOpen && (
        <CourseApplicationFormModel
          isOpen={isApplicationOpen}
          onClose={handleApplicationClose}
          selectedCourse={selectedCourse}
        />
      )}
    </>
  );
};

export default CourseDetailsPopup;