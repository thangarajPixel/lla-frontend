import { RippleButton } from "../ui/ripple-button";
import type { ButtonWidgetProps } from "./utils/widget";

const ButtonWidget = ({ children, ...props }: ButtonWidgetProps) => {
  return <RippleButton {...props}>{children}</RippleButton>;
};

export default ButtonWidget;
