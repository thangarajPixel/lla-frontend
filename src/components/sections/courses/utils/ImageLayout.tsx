"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { ImageData } from "./types";

interface ImageLayoutProps {
  type: string | number;
  images?: ImageData[];
}

interface MobileImageLayoutProps {
  breakpoint: "md" | "lg";
  images?: ImageData[];
}

const MobileImageLayout = ({ breakpoint, images }: MobileImageLayoutProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  if (!images || images.length === 0) return null;

  return (
    <div className={`w-full overflow-hidden mt-4 sm:mt-6 ${breakpoint}:hidden`}>
      <div ref={emblaRef} className="cursor-grab active:cursor-grabbing">
        <div className="flex gap-3 sm:gap-4">
          {images.map((image, index) => {
            const imageUrl = image?.url ? getS3Url(image.url) : undefined;
            if (!imageUrl) return null;

            return (
              <div
                key={image.id || index}
                // className="relative aspect-4/3 overflow-hidden"
              >
                <ImageWidget
                  src={imageUrl}
                  alt={image.name || "Course Content"}
                  // fill
                  width={100}
                  height={100}
                  className="object-cover object-top w-full h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ImageLayout = ({ type, images }: ImageLayoutProps) => {
  const image1 = images?.[0]?.url ? getS3Url(images[0].url) : undefined;
  const image2 = images?.[1]?.url ? getS3Url(images[1].url) : undefined;
  const image3 = images?.[2]?.url ? getS3Url(images[2].url) : undefined;

  switch (type) {
    case "Type1":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[440px] 3xl:min-h-[495px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="slideRight" delay={0.1}>
                <div className="absolute top-0 right-10 w-full aspect-231/347 max-w-[180px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image1}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="slideLeft" delay={0.2}>
                <div className="absolute top-[217px] left-0 w-full aspect-480/282 max-w-[380px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image2}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type2":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[560px] 3xl:min-h-[720px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="fadeDown" delay={0.1}>
                <div className="absolute top-0 left-0 w-full aspect-445/282 max-w-[220px] xl:max-w-[240px] 2xl:max-w-[270px] 3xl:max-w-[350px] group">
                  <ImageWidget
                    src={image1}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="slideRight" delay={0.2}>
                <div className="absolute top-28 3xl:top-34 right-0 w-full aspect-252/380 max-w-[160px] 3xl:max-w-[200px] group">
                  <ImageWidget
                    src={image2}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image3 && (
              <ScrollWidget animation="scale" delay={0.3}>
                <div className="absolute top-[365px] 3xl:top-[455px] left-[29px] w-96 aspect-398/265 max-w-[190px] xl:max-w-[200px] 2xl:max-w-[240px] 3xl:max-w-[320px] group">
                  <ImageWidget
                    src={image3}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type3":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[370px] 3xl:min-h-[465px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="slideLeft" delay={0.1}>
                <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[180px] 2xl:max-w-[240px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image1}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="fadeUp" delay={0.2}>
                <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[220px] 2xl:max-w-[250px] 3xl:max-w-[320px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image2}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type4":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[465px] 3xl:min-h-[595px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="fadeUp" delay={0.1}>
                <div className="absolute top-0 left-0 w-full aspect-300/204 max-w-35 xl:max-w-[150px] 2xl:max-w-[180px] 3xl:max-w-[240px] group">
                  <ImageWidget
                    src={image1}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="slideRight" delay={0.2}>
                <div className="absolute top-21 2xl:top-28 3xl:top-36 left-[75px] 2xl:left-[90px] 3xl:left-[110px] w-full aspect-370/272 max-w-[180px] xl:max-w-[200px] 2xl:max-w-[240px] 3xl:max-w-[300px] group">
                  <ImageWidget
                    src={image2}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image3 && (
              <ScrollWidget animation="fadeDown" delay={0.3}>
                <div className="absolute top-[185px] 2xl:top-[220px] 3xl:top-[305px] left-0 w-96 aspect-190/286 max-w-[110px] xl:max-w-[120px] 2xl:max-w-[130px] 3xl:max-w-[150px] group">
                  <ImageWidget
                    src={image3}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type5":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[430px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="slideRight" delay={0.1}>
                <div className="absolute top-0 left-[125px] 3xl:left-[185px] w-full aspect-300/203 max-w-35 xl:max-w-[150px] 2xl:max-w-[200px] 3xl:max-w-[240px] group">
                  <ImageWidget
                    src={image1}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="fadeDown" delay={0.2}>
                <div className="absolute top-21 2xl:top-28 3xl:top-36 left-0 w-full aspect-268/351 max-w-[150px] 2xl:max-w-[190px] 3xl:max-w-[210px] group">
                  <ImageWidget
                    src={image2}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image3 && (
              <ScrollWidget animation="scale" delay={0.3}>
                <div className="absolute top-[150px] 2xl:top-[210px] 3xl:top-[229px] left-[165px] 2xl:left-[220px] 3xl:left-[244px] w-full aspect-236/323 max-w-[110px] xl:max-w-[120px] 2xl:max-w-[130px] 3xl:max-w-[180px] group">
                  <ImageWidget
                    src={image3}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type6":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[370px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="fadeDown" delay={0.1}>
                <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[180px] 2xl:max-w-[240px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image1}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="scale" delay={0.2}>
                <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[220px] 2xl:max-w-[250px] 3xl:max-w-[320px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image2}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type7":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[350px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="fadeUp" delay={0.1}>
                <div className="absolute top-0 left-[81px] w-full aspect-387/269 max-w-48 2xl:max-w-[250px] 3xl:max-w-[310px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image1}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="slideRight" delay={0.2}>
                <div className="absolute top-[110px] 2xl:top-[135px] 3xl:top-[175px] w-full aspect-381/254 max-w-[220px] 2xl:max-w-[260px] 3xl:max-w-[300px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image2}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type8":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[330px] 3xl:min-h-[440px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="fadeDown" delay={0.1}>
                <div className="absolute top-0 left-[140px] xl:left-[151px] 2xl:left-[190px] 3xl:left-[231px] w-full aspect-249/374 max-w-[135px] 2xl:max-w-[160px] 3xl:max-w-[200px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image1}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="scale" delay={0.2}>
                <div className="absolute top-[135px] 3xl:top-[186px] w-full aspect-356/246 max-w-[200px] 2xl:max-w-[230px] 3xl:max-w-[280px]">
                  <div className="relative w-full h-full group">
                    <ImageWidget
                      src={image2}
                      alt="Course Content"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "Type9":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[370px] 3xl:min-h-[440px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="slideRight" delay={0.1}>
                <div className="absolute top-0 left-[155px] 3xl:left-[216px] w-full aspect-264/175 max-w-35 xl:max-w-[150px] 2xl:max-w-[180px] 3xl:max-w-[210px] group">
                  <ImageWidget
                    src={image1}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="slideLeft" delay={0.2}>
                <div className="absolute top-21 2xl:top-[65px] 3xl:top-[72px] left-0 w-full aspect-282/188 max-w-[150px] 2xl:max-w-[200px] 3xl:max-w-[220px] group">
                  <ImageWidget
                    src={image2}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image3 && (
              <ScrollWidget animation="fadeUp" delay={0.3}>
                <div className="absolute top-[150px] 2xl:top-[195px] 3xl:top-[209px] left-[165px] 2xl:left-[100px] 3xl:left-[110px] w-full aspect-300/228 max-w-[110px] xl:max-w-[120px] 2xl:max-w-48 3xl:max-w-[240px] group">
                  <ImageWidget
                    src={image3}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );
    case "Type10":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full md:min-h-[370px] 3xl:min-h-[450px] overflow-hidden">
            {image1 && (
              <ScrollWidget animation="fadeUp" delay={0.1}>
                <div className="absolute top-0 left-10 3xl:left-[60px] w-full aspect-300/199 max-w-35 xl:max-w-[160px] 2xl:max-w-[200px] 3xl:max-w-[240px] overflow-hidden z-20">
                  <ImageWidget
                    src={image1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollWidget>
            )}
            {image2 && (
              <ScrollWidget animation="slideRight" delay={0.2}>
                <div className="absolute top-[51px] 3xl:top-[61px] left-[136px] lg:left-[165px] 2xl:left-[220px] 3xl:left-[255px] w-full aspect-225/282 max-w-28 2xl:max-w-[140px] 3xl:max-w-[180px] group z-10">
                  <ImageWidget
                    src={image2}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
            {image3 && (
              <ScrollWidget animation="rotate" delay={0.3}>
                <div className="absolute top-[150px] xl:top-[165px] 2xl:top-[195px] 3xl:top-[245px] left-0 w-full aspect-300/205 max-w-[140px] xl:max-w-44 2xl:max-w-[200px] 3xl:max-w-[240px] group">
                  <ImageWidget
                    src={image3}
                    alt="Course Content"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </ScrollWidget>
            )}
          </div>
        </>
      );

    case "SingeImage":
      return (
        <>
          <MobileImageLayout breakpoint="lg" images={images} />
          <div className="hidden lg:block relative w-full">
            {image1 && (
              // <ScrollWidget animation="fadeUp" delay={0.1}>
                <div className="w-full lg:max-w-full xl:max-w-full overflow-hidden z-20 mt-0 lg:mt-1.5">
                  <ImageWidget
                    src={image1}
                    alt="Course Content"
                    // fill
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              // </ScrollWidget>
            )}
          </div>
        </>
      );

    default:
      return null;
  }
};

export default ImageLayout;
