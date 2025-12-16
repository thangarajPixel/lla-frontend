export type BlogDetailProps = {
  data: {
    card: BlogCard;
    latest: BlogCard[];
  };
};

export type BlogCard = {
  id: number;
  Title: string;
  Slug: string;
  ImageUrl: string;
  CreatedDate: string;
  Description: string | null;
  Btn_txt?: string | null;
  LongDescription?: string | null;
  Image: Array<BlogImage>;
  ViewCard: Array<BlogViewCardItem>;
};

export type BlogImage = {
  id: number;
  name: string;
  url: string;
};

export type BlogViewCardItem = {
  id: number;
  Title: string;
  Description: string | null;
  Image: Array<BlogImage>;
};
