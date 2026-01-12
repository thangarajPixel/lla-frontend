export type MediaDetailProps = {
  data: {
    card: MediaCard;
    latest: MediaCard[];
  };
};

export type MediaCard = {
  id: number;
  Title: string;
  Slug: string;
  CreatedDate: string;
  Description: string | null;
  Btn_txt?: string | null;
  LongDescription?: string | null;
  Image: Array<MediaImage>;
  ViewCard: Array<MediaViewCardItem>;
};

export type MediaImage = {
  id: number;
  name: string;
  url: string;
};

export type MediaViewCardItem = {
  id: number;
  Title: string;
  Type: string;
  Url: string;
  Description: string | null;
  Image: Array<MediaImage>;
};
