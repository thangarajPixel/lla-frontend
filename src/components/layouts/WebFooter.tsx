import {
  Facebook,
  FooterBg,
  FooterLogo,
  Instagram,
  IQAC,
  LinkedIn,
  LlaOnline,
  LlaOutreach,
  Location,
  Twitter,
} from "@/helpers/ImageHelper";
import ContainerWidget from "../widgets/ContainerWidget";
import ImageWidget from "../widgets/ImageWidget";
import LinkWidget from "../widgets/LinkWidget";
import OrangeButtonWidget from "../widgets/OrangeButtonWidget";

const WebFooter = () => {
  return (
    <footer
      className="w-full bg-cover bg-bottom bg-no-repeat min-h-[1070px] bg-black text-white py-8 md:py-12 lg:py-22"
      style={{
        backgroundImage: `url(${FooterBg?.src})`,
      }}
    >
      <ContainerWidget>
        <div className="flex flex-col items-start justify-start gap-5 md:gap-6">
          <h6 className="text-[32px] md:text-[40px] lg:text-[50px] 3xl:text-[56px] font-normal font-urbanist leading-10">
            Let Your Passion Shine Through
          </h6>
          <p className="text-[16px] md:text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal max-w-full md:max-w-[550px]">
            Step into a world where every click, every frame, and every
            flashlight is the path to your creative future.
          </p>
          <OrangeButtonWidget content="Capture Your Path" />
          <div className="border-b border-white opacity-30 w-full h-px mt-3" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-5 py-3 pb-0 w-full">
            <div className="flex flex-col items-start justify-start gap-6 w-full md:w-auto">
              <ImageWidget
                src={FooterLogo}
                alt="Logo"
                className="w-65 h-auto"
              />
              <div className="flex flex-row items-start justify-start gap-6">
                <div className="flex flex-row gap-2">
                  <div>
                    <ImageWidget
                      src={Location}
                      alt="Location"
                      className="w-6 h-5 md:w-7 md:h-6"
                    />
                  </div>
                  <div>
                    <p className="text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal">
                      Light & Life Academy,
                    </p>
                    <p className="text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal">
                      Lovedale, Ooty,
                    </p>
                    <p className="text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal">
                      Tamil Nadu - 643 003.
                    </p>
                  </div>
                </div>
              </div>
              <ul className="flex items-center justify-start gap-4 md:gap-6">
                <li>
                  <LinkWidget href="https://www.facebook.com/lightandlifeacademy" target="_blank">
                  <ImageWidget
                    src={Facebook}
                    alt="Facebook"
                    className="w-6 h-5 md:w-7 md:h-6"
                  />
                  </LinkWidget>
                </li>
                <li>
                  <LinkWidget href="https://www.twitter.com/lightandlifeacademy" target="_blank">
                  <ImageWidget
                    src={Twitter}
                    alt="Twitter"
                    className="w-6 h-5 md:w-7 md:h-6"
                  />
                  </LinkWidget>
                </li>
                <li>
                  <LinkWidget href="https://www.instagram.com/lightandlifeacademy" target="_blank">
                  <ImageWidget
                    src={Instagram}
                    alt="Instagram"
                    className="w-6 h-5 md:w-7 md:h-6"
                  />
                  </LinkWidget>
                </li>
                <li>
                  <LinkWidget href="https://www.linkedin.com/company/lightandlifeacademy" target="_blank">
                  <ImageWidget
                    src={LinkedIn}
                    alt="LinkedIn"
                    className="w-6 h-5 md:w-7 md:h-6"
                  />
                  </LinkWidget>
                </li>
              </ul>
            </div>
            <div className="block md:hidden border-b border-white opacity-30 w-full h-px mt-3" />
            <div className="flex flex-row md:hidden gap-6 w-full">
              <div className="flex flex-col items-start justify-start gap-3 flex-1">
                <h6 className="text-[18px] md:text-[20px] 3xl:text-[24px] font-normal font-urbanist">
                  Quick Links
                </h6>
                <ul className="flex flex-col items-start justify-start gap-2 text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                  <li>
                    <LinkWidget href="/">Home</LinkWidget>
                  </li>
                  <li>
                    <LinkWidget href="/">About LLA</LinkWidget>
                  </li>
                  <li>
                    <LinkWidget href="/">Campus</LinkWidget>
                  </li>
                  <li>
                    <LinkWidget href="/">Faculty</LinkWidget>
                  </li>
                  <li>
                    <LinkWidget href="/">Gallery</LinkWidget>
                  </li>
                  <li>
                    <LinkWidget href="/">Contact Us</LinkWidget>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-start justify-start gap-3 flex-1">
                <h6 className="text-[18px] md:text-[20px] 3xl:text-[24px] font-normal font-urbanist">
                  Courses
                </h6>
                <ul className="flex flex-col items-start justify-start gap-2 text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                  <li className="max-w-full md:max-w-[250px]">
                    <LinkWidget href="/">
                      PG Diploma in Professional Photography & Digital Production
                    </LinkWidget>
                  </li>
                  <li className="max-w-full md:max-w-[250px]">
                    <LinkWidget href="/">
                      PG Diploma in Documentary & Corporate Filmmaking
                    </LinkWidget>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-start justify-start gap-3 md:min-w-[250px]">
              <h6 className="text-[18px] md:text-[20px] 3xl:text-[24px] font-normal font-urbanist">
                Quick Links
              </h6>
              <ul className="flex flex-col items-start justify-start gap-2 text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                <li>
                  <LinkWidget href="/">Home</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/">About LLA</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/">Campus</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/">Faculty</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/">Gallery</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/">Contact Us</LinkWidget>
                </li>
              </ul>
            </div>

            <div className="hidden md:flex flex-col items-start justify-start gap-3">
              <h6 className="text-[18px] md:text-[20px] 3xl:text-[24px] font-normal font-urbanist">
                Courses
              </h6>
              <ul className="flex flex-col items-start justify-start gap-2 text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                <li className="max-w-full md:max-w-[250px]">
                  <LinkWidget href="/">
                    PG Diploma in Professional Photography & Digital Production
                  </LinkWidget>
                </li>
                <li className="max-w-full md:max-w-[250px]">
                  <LinkWidget href="/">
                    PG Diploma in Documentary & Corporate Filmmaking
                  </LinkWidget>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start justify-start gap-3 w-full md:w-auto">
              <h6 className="text-[18px] md:text-[20px] 3xl:text-[24px] font-normal font-urbanist">
                Resources
              </h6>
              <ul className="flex flex-col items-start justify-start gap-2 text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                <li>
                  <LinkWidget href="/">Blog</LinkWidget>
                </li>
                <li>
                  <LinkWidget href="/">FAQ's</LinkWidget>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-b border-white opacity-30 w-full h-px mt-3" />

          <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-center sm:justify-start gap-4 sm:gap-6 md:gap-23 py-3 pb-1 w-full">
            <ImageWidget
              src={LlaOutreach}
              alt="LlaOutreach"
              className="w-40 md:w-60 h-auto"
            />
            <ImageWidget 
              src={IQAC} 
              alt="IQAC" 
              className="w-24 md:w-30 h-auto" 
            />
            <div className="w-full sm:hidden flex justify-center">
              <ImageWidget
                src={LlaOnline}
                alt="LlaOnline"
                className="w-36 md:w-50 h-auto"
              />
            </div>
            <ImageWidget
              src={LlaOnline}
              alt="LlaOnline"
              className="hidden sm:block w-36 md:w-50 h-auto"
            />
          </div>
          <div className="block md:hidden border-b border-white opacity-30 w-full h-px mt-3" />
          <p className="text-center md:text-left text-[16px] md:text-[14px] lg:text-[14px] 3xl:text-[18px] font-normal max-w-full md:max-w-[350px]">
            © {new Date().getFullYear()} Light & Life Academy, Premier College for Professional
            Photography in India.All rights reserved.
          </p>
        </div>
      </ContainerWidget>
    </footer>
  );
};

export default WebFooter;
