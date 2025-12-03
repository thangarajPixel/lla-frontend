"use client";

import { DialogClose } from "@/components/ui/dialog";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Into, Play } from "@/helpers/ImageHelper";
import type { CampusHeroSectionProps } from "./utils/campus";

const CampusHeroSection = ({ data }: CampusHeroSectionProps) => {
  const stopAllVideos = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  };

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="flex flex-col justify-center h-full space-y-4  px-4 py-8 md:space-y-6 md:px-6 lg:px-8 xl:px-12 xl:pl-50 2xl:pl-58 2xl:pr-16 3xl:px-20 3xl:pl-74">
            <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
              {data.Title}
            </h3>
            <p className="font-area-variable font-normal text-base xss:text-[24px] md:text-lg lg:text-xl xl:text-[28px] 2xl:text-[30px] 3xl:text-[40px] text-black font-mulish">
              {data.Heading}
              {data.SubHeading && (
                <span className="text-[#E97451] ml-2">{data.SubHeading}</span>
              )}
            </p>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.2}>
          <div className="relative w-full aspect-video h-auto xss:h-[361px] sm:h-[425px] 3xl:h-[525px] overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src={data?.Video?.url ? getS3Url(data.Video.url) : ""}
                type="video/mp4"
              />
              <track kind="captions" srcLang="en" label="English" />
              Your browser does not support the video tag.
            </video>
            <DialogWidget
              trigger={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="video-main">
                    <div className="waves-block">
                      <div className="waves wave-1" />
                      <div className="waves wave-2" />
                      <div className="waves wave-3" />
                    </div>
                  </div>
                  <ButtonWidget
                    type="button"
                    className="relative w-13 h-13 p-0 bg-transparent hover:bg-transparent border-none shadow-none rounded-full group/play-button transition-all duration-300 ease-out z-10"
                  >
                    <ImageWidget
                      src={Play}
                      alt="play video"
                      className="w-13 cursor-pointer h-13 text-white group-hover/play-button:text-[#E97451] transition-colors duration-500 ease-in-out relative z-10"
                    />
                  </ButtonWidget>
                </div>
              }
              contentClassName="sm:max-w-[90vw] lg:max-w-[800px] p-0"
              showCancel={false}
              onOpenChange={(open) => {
                if (!open) {
                  stopAllVideos();
                }
              }}
              showCloseButton={false}
              customCloseButton={
                <DialogClose asChild>
                  <div className="cursor-pointer -mt-[30px] -mr-[30px]">
                    <ImageWidget
                      src={Into}
                      alt="Close"
                      className="w-[30px] h-[30px]"
                    />
                  </div>
                </DialogClose>
              }
            >
              <div className="relative w-full aspect-video bg-black rounded-lg">
                <video
                  src={data?.Video?.url ? getS3Url(data.Video.url) : ""}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </DialogWidget>
          </div>
        </ScrollWidget>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <ScrollWidget
          animation="fadeUp"
          delay={0.3}
          className="order-2 md:order-1"
        >
          <div className="relative w-full aspect-video h-auto xss:h-[361px] sm:h-[425px] 3xl:h-[525px] overflow-hidden">
            <ImageWidget
              src={
                data?.Image?.url
                  ? getS3Url(data.Image.url)
                  : data?.BottomImage?.url
                    ? getS3Url(data.BottomImage.url)
                    : ""
              }
              alt={data?.Image?.name || data?.BottomImage?.name || ""}
              fill
              className="object-cover"
            />
          </div>
        </ScrollWidget>

        <ScrollWidget
          animation="fadeUp"
          delay={0.4}
          className="order-1 md:order-2"
        >
          <div className="flex flex-col justify-center h-full space-y-4 md:space-y-6 px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-15 xl:px-12 xl:pr-50 2xl:pr-58 2xl:pl-16 3xl:pr-74 3xl:py-15">
            {data.Description?.map((paragraph, index) => {
              const textContent = paragraph.children?.[0]?.text || "";
              if (!textContent) return null;
              const uniqueKey = `${index}-${textContent.slice(0, 20)}`;
              return (
                <p
                  key={uniqueKey}
                  className="text-sm xss:text-[16px] sm:text-base lg:text-[15px] 2xl:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal"
                >
                  {textContent}
                </p>
              );
            })}
          </div>
        </ScrollWidget>
      </div>
    </section>
  );
};

export default CampusHeroSection;
