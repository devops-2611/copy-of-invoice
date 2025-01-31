export interface UISCHEMA {
  key: string;
  name: string;
  fieldType: string;
  label: string;
  disabled?: {
    disableFieldForEdit?: boolean;
    disabledFieldForNew?: boolean;
  };
  hidden?: {
    hideFieldForNEW?: boolean;
    hideFieldForEDIT?: boolean;
  };
  meta?: {
    editable?: boolean;
    options?: { value: string | boolean; label: string }[];
    hideinNew?: boolean;
    DisableInNew?: boolean;
  };
}

export const customersUISchema: UISCHEMA[] = [
  {
    key: "customerId",
    name: "customerId",
    fieldType: "Number",
    label: "Customer ID",
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
    key: "merchantId",
    name: "merchantId",
    fieldType: "Number",
    label: "Merchant ID",
  },
  {
    key: "customerFirstName",
    name: "customerFirstName",
    fieldType: "Text",
    label: "First Name",
  },
  {
    key: "customerLastName",
    name: "customerLastName",
    fieldType: "Text",
    label: "Last Name",
  },
  {
    key: "customerEmail",
    name: "customerEmail",
    fieldType: "Text",
    label: "Email",
  },
  {
    key: "customerMobile",
    name: "customerMobile",
    fieldType: "Text",
    label: "Mobile",
  },
  {
    key: "customerAddress",
    name: "customerAddress",
    fieldType: "Text",
    label: "Address",
  },
  {
    key: "customerArea",
    name: "customerArea",
    fieldType: "Text",
    label: "Area",

    meta: {},
  },
  {
    key: "customerPost",
    name: "customerPost",
    fieldType: "Text",
    label: "Postal Code",
  },
  {
    key: "customerDOB",
    name: "customerDOB",
    fieldType: "Date",
    label: "Date of Birth",
  },
  //   registrationMethod
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
    disabled: {
      disabledFieldForNew: false,
      disableFieldForEdit: true,
    },
    meta: {
      options: [{ label: "Web", value: "Web" }],
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
    key: "profileImg",
    name: "profileImg",
    fieldType: "imageInput",
    label: "Profile Image",
  },
];
