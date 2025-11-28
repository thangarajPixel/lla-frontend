import { cn } from "@/lib/utils";
import ButtonWidget from "./ButtonWidget";
import type { OrangeButtonWidgetProps } from "./utils/widget";

const OrangeBorderButtonWidget = ({
  content,
  className,
  ...props
}: OrangeButtonWidgetProps) => {
  return (
    <ButtonWidget
      className={cn(
        "orange-button-white group rounded-[60px] px-5 h-10 text-xs 2xl:text-[14px] 3xl:text-[18px]",
        className,
      )}
      {...props}
    >
      {content}
    </ButtonWidget>
  );
};

export default OrangeBorderButtonWidget;
