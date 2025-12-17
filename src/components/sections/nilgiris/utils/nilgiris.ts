export type NilgirisData = {
  id: number;
  Title: string;
  Description: string;
  ImageCard: Array<{
    id: number;
    Type: string;
    Url?: string | null;
    Image:
      | {
          id: number;
          name: string;
          url: string;
        }
      | Array<{
          id: number;
          name: string;
          url: string;
        }>;
  }>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};
