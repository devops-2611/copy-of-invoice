import { MRT_TableInstance } from "material-react-table";
import { Box, IconButton, lighten, Tooltip } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ClearIcon } from "@mui/x-date-pickers";
import OrdersGridTopToolBar from "./OrdersGridTopToolBar";
import CustomerGridTopToolBar from "./CustomerGridTopToolBar";
import MerchantGridTopToolBar from "./MerchantGridTopToolBar";
import AllInvoicesGridTopToolBar from "./AllInvoicesGridTopToolBar";
interface ToolBarCustomActionPropTypes {
  table: MRT_TableInstance<any>;
  OnFilterButtonClicked: () => void;
  handleNewIconClicked: () => void;
  tableName: string;
}

const ToolBarCustomAction = (props: ToolBarCustomActionPropTypes) => {
  const { table, OnFilterButtonClicked, tableName, handleNewIconClicked } =
    props;

  const handleClearFilters = () => {
    table.resetColumnFilters();
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.05),
        display: "flex",
        gap: "0.5rem",
        p: "0px 0px 0px 8px",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      })}
    >
      <Box sx={{ flexGrow: 1 }}>
        {tableName === "OrdersDisplay" && (
          <OrdersGridTopToolBar
            table={table}
            handleNewIconClicked={handleNewIconClicked}
          />
        )}
        {tableName === "CustomersDisplay" && (
          <CustomerGridTopToolBar
            table={table}
            handleNewIconClicked={handleNewIconClicked}
          />
        )}
        {tableName === "MerchantsDisplay" && (
          <MerchantGridTopToolBar
            table={table}
            handleNewIconClicked={handleNewIconClicked}
          />
        )}
        {tableName === "AllInvoicesDisplay" && (
          <AllInvoicesGridTopToolBar table={table} />
        )}
      </Box>
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Tooltip title="Clear Filters" placement="top">
          <IconButton onClick={handleClearFilters} color="primary" size="small">
            <ClearIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Apply Filters" placement="top">
          <IconButton
            onClick={OnFilterButtonClicked}
            color="primary"
            size="small"
          >
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ToolBarCustomAction;
