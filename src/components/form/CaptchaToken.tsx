import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useCaptchaToken = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getToken = async (action: string) => {
    if (!executeRecaptcha) return null;

    const token = await executeRecaptcha(action);
    return token;
  };

  return { getToken };
};
