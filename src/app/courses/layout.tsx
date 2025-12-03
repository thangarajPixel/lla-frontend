import { Fragment } from "react";
import CourseAdmissionFormSection from "@/components/sections/courses/pg-diploma-in-professional-photography-digital-production/utils/CourseAdmissionFormSection";

const CoursesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      {children}
      <CourseAdmissionFormSection />
    </Fragment>
  );
};

export default CoursesLayout;
