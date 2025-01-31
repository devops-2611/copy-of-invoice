import { UISCHEMA } from "../../customers/CRUDUISchema/customersUISchema";

export const merchantsUISchema: UISCHEMA[] = [
  {
    key: "merchantId",
    name: "merchantId",
    fieldType: "Number",
    label: "Merchant ID",
    disabled: {
      disabledFieldForNew: false,
      disableFieldForEdit: true,
    },
    hidden: {
      hideFieldForEDIT: false,
      hideFieldForNEW: true,
    },
  },
  {
    key: "merchantName",
    name: "merchantName",
    fieldType: "Text",
    label: "Merchant Name",
  },
  {
    key: "merchantEmail",
    name: "merchantEmail",
    fieldType: "Text",
    label: "Email",
  },
  {
    key: "merchantMobile",
    name: "merchantMobile",
    fieldType: "Text",
    label: "Mobile",
  },
  {
    key: "merchantAddress",
    name: "merchantAddress",
    fieldType: "Text",
    label: "Address",
  },
  {
    key: "merchantArea",
    name: "merchantArea",
    fieldType: "Text",
    label: "Area",
  },
  {
    key: "merchantPost",
    name: "merchantPost",
    fieldType: "Text",
    label: "Postal Code",
  },

  {
    key: "deliveryOrdersComission",
    name: "deliveryOrdersComission",
    fieldType: "Number",
    label: "Delivery Orders Commission",
  },
  {
    key: "collectionOrdersComission",
    name: "collectionOrdersComission",
    fieldType: "Number",
    label: "Collection Orders Commission",
  },
  {
    key: "eatInComission",
    name: "eatInComission",
    fieldType: "Number",
    label: "Eat-In Commission",
  },
  {
    key: "logoImg",
    name: "logoImg",
    fieldType: "imageInput",
    label: "Logo Image",
  },
  {
    key: "registrationDate",
    name: "registrationDate",
    fieldType: "DateTimeRange",
    label: "Registration Date",
    disabled: {
      disabledFieldForNew: false,
      disableFieldForEdit: true,
    },
  },
  {
    key: "registrationMethod",
    name: "registrationMethod",
    fieldType: "Select",
    label: "Registration Method",
    meta: {
      options: [
        { label: "Online", value: "Online" },
        { label: "Web", value: "Web" },
      ],
    },
  },
  {
    key: "zone",
    name: "zone",
    fieldType: "Select",
    label: "Zone",
    meta: {
      options: [
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
  },
  {
    key: "serviceFeeApplicable",
    name: "serviceFeeApplicable",
    fieldType: "Checkbox",
    label: "Service Fee Applicable",
  },
  {
    key: "deliveryChargeApplicable",
    name: "deliveryChargeApplicable",
    fieldType: "Checkbox",
    label: "Delivery Charge Applicable",
  },
  {
    key: "driverTipApplicable",
    name: "driverTipApplicable",
    fieldType: "Checkbox",
    label: "Driver Tip Applicable",
  },
  {
    key: "isActive",
    name: "isActive",
    fieldType: "Checkbox",
    label: "Is Active",
  },
  {
    key: "taxRate",
    name: "taxRate",
    fieldType: "Number",
    label: "Tax Rate",
  },

  {
    key: "rating",
    name: "rating",
    fieldType: "Rating",
    label: "Rating",
  },
  // {
  //   key: "updatedAt",
  //   name: "updatedAt",
  //   fieldType: "DateTime",
  //   label: "Updated At",
  //   disabled: {
  //     disabledFieldForNew: true,
  //     disableFieldForEdit: true,
  //   },
  // },
];
