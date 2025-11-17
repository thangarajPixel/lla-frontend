import { Facebook, FooterBg, FooterLogo, Instagram, IQAC, LinkedIn, LlaOnline, LlaOutreach, Location, Twitter } from "@/helpers/ImageHelper";
import ContainerWidget from "../widgets/ContainerWidget";
import ImageWidget from "../widgets/ImageWidget";
import LinkWidget from "../widgets/LinkWidget";
import OrangeButtonWidget from "../widgets/OrangeButtonWidget";

const WebFooter = () => {
  const bgImageUrl =
    typeof FooterBg === "string" ? FooterBg : FooterBg?.src || FooterBg;

  return (
    <footer
      className="w-full bg-cover bg-bottom bg-no-repeat h-[1085px] bg-black text-white py-22"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <ContainerWidget>
         <div className="flex flex-col items-start justify-start gap-5">
           <h6 className="lg:text-[50px] 3xl:text-[56px]  font-normal font-urbanist">Let Your Passion Shine Through</h6>
           <p className="text-[16px] lg:text-[14px] 3xl:text-[24px] font-normal max-w-[550px]">Step into a world where every click, every frame, and every flashlight is the path to your creative future.</p>
           <OrangeButtonWidget content="Capture Your Path" />
           <div className="border-b border-white opacity-30 w-full h-px mt-3"/>

           <div className="flex gap-5 py-3 pb-0">


             <div className="flex flex-col items-start justify-start gap-6">
               <ImageWidget src={FooterLogo} alt="Logo" className="w-65 h-auto" />
               <div className="flex flex-row items-start justify-start gap-6">
                <div className="flex flex-row gap-2">
                  <div>
                   <ImageWidget src={Location} alt="Location" className="w-7 h-6" />
                   </div>
                   <div>
                  <p className="text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal">
                  Light & Life Academy, 
                  </p>
                  <p className="text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal">
                  Lovedale, Ooty, 
                  </p>
                  <p className="text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal">
                  Tamil Nadu - 643 003.
                  </p>
                  </div>
                </div>
               </div>
               <ul className="flex items-center justify-start gap-6">
                <li><ImageWidget src={Facebook} alt="Facebook" className="w-7 h-6" /></li>
                <li><ImageWidget src={Twitter} alt="Twitter" className="w-7 h-6" /></li>
                <li><ImageWidget src={Instagram} alt="Instagram" className="w-7 h-6" /></li>
                <li><ImageWidget src={LinkedIn} alt="LinkedIn" className="w-7 h-6" /></li>
               </ul>
             </div>




             <div className="flex flex-col items-start justify-start gap-3 min-w-[250px]">
               <h6 className="text-[20px] 3xl:text-[24px] font-normal font-urbanist">Quick Links</h6>
               <ul className="flex flex-col items-start justify-start gap-2 text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                <li><LinkWidget href="/">Home</LinkWidget></li>
                <li><LinkWidget href="/">About LLA</LinkWidget></li>
                <li><LinkWidget href="/">Campus</LinkWidget></li>
                <li><LinkWidget href="/">Faculty</LinkWidget></li>
                <li><LinkWidget href="/">Gallery</LinkWidget></li>
                <li><LinkWidget href="/">Contact Us</LinkWidget></li>
               </ul>
             </div>



             <div className="flex flex-col items-start justify-start gap-3">
               <h6 className="text-[20px] 3xl:text-[24px] font-normal font-urbanist">Courses</h6>
               <ul className="flex flex-col items-start justify-start gap-2 text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                <li className="max-w-[250px]">
                  <LinkWidget href="/">
                    PG Diploma in Professional Photography & Digital Production
                   </LinkWidget>
                </li>
                <li className="max-w-[250px]">
                  <LinkWidget href="/">
                  PG Diploma in Documentary & Corporate Filmmaking
                   </LinkWidget>
                </li>
               </ul>
             </div>



             <div className="flex flex-col items-start justify-start gap-3">
               <h6 className="text-[20px] 3xl:text-[24px] font-normal font-urbanist">Resources</h6>
               <ul className="flex flex-col items-start justify-start gap-2 text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal leading-7">
                <li><LinkWidget href="/">Blog</LinkWidget></li>
                <li><LinkWidget href="/">FAQ's</LinkWidget></li>
               </ul>
             </div>


           </div>
           <div className="border-b border-white opacity-30 w-full h-px mt-3"/>

           <div className="flex flex-row items-center justify-start gap-23 py-3">
           <ImageWidget src={LlaOutreach} alt="LlaOutreach" className="w-60 h-auto" />
           <ImageWidget src={IQAC} alt="IQAC" className="w-30 h-auto" />
            <ImageWidget src={LlaOnline} alt="LlaOnline" className="w-50 h-auto" />
           </div>
           <p className="text-[16px] lg:text-[14px] 3xl:text-[18px] font-normal max-w-[350px]">© 2025 Light & Life Academy, Premier College for Professional Photography in India.All rights reserved.</p>
         </div>
      </ContainerWidget>
    </footer>
  );
};

export default WebFooter;
