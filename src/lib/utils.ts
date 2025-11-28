import { QueryClient } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import type { ExternalToast } from "sonner";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 120 * 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});
type NotifyInput = {
  error?: unknown;
  message?: string | string[];
  success: boolean;
};

export const toastConfig: (
  position?: ToastPosition,
) => ExternalToast | undefined = (position = "bottom-right") => ({
  position,
  duration: 4000,
});

export function notify({
  error,
  message = "Something went wrong!",
  success,
}:
  | { error?: string | unknown; message: string; success: boolean }
  | NotifyInput) {
  const errorObj: any = error || message;
  switch (success) {
    case true:
      if (Array.isArray(message)) {
        message?.reverse().forEach((msg) => {
          toast.success(msg, toastConfig("top-right"));
        });
        break;
      } else {
        toast.success(message, toastConfig("top-right"));
        break;
      }

    case false:
      if (typeof errorObj === "object") {
        for (const key in errorObj) {
          const errormessage: string = errorObj[key].message || "";
          toast.error(errormessage, toastConfig("bottom-right"));
        }
      } else if (typeof errorObj === "string") {
        toast.error(errorObj, toastConfig("bottom-right"));
      } else {
        toast.error(errorObj, toastConfig("bottom-right"));
      }
      break;
    default:
      toast.error(
        message || "Something went wrong",
        toastConfig("bottom-right"),
      );
      break;
  }
}
