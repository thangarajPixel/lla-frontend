export type CampusHeroSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title?: string;
    Heading?: string;
    SubHeading?: string;
    Description?: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    Video?: {
      id: number;
      name: string;
      url: string;
    };
    Image?: {
      id: number;
      name: string;
      url: string;
    };
    TopImage?: {
      id: number;
      name: string;
      url: string;
    };
    BottomImage?: {
      id: number;
      name: string;
      url: string;
    };
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
    Vertical_Image?: Array<{
      id: number;
      name: string;
      url: string;
    }>;
  };
};
