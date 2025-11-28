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

const SOCIAL_LINKS = [
  {
    id: "facebook",
    href: "https://www.facebook.com/lightandlifeacademy",
    icon: Facebook,
    alt: "Facebook",
  },
  {
    id: "twitter",
    href: "https://www.twitter.com/lightandlifeacademy",
    icon: Twitter,
    alt: "Twitter",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/lightandlifeacademy",
    icon: Instagram,
    alt: "Instagram",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/company/lightandlifeacademy",
    icon: LinkedIn,
    alt: "LinkedIn",
  },
];

const QUICK_LINKS = [
  { id: "home", href: "/", label: "Home" },
  { id: "about", href: "/", label: "About LLA" },
  { id: "campus", href: "/", label: "Campus" },
  { id: "faculty", href: "/", label: "Faculty" },
  { id: "gallery", href: "/", label: "Gallery" },
  { id: "contact", href: "/", label: "Contact Us" },
];

const COURSES = [
  {
    id: "photography-diploma",
    href: "/",
    label: "PG Diploma in Professional Photography & Digital Production",
  },
  {
    id: "filmmaking-diploma",
    href: "/",
    label: "PG Diploma in Documentary & Corporate Filmmaking",
  },
];

const RESOURCES = [
  { id: "blog", href: "/", label: "Blog" },
  { id: "faq", href: "/", label: "FAQ's" },
];

const ADDRESS_LINES = [
  { id: "address-line-1", text: "Light & Life Academy," },
  { id: "address-line-2", text: "Lovedale, Ooty," },
  { id: "address-line-3", text: "Tamil Nadu - 643 003." },
];

const linkTextClass =
  "text-[16px] md:text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal";
const sectionTitleClass =
  "text-[18px] md:text-[20px] 3xl:text-[24px] font-normal font-urbanist";
const dividerClass = "border-b border-white opacity-30 w-full h-px mt-3";

const FooterSection = ({
  title,
  links,
  className = "",
}: {
  title: string;
  links: Array<{ id: string; href: string; label: string }>;
  className?: string;
}) => (
  <div className={`flex flex-col items-start justify-start gap-3 ${className}`}>
    <h6 className={sectionTitleClass}>{title}</h6>
    <ul
      className={`flex flex-col items-start justify-start gap-2 ${linkTextClass} leading-7`}
    >
      {links.map((link) => (
        <li
          key={link.id}
          className={
            link.label.includes("Diploma") ? "max-w-full md:max-w-[250px]" : ""
          }
        >
          <LinkWidget
            href={link.href}
            className="hover:text-[#E97451] transition-colors duration-300"
          >
            {link.label}
          </LinkWidget>
        </li>
      ))}
    </ul>
  </div>
);

const WebFooter = () => {
  return (
    <footer
      className="relative z-50  w-full bg-cover bg-bottom bg-no-repeat min-h-[1950px] md:min-h-[1070px] bg-black text-white py-8 md:py-12 lg:py-22"
      style={{ backgroundImage: `url(${FooterBg?.src})` }}
    >
      <ContainerWidget>
        <div className="flex flex-col items-start justify-start gap-5 md:gap-6">
          <h6 className="text-[32px] md:text-[40px] lg:text-[50px] 3xl:text-[56px] font-normal font-urbanist leading-10">
            Let Your Passion Shine Through
          </h6>
          <p className={`${linkTextClass} max-w-full md:max-w-[550px]`}>
            Step into a world where every click, every frame, and every
            flashlight is the path to your creative future.
          </p>
          <OrangeButtonWidget content="Capture Your Path" />
          <div className={dividerClass} />

          <div className="flex flex-col md:flex-row gap-8 md:gap-5 py-3 pb-0 w-full">
            <div className="flex flex-col items-start justify-start gap-6 w-full md:w-auto">
              <ImageWidget
                src={FooterLogo}
                alt="Logo"
                className="w-65 h-auto"
              />

              <div className="flex flex-row items-start justify-start gap-6">
                <div className="flex flex-row gap-2">
                  <ImageWidget
                    src={Location}
                    alt="Location"
                    className="w-6 h-5 md:w-7 md:h-6"
                  />
                  <div>
                    {ADDRESS_LINES.map((addressLine) => (
                      <p key={addressLine.id} className={linkTextClass}>
                        {addressLine.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="flex items-center justify-start gap-4 md:gap-6">
                {SOCIAL_LINKS.map((socialLink) => (
                  <li key={socialLink.id}>
                    <LinkWidget
                      href={socialLink.href}
                      target="_blank"
                      className="hover:opacity-70 transition-opacity duration-300"
                    >
                      <ImageWidget
                        src={socialLink.icon}
                        alt={socialLink.alt}
                        className="w-6 h-5 md:w-7 md:h-6"
                      />
                    </LinkWidget>
                  </li>
                ))}
              </ul>
            </div>

            <div className="block md:hidden">
              <div className={dividerClass} />
              <div className="flex flex-row gap-6 w-full mt-7">
                <FooterSection
                  title="Quick Links"
                  links={QUICK_LINKS}
                  className="flex-1"
                />
                <FooterSection
                  title="Courses"
                  links={COURSES}
                  className="flex-1"
                />
              </div>
            </div>

            <FooterSection
              title="Quick Links"
              links={QUICK_LINKS}
              className="hidden md:flex md:min-w-[250px]"
            />
            <FooterSection
              title="Courses"
              links={COURSES}
              className="hidden md:flex"
            />
            <FooterSection
              title="Resources"
              links={RESOURCES}
              className="w-full md:w-auto"
            />
          </div>

          <div className={dividerClass} />

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

          <div className="block md:hidden">
            <div className={dividerClass} />
          </div>

          <p
            className={`text-center md:text-left ${linkTextClass} max-w-full md:max-w-[350px]`}
          >
            © {new Date().getFullYear()} Light & Life Academy, Premier College
            for Professional Photography in India. All rights reserved.
          </p>
        </div>
      </ContainerWidget>
    </footer>
  );
};

export default WebFooter;
