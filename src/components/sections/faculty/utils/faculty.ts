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
      Slug: string;
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

interface FacultyMember {
  id: number;
  Title: string;
  Image: {
    id: number;
    url: string;
    name: string;
  };
}

export type FilmmakingFacultySectionProps = {
  data: {
    Title: string;
    Description: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    Card: FacultyMember[];
  };
};

interface FacultyMember {
  id: number;
  Title: string;
  Image: {
    id: number;
    url: string;
    name: string;
  };
  Slug: string;
}

export type PhotographyFacultySectionProps = {
  data: {
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Card: FacultyMember[];
  };
};

export type VisitingFacultySectionProps = {
  data: {
    Title: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Card: FacultyMember[];
  };
};
