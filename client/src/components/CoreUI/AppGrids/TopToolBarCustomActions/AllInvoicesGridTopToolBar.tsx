import { Box, IconButton, Tooltip } from "@mui/material";
import { modals } from "@mantine/modals";
import { Text as MantineText } from "@mantine/core";
import { useEffect } from "react";
import { MRT_TableInstance } from "material-react-table";
import { DeleteForeverRounded } from "@mui/icons-material";
import { useDeleteInvoiceIds } from "../../../../pages/admin/accounting/hooks/useDeleteInvoicesIds";
interface ALLInvoicesGridCustomToolbarProps {
  table: MRT_TableInstance<any>;
}

const AllInvoicesGridTopToolbar = (
  props: ALLInvoicesGridCustomToolbarProps,
) => {
  const { table } = props;
  const {
    mutateAsync: deleteInvoiceIdsMutateAsync,
    isSuccess: isSucceesIndeletingIds,
  } = useDeleteInvoiceIds();

  const getSelectedROws = table
    .getSelectedRowModel()
    ?.flatRows?.map((row) => row?.original);
  const getOrderIdsofSelectedRows = getSelectedROws?.map(
    (row) => row?.invoiceId,
  );
  const handleDelete = () => {
    handleDeleteOrder(getOrderIdsofSelectedRows);
  };
  const handleDeleteOrder = (IDs: string[]) => {
    modals.openConfirmModal({
      title: (
        <MantineText size="md" style={{ fontWeight: "600" }}>
          Are you sure you want to proceed?
        </MantineText>
      ),
      children: (
        <MantineText size="sm">
          This action will delete the selected Invoice(s).
        </MantineText>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deleteInvoiceIdsMutateAsync(IDs?.join(","));
      },
    });
  };

  useEffect(() => {
    if (isSucceesIndeletingIds) {
      table.resetRowSelection();
    }
  }, [isSucceesIndeletingIds]);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box>
        <Tooltip title="Delete selected rows" placement="top">
          <IconButton
            color="error"
            disabled={
              !table.getIsAllPageRowsSelected() &&
              !table.getIsSomeRowsSelected()
            }
            onClick={handleDelete}
          >
            <DeleteForeverRounded />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default AllInvoicesGridTopToolbar;
