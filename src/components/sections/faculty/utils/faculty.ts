export type FacultyHeroSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Image: Array<{
      id: number;
      name: string;
      url: string;
    }>;
  };
};

export type FacultyFounderSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string | null;
    SubHeading: string | null;
    Founder_card: Array<{
      id: number;
      Heading: string;
      Description: Array<{
        type: string;
        children: Array<{
          type: string;
          text: string;
        }>;
      }>;
      Btn_txt: string | null;
      Image: {
        id: number;
        name: string;
        url: string;
      };
    }>;
  };
};

