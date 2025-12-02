import ContainerWidget from "@/components/widgets/ContainerWidget";

const OverviewSection = () => {
  return (
    <ContainerWidget>
      <div className="flex flex-col h-[50vh] justify-start md:justify-center items-start md:items-center text-left md:text-center gap-2.5 md:gap-4.5">
        <h1 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
          Overview
        </h1>
        <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </ContainerWidget>
  );
};

export default OverviewSection;
