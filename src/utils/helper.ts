import { AxiosError } from "axios";

export const getError = (error: unknown): string => {
  let message: string;

  if (error && typeof error === "object") {
    if ("isAxiosError" in error && (error as AxiosError).response) {
      const axiosError = error as AxiosError<{ message: string }>;
      message = axiosError.response?.data?.message || "Something went wrong";
    } else if ("message" in error) {
      message = String((error as { message: unknown }).message);
    } else {
      message = "Something went wrong";
    }
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
