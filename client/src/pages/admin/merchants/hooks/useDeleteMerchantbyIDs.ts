import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import ApiHelpers from "../../../../api/ApiHelpers";
import ApiConstants from "../../../../api/ApiConstants";
import { notifications } from "@mantine/notifications";
import { DefaultMantineColor } from "@mantine/core";

interface DeleteMerchantIdsResponse {
  success: boolean;
  message: string;
}
const showErrorNotification = (
  title: string,
  message: string,
  color: DefaultMantineColor,
) => {
  notifications.show({
    title,
    message,
    color,
    autoClose: 5000,
  });
};

const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errorMessage = error?.response?.data?.message ?? "Request Failed";
    showErrorNotification(errorMessage, "Request Failed", "red");
  } else {
    showErrorNotification(
      "Failed to perform the action",
      "Something went wrong",
      "red",
    );
  }
  console.error("Error occurred:", error);
};

function deleteMerchantIds(
  id: string,
): Promise<AxiosResponse<DeleteMerchantIdsResponse>> {
  return ApiHelpers.DELETE(ApiConstants.DELETE_MERCHANTS_BY_IDS(id));
}

export const useDeleteMerchantbyIDs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Deleting-Merchants"],
    mutationFn: (id: string) => deleteMerchantIds(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Merchants-Grid-data"] });
      notifications.show({
        title: "Record deleted successfully",
        message: "Success",
        color: "green",
        autoClose: 5000,
      });
    },
    onError: (error) => {
      handleError(error);
    },
    // Optionally you can provide onSettled to handle actions like invalidating queries or refetching
    onSettled: () => {
      // Optionally invalidate or refetch queries if needed
    },
  });
};
