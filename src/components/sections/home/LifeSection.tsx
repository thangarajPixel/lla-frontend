import { Life } from "@/helpers/ImageHelper";

const LifeSection = () => {
  return (
    <section
      className="w-full h-[1100px] flex items-center justify-center bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Life.src})`,
      }}
    >
      LifeSection
    </section>
  );
};

export default LifeSection;
