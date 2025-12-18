import { ArrowRight } from "@/helpers/ImageHelper";
import { cn } from "@/lib/utils";
import ButtonWidget from "./ButtonWidget";
import ImageWidget from "./ImageWidget";
import type {
  ButtonWidgetProps,
  OrangeButtonWidgetProps,
} from "./utils/widget";

const OrangeButtonWidget = ({
  content,
  className,
  ...props
}: OrangeButtonWidgetProps) => {
  return (
    <ButtonWidget
      className={cn(
        "orange-button group rounded-[60px] px-5 h-10 sm:h-10 xss:text-[16px] xss:h-[48px] 3xl:h-[50px] text-xs 2xl:text-[14px] 3xl:text-[18px]",
        className,
      )}
      {...(props as ButtonWidgetProps)}
    >
      {content}
      <ImageWidget
        src={ArrowRight}
        alt="Arrow Right"
        className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1"
      />
    </ButtonWidget>
  );
};

export default OrangeButtonWidget;
