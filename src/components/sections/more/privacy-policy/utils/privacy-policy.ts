export type PrivacyPolicyProps = {
  data: {
    Title: string;
    SubTitle: string | null;
    Description: string ;
    PrivacyPolicyCard: Array<{
      Title: string;
      Description: string;
    }>;
  };
};
