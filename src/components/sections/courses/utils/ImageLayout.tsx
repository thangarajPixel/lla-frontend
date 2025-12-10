import ImageWidget from "@/components/widgets/ImageWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Dummy1 } from "@/helpers/ImageHelper";
import type { ImageData } from "./types";

interface ImageLayoutProps {
  type: string | number;
  images?: ImageData[];
}

interface MobileImageLayoutProps {
  numberOfImages: 2 | 3;
  breakpoint: "md" | "lg";
  images?: ImageData[];
}

const MobileImageLayout = ({
  numberOfImages,
  breakpoint,
  images,
}: MobileImageLayoutProps) => {
  const image1 = images?.[0]?.url ? getS3Url(images[0].url) : Dummy1;
  const image2 = images?.[1]?.url ? getS3Url(images[1].url) : Dummy1;
  const image3 = images?.[2]?.url ? getS3Url(images[2].url) : Dummy1;

  return (
    <div className={`flex flex-row gap-4 ${breakpoint}:hidden`}>
      <div className="relative w-full aspect-231/347 max-w-full mx-auto">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWidget
            src={image1}
            alt="Course Content"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative w-full aspect-480/282 max-w-full mx-auto">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWidget
            src={image2}
            alt="Course Content"
            fill
            className="object-cover"
          />
        </div>
      </div>
      {numberOfImages === 3 && (
        <div className="relative w-full aspect-480/282 max-w-full mx-auto">
          <div className="relative w-full h-full overflow-hidden">
            <ImageWidget
              src={image3}
              alt="Course Content"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ImageLayout = ({ type, images }: ImageLayoutProps) => {
  const image1 = images?.[0]?.url ? getS3Url(images[0].url) : Dummy1;
  const image2 = images?.[1]?.url ? getS3Url(images[1].url) : Dummy1;
  const image3 = images?.[2]?.url ? getS3Url(images[2].url) : Dummy1;

  switch (type) {
    case "Type1":
      return (
        <>
          <MobileImageLayout
            numberOfImages={2}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[440px] 3xl:min-h-[495px]">
            <div className="absolute top-0 right-10 w-full aspect-231/347 max-w-[231px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[217px] left-0 w-full aspect-480/282 max-w-[480px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image2}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case "Type2":
      return (
        <>
          <MobileImageLayout
            numberOfImages={3}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[560px] 3xl:min-h-[720px]">
            <div className="absolute top-0 left-0 w-full aspect-445/282 max-w-[275px] xl:max-w-[305px] 2xl:max-w-[340px] 3xl:max-w-[445px] overflow-hidden">
              <ImageWidget
                src={image1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-28 3xl:top-34 right-0 w-full aspect-252/380 max-w-[200px] 3xl:max-w-[252px] overflow-hidden">
              <ImageWidget
                src={image2}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[365px] 3xl:top-[455px] left-[29px] w-96 aspect-398/265 max-w-[240px] xl:max-w-[258px] 2xl:max-w-[300px] 3xl:max-w-[398px] overflow-hidden">
              <ImageWidget
                src={image3}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    case "Type3":
      return (
        <>
          <MobileImageLayout
            numberOfImages={2}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[370px] 3xl:min-h-[465px]">
            <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[220px] 2xl:max-w-[300px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[270px] 2xl:max-w-[310px] 3xl:max-w-[400px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image2}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case "Type4":
      return (
        <>
          <MobileImageLayout
            numberOfImages={3}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[465px] 3xl:min-h-[595px]">
            <div className="absolute top-0 left-0 w-full aspect-300/204 max-w-45 xl:max-w-[190px] 2xl:max-w-[220px] 3xl:max-w-[300px] overflow-hidden">
              <ImageWidget
                src={image1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-21 2xl:top-28 3xl:top-36 left-[75px] 2xl:left-[90px] 3xl:left-[110px] w-full aspect-370/272 max-w-[230px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[370px] overflow-hidden">
              <ImageWidget
                src={image2}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[185px] 2xl:top-[220px] 3xl:top-[305px] left-0 w-96 aspect-190/286 max-w-[140px] xl:max-w-[150px] 2xl:max-w-[165px] 3xl:max-w-[190px] overflow-hidden">
              <ImageWidget
                src={image3}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    case "Type5":
      return (
        <>
          <MobileImageLayout
            numberOfImages={3}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[430px]">
            <div className="absolute top-0 left-[125px] 3xl:left-[185px] w-full aspect-300/203 max-w-45 xl:max-w-[190px] 2xl:max-w-[260px] 3xl:max-w-[300px] overflow-hidden">
              <ImageWidget
                src={image1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-21 2xl:top-28 3xl:top-36 left-0 w-full aspect-268/351 max-w-[190px] 2xl:max-w-[238px] 3xl:max-w-[268px] overflow-hidden">
              <ImageWidget
                src={image2}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[150px] 2xl:top-[210px] 3xl:top-[229px] left-[165px] 2xl:left-[220px] 3xl:left-[244px] w-full aspect-236/323 max-w-[140px] xl:max-w-[150px] 2xl:max-w-[165px] 3xl:max-w-[236px] overflow-hidden">
              <ImageWidget
                src={image3}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    case "Type6":
      return (
        <>
          <MobileImageLayout
            numberOfImages={2}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[370px]">
            <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[220px] 2xl:max-w-[300px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[270px] 2xl:max-w-[310px] 3xl:max-w-[400px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image2}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case "Type7":
      return (
        <>
          <MobileImageLayout
            numberOfImages={2}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[350px]">
            <div className="absolute top-0 left-[81px] w-full aspect-387/269 max-w-60 2xl:max-w-[310px] 3xl:max-w-[387px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[110px] 2xl:top-[135px] 3xl:top-[175px] w-full aspect-381/254 max-w-[270px] 2xl:max-w-[321px] 3xl:max-w-[381px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image2}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case "Type8":
      return (
        <>
          <MobileImageLayout
            numberOfImages={2}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[330px] 3xl:min-h-[440px]">
            <div className="absolute top-0 left-[140px] xl:left-[151px] 2xl:left-[190px] 3xl:left-[231px] w-full aspect-249/374 max-w-[169px] 2xl:max-w-[199px] 3xl:max-w-[249px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[135px] 3xl:top-[186px] w-full aspect-356/246 max-w-[250px] 2xl:max-w-[291px] 3xl:max-w-[356px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={image2}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case "Type9":
      return (
        <>
          <MobileImageLayout
            numberOfImages={3}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[370px] 3xl:min-h-[440px]">
            <div className="absolute top-0 left-[155px] 3xl:left-[216px] w-full aspect-264/175 max-w-45 xl:max-w-[190px] 2xl:max-w-[220px] 3xl:max-w-[264px] overflow-hidden">
              <ImageWidget
                src={image1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-21 2xl:top-[65px] 3xl:top-[72px] left-0 w-full aspect-282/188 max-w-[190px] 2xl:max-w-[248px] 3xl:max-w-[282px] overflow-hidden">
              <ImageWidget
                src={image2}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[150px] 2xl:top-[195px] 3xl:top-[209px] left-[165px] 2xl:left-[100px] 3xl:left-[110px] w-full aspect-300/228 max-w-[140px] xl:max-w-[150px] 2xl:max-w-60 3xl:max-w-[300px] overflow-hidden">
              <ImageWidget
                src={image3}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    case "Type10":
      return (
        <>
          <MobileImageLayout
            numberOfImages={3}
            breakpoint="lg"
            images={images}
          />
          <div className="hidden lg:block relative w-full md:min-h-[370px] 3xl:min-h-[450px]">
            <div className="absolute top-0 left-10 3xl:left-[60px] w-full aspect-300/199 max-w-45 xl:max-w-[200px] 2xl:max-w-[260px] 3xl:max-w-[300px] overflow-hidden z-20">
              <ImageWidget
                src={image1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[51px] 3xl:top-[61px] left-[136px] lg:left-[165px] 2xl:left-[220px] 3xl:left-[255px] w-full aspect-225/282 max-w-35 2xl:max-w-[175px] 3xl:max-w-[225px] overflow-hidden z-10">
              <ImageWidget
                src={image2}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[150px] xl:top-[165px] 2xl:top-[195px] 3xl:top-[245px] left-0 w-full aspect-300/205 max-w-[180px] xl:max-w-55 2xl:max-w-[260px] 3xl:max-w-[300px] overflow-hidden">
              <ImageWidget
                src={image3}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
};

export default ImageLayout;
