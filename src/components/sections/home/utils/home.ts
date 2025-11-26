export type HeroSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Video: {
      id: number;
      name: string;
      url: string;
    };
  };
};

export type CourseSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Card: Array<{
      id: number;
      Title: string;
      Description: string;
      Btn_txt: string;
      Image: Array<{
        id: number;
        name: string;
        url: string;
      }>;
    }>;
  };
};

export type CampusSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Btn_txt: string;
    Bg_img: {
      id: number;
      name: string;
      url: string;
    };
  };
};

export type FacultySectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Btn_txt: string;
    Card: Array<{
      id: number;
      Title: string;
      Description: string;
      Btn_txt: string;
      Image: Array<{
        id: number;
        name: string;
        url: string;
      }>;
    }>;
  };
};

export type LifeSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Btn_txt: string;
    Card: Array<{
      id: number;
      Title: string;
      Description: string;
      Btn_txt: string | null;
      Image: Array<{
        id: number;
        name: string;
        url: string;
      }>;
    }>;
  };
};

export type LifeCardProps = {
  card: {
    id: number;
    Title: string;
    Description: string;
    Image: Array<{
      id: number;
      name: string;
      url: string;
    }>;
  };
};

export type StudentSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Card: Array<{
      id: number;
      Title: string;
      Description: string;
      Btn_txt: string | null;
      Image: Array<{
        id: number;
        name: string;
        url: string;
      }>;
    }>;
  };
};

export type TestimonialSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Slider: Array<{
      id: number;
      Description: string;
      Name: string;
      Batch: string;
    }>;
  };
};

export type GallerySectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Btn_txt: string;
    Image: Array<{
      id: number;
      name: string;
      url: string;
    }>;
  };
};

export type AboutSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Btn_txt: string;
    Image: Array<{
      id: number;
      name: string;
      url: string;
    }>;
  };
};

export type SponsorsSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Image: Array<{
      id: number;
      name: string;
      url: string;
    }>;
  };
};
