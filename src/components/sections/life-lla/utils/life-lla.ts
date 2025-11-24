export type LifeSectionProps = {
  data: {
    id: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Description?: string;
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
    pagination: {
      page: number;
      perPage: number;
      total: number;
      totalPages: number;
    }
  };
  meta?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};
