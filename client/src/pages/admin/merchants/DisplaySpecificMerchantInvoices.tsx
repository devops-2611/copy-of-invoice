import { Suspense, useMemo, useState } from "react";

import MUIThemeProvider from "../../../providers/MUIThemeProvider";
import { Skeleton } from "@mantine/core";
import AppGridRemoteDataFetching from "../../../components/CoreUI/AppGrids/AppGridRemoteDataFetching";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import dayjs from "dayjs";
import {
  MerchantInvoice,
  useGetInvoicesbyMerchantId,
} from "./hooks/useGetInvoicesbyMerchantId";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { DisplayMerchatHeaderWidget } from "./DisplayMerchatHeaderWidget";
import InvoiceDetails from "../../../components/Widgets/InvoiceParameters";

const DIsplaySpecificMerchantInvoices = () => {
  const { merchantId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading, isError } = useGetInvoicesbyMerchantId({
    merchantId,
    columnFilters,
    EnableQuery: !opened && Boolean(merchantId),
    sorting,
    pagination,
  });

  const columns = useMemo<MRT_ColumnDef<MerchantInvoice>[]>(
    () => [
      {
        accessorKey: "invoiceId",
        header: "Invoice ID",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 30,
      },
      {
        accessorKey: "fromDate",
        header: "From Date",
        enableSorting: false,
        maxSize: 50,
        accessorFn: (originalRow) => new Date(originalRow?.fromDate),
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY");
        },
        filterVariant: "date",
        muiFilterDatePickerProps: {
          label: "From Date",
          format: "DD MMM YYYY",
        },
      },
      {
        accessorKey: "toDate",
        header: "To Date",
        enableSorting: false,
        maxSize: 50,
        accessorFn: (originalRow) => new Date(originalRow?.toDate),
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY");
        },
        filterVariant: "date",
        muiFilterDatePickerProps: {
          format: "DD MMM YYYY",
          label: "To Date",
        },
      },
      {
        accessorKey: "downloadLink",
        header: "Download Link",
        enableSorting: false,
        enableColumnFilter: false,
        maxSize: 150,
        Cell: ({ cell }) => {
          const link = cell.getValue<string>();
          return link ? (
            <a href={`${link}`} target="_blank" download={`${link}`}>
              Download Invoice
            </a>
          ) : (
            "No Link Available"
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        enableSorting: true,
        enableColumnFilter: false,
        maxSize: 50,
        accessorFn: (originalRow) => new Date(originalRow?.createdAt),
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY hh:mm A");
        },
        muiFilterDateTimePickerProps: {
          label: "Created At",
        },
        meta: {
          fieldType: "DateTimeRange",
        },
      },
    ],
    [],
  );

  return (
    <MUIThemeProvider>
      <Suspense fallback={<Skeleton height={300} width="100%" />}>
        <DisplayMerchatHeaderWidget />
        <AppGridRemoteDataFetching
          data={data?.data?.invoices ?? []}
          columnFilters={columnFilters}
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          totalRowCount={data?.data?.totalCount ?? 0}
          onColumnFiltersChange={setColumnFilters}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          isLoading={isLoading}
          OnFilterButtonClicked={() => open()}
          OnApplyFiltersClicked={() => close()}
          filterDrawerIsOpen={opened}
          isError={isError}
          tableName="MerchantInvoicesData"
          crudOperationHeader="Invoices"
          columnPinning={{}}
          uniqueIDForRows="downloadLink"
          enableRowActions={false}
          muiExpandButtonProps={({ row, table }) => ({
            onClick: () =>
              table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
            sx: {
              transform: row.getIsExpanded()
                ? "rotate(180deg)"
                : "rotate(-90deg)",
              transition: "transform 0.2s",
            },
          })}
          renderDetailPanel={({ row }) =>
            row.original?.invoiceParameters ? (
              <InvoiceDetails row={row} />
            ) : null
          }
        />
      </Suspense>
    </MUIThemeProvider>
  );
};

export default DIsplaySpecificMerchantInvoices;
