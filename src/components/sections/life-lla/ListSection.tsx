import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";

const ListSection = () => {
  return (
    <section className="w-full bg-white h-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-5 2xl:py-7 3xl:py-10">
      <ContainerWidget>
        <ScrollWidget animation="fadeDown" delay={0.1}>
          <div className="space-y-3.5 md:space-y-3 lg:space-y-5 text-left md:text-center lg:text-center xl:text-center">
              <h3 className="text-[30px] md:text-[35px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] 3xl:text-[64px] font-regular text-black font-urbanist">
                Life @ LLA
              </h3>
              <p className=" text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[40px] font-regular font-mulish 
              px-3 sm:px-30 md:px-35 lg:px-38 xl:px-40 2xl:px-40 3xl:px-40 text-black">
                Lorem ipsum dolor sit amet, consectetur  
                <span className="text-[#E97451]"> adipiscing elit, sed do eiusmod tempor</span>
              </p>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[16px] 3xl:text-[18px] font-regular text-black font-mulish
              px-3 sm:px-30 md:px-35 lg:px-35 xl:px-35 2xl:px-40 3xl:px-40">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                 do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation
                 ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
            </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default ListSection;
