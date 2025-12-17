import type { StaticImageData } from "next/image";

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
    Mobile_image: {
      id?: number;
      name: string;
      url: string;
    };
  };
};

export type FounderSectionProps = {
  data?: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
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
      Btn_txt: string;
      Image: {
        id: number;
        name: string;
        url: string;
      };
      ViewCard?: {
        id: number;
        Link: string;
        Image: Array<{
          id: number;
          name: string;
          url: string;
        }>;
      } | null;
    }>;
  };
};

export type TeamSectionProps = {
  data: {
    __component?: string;
    id?: number;
    Title: string;
    Heading: string;
    SubHeading: string;
    Card: Array<{
      id: number;
      Slug: string;
      Title: string;
      Description: string;
      Btn_txt: string;
      Image: Array<{
        id: number;
        name: string;
        url: string;
      }>;
    }>;
    Frame: {
      id: number;
      Title: string;
      Description: string;
      Btn_txt: string | null;
      Image: Array<{
        id: number;
        name: string;
        url: string;
      }>;
    };
  };
};

export type Card = {
  id: number;
  name: string;
  role?: string;
  gallery?: Array<{ src: StaticImageData | string; alt: string }>;
  thumbnail: StaticImageData | string;
  biography?: string;
  portfolioLink?: string;
};

export type TeamMemberPopupProps = {
  cards: Card[];
  selectedCardId?: number | null;
  onClose?: () => void;
  hideGrid?: boolean;
};
