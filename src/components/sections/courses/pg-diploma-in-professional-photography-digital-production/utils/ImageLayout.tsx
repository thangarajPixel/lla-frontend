import ImageWidget from "@/components/widgets/ImageWidget";
import { Dummy1 } from "@/helpers/ImageHelper";

interface ImageLayoutProps {
  type: number;
}

interface MobileImageLayoutProps {
  numberOfImages: 2 | 3;
  breakpoint: "md" | "lg";
}

const MobileImageLayout = ({
  numberOfImages,
  breakpoint,
}: MobileImageLayoutProps) => {
  return (
    <div className={`flex flex-row gap-4 ${breakpoint}:hidden`}>
      <div className="relative w-full aspect-231/347 max-w-full mx-auto">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWidget
            src={Dummy1}
            alt="Course Content"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative w-full aspect-480/282 max-w-full mx-auto">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWidget
            src={Dummy1}
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
              src={Dummy1}
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

const ImageLayout = ({ type }: ImageLayoutProps) => {
  switch (type) {
    case 1:
      return (
        <>
          <MobileImageLayout numberOfImages={2} breakpoint="md" />
          <div className="hidden md:block relative w-full">
            <div className="absolute top-0 right-10 w-full aspect-231/347 max-w-[231px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[217px] left-0 w-full aspect-480/282 max-w-[480px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <MobileImageLayout numberOfImages={3} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-0 w-full aspect-445/282 max-w-[275px] xl:max-w-[305px] 2xl:max-w-[340px] 3xl:max-w-[445px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-28 3xl:top-34 right-0 w-full aspect-252/380 max-w-[200px] 3xl:max-w-[252px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[365px] 3xl:top-[455px] left-[29px] w-96 aspect-398/265 max-w-[240px] xl:max-w-[258px] 2xl:max-w-[300px] 3xl:max-w-[398px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <MobileImageLayout numberOfImages={2} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[220px] 2xl:max-w-[300px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[270px] 2xl:max-w-[310px] 3xl:max-w-[400px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case 4:
      return (
        <>
          <MobileImageLayout numberOfImages={3} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-0 w-full aspect-300/204 max-w-45 xl:max-w-[190px] 2xl:max-w-[220px] 3xl:max-w-[300px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-21 2xl:top-28 3xl:top-36 left-[75px] 2xl:left-[90px] 3xl:left-[110px] w-full aspect-370/272 max-w-[230px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[370px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[185px] 2xl:top-[220px] 3xl:top-[305px] left-0 w-96 aspect-190/286 max-w-[140px] xl:max-w-[150px] 2xl:max-w-[165px] 3xl:max-w-[190px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    case 5:
      return (
        <>
          <MobileImageLayout numberOfImages={3} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-[125px] 3xl:left-[185px] w-full aspect-300/203 max-w-45 xl:max-w-[190px] 2xl:max-w-[260px] 3xl:max-w-[300px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-21 2xl:top-28 3xl:top-36 left-0 w-full aspect-268/351 max-w-[190px] 2xl:max-w-[238px] 3xl:max-w-[268px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[150px] 2xl:top-[195px] 3xl:top-[229px] left-[165px] 2xl:left-[220px] 3xl:left-[244px] w-full aspect-236/323 max-w-[140px] xl:max-w-[150px] 2xl:max-w-[165px] 3xl:max-w-[236px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      );

    case 6:
      return (
        <>
          <MobileImageLayout numberOfImages={2} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[220px] 2xl:max-w-[300px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[270px] 2xl:max-w-[310px] 3xl:max-w-[400px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case 7:
      return (
        <>
          <MobileImageLayout numberOfImages={2} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-[81px] w-full aspect-387/269 max-w-60 2xl:max-w-[310px] 3xl:max-w-[387px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[110px] 2xl:top-[135px] 3xl:top-[175px] w-full aspect-381/254 max-w-[270px] 2xl:max-w-[321px] 3xl:max-w-[381px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case 8:
      return (
        <>
          <MobileImageLayout numberOfImages={2} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-[140px] xl:left-[151px] 2xl:left-[200px] 3xl:left-[231px] w-full aspect-249/374 max-w-[169px] 2xl:max-w-[199px] 3xl:max-w-[249px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[135px] 3xl:top-[186px] w-full aspect-356/246 max-w-[250px] 2xl:max-w-[291px] 3xl:max-w-[356px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWidget
                  src={Dummy1}
                  alt="Course Content"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </>
      );

    case 9:
      return (
        <>
          <MobileImageLayout numberOfImages={3} breakpoint="lg" />
          <div className="hidden lg:block relative w-full">
            <div className="absolute top-0 left-[155px] 3xl:left-[216px] w-full aspect-264/175 max-w-45 xl:max-w-[190px] 2xl:max-w-[220px] 3xl:max-w-[264px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-21 2xl:top-[65px] 3xl:top-[72px] left-0 w-full aspect-282/188 max-w-[190px] 2xl:max-w-[248px] 3xl:max-w-[282px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
                alt="Course Content"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[150px] 2xl:top-[195px] 3xl:top-[209px] left-[165px] 2xl:left-[100px] 3xl:left-[110px] w-full aspect-300/228 max-w-[140px] xl:max-w-[150px] 2xl:max-w-60 3xl:max-w-[300px] overflow-hidden">
              <ImageWidget
                src={Dummy1}
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
