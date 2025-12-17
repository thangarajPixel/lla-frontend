"use client";

import { DialogClose } from "@/components/ui/dialog";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Into, Play } from "@/helpers/ImageHelper";
import type { CampusHeroSectionProps } from "./utils/campus";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";

const CampusHeroSection = ({ data }: CampusHeroSectionProps) => {
  const stopAllVideos = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  };
  return (
    <section className="relative w-full h-[1050px] overflow-hidden">
      <div className="absolute inset-0 w-full h-[1050px] z-0">
        <video
          className="w-full h-[1050px] object-cover"
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
        </video>
      </div>
      <ContainerWidget >
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-20 xl:py-40 2xl:py-50 3xl:py-60 relative z-10">
            <div className="flex flex-col items-start bg-black/40 p-4  backdrop-blur-none w-full 3xl:max-w-[740px] 3xl:max-h-[662px] ">
              {data?.Title && (
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[50px] 2xl:text-[60px] 3xl:text-[64px] font-urbanist  font-normal mb-3 xl:max-w-[300px] 3xl:max-w-[500px]">
                  {data.Title}
                </h1>
              )}
              {data?.Heading && (
                <HTMLWidget
                  content={data.Heading}
                  tag="p"
                  className="text-white  xl:leading-[30px]  3xl:leading-[48px] text-base sm:text-lg lg:text-[28px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[40px] font-mulish xl:max-w-[300px] 3xl:max-w-[500px]"
                />
              )}
              <DialogWidget trigger={<div className="absolute inset-0 flex items-center justify-center z-10 ">
                <div className="video-main1">
                  <div className="waves-block">
                    <div className="waves wave-1" />
                    <div className="waves wave-2" />
                    <div className="waves wave-3" />
                  </div>
                </div>
                <ButtonWidget type="button"
                  className="relative video-main1 w-14 h-15 p-0  bg-transparent hover:bg-transparent border-none shadow-none rounded-full group/play-button z-10">
                  <ImageWidget src={Play} alt="play video"
                    className="w-13 h-13 cursor-pointer transition-colors duration-300 group-hover/play-button:text-[#E97451]" />
                </ButtonWidget>
              </div>
              }
                contentClassName="sm:max-w-[90vw] lg:max-w-[800px] p-0"
                showCancel={false}
                showCloseButton={false}
                onOpenChange={(open) => {
                  if (!open) stopAllVideos();
                }}
                customCloseButton={
                  <DialogClose asChild>
                    <div className="cursor-pointer -mt-[30px] -mr-[30px]">
                      <ImageWidget src={Into} alt="Close" className="w-[30px] h-[30px]" />
                    </div>
                  </DialogClose>
                }
              >
                <div className="relative w-full aspect-video bg-black rounded-lg">
                  <video src={data?.Video?.url ? getS3Url(data.Video.url) : ""} autoPlay loop muted playsInline controls
                    className="w-full h-full object-contain rounded-lg" />
                </div>
              </DialogWidget>

              <div className="flex flex-col gap-4 mt-6 max-w-[692px]">
                {data.Description?.map((paragraph, index) => {
                  const textContent = paragraph.children?.[0]?.text || "";
                  if (!textContent) return null;
                  const uniqueKey = `${index}-${textContent.slice(0, 20)}`;
                  return (
                    <p
                      key={uniqueKey}
                      className="font-mulish text-sm xss:text-[16px] sm:text-base lg:text-[17px] xl:text-[14px] 2xl:text-[17px] 3xl:text-[18px] font-normal text-white xl:leading-[24px] 3xl:leading-[26px]"
                    >
                      {textContent}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default CampusHeroSection;
