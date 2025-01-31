import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import ApiHelpers from "../../../../api/ApiHelpers";
import ApiConstants from "../../../../api/ApiConstants";
import { notifications } from "@mantine/notifications";
import { MerchantEDITNEW, readFileAsBase64 } from "./useAddMerchantDetails";

interface UpdateMerchantSuccessResponse {
  results: [
    {
      merchantId: number;
      success: true;
      message: string;
    },
  ];
  success: true;
}
interface UpdateMerchantErrorResponse {
  success: false;
  message?: string;
  error?: string; // e.g., "Server error"
  details?: string; // Additional details about the error (optional)
  errors?: { field: string; message: string }[]; // Field-specific errors
}
interface AxiosRequestError {
  message: string;
  code?: string;
  config?: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    data?: any;
  };
}
async function updateMerchant({
  updates,
}: {
  updates: MerchantEDITNEW[];
}): Promise<AxiosResponse<UpdateMerchantSuccessResponse>> {
  if (!updates) {
    throw new Error("Np payload");
  }
  const url = ApiConstants.UPDATE_MERCHANT_BY_ID();
  if (updates[0]?.logoImg instanceof File) {
    const baseString = await readFileAsBase64(updates[0]?.logoImg);
    return ApiHelpers.PUT(url, [{ ...updates[0], logoImg: baseString }]);
  }
  const { logoImg, ...other } = updates[0];
  return ApiHelpers.PUT(url, [other]);
}

export const useUpdateMerchantDetailsbyId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updates }: { updates: MerchantEDITNEW[] }) =>
      updateMerchant({ updates }),
    onSuccess: (data) => {
      // TODO chnage the componet as we can show failed and success merchant id updates separately
      notifications.show({
        title: `Merchant ID: ${data?.data.results?.map((result) => result.merchantId)?.join(", ")}`,
        message: data?.data?.results[0]?.message ?? "Success",
        color: "green",
        autoClose: 4000,
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["Merchants-Grid-data"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<
          UpdateMerchantErrorResponse | AxiosRequestError
        >;

        if (axiosError.response) {
          notifications.show({
            title: "Edit Operation Failed",
            message:
              axiosError.response.data?.message ?? "Something went wrong",
            color: "red",
            autoClose: 5000,
          });
        } else if (axiosError.request) {
          notifications.show({
            title: "Axios Error",
            message: axiosError.request,
            color: "red",
            autoClose: 5000,
          });
        } else {
          // Handle unexpected error
          notifications.show({
            title: "Unexpected error",
            message: axiosError.message,
            color: "red",
            autoClose: 5000,
          });
        }
      } else {
        console.error("Non-Axios error:", error);
      }
    },

    onSettled: () => {
      // Optionally, you can use onSettled to trigger actions like invalidating queries or refetching
    },
  });
};
