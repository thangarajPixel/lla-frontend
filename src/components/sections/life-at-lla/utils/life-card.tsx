import ImageWidget from "@/components/widgets/ImageWidget";
import { getS3Url } from "@/helpers/ConstantHelper";

type LifeCardProps = {
  card: {
    id: number;
    Title: string;
    Description: string;
    Image?: Array<{
      url: string;
    }>;
  };
};

const LifeCard = ({ card }: LifeCardProps) => (
  <div className="px-6 py-6 bg-[#ECECEC] min-w-[320px] sm:min-w-[300px]  md:min-w-[200px] lg:min-w-[180px] xl:min-w-[200px] 2xl:min-w-[250px]  3xl:min-w-[300px] p-3 sm:p-4 lg:p-4 xl:p-5 3xl:p-6 hover:bg-white hover:border hover:border-[#E97451] transition-all duration-500 cursor-pointer">
    <h4 className="text-base sm:text-lg md:text-xl lg:text-[18px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-mulish leading-tight mb-2 lg:mb-3 3xl:mb-4">
      {card.Title}
    </h4>
    <div className="relative w-full aspect-4/3 overflow-hidden mb-2 lg:mb-3 3xl:mb-4">
      <ImageWidget
        src={getS3Url(card.Image?.[0]?.url) || ""}
        alt={card.Title}
        fill
        className="object-cover"
      />
    </div>
    <p className="text-sm sm:text-base md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[16px] 3xl:text-[18px] font-mulish font-regular text-black overflow-hidden ">
      {card.Description}
    </p>
  </div>
);

export default LifeCard;
