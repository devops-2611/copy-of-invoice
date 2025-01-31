import { FC, useEffect, useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Title,
  Notification,
  LoadingOverlay,
} from "@mantine/core";
import FormikCheckBoxField from "../../../components/CoreUI/FormikFields/FormikCheckBoxField";
import FormikDateRange from "../../../components/CoreUI/FormikFields/FormikDateRange";
import MutliSelectMerchantIds from "./MutliSelectMerchantIds";
import {
  GeneratedInvoiceDetails,
  useGenerateInvoiceByMerchantIdAndDate,
} from "./hooks/useGenerateInvoiceByMerchantIdAndDate";
import * as Yup from "yup";
import { modals } from "@mantine/modals";
import { OnlyDisplayTable } from "../../../components/CoreUI/OnlyDisplayTable";
import { IconCheck } from "@tabler/icons-react";
interface GenerateInvoiceForm {
  merchantIds: string[];
  isLastWeek: boolean;
  dateRange: null[] | Date[];
}

const GenerateInvoicesValidationSchema = Yup.object({
  merchantIds: Yup.array()
    .of(Yup.string().required("Merchant ID is required"))
    .min(1, "At least one Merchant ID must be selected")
    .required("Merchant IDs are required"),

  // isLastWeek: Yup.boolean().required(
  //   "Selection of the last week option is required"
  // ),

  dateRange: Yup.array()
    .min(2, "Date Range is Required")
    .max(2, "Date Range is Required")
    .when("isLastWeek", {
      is: true,
      then: (schema) => schema.nullable("Should be Null"),
      otherwise: (schema) =>
        schema.required("required").nonNullable("Should not be Null "),
    }),
});

function extractNumbersInBrackets(arr: string[]) {
  return arr
    .map((item) => {
      const match = RegExp(/\((\d+)\)/).exec(item); // Regular expression to find numbers inside brackets
      return match ? match[1] : null; // Return the number if found, otherwise null
    })
    .filter((number) => number !== null)
    ?.join(","); // Filter out null values
}

const getPayloadReadyValues = (values: GenerateInvoiceForm) => {
  if (values?.isLastWeek) {
    let FinalPayload = {
      merchantIds: extractNumbersInBrackets(values?.merchantIds),
      lastWeek: values?.isLastWeek,
    };
    return FinalPayload;
  }
  let FinalPayload = {
    merchantIds: extractNumbersInBrackets(values?.merchantIds),
    lastWeek: values?.isLastWeek,
    startDate: values?.dateRange[0] ? values?.dateRange[0] : null,
    endDate: values?.dateRange[1] ? values?.dateRange[1] : null,
  };
  return FinalPayload;
};
const columns: Record<string, keyof GeneratedInvoiceDetails> = {
  "Merchant ID": "merchantId",
  Message: "message",
  Status: "status",
};

const GenerateInvoices: FC = () => {
  const {
    mutate: GenerateInvoice,
    isPending: IsSubmittingToGenerateInvoice,
    isSuccess: IsSuccessInGeneratingInvoice,
    data: GenerateAPIDataResponse,
  } = useGenerateInvoiceByMerchantIdAndDate();

  const FormikRef = useRef<FormikProps<GenerateInvoiceForm>>(null);
  useEffect(() => {
    if (IsSuccessInGeneratingInvoice && GenerateAPIDataResponse?.data) {
      modals.open({
        title: (
          <Notification
            icon={<IconCheck />}
            color="teal"
            title={GenerateAPIDataResponse?.data?.message ?? "Details"}
            mt="md"
            withCloseButton={false}
            styles={{ root: { boxShadow: "none" } }}
          ></Notification>
        ),
        children: (
          <OnlyDisplayTable<GeneratedInvoiceDetails>
            data={GenerateAPIDataResponse?.data?.invoices}
            headers={["Merchant ID", "Message", "Status"]}
            columnsMapping={columns}
            uniqueKeyInRows="merchantId"
          />
        ),
        size: "lg",
      });
    }
    return () => {
      modals.closeAll();
    };
  }, [IsSuccessInGeneratingInvoice]);
  const handleSubmit = (values: GenerateInvoiceForm) => {
    GenerateInvoice(getPayloadReadyValues(values));
  };
  return (
    <Container size="sm" mt={30}>
      <Paper p="xl" shadow="sm" withBorder pos={"relative"}>
        <Title order={5} ta="center" mb={20} c="grey">
          Select Merchant Id and Date Range to generate Invoice
        </Title>
        <Formik<GenerateInvoiceForm>
          initialValues={{
            merchantIds: [],
            isLastWeek: false,
            dateRange: [],
          }}
          validationSchema={GenerateInvoicesValidationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          innerRef={FormikRef}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Stack>
                <Stack gap={"xs"}>
                  <MutliSelectMerchantIds name="merchantIds" />
                </Stack>
                <Group gap={"lg"} grow align="flex-start">
                  <FormikDateRange
                    name="dateRange"
                    label="Select Date Range"
                    disabled={values?.isLastWeek}
                  />
                  <FormikCheckBoxField
                    name="isLastWeek"
                    label="Last Week"
                    OnChangeHandler={(event) => {
                      setFieldValue("isLastWeek", event.target.checked);
                      if (event.target.checked) {
                        setFieldValue("dateRange", [null, null]);
                      }
                    }}
                  />
                </Group>
                <Group grow gap={"md"} mt={20}>
                  <Button
                    type="submit"
                    disabled={IsSubmittingToGenerateInvoice}
                    loading={IsSubmittingToGenerateInvoice}
                  >
                    Submit
                  </Button>
                  <Button type="reset" variant="outline">
                    Reset
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
        <LoadingOverlay
          visible={IsSubmittingToGenerateInvoice}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </Paper>
    </Container>
  );
};
export default GenerateInvoices;
