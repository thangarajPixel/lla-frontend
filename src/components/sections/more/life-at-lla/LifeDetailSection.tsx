"use client";

import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import {
  Facebook,
  Instagram,
  LinkedInBlack,
  Twitter,
  WhatsappBlack,
} from "@/helpers/ImageHelper";
import type { LifeDetailProps } from "./utils/life-lla";

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    icon: LinkedInBlack,
    alt: "LinkedIn",
    getShareUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    icon: Twitter,
    alt: "Twitter",
    getShareUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "instagram",
    icon: Instagram,
    alt: "Instagram",
    getShareUrl: () => "https://www.instagram.com/lightandlifeacademy",
  },
  {
    id: "facebook",
    icon: Facebook,
    alt: "Facebook",
    getShareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "whatsapp",
    icon: WhatsappBlack,
    alt: "whatsapp",
    getShareUrl: (url: string) =>
      `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
];

const LifeDetailSection = ({ data }: LifeDetailProps) => {
  const { card, latest } = data;
  return (
    <section className="w-full bg-white min-h-screen py-8 sm:py-10 md:py-12 lg:py-16 xl:py-10 2xl:py-14 3xl:py-18">
      <ContainerWidget>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 3xl:gap-38">
          <div className="flex-1 max-w-[850px]">
            <ScrollWidget animation="fadeDown" delay={0.1}>
              <div className="flex flex-col">
                <p className="text-sm md:text-base text-gray-500 font-mulish mb-8">
                  December 18, 2025
                </p>
                <p className="mb-1 text-[32px] sm:text-[34px] md:text-[34px] lg:text-[38px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px] font-normal text-black font-urbanist leading-tight">
                  {card.Title}
                </p>
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                {card.LongDescription && (
                  <p
                    className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-normal font-mulish"
                    dangerouslySetInnerHTML={{ __html: card.LongDescription }}
                  ></p>
                )}
                {card.LifeViewCard?.map((viewCard) => (
                  <div key={viewCard.id} className="flex flex-col gap-4">
                    <h3 className="text-[24px] md:text-[26px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] 3xl:text-[32px] font-normal text-black font-urbanist">
                      {viewCard.Title}
                    </h3>
                    {viewCard.Description && (
                      <div
                        className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-normal font-mulish"
                        dangerouslySetInnerHTML={{
                          __html: viewCard.Description,
                        }}
                      />
                    )}
                    {viewCard.Images?.[0]?.url && (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <ImageWidget
                          src={getS3Url(viewCard.Images[0].url)}
                          alt={viewCard.Title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* <div className="mt-8 pt-8 border-t border-black">
                  <h3 className="text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px] 3xl:text-[24px] font-normal text-[#082326] font-mulish mb-6">
                    Share with
                  </h3>
                  <div className="flex gap-8 items-center">
                    {SOCIAL_LINKS.map((social) => {
                      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
                      const shareUrl = social.id === 'twitter' 
                        ? social.getShareUrl(currentUrl, card.Title)
                        : social.getShareUrl(currentUrl, card.Title);
                      
                      return (
                        <a 
                          key={social.id}
                          href={shareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-70 "
                        >
                          <ImageWidget
                            src={social.icon.src}
                            alt={social.alt}
                            width={40}
                            height={40}
                            className="object-contain h-[27px] w-[27px]"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div> */}
              </div>
            </ScrollWidget>
          </div>
          <aside className="w-full lg:w-[260px] xl:w-[260px] 2xl:w-[280px] 3xl:w-[300px]">
            <ScrollWidget animation="fadeIn" delay={0.2}>
              <div className="sticky top-8">
                <h3 className="text-[32px] ledding-[40px] font-normal text-black font-urbanist mb-3">
                  Latest Life at LLA
                </h3>
                <div className="flex flex-col gap-4">
                  {latest.map((post) => (
                    <div key={post.id} className="group">
                      <div className="flex flex-col gap-2">
                        {post.Image?.[0]?.url && (
                          <div className="relative w-full aspect-video overflow-hidden">
                            <ImageWidget
                              src={getS3Url(post.Image[0].url)}
                              alt={post.Title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h4 className="text-[16px] font-semibold text-black font-mulish">
                          {post.Title}
                        </h4>
                        <div className="mt-2">
                          <OrangeButtonWidget
                            content="Read More"
                            onClick={() =>
                              (window.location.href = `/more/life-at-lla/${post.Slug}`)
                            }
                            className="text-sm bg-white text-[#E97451] border border-[#E97451] hover:bg-[#E97451] hover:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollWidget>
          </aside>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default LifeDetailSection;
