export type TermsAndConditionsProps = {
  data: {
    Title: string;
    SubTitle: string | null;
    Description: string;
    TermsAndConditionCard: Array<{
      id: string;
      Title: string;
      Description: string;
    }>;
  };
};