import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { modals } from "@mantine/modals";
import { Text as MantineText } from "@mantine/core";
import { useEffect } from "react";
import { MRT_TableInstance } from "material-react-table";
import { DeleteForeverRounded } from "@mui/icons-material";
import { useDeleteMerchantbyIDs } from "../../../../pages/admin/merchants/hooks/useDeleteMerchantbyIDs";
import { useUpdateMerchantDetailsbyId } from "../../../../pages/admin/merchants/hooks/useUpdateMerchantDetailsbyId";
import { IconToolsKitchen2 } from "@tabler/icons-react";
interface MerchantsGridCustomToolbarProps {
  table: MRT_TableInstance<any>;
  handleNewIconClicked: () => void;
}

const MerchantGridTopToolBar = (props: MerchantsGridCustomToolbarProps) => {
  const { table, handleNewIconClicked } = props;
  const {
    mutateAsync: deleteMerchantsMutateAsync,
    isSuccess: isSucceesIndeletingIds,
  } = useDeleteMerchantbyIDs();
  const { isSuccess: iSSuccessInUpdating } = useUpdateMerchantDetailsbyId();

  const getSelectedROws = table
    .getSelectedRowModel()
    ?.flatRows?.map((row) => row?.original);
  const getOrderIdsofSelectedRows = getSelectedROws?.map(
    (row) => row?.merchantId,
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
          This action will delete the selected merchant(s).
        </MantineText>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deleteMerchantsMutateAsync(IDs?.join(","));
      },
    });
  };

  useEffect(() => {
    if (isSucceesIndeletingIds || iSSuccessInUpdating) {
      table.resetRowSelection();
    }
  }, [isSucceesIndeletingIds, iSSuccessInUpdating]);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={() => handleNewIconClicked()}
        size="small"
        color="success"
      >
        Add Merchant &nbsp; <IconToolsKitchen2 stroke={2} size={16} />
      </Button>
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

export default MerchantGridTopToolBar;
