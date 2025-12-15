export type ImageData = {
  id: number;
  name: string;
  url: string;
  width?: number;
  height?: number;
};

export type DescriptionText = {
  type: "text";
  text: string;
};

export type MenuData = {
  id: number;
  Title: string;
  Description: string | null;
  Btn_txt: string | null;
  SubTitle: string | null;
  Duration: string | null;
  Image: ImageData[] | null;
};

export type OverviewCard = {
  id: number;
  Title: string;
  Description: string | null;
  Btn_txt: string | null;
  Image: ImageData | null;
};

export type OverviewData = {
  id: number;
  Title: string;
  Heading: string;
  SubHeading: string | null;
  Card: OverviewCard[];
};

export type ContentCard = {
  id: number;
  OuterTitle: string;
  OuterDescription: string;
  Section: string;
  Title: string;
  Type: string;
  Description: string;
  Image: ImageData[];
};

export type CourseContentData = {
  id: number;
  Title: string;
  Duration: string;
  Description: string;
  Content_card: ContentCard[];
};

export type OtherInfoItem = {
  id: number;
  Title: string;
  Description: string;
};

export type OtherInfoData = {
  id: number;
  Title: string;
  Description: string;
  Info: OtherInfoItem[];
};

export type StudentTestimonialCard = {
  id: number;
  Title: string;
  Description: string;
  Btn_txt: string | null;
  Image: ImageData[];
  Url: string;
};

export type StudentTestimonialData = {
  id: number;
  Title: string;
  Heading: string;
  Description: string;
  SubHeading: string | null;
  Card: StudentTestimonialCard[];
};

export type TestimonialSlider = {
  id: number;
  Description: string;
  Name: string;
  Batch: string;
};

export type TestimonialData = {
  id: number;
  Title: string;
  Heading: string;
  Description: string;
  SubHeading: string | null;
  Slider: TestimonialSlider[];
};

export type HowToApplyCard = {
  id: number;
  Heading: string;
  Description: string;
  Icon: ImageData | null;
};

export type HowToApplyData = {
  id: number;
  Title: string;
  Card: HowToApplyCard[];
};

export type FaqQA = {
  id: number;
  Title: string;
  Description: string;
};

export type FaqData = {
  id: number;
  Title: string;
  QA: FaqQA[];
};

export type PgDiplomaData = {
  __component: string;
  id: number;
  Menu: MenuData;
  Overview: OverviewData;
  Course_content: CourseContentData;
  Other_Info: OtherInfoData;
  Student_testimonial: StudentTestimonialData[];
  Testimonial: TestimonialData[];
  HowToApply: HowToApplyData;
  Faq: FaqData;
};

export type CourseFormData = {
  name: string;
  mobile: string;
  emailAddress: string;
  message: string;
};
