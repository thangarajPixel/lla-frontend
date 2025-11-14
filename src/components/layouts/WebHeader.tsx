import { ArrowRight, Logo } from "@/helpers/ImageHelper";
import ButtonWidget from "../widgets/ButtonWidget";
import ContainerWidget from "../widgets/ContainerWidget";
import ImageWidget from "../widgets/ImageWidget";
import LinkWidget from "../widgets/LinkWidget";

const WebHeader = () => {
  return (
    <header className="w-full bg-black text-white">
      <nav>
        <ContainerWidget>
          <div className="flex items-center justify-between">
            <div>
              <LinkWidget href="/">
                <ImageWidget
                  src={Logo}
                  alt="Logo"
                  className="3xl:w-[348px] 3xl:h-[69px]"
                />
              </LinkWidget>
            </div>
            <div>
              <ul className="flex items-center gap-12 text-xs 2xl:text-[14px] 3xl:text-[18px]">
                <li>
                  <LinkWidget href="/about-us">About us</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/courses">Courses</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/campus">Campus</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/faculty">Faculty</LinkWidget>
                </li>
                <li>
                  <ButtonWidget className="orange-button group rounded-[60px] px-5 py-2 text-xs 2xl:text-[14px] 3xl:text-[18px]">
                    Admission Open
                    <ImageWidget
                      src={ArrowRight}
                      alt="Arrow Right"
                      className="lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </ButtonWidget>
                </li>
              </ul>
            </div>
          </div>
        </ContainerWidget>
      </nav>
    </header>
  );
};

export default WebHeader;
