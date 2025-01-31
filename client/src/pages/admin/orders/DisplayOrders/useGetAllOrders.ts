import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import ApiHelpers from "../../../../api/ApiHelpers";
import ApiConstants from "../../../../api/ApiConstants";
import { ColumnFilter } from "@tanstack/table-core";
import dayjs from "dayjs";
import { MRT_PaginationState, MRT_SortingState } from "material-react-table";

// Enum for predefined values
enum OrderType {
  DELIVERY = "DELIVERY",
  COLLECTION = "COLLECTION",
}

enum PaymentType {
  CARD = "CARD",
  CASH = "CASH", // Assuming CASH could be a possible payment type, you can add more types
  OTHER = "OTHER", // Extend with more types if needed
}

enum PaymentStatus {
  PROCESSED = "PROCESSED",
  PENDING = "PENDING",
  FAILED = "FAILED", // Extend with more statuses if needed
}

enum ConfirmationStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING", // Add more statuses if needed
}

// Interface for an order
export interface Order {
  _id: string;
  orderId: string;
  orderDate: string;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  orderType: OrderType;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  confirmationStatus: ConfirmationStatus;
  promoCode?: string;
  orderDiscount: number;
  driverTip: number;
  deliveryCharge: number;
  serviceFee: number;
  subTotal: number;
  taxes: number;
  total: number;
  branchName: string;
  merchantId?: string;
  status: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  promoDiscountSwishr: number;
  promoDiscountMerchant: number;
  refundSwishr: number;
  refundMerchant: number;
  orderItems: string;
}

// Interface for the response from the API
interface GetAllOrdersResponse {
  orders: Order[]; // Array of orders
  currentPage: number; // Current page of the results
  totalPages: number; // Total number of pages available
  totalCount: number; // Total number of orders in the database
}

function getFormattedDayFromDayjs(dateobj: dayjs.Dayjs) {
  // date in YYYY-MM-DD format
  return dayjs(dateobj, "DD MMM YYYY hh:mm A").format(
    "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
  );
}
const allowedParammsInBAckend = [
  "merchantId",
  "pageNo",
  "limit",
  "customerId",
  "orderType",
  "paymentType",
  "confirmationStatus",
  "status",
  "paymentStatus",
  "branchName",
  "orderId",
] as const;
type AllowedParams = (typeof allowedParammsInBAckend)[number];

type Params = {
  [key in AllowedParams]?: any;
};
const ExtractedcolumnFiltersForParams = (columnFilters: ColumnFilter[]) => {
  let params: Params = {};

  columnFilters?.forEach((columnFilter) => {
    if (allowedParammsInBAckend?.includes(columnFilter.id as AllowedParams)) {
      if (Array.isArray(columnFilter.value)) {
        params[columnFilter.id as AllowedParams] =
          columnFilter.value?.join(",");
      } else {
        params[columnFilter.id as AllowedParams] = columnFilter.value;
      }
    }
  });
  return params;
};
const formatSortForParams = (sorting: MRT_SortingState) => {
  let sort = "";
  const columnID = sorting?.[0]?.id;
  const sortDirection = sorting?.[0]?.desc;
  if (columnID === "customerFirstName" && !sortDirection) {
    sort = "ascFirstName";
  } else if (columnID === "customerFirstName" && sortDirection) {
    sort = "descFirstName";
  } else if (columnID === "customerLastName" && !sortDirection) {
    sort = "ascLastName";
  } else if (columnID === "customerLastName" && sortDirection) {
    sort = "descLastName";
  } else if (columnID === "orderDate" && !sortDirection) {
    sort = "ascOrder";
  } else if (columnID === "orderDate" && sortDirection) {
    sort = "descOrder";
  }
  if (sort) {
    return { sort };
  }
};
const formatDateForParams = (columnFilters: ColumnFilter[]) => {
  let startDate = "";
  let endDate = "";
  const getDateColumn = columnFilters?.find(
    (column) => column.id === "orderDate",
  );
  if (getDateColumn && Array.isArray(getDateColumn?.value)) {
    startDate = getDateColumn?.value[0]
      ? getFormattedDayFromDayjs(getDateColumn?.value[0])
      : "";
    endDate = getDateColumn?.value[1]
      ? getFormattedDayFromDayjs(getDateColumn?.value[1])
      : "";
  }
  if (startDate || endDate) {
    return { startDate, endDate };
  }
};
function fetchOrders(
  columnFilters: ColumnFilter[],
  sorting: MRT_SortingState,
  pagination: MRT_PaginationState,
): Promise<AxiosResponse<GetAllOrdersResponse>> {
  const finalQueryParams = {
    merchantId: null,
    pageNo: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...formatSortForParams(sorting),
    ...ExtractedcolumnFiltersForParams(columnFilters),
    ...formatDateForParams(columnFilters),
  };
  return ApiHelpers.GET(ApiConstants.GET_ALL_ORDERS(), {
    params: finalQueryParams,
  });
}
interface GEtAllOrdersProps {
  columnFilters: ColumnFilter[];
  EnableQuery: boolean;
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
}
export const useGETALLOrdersWithFilters = (props: GEtAllOrdersProps) => {
  const { columnFilters, EnableQuery, sorting, pagination } = props;
  const queryKey = ["Orders-Grid-data", columnFilters, sorting, pagination];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchOrders(columnFilters, sorting, pagination),
    placeholderData: keepPreviousData,
    enabled: EnableQuery,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
