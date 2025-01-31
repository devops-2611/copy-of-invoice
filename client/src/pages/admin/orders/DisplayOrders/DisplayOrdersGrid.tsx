import { useMemo, useState } from "react";
import AppGridRemoteDataFetching from "../../../../components/CoreUI/AppGrids/AppGridRemoteDataFetching";
import { Order, useGETALLOrdersWithFilters } from "./useGetAllOrders";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import { useDisclosure } from "@mantine/hooks";
import MUIThemeProvider from "../../../../providers/MUIThemeProvider";
import dayjs from "dayjs";
import AppChipComponent from "../../../../components/AppChipComponent";
import TextWithIcon from "../../../../components/TextWithIcon";
import { orderStatuses } from "./constants";
import { ordersUISchemaArray } from "../CRUDUISchema/ordersUISchema";
const DisplayOrdersGrid = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: OrdersDataApiResponse,
    isError,
    isLoading,
  } = useGETALLOrdersWithFilters({
    columnFilters: columnFilters,
    EnableQuery: !opened,
    sorting: sorting,
    pagination: pagination,
  });

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "merchantId",
        header: "Merchant ID",
        enableSorting: false,
        size:150,

      },
      {
        accessorKey: "orderId",
        header: "Order ID",
        enableSorting: false,
        size:150,
      },
      {
        accessorKey: "customerId",
        header: "Customer ID",
        enableSorting: false,
        size:150,
        enableEditing: false,
      },
      {
        accessorKey: "branchName",
        header: "Branch Name",
        enableSorting: false,
      },
      {
        accessorKey: "orderDate",
        accessorFn: (originalRow) => new Date(originalRow.orderDate),
        header: "Order Date",
        filterVariant: "datetime-range",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY hh:mm A");
        },
        muiFilterDateTimePickerProps: {
          label: "Order Date",
          timeSteps: { minutes: 1 },
        },
        maxSize: 150,
      },
      
      {
        accessorKey: "customerFirstName",
        header: "Customer First Name",
        enableColumnFilter: false,
      },
      {
        accessorKey: "customerLastName",
        header: "Customer Last Name",
        enableColumnFilter: false,
      },
      {
        accessorKey: "orderType",
        header: "Order Type",
        filterVariant: "multi-select", // Multi-select filter
        filterSelectOptions: [
          { label: "DELIVERY", value: "DELIVERY" },
          { label: "COLLECTION", value: "COLLECTION" },
        ], // Example filter options
        enableSorting: false,
        maxSize: 30,
        Cell: ({ renderedCellValue }) => TextWithIcon({ renderedCellValue }),
      },
      {
        accessorKey: "paymentType",
        header: "Payment Type",
        filterVariant: "multi-select",
        filterSelectOptions: [
          { label: "CASH", value: "CASH" },
          { label: "CARD", value: "CARD" },
        ],
        enableSorting: false,
        maxSize: 30,
        Cell: ({ renderedCellValue }) => TextWithIcon({ renderedCellValue }),
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        filterVariant: "multi-select", // Multi-select filter
        filterSelectOptions: [
          { label: "COMPLETED", value: "COMPLETED" },
          { label: "PENDING", value: "PENDING" },
          { label: "PROCESSED", value: "PROCESSED" },
        ],
        enableSorting: false,
        maxSize: 30,
      },
      {
        accessorKey: "confirmationStatus",
        header: "Confirmation Status",
        filterVariant: "multi-select", // Multi-select filter
        filterSelectOptions: [
          { label: "COMPLETED", value: "COMPLETED" },
          { label: "PENDING", value: "PENDING" },
        ],
        enableSorting: false,
        maxSize: 30,
      },
      {
        accessorKey: "promoCode",
        header: "Promo Code",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "promoDiscountSwishr",
        header: "Promo Discount (SWISHR)",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 50,
      },
      {
        accessorKey: "promoDiscountMerchant",
        header: "Promo Discount (Merchant)",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 50,
      },
      {
        accessorKey: "refundSwishr",
        header: "Refund (SWISHR)",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "refundMerchant",
        header: "Refund (Merchant)",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "orderDiscount",
        header: "Order Discount",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "driverTip",
        header: "Driver Tip",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "deliveryCharge",
        header: "Delivery Charge",
        filterVariant: "range-slider",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
        Cell: ({ renderedCellValue }) => TextWithIcon({ renderedCellValue }),
      },
      {
        accessorKey: "serviceFee",
        header: "Service Fee",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "surcharge",
        header: "Surcharge",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "subTotal",
        header: "Sub Total",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "taxes",
        header: "Taxes",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "total",
        header: "Total",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
    
      {
        accessorKey: "status",
        header: "Status",
        maxSize: 30,
        Cell: ({ cell }) => (
          <AppChipComponent
            value={
              orderStatuses?.find(
                (item) => item.value === cell.getValue<string>(),
              )?.label ?? ""
            }
          />
        ),
        filterVariant: "multi-select",
        enableSorting: false,
        filterSelectOptions: orderStatuses,
        editSelectOptions: [
          { label: "COMPLETED", value: "COMPLETED" },
          { label: "PENDING", value: "PENDING" },
        ],
      },
      {
        accessorKey: "orderItems",
        header: "Order Items",
        enableSorting: false,
      },
    ],
    [],
  );

  return (
    <MUIThemeProvider>
      <AppGridRemoteDataFetching
        data={OrdersDataApiResponse?.data?.orders ?? []}
        columnFilters={columnFilters}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        totalRowCount={OrdersDataApiResponse?.data?.totalCount ?? 0}
        onColumnFiltersChange={setColumnFilters}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        isLoading={isLoading}
        OnFilterButtonClicked={() => open()}
        OnApplyFiltersClicked={() => close()}
        filterDrawerIsOpen={opened}
        enableRowSelection={true}
        isError={isError}
        tableName={"OrdersDisplay"}
        columnPinning={{
          left: ["mrt-row-select", "mrt-row-actions", "orderId","customerId","branchName"],
          right: ["status"],
        }}
        crudOperationHeader="Order"
        uniqueIDForRows="orderID"
        uiSchema={ordersUISchemaArray}
      />
    </MUIThemeProvider>
  );
};

export default DisplayOrdersGrid;
