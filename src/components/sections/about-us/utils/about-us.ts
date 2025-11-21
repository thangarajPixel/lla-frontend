export type AboutHeroSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    Image: {
      id?: number;
      name: string;
      url: string;
    };
  };
};


export type FounderSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
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
      Btn_txt: string;
      Image: {
        id: number;
        name: string;
        url: string;
      };
    }>;
  };
};

