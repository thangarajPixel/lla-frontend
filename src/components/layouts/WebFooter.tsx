import { FooterBg } from "@/helpers/ImageHelper";
import ContainerWidget from "../widgets/ContainerWidget";

const WebFooter = () => {
  const bgImageUrl =
    typeof FooterBg === "string" ? FooterBg : FooterBg?.src || FooterBg;

  return (
    <footer
      className="w-full bg-cover bg-center bg-no-repeat h-[1100px] bg-black"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <ContainerWidget>
        <div className="container mx-auto px-4 py-4 text-white">Footer</div>
      </ContainerWidget>
    </footer>
  );
};

export default WebFooter;
