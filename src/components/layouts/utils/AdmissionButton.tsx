"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCoursesListData } from "@/app/api/server";
import CourseApplicationFormModel from "@/components/sections/courses/utils/CourseApplicationFormModel";
import { DialogClose } from "@/components/ui/dialog";
import DialogWidget from "@/components/widgets/DialogWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowRightWhite, Into } from "@/helpers/ImageHelper";
import ButtonWidget from "../../widgets/ButtonWidget";
import ImageWidget from "../../widgets/ImageWidget";
import LinkWidget from "../../widgets/LinkWidget";
import OrangeBorderButtonWidget from "../../widgets/OrangeBorderButtonWidget";
import type { AdmissionButtonProps, CourseCard } from "./types";

const AdmissionButton = ({
  className = "",
  iconClassName = "",
  onClick,
  onApply,
}: AdmissionButtonProps) => {
  const [data, setData] = useState<CourseCard[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseCard>();
  const [imageIndices, setImageIndices] = useState<number[]>([]);
  const pathname = usePathname();

  // Check if current page is contact-us
  const isContactUsPage = pathname === "/contact-us";

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [pathname]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    const loadData = async () => {
      const { data: res } = await getCoursesListData();
      setData(res);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (data) {
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

  return (
    <>
      <DialogWidget
        open={isOpen}
        onOpenChange={handleOpenChange}
        trigger={
          <ButtonWidget
            className={`${
              isContactUsPage
                ? "orange-button-white border-1 border-[#E97451]  leading-[28px]"
                : "orange-button-white border-1 border-[#E97451]  leading-[28px]"
            } group rounded-[60px] xss:text-[16px] px-5 h-10 3xl:w-[230px] 3xl:h-[50px]  text-[14px] 2xl:text-[14px] 3xl:text-[18px] ${className}`}
          >
            Admissions Open
            <ImageWidget
              src={isContactUsPage ? ArrowRightWhite : ArrowRightWhite}
              alt="Arrow Right"
              className={`lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1 ${iconClassName}`}
            />
          </ButtonWidget>
        }
        contentClassName="h-[80vh] md:h-auto sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] p-4 sm:p-6 lg:p-6"
        showCancel={false}
        showCloseButton={false}
        customCloseButton={
          <DialogClose asChild>
            <div className="cursor-pointer -mt-[30px] -mr-[30px]">
              <ImageWidget
                src={Into}
                alt="Into"
                className="w-[30px] h-[30px]"
              />
            </div>
          </DialogClose>
        }
      >
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
                      <LinkWidget
                        // href={`/admission?course=${encodeURIComponent(card?.Slug)}`}
                        href="#"
                        onClick={() => {
                          setIsOpen(false);
                          onClick?.();
                          onApply?.(card);
                          setSelectedCourse(card);

                          setTimeout(() => {
                            setIsApplicationOpen(true);
                          }, 1000);
                        }}
                      >
                        <OrangeButtonWidget content="Apply now" className="h-full" />
                      </LinkWidget>
                      <LinkWidget href={`/courses/${card.Slug}`} className="h-full">
                        <OrangeBorderButtonWidget
                          content={card.Btn_txt || "Course Detail"}
                          className="h-full"
                        />
                      </LinkWidget>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </DialogWidget>

      {isApplicationOpen && (
        <CourseApplicationFormModel
          isOpen={isApplicationOpen}
          onClose={() => setIsApplicationOpen(false)}
          selectedCourse={selectedCourse}
        />
      )}
    </>
  );
};

export default AdmissionButton;
