import { X } from "lucide-react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import { PrivacyPolicyProps } from "./utils/privacy-policy";
import HTMLWidget from "@/components/widgets/HTMLWidget";

const PrivacyPolicySection = ({ data }: PrivacyPolicyProps) => {
  return (
    <section className="relative w-full bg-white py-10 md:py-10">
      <ContainerWidget>
        <div className="max-w-full">
          <h1 className="font-urbanist font-regular text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] 3xl:text-[48px] text-black mb-6">
           {data.Title}
          </h1>
          <div className="mb-10">
            <h2 className="font-mulish font-normal text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] 3xl:text-[32px]  text-black mb-4">
             {data.SubTitle}
            </h2>
             <HTMLWidget
              content={data.Description}
              className="text-[16px] md:text-[14px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-relaxed"
              tag="p"
              />
          </div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-semibold text-black">
                    Personal Information:
                  </span>
                  <span className="text-black">
                    {" "}
                    Your name, contact details (email, phone number, address),
                    and other details provided during the application process.
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-semibold text-black">
                    Payment Information:
                  </span>
                  <span className="text-black">
                    {" "}
                    Payment details submitted for processing your application
                    fee via secure payment gateways.
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-semibold text-black">
                    Device and Log Information:
                  </span>
                  <span className="text-black">
                    {" "}
                    Non-personal data such as IP address, browser type, and
                    usage patterns for website performance and security.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
              How We Use Your Information
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-black">
                  To process your application and communicate with you about the
                  admission process.
                </p>
              </div>
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-black">
                  To securely manage payment transactions for application fees.
                </p>
              </div>
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-black">
                  To send notifications regarding updates to our courses or
                  admissions process.
                </p>
              </div>
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-black">
                  To analyze website usage for improving user experience.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
              Data Security
            </h2>
            <p className="text-base text-black leading-relaxed">
              We employ industry-standard security measures to protect your
              personal and payment information from unauthorized access,
              alteration, or misuse. All payment transactions are conducted
              through trusted third-party payment gateways using encryption
              protocols.
            </p>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
              Sharing of Information
            </h2>
            <p className="text-base text-black leading-relaxed mb-4">
              We do not share your personal information with third parties
              except:
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-black">
                  To comply with legal obligations or regulatory requirements.
                </p>
              </div>
              <div className="flex gap-3">
                <X className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-black">
                  With secure service providers assisting in managing the
                  application and payment process.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
              Cookies
            </h2>
            <p className="text-base text-black leading-relaxed">
              Our website may use cookies to enhance your experience and monitor
              website performance. You can adjust your browser settings to
              disable cookies if preferred.
            </p>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
              Contact Us
            </h2>
            <p className="text-base text-black leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="space-y-2 text-black">
              <p>Email: admission@llacademy.org</p>
              <p>Phone: +91 7508287370</p>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-sm text-black leading-relaxed">
              By submitting your application and fees, you agree to the terms of
              this Privacy Policy. We reserve the right to update this policy as
              needed, with changes posted on our website.
            </p>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default PrivacyPolicySection;
