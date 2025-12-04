"use client";

import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Dummy10 } from "@/helpers/ImageHelper";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";

type LifeDetailProps = {
  data: {
    id: number;
    Title: string;
    Description: string;
    Image?: Array<{
      url: string;
    }>;
  };
};

const LifeDetailSection = ({ data }: LifeDetailProps) => {
  const latestPosts = [
    {
      id: 1,
      title: "Everyday Icons - Winter Through The Lens",
      image: Dummy10,
      date: "NOVEMBER 18, 2025"
    },
    {
      id: 2,
      title: "Photography and Psychology: Decoding the Visual Language",
      image: Dummy10,
      date: "NOVEMBER 15, 2025"
    },
    {
      id: 3,
      title: "Is Motion a Hallmark",
      image: Dummy10,
      date: "NOVEMBER 12, 2025"
    }
  ];

  return (
    <section className="w-full bg-white min-h-screen py-8 sm:py-10 md:py-12 lg:py-16 xl:py-10 2xl:py-14 3xl:py-18">
      <ContainerWidget>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 3xl:gap-38">
          <div className="flex-1 max-w-[850px]">
            <ScrollWidget animation="fadeDown" delay={0.1}>
              <div className="flex flex-col">
               <p className="text-sm md:text-base text-gray-500 font-mulish mb-8">
                  December 18, 2025
                </p>
                <p className="mb-1 text-[32px] sm:text-[34px] md:text-[34px] lg:text-[38px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px] font-normal text-black font-urbanist leading-tight">
                  {data.Title}
                </p>
                <p className="mb-6 text-[32px] sm:text-[34px] md:text-[34px] lg:text-[38px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px] font-normal text-black font-urbanist leading-tight">
                 A Comprehensive Guide
                </p>
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                
                <p className="text-[16px] md:text-[18px] text-black leading-relaxed font-mulish">
                  {data.Description}
                </p>
                {data.Image?.[0]?.url && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <ImageWidget
                      src={Dummy10.src}
                      alt={data.Title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl lg:text-[36px] font-normal text-black font-urbanist">
                    Identifying the Purpose of the Exhibition
                  </h3>
                  <p className="text-base md:text-lg text-black leading-relaxed font-mulish">
                    Before embarking on the journey of organizing a photography exhibition, it's essential to clarify the
                    purpose and objectives behind it. Are you aiming to showcase a particular project or series of works?
                    Do you want to raise awareness about a social issue or share a personal story through your
                    photographs? Understanding the purpose of the exhibition will guide your decision-making process
                    and help you communicate the significance of your work to potential viewers and collaborators.
                  </p>
                </div>
                <div className="relative w-full aspect-video overflow-hidden">
                  <ImageWidget
                    src={Dummy10.src}
                    alt="Exhibition preparation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl lg:text-[36px] font-normal text-black font-urbanist">
                    Selecting and Curating Your Work
                  </h3>
                  <p className="text-base md:text-lg text-black leading-relaxed font-mulish">
                    Once you've identified the purpose, carefully select and curate the images you want to showcase.
                    Consider the theme or concept of your exhibition and choose photographs that best represent your
                    vision and style. Aim for a cohesive body of work that tells a story or evokes a particular emotion. Take
                    into account factors such as composition, colour palette, and narrative flow when curating your
                    images. If the process becomes overwhelming to handle on your own, consider hiring professional
                    curators. Their seasoned perspective will be invaluable, helping you choose the right body of work.
                  </p>
                </div>
              </div>
            </ScrollWidget>
          </div>
          <aside className="w-full lg:w-[260px] xl:w-[260px] 2xl:w-[280px] 3xl:w-[300px]">
            <ScrollWidget animation="fadeIn" delay={0.2}>
              <div className="sticky top-8">
                <h3 className="text-[32px] ledding-[40px] font-normal text-black font-urbanist mb-6">
                  Latest Life at LLA
                </h3>
                <div className="flex flex-col gap-6">
                  {latestPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="group"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="relative w-full aspect-video overflow-hidden">
                          <ImageWidget
                             src="https://dev-admin.lightandlifeacademy.in/uploads/Rectangle_47_0aac331598.png"
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-[16px] md:text-lg font-semibold text-black font-mulish">
                          {post.title}
                        </h4>
                        <div className="mt-2">
                          <OrangeButtonWidget 
                            content="Read More"
                            onClick={() => window.location.href = `/more/life-at-lla/${post.id}`}
                            className="text-sm bg-white text-[#E97451] border border-[#E97451] hover:bg-[#E97451] hover:text-white"
                          /> 
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollWidget>
          </aside>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default LifeDetailSection;
