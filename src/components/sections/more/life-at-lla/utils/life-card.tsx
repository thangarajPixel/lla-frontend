import Link from "next/link";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import { getS3Url } from "@/helpers/ConstantHelper";

type LifeCardProps = {
  card: {
    id: number;
    Title: string;
    Slug: string;
    Description: string;
    Image?: Array<{
      url: string;
    }>;
  };
};

const LifeCard = ({ card }: LifeCardProps) => (
  <Link href={`/life-at-lla/${card.Slug}`} className="block w-full">
    <div className="w-full h-full bg-[#ECECEC] hover:bg-white border hover:border-[#E97451] transition-all duration-300 cursor-pointer p-3 sm:p-4 lg:p-4 xl:p-5 3xl:p-6">
      <h4 className="text-base sm:text-lg md:text-xl lg:text-[18px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-mulish leading-tight mb-2 lg:mb-3 3xl:mb-4">
        {card.Title}
      </h4>
      {(card.Image?.[0]?.url) && (
        <div className="relative w-full aspect-4/3 overflow-hidden mb-2 lg:mb-3 3xl:mb-4">
          <ImageWidget
            src={getS3Url(card.Image?.[0]?.url || "")}
            alt={card.Title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <HTMLWidget
        content={card.Description}
        className="text-sm sm:text-base md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[16px] 3xl:text-[18px] font-mulish font-regular text-black overflow-hidden line-clamp-2"
        tag="p"
      />
    </div>
  </Link>
);

export default LifeCard;
