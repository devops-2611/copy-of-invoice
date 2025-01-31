import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Menu, Text as MantineText } from "@mantine/core";
import {
  IconChevronDown,
  IconDatabaseEdit,
  IconDatabasePlus,
} from "@tabler/icons-react";
import { orderStatuses } from "../../../../pages/admin/orders/DisplayOrders/constants";
import { useDeleteOrderByID } from "../../../../pages/admin/orders/DisplayOrders/useDeleteOrderByID";
import { useUpdateOrders } from "../../../../pages/admin/orders/DisplayOrders/useUpdateOrders";
import { modals } from "@mantine/modals";

import { useEffect } from "react";
import { MRT_RowData, MRT_TableInstance } from "material-react-table";
import { DeleteForeverRounded } from "@mui/icons-material";
import OrderGridUpdateMerchantId from "./OrderGridUpdateMerchantId";
interface OrderSGridCustomToolbarProps {
  table: MRT_TableInstance<any>;
  handleNewIconClicked: () => void;
}
const OrdersGridTopToolBar = (props: OrderSGridCustomToolbarProps) => {
  const { table, handleNewIconClicked } = props;
  const {
    mutateAsync: deleteOrdersMutateAsync,
    isSuccess: isSucceesIndeletingIds,
  } = useDeleteOrderByID();
  const {
    mutateAsync: updateOrdersMuatateAsync,
    isSuccess: iSSuccessInUpdating,
  } = useUpdateOrders();

  const getSelectedROws = table
    .getSelectedRowModel()
    ?.flatRows?.map((row) => row?.original);
  const getOrderIdsofSelectedRows = getSelectedROws?.map((row) => row?.orderId);
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
        <MantineText size="sm">This action will delete your order.</MantineText>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deleteOrdersMutateAsync(IDs);
      },
    });
  };
  const hanldeBulkStatusUpdate = (orders: MRT_RowData, buttonName: string) => {
    const finalUpdateDPayload = orders?.map((item: any) => ({
      ...item,
      status: buttonName,
    }));
    updateOrdersMuatateAsync({ updates: finalUpdateDPayload });
  };
  const handleBulkMerchantIDUpdate = (merchantId: string) => {
    const finalUpdateDPayload = getSelectedROws?.map((item: any) => ({
      ...item,
      merchantId: merchantId,
    }));
    updateOrdersMuatateAsync({ updates: finalUpdateDPayload });
  };
  useEffect(() => {
    if (isSucceesIndeletingIds || iSSuccessInUpdating) {
      table.resetRowSelection();
    }
  }, [isSucceesIndeletingIds, iSSuccessInUpdating]);
  const disableButton =
    !table.getIsAllPageRowsSelected() && !table.getIsSomeRowsSelected();
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
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={() => handleNewIconClicked()}
          size="small"
        >
          Add Order &nbsp; <IconDatabasePlus stroke={2} size={16} />
        </Button>
        <Menu width={200} shadow="md">
          <Menu.Target>
            <Button
              variant="contained"
              endIcon={<IconChevronDown />}
              disabled={disableButton}
              size="small"
              color={"info"}
            >
              Update Status &nbsp; <IconDatabaseEdit stroke={2} size={16} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown style={{ maxHeight: 300, overflow: "scroll" }}>
            <Menu.Label>Select Status of Order</Menu.Label>
            {orderStatuses?.map((item) => (
              <Menu.Item
                key={item.value}
                component={"button"}
                name={item.value}
                onClick={(e) =>
                  hanldeBulkStatusUpdate(getSelectedROws, e.currentTarget.name)
                }
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <OrderGridUpdateMerchantId
          disableButton={disableButton}
          handleBulkMerchantIDUpdate={handleBulkMerchantIDUpdate}
        />
      </Box>
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

export default OrdersGridTopToolBar;
