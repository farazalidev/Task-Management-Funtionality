/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

const handleApiError = (error: any) => {
  if (error?.response?.data?.errors) {
    error.response.data.errors.forEach((err:any) => {
      toast.error(`${err.path}: ${err.message}`);
    });
  } else {
    toast.error(`Error: ${error?.message || 'An unexpected error occurred'}`);
  }
};

export default handleApiError;
