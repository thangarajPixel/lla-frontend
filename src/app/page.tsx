
import BannerSection from "@/components/sections/home/BannerSection"
import CampusSection from "@/components/sections/home/campus-section"
import CourseSection from "@/components/sections/home/CourseSection"
import FacultySection from "@/components/sections/home/faculty-section"
import LifeSection from "@/components/sections/home/life-section"
import SponsorSection from "@/components/sections/home/sponsor-section"
import TestimonialsSection from "@/components/sections/home/testimonial-section"

const HomePage = () => {
  return (
    <>
       <BannerSection />
       <CourseSection />
       <CampusSection />
       <FacultySection />
       <LifeSection />
       <TestimonialsSection />
       <SponsorSection />
       </>
  )
}
export default HomePage