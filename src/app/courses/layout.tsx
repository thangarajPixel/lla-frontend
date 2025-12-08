import { Fragment } from "react";
import CourseAdmissionFormSection from "@/components/sections/courses/utils/CourseAdmissionFormSection";

const CoursesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      {children}
      <CourseAdmissionFormSection />
    </Fragment>
  );
};

export default CoursesLayout;
