"use client";

import { AnimatePresence, motion } from "motion/react";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LightboxWidget from "@/components/widgets/LightboxWidget";
import {
  Dummy1,
  Dummy2,
  Dummy3,
  OrangeArrowRight,
  Website,
} from "@/helpers/ImageHelper";

type Card = {
  id: number;
  name: string;
  role?: string;
  gallery?: StaticImageData[];
  thumbnail: StaticImageData;
};

type TeamMemberPopupProps = {
  cards: Card[];
};

export default function TeamMemberPopup({ cards }: TeamMemberPopupProps) {
  const [selected, setSelected] = useState<Card | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const bodyOverflowRef = useRef<string | null>(null);

  const sampleBiography = `Taking a stroll through Parry’s Corner in Chennai on his 16th birthday, Aneev chanced upon an antique camera store. A couple of tantrums later, and with the promise of better exam results, he walked out with an old Olympus OM 10 and a slightly disgruntled father in tow. Three years later he enrolled into Light & Life Academy. After graduating in 2007, he spent some time working as a photo-editor in Bangalore and then decided to move to Mumbai.<br><br>Aneev Rao is currently a portrait and fashion photographer. Aneev’s work has been featured in Vogue, Cosmopolitan, Marie Claire, Grazia, Harper’s Bazaar, People.`;

  const portfolioLink = "https://www.behance.net/aneevrao";

  const sampleGalleryImages = [
    { src: Dummy3, alt: "Gallery 1" },
    { src: Dummy1, alt: "Gallery 2" },
    { src: Dummy2, alt: "Gallery 3" },
    { src: Dummy1, alt: "Gallery 4" },
    { src: Dummy1, alt: "Gallery 5" },
    { src: Dummy3, alt: "Gallery 6" },
    { src: Dummy1, alt: "Gallery 7" },
    { src: Dummy1, alt: "Gallery 8" },
    { src: Dummy1, alt: "Gallery 9" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (selected) {
      bodyOverflowRef.current = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        document.documentElement.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      }
    }

    return () => {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        document.documentElement.style.overflow = bodyOverflowRef.current;
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [selected]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selected]);

  if (!cards?.length) return null;

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          layoutId={`card-${card.id}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={() => setSelected(card)}
          className="relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition"
          aria-label={`Open ${card.name} details`}
        >
          <ImageWidget
            src={card.thumbnail}
            alt={card.name}
            className="object-cover object-center w-full h-full"
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-white backdrop-blur-sm z-15"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-0 z-40 overflow-y-auto overscroll-contain"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="hidden md:block">
                <div className="flex justify-end mb-6 fixed top-25 right-10 z-10">
                  <ButtonWidget
                    onClick={() => setSelected(null)}
                    type="button"
                    className="orange-button-white flex border-none items-center gap-2 rounded-[60px] px-5 h-10 text-sm md:text-base font-bold transition-colors duration-300 font-mulish text-[15px] 3xl:text-[18px]"
                    aria-label="Go back"
                  >
                    <ImageWidget
                      src={OrangeArrowRight}
                      alt="Back"
                      className="w-5 h-5"
                    />
                    <span className="text-[#E97451]">Back</span>
                  </ButtonWidget>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col">
                  <div className="flex flex-col sticky top-16 space-y-4  px-4 py-8 pb-0 md:pb-8 md:px-6 lg:px-8 xl:px-12 xl:pl-52 2xl:pl-58 2xl:pr-10 3xl:px-20 3xl:pl-74 pt-13">
                    {selected.name && (
                      <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-3xl font-urbanist text-[#E97451] xss:text-[24px] lg:text-[30px] 3xl:text-[40px] font-normal mb-6"
                      >
                        {selected.name}
                      </motion.h1>
                    )}

                    {selected.thumbnail && (
                      <motion.div
                        layoutId={`card-${selected.id}`}
                        initial={{ x: 120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 120, opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="relative w-full mb-6"
                      >
                        <div className="space-y-4">
                          <div className="relative w-full overflow-hidden">
                            <ImageWidget
                              src={selected.thumbnail}
                              alt={selected.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {portfolioLink && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.3, duration: 0.35 }}
                        className="mb-8 flex items-center gap-2"
                      >
                        <ImageWidget
                          src={Website}
                          alt="Icon"
                          width={30}
                          height={30}
                          className="object-cover "
                        />
                        <a
                          href={
                            portfolioLink.startsWith("http")
                              ? portfolioLink
                              : `https://${portfolioLink}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
                        >
                          <span className="text-sm md:text-base 3xl:text-[20px] font-urbanist font-normal text-[#E97451]">
                            {portfolioLink}
                          </span>
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col bg-[#E97451]/20 md:pt-13 ">
                  <div className="flex flex-col justify-center px-4 py-8 pb-4 md:pb-8 md:px-4 md:py-12 lg:px-6 lg:py-15 xl:px-10 xl:pr-50 2xl:pr-58 3xl:pr-74 3xl:py-15">
                    {sampleBiography && (
                      <div className="mb-8 mt-16">
                        <HTMLWidget
                          content={sampleBiography}
                          className="prose prose-sm md:prose-base max-w-none font-mulish text-sm xss:text-[16px] sm:text-base lg:text-[15px] 2xl:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal"
                        />
                      </div>
                    )}
                    {sampleGalleryImages && sampleGalleryImages.length > 0 && (
                      <div className="mt-auto">
                        <LightboxWidget
                          images={sampleGalleryImages.map((image) => ({
                            src: image.src,
                            alt: image.alt || `${selected.name} Gallery`,
                          }))}
                        >
                          {(openLightbox) => (
                            <>
                              {isMounted ? (
                                <ResponsiveMasonry
                                  columnsCountBreakPoints={{
                                    350: 1,
                                    768: 1,
                                    1024: 2,
                                  }}
                                >
                                  <Masonry gutter="32px">
                                    {sampleGalleryImages.map((image, index) => {
                                      if (!image?.src) return null;
                                      const imageAlt =
                                        image?.alt ||
                                        `${selected.name} Gallery ${index + 1}`;
                                      return (
                                        <motion.div
                                          key={`gallery-${index}`}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: 10 }}
                                          transition={{
                                            delay: 0.22 + index * 0.05,
                                            duration: 0.35,
                                          }}
                                          role="button"
                                          tabIndex={0}
                                          onClick={() => openLightbox(index)}
                                          onKeyDown={(e) => {
                                            if (
                                              e.key === "Enter" ||
                                              e.key === " "
                                            ) {
                                              e.preventDefault();
                                              openLightbox(index);
                                            }
                                          }}
                                          className="relative w-full overflow-hidden group cursor-pointer -mx-0.5"
                                          style={{ padding: "3px" }}
                                        >
                                          <div className="relative w-full aspect-auto overflow-hidden">
                                            <ImageWidget
                                              src={image.src}
                                              alt={imageAlt}
                                              width={800}
                                              height={600}
                                              className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                              loading="lazy"
                                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                                            />
                                          </div>
                                        </motion.div>
                                      );
                                    })}
                                  </Masonry>
                                </ResponsiveMasonry>
                              ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  {sampleGalleryImages.map((image, index) => {
                                    if (!image?.src) return null;
                                    const imageAlt =
                                      image?.alt ||
                                      `${selected.name} Gallery ${index + 1}`;
                                    return (
                                      <motion.div
                                        key={`gallery-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{
                                          delay: 0.22 + index * 0.05,
                                          duration: 0.35,
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => openLightbox(index)}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                          ) {
                                            e.preventDefault();
                                            openLightbox(index);
                                          }
                                        }}
                                        className="relative w-full overflow-hidden group cursor-pointer"
                                      >
                                        <div className="relative w-full aspect-auto overflow-hidden rounded-lg">
                                          <ImageWidget
                                            src={image.src}
                                            alt={imageAlt}
                                            width={800}
                                            height={600}
                                            className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                          />
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          )}
                        </LightboxWidget>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
