export type LifeSectionProps = {
  data: {
    id: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description?: string;
    LifeCard: Array<{
      id: number;
      Title: string;
      Slug: string;
      ImageUrl: string;
      Description: string;
      Btn_txt: string | null;
      Image: Array<{
        id: number;
        name: string;
        url: string;
      }>;
    }>;
    pagination: {
      page: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
  };
  meta?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export type LifeDetailProps = {
  data: {
    card: LifeCard;
    latest: LifeCard[];
  };
};

export type LifeCard = {
  id: number;
  Title: string;
  Slug: string;
  ImageUrl: string;
  CreatedDate: string;
  Description: string | null;
  Btn_txt?: string | null;
  LongDescription?: string | null;
  Image: Array<LifeImage>;
  LifeViewCard: Array<LifeViewCardItem>;
};

export type LifeImage = {
  id: number;
  name: string;
  url: string;
};

export type LifeViewCardItem = {
  id: number;
  Title: string;
  Description: string | null;
  Images: Array<LifeImage>;
};
