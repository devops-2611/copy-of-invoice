import { Suspense, useMemo, useState } from "react";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import { useDisclosure } from "@mantine/hooks";
import { Center, Loader, Skeleton, Switch } from "@mantine/core";
import dayjs from "dayjs";
import AppGridRemoteDataFetching from "../../../components/CoreUI/AppGrids/AppGridRemoteDataFetching";
import MUIThemeProvider from "../../../providers/MUIThemeProvider";
import { Invoice, useGetAllInvoices } from "./hooks/useGetAllInvoices";
import InvoiceDetails from "../../../components/Widgets/InvoiceParameters";
import { useUpdateInvoice } from "./hooks/useUpdateInvoice";
import { IconCheck, IconX } from "@tabler/icons-react";

const DisplayInvoices = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: AllInvoicesDetailsApiResponse,
    isError,
    isLoading,
  } = useGetAllInvoices({
    columnFilters: columnFilters,
    EnableQuery: !opened,
    sorting: sorting,
    pagination: pagination,
  });
  const {
    mutateAsync: SubmitEditedValues,
    isPending,
    variables,
  } = useUpdateInvoice();
  const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
    () => [
      {
        accessorKey: "merchantId",
        header: "Merchant ID",
        enableColumnFilter: true,
        enableSorting: false,
        maxSize: 100,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        accessorFn: (originalRow) => new Date(originalRow?.createdAt),
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY");
        },
        enableColumnFilter: false,
        maxSize: 150,
      },
      {
        accessorKey: "fromDate",
        header: "From Date",
        accessorFn: (originalRow) => new Date(originalRow?.fromDate),
        enableSorting: false,
        filterVariant: "date",
        muiFilterDatePickerProps: {
          label: "From Date",
          format: "DD MMM YYYY",
        },
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY");
        },
        maxSize: 150,
      },
      {
        accessorKey: "toDate",
        header: "To Date",
        maxSize: 150,
        enableSorting: false,
        accessorFn: (originalRow) => new Date(originalRow?.toDate),
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return dayjs(date).format("DD MMM YYYY");
        },
        filterVariant: "date",
        muiFilterDatePickerProps: {
          label: "To Date",
          format: "DD MMM YYYY",
        },
      },

      {
        accessorKey: "invoiceId",
        header: "Invoice ID",
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell, row }) => {
          if (cell.getValue()) {
            return (
              <Center>
                {isPending &&
                variables?.updates?.invoiceId === row.original.invoiceId ? (
                  <Loader size="sm" />
                ) : (
                  <Switch
                    size="lg"
                    checked={cell.getValue() === "PAID"}
                    onLabel="PAID"
                    offLabel="UNPAID"
                    thumbIcon={
                      cell.getValue() === "PAID" ? (
                        <IconCheck
                          size={12}
                          color="var(--mantine-color-teal-6)"
                          stroke={3}
                        />
                      ) : (
                        <IconX
                          size={12}
                          color="var(--mantine-color-red-6)"
                          stroke={3}
                        />
                      )
                    }
                    styles={{ trackLabel: { width: "40px", fontSize: "xl" } }}
                    onChange={(event) => {
                      SubmitEditedValues({
                        updates: {
                          ...row?.original,
                          status: event.currentTarget.checked
                            ? "PAID"
                            : "UNPAID",
                        },
                      });
                    }}
                  />
                )}
              </Center>
            );
          } else {
            return undefined;
          }
        },
        enableColumnFilter: true,
        filterVariant: "autocomplete",
        filterSelectOptions: [
          { value: "PAID", label: "PAID" },
          { value: "UNPAID", label: "UNPAID" },
        ],
        enableSorting: false,
      },
      {
        accessorKey: "downloadLink",
        header: "Download Link",
        enableSorting: false,
        enableColumnFilter: false,
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
    ],
    [isPending]
  );

  return (
    <MUIThemeProvider>
      <Suspense fallback={<Skeleton height={300} width="100%" />}>
        <AppGridRemoteDataFetching
          data={AllInvoicesDetailsApiResponse?.data?.invoices ?? []}
          columnFilters={columnFilters}
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          totalRowCount={AllInvoicesDetailsApiResponse?.data?.totalCount ?? 0}
          onColumnFiltersChange={setColumnFilters}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          isLoading={isLoading}
          OnFilterButtonClicked={() => open()}
          OnApplyFiltersClicked={() => close()}
          filterDrawerIsOpen={opened}
          enableRowSelection={false}
          isError={isError}
          tableName="AllInvoicesDisplay"
          crudOperationHeader="Invoices"
          columnPinning={{
            left: ["mrt-row-select"],
          }}
          uniqueIDForRows="invoiceId"
          //   uiSchema={customersUISchema}
          enableRowActions={false}
          muiExpandButtonProps={({ row, table }) => ({
            onClick: () =>
              table.setExpanded({ [row.id]: !row.getIsExpanded() }),
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
            ) : undefined
          }
        />
      </Suspense>
    </MUIThemeProvider>
  );
};

export default DisplayInvoices;
