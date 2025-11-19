"use client";

import { X } from "lucide-react";
import DialogZoomInWrapper from "@/components/widgets/DialogZoomInWrapper";
import { ArrowRight, Dummy1, Dummy2, Into } from "@/helpers/ImageHelper";
import { DialogClose } from "@/components/ui/dialog";
import ButtonWidget from "../../widgets/ButtonWidget";
import ImageWidget from "../../widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";

type AdmissionButtonProps = {
  className?: string;
  iconClassName?: string;
};

const AdmissionButton = ({
  className = "",
  iconClassName = "",
}: AdmissionButtonProps) => {
  return (
    <DialogZoomInWrapper
      trigger={
        <ButtonWidget
          className={`orange-button group rounded-[60px] px-5 h-10 text-[14px] 2xl:text-[14px] 3xl:text-[18px] ${className}`}
        >
          Admission Open
          <ImageWidget
            src={ArrowRight}
            alt="Arrow Right"
            className={`lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1 ${iconClassName}`}
          />
        </ButtonWidget>
      }
      contentClassName="sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] p-4 sm:p-6 lg:p-6"
      showCancel={false}
      showCloseButton={false}
      customCloseButton={
        <DialogClose asChild>
          <div className="cursor-pointer -mt-[30px] -mr-[30px]">
            <ImageWidget src={Into} alt="Into" className="w-[30px] h-[30px]" />
          </div>
        </DialogClose>
      }
    >
      <div className="flex flex-col md:flex-row gap-5 h-[400px] overflow-y-auto md:h-auto">
        <div className="flex-1 flex flex-col gap-3 sm:gap-4">
          <div className="relative w-full overflow-hidden">
            <ImageWidget
              src={Dummy1}
              alt="Dummy 1"
              className="w-full h-auto object-cover"
            />
          </div>
          <h3 className="text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[24px] 3xl:text-[40px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight">
            PG Diploma in Professional Photography & Digital Production
          </h3>
          <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>
          <div className="self-start">
            <OrangeButtonWidget content="Apply now" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3 sm:gap-4">
          <div className="relative w-full overflow-hidden">
            <ImageWidget
              src={Dummy2}
              alt="Dummy 2"
              className="w-full h-auto object-cover"
            />
          </div>
          <h3 className="text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[24px] 3xl:text-[40px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight">
            PG Diploma in Documentary & Corporate Filmmaking
          </h3>
          <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
          <div className="self-start">
            <OrangeButtonWidget content="Apply now" />
          </div>
        </div>
      </div>
    </DialogZoomInWrapper>
  );
};

export default AdmissionButton;
