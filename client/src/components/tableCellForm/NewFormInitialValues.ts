import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
const OrdersFormnewInitialValue = {
  merchantId: "", // Empty string for string fields
  orderId: "", // Empty string for order ID
  orderDate: dayjs().format(), // Default to null for date fields
  customerId: "", // Empty string for customer ID
  customerFirstName: "", // Empty string for first name
  customerLastName: "", // Empty string for last name
  orderType: "", // Empty string for order type
  paymentType: "", // Empty string for payment type
  paymentStatus: "", // Empty string for payment status
  confirmationStatus: "", // Empty string for confirmation status
  promoCode: "", // Empty string for promo code (can be optional)
  promoDiscountSwishr: 0, // Default to 0 for promo discount
  promoDiscountMerchant: 0,
  refundSwishr: 0,
  refundMerchant: 0,
  orderDiscount: 0, // Default to 0 for order discount
  driverTip: 0, // Default to 0 for driver tip
  deliveryCharge: 0, // Default to 0 for delivery charge
  serviceFee: 0,
  surcharge: 0,
  subTotal: 0, // Default to 0 for sub total
  taxes: 0,
  total: 0,
  branchName: "",
  status: "",
};

const CustomerFormInitialValues = {
  customerFirstName: "", // Empty string for text
  customerLastName: "", // Empty string for text
  customerEmail: "", // Empty string for text
  customerMobile: 0, // 0 for number
  customerAddress: "", // Empty string for text
  customerArea: "", // Empty string for text
  customerPost: "", // Empty string for text
  profileImg: "", // Empty string for text
  registrationDate: new Date().toISOString(), // Today's date (ISO format)
  registrationMethod: "", // Empty string for text
  dob: new Date().toISOString(), // Today's date (ISO format)
  zone: 0, // 0 for number
  merchantId: null, // 0 for number
};
const MerchantFormInitialValues = {
  merchantName: "", // Empty string for text
  merchantEmail: "", // Empty string for text
  merchantMobile: "", // Empty string for text (could be a string to handle phone numbers properly)
  merchantAddress: "", // Empty string for text
  merchantArea: "", // Empty string for text
  merchantPost: "", // Empty string for text
  logoImg: "", // Empty string for the logo image URL or path
  registrationDate: new Date().toISOString(), // Today's date (ISO format)
  registrationMethod: "", // Empty string for text
  zone: "", // Empty string for zone selection
  serviceFeeApplicable: false, // Boolean for whether service fee is applicable
  deliveryChargeApplicable: false, // Boolean for whether delivery charge is applicable
  driverTipApplicable: false, // Boolean for whether driver tip is applicable
  deliveryOrdersComission: 0, // Numeric value for delivery orders commission
  collectionOrdersComission: 0, // Numeric value for collection orders commission
  eatInComission: 0,
  taxRate: 0,
  totalOrders: 0,
};

export const NewFormInitialValues = () => {
  const { pathname } = useLocation();
  if (pathname?.includes("partners-and-customers/orders")) {
    return OrdersFormnewInitialValue;
  } else if (pathname?.includes("partners-and-customers/customers")) {
    return CustomerFormInitialValues;
  } else if (pathname?.includes("partners-and-customers/merchants")) {
    return MerchantFormInitialValues;
  }
  return {};
};
