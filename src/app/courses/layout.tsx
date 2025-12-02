import { Fragment } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";

const CoursesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      {children}
      <div className="fixed bottom-0 left-0 right-0 bg-[#E97451]  z-70">
        <ContainerWidget>
          <div className="flex justify-between items-center h-[10vh]">
            <p className="text-white text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </ContainerWidget>
      </div>
    </Fragment>
  );
};

export default CoursesLayout;
