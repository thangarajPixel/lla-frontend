"use client";

import { DialogClose } from "@/components/ui/dialog";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
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
      <ContainerWidget>
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-20 xl:py-40 2xl:py-50 3xl:py-60 relative z-10">
            <div className="relative flex flex-col items-start bg-black/40 p-7  backdrop-blur-none w-full 3xl:max-w-[740px] 3xl:max-h-[662px] ">
              {data?.Title && (
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[50px] 2xl:text-[60px] 3xl:text-[64px] font-urbanist  font-normal mb-3 xl:max-w-[300px] 3xl:max-w-[500px]">
                  {data.Title}
                </h1>
              )}
              {data?.Heading && (
                <HTMLWidget
                  content={data.Heading}
                  tag="p"
                  className="text-white text-base sm:text-lg lg:text-[28px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[40px] font-mulish"
                />
              )}
              <div className="hidden md:block">
                <DialogWidget
                  trigger={
                    <button
                      type="button"
                      aria-label="Play video"
                      className="absolute -right-7 top-1/2 -translate-y-1/2 flex items-center justify-center border-none bg-transparent p-0 cursor-pointer group/play-button z-10"
                    >
                      <div className="video-main1 -ml-1">
                        <div className="waves-block">
                          <div className="waves wave-1" />
                          <div className="waves wave-2" />
                          <div className="waves wave-3" />
                        </div>
                      </div>
                      <div className="relative w-14 h-15 -mt-1 p-0 bg-transparent hover:bg-transparent border-none shadow-none rounded-full transition-all duration-300 ease-out z-10">
                        <ImageWidget
                          src={Play}
                          alt="play video"
                          className="w-13 h-13 cursor-pointer text-white group-hover/play-button:text-[#E97451] transition-colors duration-500 ease-in-out relative z-10"
                        />
                      </div>
                    </button>
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
