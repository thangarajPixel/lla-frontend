export type PrivacyPolicyProps = {
  data: {
    Title: string;
    SubTitle: string | null;
    Description: string ;
    PrivacyPolicyCard: Array<{
      id: string;
      Title: string;
      Description: string;
    }>;
  };
};
