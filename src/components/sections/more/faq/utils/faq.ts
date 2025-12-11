export type FaqProps = {
  data: {
    Title: string;
    faq: FaqCard[];
  };
};

export type FaqCard = {
  id: number;
  Title: string;
  Qa: Array<{
    id: number;
    Question: string;
    Answer: string;
  }>;
};
