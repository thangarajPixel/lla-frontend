import BannerSection from "@/components/sections/home/BannerSection"
import TestimonialSection from "@/components/sections/home/TestimonialSection"
import ContainerWidget from "@/components/widgets/ContainerWidget"

const HomePage = () => {
  return (
      < ContainerWidget>
        <BannerSection/>
        <TestimonialSection/>
      </ContainerWidget>
  )
}
export default HomePage