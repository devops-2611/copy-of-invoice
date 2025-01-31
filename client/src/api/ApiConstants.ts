const ApiConstants = {
  //POST API
  REGISTER_USER: () => `/api/auth/register`,
  LOGIN_USER: () => `/api/auth/login`,
  UPLOAD_CSV: () => `/api/invoice/uploadAndGetInvoiceData`,
  UPLOAD_AND_GET_INVOICE_DATA: () => `/api/invoice/uploadAndGetInvoiceData`,
  SAVE_INVOICE_DATA: () => `/api/invoice/saveInvoiceData`,
  UPLOAD_AND_PARSE_DOCUMENT: () => "/api/order/uploadAndParseDocument",
  CREATE_ORDER_MANUALLY: () => "/api/order/addOrders",
  GENERATE_INVOICE_BY_MERCHANTID_AND_DATE_RANGE: () =>
    `api/invoice/generateInvoiceByMerchantIds`,

  // Customers
  ADD_CUSTOMER_DETAILS_MANUALLY: () => `api/customer/add-customer`,
  // Merchants
  ADD_MERCHANT_DETAILS_MANUALLY: () => `api/merchant/add-merchant`,
  //GET API
  CHECK_AUTH: () => `/api/auth/checkAuth`,
  GET_ALL_USERS: () => `/api/auth/getAllUsers`,
  GET_ALL_CUSTOMERS: () => "/api/customer/getAllCustomerList",
  GET_CUSTOMER_CONFIG: (id: string) => `/api/customer/getCustomerById/${id}`,
  GET_ALL_ORDERS: () => `/api/order/getAllOrders`,

  GET_CUSTOMER_DETAILS: () => `api/customer/getAllCustomerDetails`,
  GET_MERCHANT_DETAILS: () => `api/merchant/getAllMerchantDetails`,
  GET_MERCHANT_DETAILS_BY_ID: (id: string) =>
    `api/merchant/getMerchantDetailsById/${id}`,
  GET_MERCHANT_ID_AND_MERCHANT_NAME: (searchQuery: string) =>
    `api/merchant/searchMerchant?searchQuery=${searchQuery}`,
  GET_MERCHANT_INVOICES_BY_ID: () => `api/invoice/getInvoicesByMerchantId`,
  GET_ALL_INVOICES_DETAILS: () => `api/invoice/getAllInvoices`,

  //PUT API
  UPDATE_ORDER_BY_ID: () => `/api/order/updateOrder/`,
  UPDATE_CUSTOMER_BY_ID: () => `/api/customer/edit-customer`,
  UPDATE_MERCHANT_BY_ID: () => `api/merchant/edit-merchant`,
  EDIT_MERCHANT_INVOICE: () => `api/invoice/edit-invoice`,

  //DELETE API
  DELETE_ORDER_BY_ID: (orderIds: string) =>
    `/api/order/deleteOrder?id=${orderIds}`,
  DELETE_CUSTOMERS_BY_IDS: (customerIds: string) =>
    `/api/customer/delete-customer?id=${customerIds}`,
  DELETE_MERCHANTS_BY_IDS: (merchantIds: string) =>
    `/api/merchant/delete-merchant?id=${merchantIds}`,
  DELETE_INVOICE_BY_IDS: (invoiceIds: string) =>
    `/api/invoice/delete-invoice?invoiceId=${invoiceIds}`,
};

export default ApiConstants;
