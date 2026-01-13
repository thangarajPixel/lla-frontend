"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LightboxWidget from "@/components/widgets/LightboxWidget";
import { OrangeArrowRight, Website } from "@/helpers/ImageHelper";
import type { Card, TeamMemberPopupProps } from "./utils/about-us";

export default function TeamMemberPopup({
  cards,
  selectedCardId,
  onClose,
  hideGrid = false,
  currentPage = 1,
  totalPages = 1,
  isLoading = false,
  onPrev,
  onNext,
}: TeamMemberPopupProps) {
  const [selected, setSelected] = useState<Card | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const bodyOverflowRef = useRef<string | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const handleClose = useCallback(() => {
    setSelected(null);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (selectedCardId !== undefined) {
      if (selectedCardId !== null) {
        const card = cards.find((c) => c.id === selectedCardId);
        setSelected(card || null);
        setAnimationKey((prev) => prev + 1);
      } else {
        setSelected(null);
      }
    }
  }, [selectedCardId, cards]);

  useEffect(() => {
    if (selected) {
      scrollPositionRef.current = window.scrollY;
      bodyOverflowRef.current = window.getComputedStyle(document.body).overflow;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      if (bodyOverflowRef.current !== null) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = bodyOverflowRef.current;
        document.documentElement.style.overflow = bodyOverflowRef.current;
        window.scrollTo(0, scrollPositionRef.current);
        bodyOverflowRef.current = null;
      }
    }

    return () => {
      if (bodyOverflowRef.current !== null) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = bodyOverflowRef.current;
        document.documentElement.style.overflow = bodyOverflowRef.current;
        window.scrollTo(0, scrollPositionRef.current);
        bodyOverflowRef.current = null;
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [selected]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (selected) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selected, handleClose]);

  if (!cards?.length) return null;

  const selectedBiography = selected?.biography || "";
  const selectedPortfolioLink = selected?.portfolioLink;

  return (
    <>
      {!hideGrid && (
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
                src={
                  typeof card.thumbnail === "string"
                    ? card.thumbnail
                    : card.thumbnail
                }
                alt={card.name}
                className="object-cover object-center w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-white backdrop-blur-sm z-15 overflow-hidden"
              onClick={handleClose}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 h-screen pt-4 md:pt-14 lg:pt-20">
                <div className="flex flex-col">
                  <div className="flex flex-col sticky top-16 space-y-4 px-4 py-8 pb-0 md:pb-8 md:px-6 lg:px-8 xl:px-12 xl:pl-52 2xl:pl-58 2xl:pr-10 3xl:px-20 3xl:pl-74">
                    {/* Back button - positioned above heading */}
                    <div className="mb-4 mt-8 md:hidden">
                      <ButtonWidget
                        onClick={handleClose}
                        type="button"
                        className="bg-white border-2 border-[#E97451] flex items-center gap-2 rounded-[60px] px-4 h-10 text-sm font-bold transition-colors duration-300 font-mulish shadow-lg hover:bg-[#E97451] hover:text-white"
                        aria-label="Go back"
                      >
                        <ImageWidget
                          src={OrangeArrowRight}
                          alt="Back"
                          className="w-4 h-4"
                        />
                        <span className="text-[#E97451] hover:text-white">Back</span>
                      </ButtonWidget>
                    </div>
                    
                    {/* Desktop back button - fixed position */}
                    <div className="hidden md:block fixed top-25 2xl:top-28 right-5 z-50">
                      <ButtonWidget
                        onClick={handleClose}
                        type="button"
                        className="orange-button-white flex border-none items-center gap-2 rounded-[60px] px-5 h-10 text-sm lg:text-base font-bold transition-colors duration-300 font-mulish text-[15px] 3xl:text-[18px] shadow-lg"
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
                    {selected.name && (
                      <motion.h1
                        key={`title-${animationKey}`}
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
                        key={`image-${animationKey}`}
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
                              width={800}
                              height={1000}
                              className="object-cover w-full h-auto"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {onPrev && onNext && totalPages > 1 && (
                      <div>
                        <div className="flex gap-2 sm:gap-4 w-full bg-[#E97451]/20 rounded-full p-1 sm:p-1.5">
                          <button
                            type="button"
                            onClick={onPrev}
                            disabled={currentPage <= 1 || isLoading}
                            className={`flex items-center rounded-full justify-center h-8 sm:h-10 md:h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                              currentPage <= 1 || isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer hover:bg-[#FFD4CC]"
                            }`}
                            aria-label="Previous team member"
                          >
                            <ImageWidget
                              src={OrangeArrowRight}
                              alt="Previous"
                              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={onNext}
                            disabled={currentPage >= totalPages || isLoading}
                            className={`flex items-center rounded-full justify-center h-8 sm:h-10 md:h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                              currentPage >= totalPages || isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer hover:bg-[#FFD4CC]"
                            }`}
                            aria-label="Next team member"
                          >
                            <ImageWidget
                              src={OrangeArrowRight}
                              alt="Next"
                              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rotate-180"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                    {selectedPortfolioLink && (
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
                            selectedPortfolioLink.startsWith("http")
                              ? selectedPortfolioLink
                              : `https://${selectedPortfolioLink}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
                        >
                          <span className="text-sm md:text-base 3xl:text-[20px] font-urbanist font-normal text-[#E97451]">
                            {selectedPortfolioLink}
                          </span>
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col bg-[#E97451]/20">
                  <div className="flex flex-col px-4 py-8 pb-4 md:pb-8 md:px-4 md:py-12 lg:px-6 lg:py-15 xl:px-10 xl:pr-50 2xl:pr-58 3xl:pr-74 3xl:py-15">
                    {selectedBiography && (
                      <motion.div
                        key={`biography-${animationKey}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.3, duration: 0.35 }}
                        className="mb-8"
                      >
                        <HTMLWidget
                          content={selectedBiography}
                          className="font-mulish mt-7 text-[16px] md:text-[17px] 2xl:text-[18px] font-normal text-black leading-[26px]"
                        />
                      </motion.div>
                    )}
                    {selected.gallery && selected.gallery.length > 0 && (
                      <motion.div
                        key={`gallery-${animationKey}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.5, duration: 0.35 }}
                        className="mt-auto"
                      >
                        <LightboxWidget
                          images={selected.gallery.map((image) => ({
                            src:
                              typeof image.src === "string"
                                ? image.src
                                : image.src,
                            alt: image.alt || `${selected.name} Gallery`,
                          }))}
                        >
                          {(openLightbox) => {
                            if (!selected.gallery) return null;
                            const gallery = selected.gallery;
                            return (
                              <>
                                {isMounted ? (
                                  <ResponsiveMasonry
                                    columnsCountBreakPoints={{
                                      350: 1,
                                      768: 1,
                                      1024: 1,
                                    }}
                                  >
                                    <Masonry gutter="32px">
                                      {gallery.map((image, index) => {
                                        if (!image?.src) return null;
                                        const imageAlt =
                                          image?.alt ||
                                          `${selected.name} Gallery ${index + 1}`;
                                        const imageSrc =
                                          typeof image.src === "string"
                                            ? image.src
                                            : "";
                                        return (
                                          <motion.div
                                            key={`${animationKey}-${imageSrc}-${imageAlt}`}
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
                                    {gallery.map((image, index) => {
                                      if (!image?.src) return null;
                                      const imageAlt =
                                        image?.alt ||
                                        `${selected.name} Gallery ${index + 1}`;
                                      const imageSrc =
                                        typeof image.src === "string"
                                          ? image.src
                                          : "";
                                      return (
                                        <motion.div
                                          key={`${animationKey}-${imageSrc}-${imageAlt}`}
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
                            );
                          }}
                        </LightboxWidget>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
