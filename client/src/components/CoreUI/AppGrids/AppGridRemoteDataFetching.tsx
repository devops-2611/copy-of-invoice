import {
  MaterialReactTable,
  MRT_Row,
  MRT_RowData,
  MRT_ShowHideColumnsButton,
  MRT_TableHeadCellFilterContainer,
  MRT_ToggleFullScreenButton,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
  type MRT_ColumnPinningState,
  MRT_ExpandButtonProps,
  MRT_TableDetailPanelProps,
} from "material-react-table";
import { Box, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { GridFilterDrawer } from "../GridFilterDrawer/GridFilterDrawer";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, Text } from "@mantine/core";
import "./ScrollBAr.css";
import TableCellForm from "../../tableCellForm/tableCellForm";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ToolBarCustomAction from "./TopToolBarCustomActions/ToolBarCustomAction";
import { useIsMutating } from "@tanstack/react-query";
import { UISCHEMA } from "../../../pages/admin/customers/CRUDUISchema/customersUISchema";
import { getValueofKeyFromObject } from "../../../utility/helperFuntions";

type DataGridProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[]; // Column definitions to render in the table
  data: T[]; // Data to be displayed in the table
  pagination: MRT_PaginationState; // Pagination state
  sorting: MRT_SortingState; // Sorting state
  columnFilters: MRT_ColumnFiltersState; // Column filters
  onPaginationChange: (pagination: MRT_PaginationState) => void; // Pagination change handler
  onSortingChange: (sorting: MRT_SortingState) => void; // Sorting change handler
  onColumnFiltersChange: (filters: MRT_ColumnFiltersState) => void; // Filter change handler
  isLoading?: boolean; // Optional loading state
  isError?: boolean; // Optional error state
  totalRowCount: number;
  OnFilterButtonClicked: () => void;
  OnApplyFiltersClicked: () => void;
  filterDrawerIsOpen: boolean;
  enableRowSelection?: boolean;
  tableName: string;
  columnPinning?: MRT_ColumnPinningState;
  crudOperationHeader?: string;
  uniqueIDForRows: string;
  uiSchema?: UISCHEMA[];
  muiExpandButtonProps?: MRT_ExpandButtonProps<T>;
  renderDetailPanel?: MRT_TableDetailPanelProps<T>;
  enableRowActions?: boolean;
};

const DataGrid = <T extends object>({
  columns,
  data,
  pagination,
  sorting,
  columnFilters,
  onPaginationChange,
  onSortingChange,
  onColumnFiltersChange,
  isLoading = false,
  isError = false,
  totalRowCount,
  OnFilterButtonClicked,
  filterDrawerIsOpen = false,
  OnApplyFiltersClicked,
  enableRowSelection = false,
  tableName,
  columnPinning,
  crudOperationHeader = "",
  uniqueIDForRows = "id",
  uiSchema,
  muiExpandButtonProps,
  renderDetailPanel,
  enableRowActions = true,
}: DataGridProps<T>) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRow, setSelectedRow] = useState<{
    buttonCLicked: "VIEW" | "NEW" | "EDIT";
    row: MRT_Row<T> | null;
  }>();
  const isMutatingDelete = useIsMutating({
    mutationKey: [
      "Deleting-Orders",
      "Deleting-Customers",
      "Deleting-Merchants",
      "Deleting-Invoices",
    ],
  });

  const handleEditIConClicked = (row: MRT_Row<T>) => {
    setSelectedRow({ buttonCLicked: "EDIT", row: row });
    open();
  };
  const handleNewIconClicked = () => {
    setSelectedRow({ buttonCLicked: "NEW", row: null });
    open();
  };
  const handleCloseForm = () => {
    close();
    setSelectedRow((old) => ({ buttonCLicked: "VIEW", row: null }));
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableMultiSort: false,
    initialState: {
      showColumnFilters: false,
      density: "compact",
      columnPinning: columnPinning ?? undefined,
    },
    enableRowSelection,
    enableExpandAll: false,
    columnFilterDisplayMode: "custom",
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiTableHeadCellProps: {
      align: "center",
      style: {
        backgroundColor: "lightgray",
      },
    },
    muiPaginationProps: {
      rowsPerPageOptions: [10, 20, 30, 50],
      SelectProps: { style: { fontSize: 14 } },
    },
    positionToolbarAlertBanner: "bottom",
    muiTableBodyProps: {
      sx: {
        padding: 0,
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    muiTableBodyCellProps: {
      align: "center",
    },

    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Edit",
        maxSize: 50,
      },
    },
    onColumnFiltersChange: onColumnFiltersChange,
    onSortingChange: onSortingChange,
    onPaginationChange: onPaginationChange,
    enableStickyHeader: true,
    renderToolbarInternalActions: ({ table }) => (
      <>
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </>
    ),
    rowCount: totalRowCount, // Pass total row count for pagination
    state: {
      columnFilters,
      isLoading,
      pagination,
      showAlertBanner: isError,
      sorting,
    },
    muiTableContainerProps: { sx: { maxHeight: "70vh" } },
    getRowId: (originalRow) =>
      getValueofKeyFromObject(originalRow, uniqueIDForRows),
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : isMutatingDelete
        ? {
            color: "info",
            children: "Please wait...........",
          }
        : { color: "success" },

    enableRowActions: enableRowActions,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEditIConClicked(row)}>
            <EditIcon style={{ fontSize: "16px" }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <ToolBarCustomAction
        table={table}
        OnFilterButtonClicked={OnFilterButtonClicked}
        handleNewIconClicked={handleNewIconClicked}
        tableName={tableName}
      />
    ),
    muiExpandButtonProps,
    renderDetailPanel,
  });
  return (
    <>
      <MaterialReactTable table={table} />
      <GridFilterDrawer
        close={OnApplyFiltersClicked}
        opened={filterDrawerIsOpen}
        crudOperationHeader={crudOperationHeader}
      >
        <Stack p="8px" gap="8px">
          {table.getLeafHeaders().map((header) => {
            if (header.column.getCanFilter()) {
              return (
                <MRT_TableHeadCellFilterContainer
                  key={header.id}
                  header={header}
                  table={table}
                  in
                  style={{
                    marginTop: 10,
                  }}
                />
              );
            }
          })}
        </Stack>
      </GridFilterDrawer>
      <Modal
        opened={opened}
        onClose={handleCloseForm}
        title={
          <>
            <Text
              size="lg"
              style={{
                fontWeight: "bold",
                // fontSize: "20px",
                textAlign: "center",
              }}
              variant="gradient"
              gradient={{ from: "teal", to: "green", deg: 237 }}
            >
              {selectedRow?.buttonCLicked === "NEW" ? "New" : "Edit"}
              {crudOperationHeader}
            </Text>
            <Divider />
          </>
        }
        centered
        transitionProps={{ transition: "fade", duration: 200 }}
        size={"auto"}
        style={{ borderRadius: "15px" }}
      >
        <TableCellForm
          formState={selectedRow?.buttonCLicked}
          originalRow={selectedRow?.row?.original}
          onClose={handleCloseForm}
          crudOperationHeader={crudOperationHeader}
          uiSchema={uiSchema}
        />
      </Modal>
    </>
  );
};

export default DataGrid;
