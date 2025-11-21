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
