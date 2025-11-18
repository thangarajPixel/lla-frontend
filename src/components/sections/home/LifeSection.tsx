import { Life } from "@/helpers/ImageHelper";

const LifeSection = () => {
  return (
    <section
      className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Life.src})`,
      }}
    >
      LifeSection
    </section>
  );
};

export default LifeSection;
