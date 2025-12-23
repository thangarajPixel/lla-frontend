"use client";

import { useRef, useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Into, Play } from "@/helpers/ImageHelper";
import type { CampusHeroSectionProps } from "./utils/campus";

const CampusHeroSection = ({ data }: CampusHeroSectionProps) => {
  const [videoError, setVideoError] = useState(false);
  const [dialogVideoError, setDialogVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stopPopupVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };


  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>,
  ) => {
    e.preventDefault();
    setVideoError(true);
    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }
  };

  const videoUrl = data?.Video?.url ? getS3Url(data.Video.url) : "";
  const backgroundImage = data?.Image?.url ? getS3Url(data.Image.url) : null;

  return (
    <section className="relative w-full h-[1050px] overflow-hidden">
      <div className="absolute inset-0 w-full h-[1050px] z-0">
        {!videoError && videoUrl && (
          <video
            ref={videoRef}
            className="w-full h-[1050px] object-cover"
            autoPlay
            loop
            muted
            playsInline
            onError={handleVideoError}
            onLoadStart={() => {
              setVideoError(false);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" srcLang="en" label="English" />
          </video>
        )}
        {(videoError || !videoUrl) && backgroundImage && (
          <ImageWidget
            src={backgroundImage}
            alt={data?.Title || "Campus"}
            fill
            className="object-cover"
          />
        )}
        {(videoError || !videoUrl) && !backgroundImage && (
          <div className="w-full h-full bg-[#F6F6F6]" />
        )}
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
                  className="text-white text-base text-[24px] 3xl:text-[40px] font-mulish md:leading-[48px]!"
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
                      <div className="video-main1 -ml-0.5 -mt-0.7">
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
                    if (!open) {
                      stopPopupVideo();        // stop popup video
                      videoRef.current?.play(); // resume background video
                    } else {
                      videoRef.current?.pause(); // pause background video
                    }
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
                    {videoUrl && !dialogVideoError ? (
                      <video
                        src={videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          e.preventDefault();
                          setDialogVideoError(true);
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-white">
                        Video unavailable
                      </div>
                    )}
                  </div>
                </DialogWidget>
              </div>

              <div className="flex flex-col gap-4 mt-6 max-w-[692px]">
                {data.Description?.map((paragraph, index) => {
                  const textContent = paragraph.children?.[0]?.text || "";
                  if (!textContent) return null;
                  const uniqueKey = `${index}-${textContent.slice(0, 20)}`;
                  return (
                    <div key={uniqueKey}>
                      <ParagraphWidget className="text-white!">
                        {textContent}
                      </ParagraphWidget>
                    </div>
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
