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
  <div className="px-6 py-6 bg-[#ECECEC] min-w-[300px] sm:min-w-[280px] m:min-w-[340px] xss:min-w-[380px] xs:min-w-[380px]  md:min-w-[180px] lg:min-w-[180px] xl:min-w-[200px] 2xl:min-w-[250px]  3xl:min-w-[300px] p-3 sm:p-4 lg:p-4 xl:p-5 3xl:p-6 hover:bg-white border hover:border-[#E97451] transition-all duration-300 cursor-pointer">
    <h4 className="text-base sm:text-lg md:text-xl lg:text-[18px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-mulish leading-tight mb-2 lg:mb-3 3xl:mb-4">
      {card.Title}
    </h4>
    <div
      className="relative w-full aspect-4/3 overflow-hidden mb-2 lg:mb-3 3xl:mb-4 
    s:w-[260px] s:h-[210px] m:w-[290px] m:h-[210px] xss:w-[330px] xss:h-[210px] xs:w-[330px] xs:h-[210px]
    sm:w-[250px] sm:h-[210px] md:w-[190px] md:h-[130px] lg:w-[180px] lg:h-[120px]
    xl:w-[150px] xl:h-[100px] 2xl:w-[210px] 2xl:h-[120px] 3xl:w-[252px] 3xl:h-[168.79px]"
    >
      <ImageWidget
        src={card.Image?.[0]?.url ? getS3Url(card.Image[0].url) : ""}
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
