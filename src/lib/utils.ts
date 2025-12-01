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
  const errorObj: string | string[] | unknown = error || message;
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
      if (
        typeof errorObj === "object" &&
        errorObj !== null &&
        !Array.isArray(errorObj)
      ) {
        const errorRecord = errorObj as Record<
          string,
          { message?: string } | unknown
        >;
        for (const key in errorRecord) {
          const errorValue = errorRecord[key];
          const errormessage: string =
            typeof errorValue === "object" &&
            errorValue !== null &&
            "message" in errorValue
              ? String(errorValue.message || "")
              : "";
          if (errormessage) {
            toast.error(errormessage, toastConfig("bottom-right"));
          }
        }
      } else if (typeof errorObj === "string") {
        toast.error(errorObj, toastConfig("bottom-right"));
      } else {
        toast.error(String(errorObj), toastConfig("bottom-right"));
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

export const validateDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = document.createElement("img") as HTMLImageElement;
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      // revoke object URL once loaded to free memory
      URL.revokeObjectURL(objectUrl);

      const maxWidth = 36000; // 12 inches @300dpi
      const maxHeight = 24000; // 8 inches @300dpi

      if (width > maxWidth || height > maxHeight) {
        alert(
          `Image must be max 12"x8" (3600x2400 pixels). Your image is ${width}x${height}px.`,
        );
        resolve(false);
      } else {
        resolve(true);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(false);
    };
  });
};

export const filteredPayload = <T>(input: T): T | undefined => {
  if (Array.isArray(input)) {
    const cleaned = input
      .map((item) => filteredPayload(item))
      .filter(
        (item): item is Exclude<typeof item, undefined> => item !== undefined,
      );

    return cleaned.length > 0 ? (cleaned as T) : undefined;
  }

  if (typeof input === "object" && input !== null) {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(input)) {
      const cleanedValue = filteredPayload(value as unknown);

      if (
        cleanedValue !== undefined &&
        cleanedValue !== "" &&
        cleanedValue !== 0
      ) {
        result[key] = cleanedValue;
      }
    }

    return Object.keys(result).length > 0 ? (result as T) : undefined;
  }

  // Remove empties
  if (input === 0 || input === "" || input === null || input === undefined) {
    return undefined;
  }

  return input;
};

export const decryptCode = (str: string) => {
  const padded = str + "=".repeat((4 - (str.length % 4)) % 4);
  const decoded = Buffer.from(padded, "base64").toString();
  return decoded.slice(0, 2);
};
