import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import ApiHelpers from "../../../../api/ApiHelpers";
import ApiConstants from "../../../../api/ApiConstants";
import { notifications } from "@mantine/notifications";
import { displayRelevantErrorNotification } from "../../../../utility/helperFuntions";

interface DeleteInvoiceIdsResponse {
  message: string;
  deletedCount: number;
  success: boolean;
}

function deleteInvoiceIds(
  invoiceId: string,
): Promise<AxiosResponse<DeleteInvoiceIdsResponse>> {
  return ApiHelpers.DELETE(ApiConstants.DELETE_INVOICE_BY_IDS(invoiceId));
}

export const useDeleteInvoiceIds = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Deleting-Invoices"],
    mutationFn: (invoiceId: string) => deleteInvoiceIds(invoiceId),
    onSuccess: (data) => {
      if (data?.data?.success) {
        queryClient.invalidateQueries({ queryKey: ["All_Invoices-Grid-data"] });
        notifications.show({
          title: "Invoice deleted successfully",
          message: `Deleted ${data.data.deletedCount} invoice(s).`,
          color: "green",
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: "Invoice Deletion Failed",
          message:
            data?.data?.message ??
            "An error occurred while deleting the invoice.",
          color: "red",
          autoClose: 5000,
        });
      }
    },
    onError: (error) => {
      displayRelevantErrorNotification(error);
    },
  });
};
