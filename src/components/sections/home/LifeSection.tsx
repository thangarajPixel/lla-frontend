import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { Life } from "@/helpers/ImageHelper";

type LifeCardData = {
  id: number;
  title: string;
  description: string;
  image: typeof Life;
};

const lifeCardsData: LifeCardData[] = [
  {
    id: 1,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Life,
  },
  {
    id: 2,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Life,
  },
  {
    id: 3,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Life,
  },
  {
    id: 4,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Life,
  },
];

type LifeCardProps = {
  card: LifeCardData;
};

const LifeCard = ({ card }: LifeCardProps) => (
  <div className="bg-white/30 p-3 sm:p-4 lg:p-4 xl:p-5 3xl:p-6 hover:bg-white transition-all duration-300 cursor-pointer">
    <h4 className="text-base sm:text-lg md:text-xl lg:text-[18px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-urbanist leading-tight mb-2 lg:mb-3 3xl:mb-4">
      {card.title}
    </h4>
    <div className="relative w-full aspect-4/3 overflow-hidden mb-2 lg:mb-3 3xl:mb-4">
      <ImageWidget
        src={card.image}
        alt={card.title}
        fill
        className="object-cover"
      />
    </div>
    <p className="text-sm sm:text-base lg:text-[15px] 2xl:text-[16px] 3xl:text-[18px] font-normal text-black leading-normal">
      {card.description}
    </p>
  </div>
);

const LifeSection = () => {
  return (
    <section
      className="w-full min-h-[1000px] md:min-h-[700px] lg:min-h-[900px] xl:min-h-[1000px] 2xl:min-h-[1100px] 3xl:min-h-[1200px] bg-fixed bg-cover bg-left bg-no-repeat relative bg-[#ECECEC] py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28"
      style={{ backgroundImage: `url(${Life.src})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#ECECEC] via-transparent to-transparent" />

      <div className="relative z-10">
        <ContainerWidget>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-10">
            <div className="w-full md:w-auto md:min-w-[350px] lg:min-w-[400px] xl:min-w-[450px] 2xl:min-w-[500px] 3xl:min-w-[550px]">
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-7 3xl:gap-8">
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                  Life at LLA
                </h3>
                <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
                  Fostering a Holistic <br />
                  <span className="text-[#E97451]">Learning Experience</span>
                </p>
                <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                  By engaging with each other and the community around them,
                  <br className="hidden lg:block" />
                  students learn to create with intention, empathy, and vision.
                </p>
                <div className="self-start">
                  <OrangeButtonWidget content="View More" />
                </div>
              </div>
              <div className="flex justify-end items-end mt-8 sm:mt-10 md:mt-12 lg:mt-12 xl:mt-14 2xl:mt-16 3xl:mt-20">
                <div className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[220px] lg:max-w-[230px] xl:max-w-[240px] 2xl:max-w-[240px] 3xl:max-w-[280px] hidden md:block">
                  <LifeCard card={lifeCardsData[0]} />
                </div>
              </div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-7 3xl:gap-8">
              <div className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-7 3xl:space-y-8">
                {lifeCardsData.slice(0, 2).map((card) => (
                  <div
                    key={card.id}
                    className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[250px] 2xl:max-w-[260px] 3xl:max-w-[280px]"
                  >
                    <LifeCard card={card} />
                  </div>
                ))}
              </div>
              <div className="md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 3xl:mt-20 space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-7 3xl:space-y-8">
                {lifeCardsData.slice(2, 4).map((card) => (
                  <div
                    key={card.id}
                    className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[250px] 2xl:max-w-[260px] 3xl:max-w-[280px]"
                  >
                    <LifeCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Horizontal Scroll - Below md breakpoint */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide mt-6 sm:mt-8">
            <div className="flex gap-3 sm:gap-4">
              {lifeCardsData.map((card) => (
                <div
                  key={card.id}
                  className="shrink-0 w-[75vw] sm:w-[70vw] max-w-[200px] sm:max-w-[220px]"
                >
                  <LifeCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </ContainerWidget>
      </div>
    </section>
  );
};

export default LifeSection;
