import { Suspense, useMemo, useState } from "react";

import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { Text as MantineText, Rating, Skeleton } from "@mantine/core";
import dayjs from "dayjs";
import {
  Merchant,
  useGetAllMerchantsDetails,
} from "./hooks/useGetAllMerchantsDetails";
import AppGridRemoteDataFetching from "../../../components/CoreUI/AppGrids/AppGridRemoteDataFetching";
import MUIThemeProvider from "../../../providers/MUIThemeProvider";
import { Box, Tooltip } from "@mui/material";
import { merchantsUISchema } from "./CRUDUISchema/merchantsUISchema";
import { IconEye } from "@tabler/icons-react";
import AppChipComponent from "../../../components/AppChipComponent";
const DisplayCustomersGrid = () => {
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
    data: CustomeDetailsApiResponse,
    isError,
    isLoading,
  } = useGetAllMerchantsDetails({
    columnFilters: columnFilters,
    EnableQuery: !opened,
    sorting: sorting,
    pagination: pagination,
  });

  const columns = useMemo<MRT_ColumnDef<Merchant>[]>(
    () => [
      {
        accessorKey: "merchantId",
        header: "Merchant ID",
        enableSorting: false,
        maxSize: 20,
        Cell: ({ cell, row }) => {
          return (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MantineText style={{ cursor: "pointer" }}>
                {cell.getValue<string>()}
              </MantineText>
              <Tooltip title={"View Merchant Details"} placement="top">
                <Link
                  to={`/merchant/${cell.getValue<string>()}/dashboard`}
                  style={{ textDecoration: "none" }}
                >
                  <IconEye color="green" />
                </Link>
              </Tooltip>
              {/* {row?.original?.logoImg ? (
                <Image
                  src={`${row?.original?.logoImg}`}
                  alt={`profile ${cell.getValue<string>()}`}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              ) : (
                <Avatar src={null} alt="no image here" />
              )} */}
            </Box>
          );
        },
      },
      {
        accessorKey: "merchantName",
        header: "Merchant Name",
        enableSorting: true,
        maxSize: 50,
      },
      {
        accessorKey: "merchantEmail",
        header: "Email",
        enableSorting: false,
        maxSize: 100,
      },
      {
        accessorKey: "merchantMobile",
        header: "Mobile",
        enableSorting: false,
        maxSize: 30,
      },
      {
        accessorKey: "merchantAddress",
        header: "Address",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 200,
        Cell: ({ cell, row }) => (
          <Box
            sx={(theme) => ({
              whiteSpace: "normal",
              wordWrap: "break-word",
              maxWidth: "200px",
              overflowWrap: "break-word",
            })}
          >
            {cell.getValue<string>() +
              " " +
              row.original?.merchantArea +
              " " +
              row?.original?.merchantPost}
          </Box>
        ),
      },
      {
        accessorKey: "registrationDate",
        header: "Registration Date",
        enableSorting: true,
        accessorFn: (originalRow) => new Date(originalRow.registrationDate),
        filterVariant: "datetime-range",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY hh:mm A");
        },
        muiFilterDateTimePickerProps: {
          label: "Registration Date",
          timeSteps: { minutes: 1 },
        },
        maxSize: 50,
      },
      {
        accessorKey: "zone",
        header: "Zone",
        enableSorting: false,
        maxSize: 30,
        filterVariant: "multi-select", // Multi-select filter
        filterSelectOptions: [
          { label: "Chester", value: "Chester" },
          { label: "Manchester", value: "Manchester" },
          { label: "Birmingham", value: "Birmingham" },
          { label: "Wrexham", value: "Wrexham" },
          { label: "Ellesmere Port", value: "Ellesmere Port" },
          { label: "Mold", value: "Mold" },
          { label: "London", value: "London" },
          { label: "Birkenhead", value: "Birkenhead" },
          { label: "Wirral", value: "Wirral" },
        ],
      },

      // {
      //   accessorKey: "logoImg",
      //   header: "Logo Image",
      //   enableSorting: false,
      //   enableColumnFilter: false,
      //   Cell: ({ cell }) => (
      //     <img
      //       src={`${import.meta.env.VITE_API_BASE_URL}${cell.getValue<string>()}`}
      //       alt="Merchant Logo"
      //       style={{ width: 40, height: 40, borderRadius: "50%" }}
      //     />
      //   ),
      //   maxSize: 50,

      // },
      {
        accessorKey: "serviceFeeApplicable",
        header: "Service Fee Applicable",
        enableSorting: false,
        maxSize: 30,
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No"),
        enableColumnFilter: false,
      },
      {
        accessorKey: "deliveryChargeApplicable",
        header: "Delivery Charge Applicable",
        enableSorting: false,
        maxSize: 30,
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No"),
        enableColumnFilter: false,
      },
      {
        accessorKey: "driverTipApplicable",
        header: "Driver Tip Applicable",
        enableSorting: false,
        maxSize: 30,
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No"),
        enableColumnFilter: false,
      },
      {
        accessorKey: "deliveryOrdersComission",
        header: "Delivery Orders Commission (%)",
        enableSorting: false,
        maxSize: 220,
        enableColumnFilter: false,
      },
      {
        accessorKey: "collectionOrdersComission",
        header: "Collection Orders Commission (%)",
        enableSorting: false,
        maxSize: 220,

        enableColumnFilter: false,
      },
      {
        accessorKey: "eatInComission",
        header: "Eat-In Commission (%)",
        enableSorting: false,
        maxSize: 220,
        enableColumnFilter: false,
      },
      {
        accessorKey: "taxRate",
        header: "Tax Rate",
        enableSorting: false,
        maxSize: 30,
        enableColumnFilter: false,
      },
      {
        accessorKey: "totalOrders",
        header: "Total Orders",
        enableSorting: false,
        maxSize: 30,
        enableColumnFilter: false,
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        enableSorting: false,
        maxSize: 30,
        filterVariant: "checkbox",
        muiFilterCheckboxProps: {
          size: "large",
        },
        Cell: ({ cell }) => (
          <AppChipComponent
            value={cell.getValue<boolean>() ? "Active" : "Inactive"}
          />
        ),
      },
      {
        accessorKey: "rating",
        header: "Rating",
        enableSorting: false,
        maxSize: 30,
        Cell: ({ cell }) => <Rating value={cell.getValue<number>()} readOnly />,
      },
    ],
    [],
  );

  return (
    <MUIThemeProvider>
      <Suspense fallback={<Skeleton height={300} width="100%" />}>
        <AppGridRemoteDataFetching
          data={CustomeDetailsApiResponse?.data?.merchant ?? []}
          columnFilters={columnFilters}
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          totalRowCount={CustomeDetailsApiResponse?.data?.totalCount ?? 0}
          onColumnFiltersChange={setColumnFilters}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          isLoading={isLoading}
          OnFilterButtonClicked={() => open()}
          OnApplyFiltersClicked={() => close()}
          filterDrawerIsOpen={opened}
          enableRowSelection={true}
          isError={isError}
          tableName="MerchantsDisplay"
          crudOperationHeader="Merchant"
          columnPinning={{
            left: ["mrt-row-select", "mrt-row-actions", "merchantId"],
          }}
          uniqueIDForRows="merchantId"
          uiSchema={merchantsUISchema}
        />
      </Suspense>
    </MUIThemeProvider>
  );
};

export default DisplayCustomersGrid;
