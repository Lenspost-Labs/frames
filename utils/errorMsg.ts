import { ErrorMsg } from "@/types/types";

export const errorMessage = (error: ErrorMsg) => {
  if (error?.response) {
    if (error?.response?.status === 500) {
      console.log({
        InternalServerError:
          error?.response?.data?.message ||
          error?.response?.data?.name ||
          error?.response?.data?.message?.name,
      });
      return "500 Internal Server Error";
    } else if (error?.response?.status === 401) {
      console.log({ 401: error?.response?.statusText });
      return error?.response?.data?.message || "401 Unauthorized";
    } else if (error?.response?.status === 404) {
      console.log({
        404: error?.response?.statusText || error?.response?.data?.message,
      });
      return error?.response?.data?.message || "404 Not found";
    } else if (error?.response?.status === 400) {
      console.log({
        400: error?.response?.data?.message,
      });
      return error?.response?.data?.message || "400 Bad Request";
    } else if (error?.response?.status === 503) {
      console.log({
        503: error?.response?.data?.message,
      });
      return error?.response?.data?.message || "503 Service Unavailable";
    }
  } else {
    return "Something went wrong";
  }
};
