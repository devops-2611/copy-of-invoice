import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { object } from "yup";
interface UseValidationSchemaProps {
  formState: "VIEW" | "NEW" | "EDIT";
}
const OrdersvalidationSchema = object({
  merchantId: Yup.string().required("Merchant ID is required"),
  orderId: Yup.string().required("Order ID is required"),
  orderDate: Yup.date().required("Order Date is required"),
  customerId: Yup.string().required("Customer ID is required"),
  orderType: Yup.string().required("Order Type is required"),
  status: Yup.string()
    .when(["orderType", "confirmationStatus"], {
      is: (orderType: string, confirmationStatus: string) => {
        const lowerOrderType = orderType?.toLowerCase();
        const lowerConfirmationStatus = confirmationStatus?.toLowerCase();
        return (
          lowerOrderType === "delivery" &&
          lowerConfirmationStatus === "completed"
        );
      },
      then: (schema) =>
        schema
          .required("Status is required")
          .oneOf(
            ["DELIVERED"],
            "Invalid status based on order type and confirmation status",
          ),
      // otherwise: (schema) => schema.required("Status is Required"),
    })
    .when(["orderType", "confirmationStatus"], {
      is: (orderType: string, confirmationStatus: string) => {
        const lowerOrderType = orderType?.toLowerCase();
        const lowerConfirmationStatus = confirmationStatus?.toLowerCase();
        return (
          lowerOrderType === "collection" &&
          lowerConfirmationStatus === "completed"
        );
      },
      then: (schema) =>
        schema
          .required("Status is required")
          .oneOf(
            ["PICKED_UP"],
            "Invalid status based on order type and confirmation status",
          ),
      // otherwise: (schema) => schema.required("Status is Required"),
    }),
});
const CustomersvalidationSchemaforEDIT = Yup.object({
  merchantId: Yup.string().required("Merchant ID is required"),
  customerId: Yup.string().required("Customer ID is required"),
});
const CustomersvalidationSchemaforNEW = Yup.object({
  merchantId: Yup.string().required("Merchant ID is required"),
});

// Yup validation for creating a new merchant
const MerchantValidationSchema = Yup.object({
  merchantName: Yup.string()
    .required("Merchant name is required")
    .min(3, "Merchant name must be at least 3 characters long")
    .max(100, "Merchant name must be less than 100 characters"),

  merchantEmail: Yup.string()
    .email("Invalid email format")
    .required("Merchant email is required"),

  merchantMobile: Yup.string().required("Merchant mobile is required"),

  merchantAddress: Yup.string()
    .required("Merchant address is required")
    .min(5, "Address must be at least 5 characters long"),

  merchantArea: Yup.string()
    .required("Merchant area is required")
    .min(3, "Area must be at least 3 characters long"),

  merchantPost: Yup.string().required("Postal code is required"),
  // .matches(/^\d{5}$/, "Postal code must be exactly 5 digits"),

  registrationDate: Yup.date()
    .required("Registration date is required")
    .max(new Date(), "Registration date cannot be in the future"),

  registrationMethod: Yup.string()
    .required("Registration method is required")
    .oneOf(["Web", "Mobile", "Other", "Online"], "Invalid registration method"),

  zone: Yup.string()
    .required("Zone is required")
    .oneOf(
      [
        "Chester",
        "Manchester",
        "Birmingham",
        "Wrexham",
        "Ellesmere Port",
        "Mold",
        "London",
        "Birkenhead",
        "Wirral",
      ],
      "Invalid zone",
    ),

  serviceFeeApplicable: Yup.boolean().required(
    "Service fee applicability is required",
  ),

  deliveryChargeApplicable: Yup.boolean().required(
    "Delivery charge applicability is required",
  ),

  driverTipApplicable: Yup.boolean().required(
    "Driver tip applicability is required",
  ),

  deliveryOrdersComission: Yup.number()
    .required("Delivery order commission is required")
    .min(0, "Commission must be greater than or equal to 0"),

  collectionOrdersComission: Yup.number()
    .required("Collection order commission is required")
    .min(0, "Commission must be greater than or equal to 0"),

  eatInComission: Yup.number()
    .required("Eat-in commission is required")
    .min(0, "Commission must be greater than or equal to 0"),
});

const useValidationSchema = (props: UseValidationSchemaProps) => {
  const { formState } = props;
  const { pathname } = useLocation();
  if (
    pathname?.includes("partners-and-customers/orders") &&
    formState === "EDIT"
  ) {
    return { validationSchema: OrdersvalidationSchema };
  } else if (
    pathname?.includes("partners-and-customers/orders") &&
    formState === "NEW"
  ) {
    return { validationSchema: OrdersvalidationSchema };
  } else if (
    pathname?.includes("partners-and-customers/customers") &&
    formState == "EDIT"
  ) {
    return { validationSchema: CustomersvalidationSchemaforEDIT };
  } else if (
    pathname?.includes("partners-and-customers/customers") &&
    formState == "NEW"
  ) {
    return { validationSchema: CustomersvalidationSchemaforNEW };
  } else if (
    pathname?.includes("partners-and-customers/merchants") &&
    formState === "NEW"
  ) {
    return { validationSchema: MerchantValidationSchema };
  } else if (
    pathname?.includes("partners-and-customers/merchants") &&
    formState === "EDIT"
  ) {
    return { validationSchema: MerchantValidationSchema };
  }
  // TODO
  return { validationSchema: {} };
};
export default useValidationSchema;
