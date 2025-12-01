import AccordionWidget from "@/components/widgets/AccordionWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";

const FaqSection = () => {
  const items = [
    {
      value: "item-1",
      title: "Evaluation",
      content:
        "The course will be evaluated through a combination of written assignments, practical projects, and presentations. The evaluation will be based on the student's ability to apply the theoretical knowledge to real-world scenarios and the quality of the final projects.",
    },
    {
      value: "item-2",
      title: "Facilities",
      content:
        "The course will be evaluated through a combination of written assignments, practical projects, and presentations. The evaluation will be based on the student's ability to apply the theoretical knowledge to real-world scenarios and the quality of the final projects.",
    },
    {
      value: "item-3",
      title: "Career Prospects",
      content:
        "The course will prepare students for a variety of career opportunities in the field of photography and digital production. Graduates may find employment in advertising agencies, media production companies, photojournalism, fashion photography, and other related industries.",
    },
    {
      value: "item-4",
      title: "Eligibility",
      content:
        "The course is open to candidates with a Bachelor's degree in any field. Basic knowledge of photography and digital production is an advantage but not mandatory.",
    },
    {
      value: "item-5",
      title: "Admission Process",
      content:
        "The admission process is conducted through a competitive entrance exam. The exam will be based on the candidate's portfolio and academic performance.",
    },
    {
      value: "item-6",
      title: "Fee Structure",
      content:
        "The fee structure is as follows: Year 1: INR 1,00,000 Year 2: INR 1,00,000 Year 3: INR 1,00,000",
    },
    {
      value: "item-7",
      title: "Scholarships",
      content:
        "The college offers scholarships to meritorious students. The scholarship will be based on the candidate's academic performance and financial background.",
    },
    {
      value: "item-8",
      title: "FAQ's",
      content:
        "The FAQ's are as follows: Question 1: What is the duration of the course? Answer 1: The course is a 3-year program. Question 2: What is the fee structure? Answer 2: The fee structure is as follows: Year 1: INR 1,00,000 Year 2: INR 1,00,000 Year 3: INR 1,00,000 Question 3: What is the eligibility? Answer 3: The eligibility is as follows: The candidate must have a Bachelor's degree in any field. Question 4: What is the admission process? Answer 4: The admission process is conducted through a competitive entrance exam. The exam will be based on the candidate's portfolio and academic performance. Question 5: What is the scholarship? Answer 5: The scholarship will be based on the candidate's academic performance and financial background.",
    },
  ];

  return (
    <section className="w-full  bg-cover  bg-no-repeat bg-position-[bottom_left_-200px] md:bg-center sm:bg-position-center md:bg-fixed relative bg-[#ECECEC] py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <ContainerWidget>
        <ScrollWidget animation="slideRight">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <h3 className="text-center 3xl:text-[64px] text-3xl 2xl:text-[50px] leading-5 font-semibold md:font-normal text-black font-urbanist">
              Frequently Asked Questions
            </h3>
            <AccordionWidget
              type="single"
              collapsible
              defaultValue="item-1"
              items={items}
              columns={2}
            />
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default FaqSection;
