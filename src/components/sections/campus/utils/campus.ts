export type CampusHeroSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title?: string;
    Heading?: string;
    SubHeading?: string;
    Description?: string;
    Video?: {
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
