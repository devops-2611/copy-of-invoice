import { useEffect, useRef } from "react";
import { Formik, Form, FormikProps, useFormikContext } from "formik";
import {
  Button,
  Group,
  Paper,
  Stack,
  Title,
  Box,
  Table,
  ActionIcon,
  LoadingOverlay,
} from "@mantine/core";

import { Invoice } from "../hooks/useGetAllInvoices";
import FormikDatePickerField from "../../../../components/CoreUI/FormikFields/FormikDateField";
import FormikNumberField from "../../../../components/CoreUI/FormikFields/FormikNumberField";
import { TableContainer, Typography } from "@mui/material";
import FormikInputField from "../../../../components/CoreUI/FormikFields/FormikInputField";
import { IconTrash } from "@tabler/icons-react";
import { useUpdateInvoice } from "../hooks/useUpdateInvoice";
function DescriptionAndAmountTable() {
  const { values, setFieldValue } = useFormikContext<Invoice>();
  const handleDeleteRow = (index: number) => {
    setFieldValue("invoiceParameters", {
      ...values?.invoiceParameters,
      calculationsByOrderType: {
        ...values?.invoiceParameters?.calculationsByOrderType,
        MISCELLANEOUS:
          values?.invoiceParameters?.calculationsByOrderType?.MISCELLANEOUS?.filter(
            (_, i) => i !== index
          ) ?? [],
      },
    });
  };
  const handleAddRow = () =>
    setFieldValue("invoiceParameters", {
      ...values?.invoiceParameters,
      calculationsByOrderType: {
        ...values?.invoiceParameters?.calculationsByOrderType,
        MISCELLANEOUS: [
          ...(values?.invoiceParameters?.calculationsByOrderType
            ?.MISCELLANEOUS ?? []),
          {
            amount: 0,
            text: "",
          },
        ],
      },
    });

  const { calculationsByOrderType, validItem } = values.invoiceParameters;

  const rows = [
    ...Object.entries(calculationsByOrderType).map(([orderType, data]) => {
      let description = <></>;
      if (orderType === "COLLECTION") {
        description = (
          <Group>
            <Typography>
              {`${data.commissionRate}% Commission on Collection Orders value £${data.totalOrderValue}`}
            </Typography>
          </Group>
        );
      } else if (orderType === "DELIVERY") {
        description = (
          <Group>
            <Typography>
              {`${data.commissionRate}% Commission on Delivery Orders value £${data.totalOrderValue}`}
            </Typography>{" "}
          </Group>
        );
      } else if (orderType === "SERVICE_FEE" && !data.isCashOrders) {
        description = (
          <Typography>Service Fee Paid ({data.totalOrders} Orders)</Typography>
        );
      } else if (orderType === "SERVICE_FEE" && data.isCashOrders) {
        description = (
          <Typography>
            Service Fee Paid By Cash Orders ({data.totalOrders} Orders)
          </Typography>
        );
      } else if (orderType === "DELIVERY_CHARGE" && !data.isCashOrders) {
        description = (
          <Typography>Delivery Charge ({data.totalOrders} Orders)</Typography>
        );
      } else if (orderType === "DELIVERY_CHARGE" && data.isCashOrders) {
        description = (
          <Typography>
            Delivery Charge Paid By Cash Orders ({data.totalOrders} Orders)
          </Typography>
        );
      } else if (orderType === "DRIVER_TIP") {
        description = (
          <Typography>Driver Tip ({data.totalOrders} Orders)</Typography>
        );
      } else if (orderType === "MISCELLANEOUS") {
        return null;
      }

      return (
        <Table.Tr key={orderType}>
          <Table.Td>{description}</Table.Td>
          <Table.Td>
            <FormikNumberField
              name={`invoiceParameters.calculationsByOrderType.${orderType}.amount`}
              label=""
              extraProps={{ prefix: "£", maw: "100px" }}
            />
          </Table.Td>
        </Table.Tr>
      );
    }),
    ...(values?.invoiceParameters?.calculationsByOrderType?.MISCELLANEOUS &&
    values?.invoiceParameters?.calculationsByOrderType?.MISCELLANEOUS?.length >
      0
      ? values.invoiceParameters.calculationsByOrderType.MISCELLANEOUS.map(
          (item, index) => (
            <Table.Tr key={`MISCELLANEOUS ${index}`}>
              <Table.Td>
                <Group>
                  <ActionIcon color="red" variant="subtle" onClick={(event) => handleDeleteRow(index)}>
                    <IconTrash />
                  </ActionIcon>
                  <FormikInputField
                    name={`invoiceParameters.calculationsByOrderType.MISCELLANEOUS[${index}].text`}
                    label={""}
                  ></FormikInputField>
                </Group>
              </Table.Td>
              <Table.Td>
                <FormikNumberField
                  name={`invoiceParameters.calculationsByOrderType.MISCELLANEOUS[${index}].amount`}
                  label=""
                  extraProps={{ prefix: "£", maw: "100px" }}
                />
              </Table.Td>
            </Table.Tr>
          )
        )
      : []),
    ...(validItem.length > 0
      ? validItem.map((item) => (
          <Table.Tr key={item._id}>
            <Table.Td>
              <Typography>
                {" "}
                {`${item.itemName}, ${item.totalQuantity} Qty (Remaining £${item.balanceAmount.toFixed(
                  2
                )})`}
              </Typography>
            </Table.Td>
            <Table.Td>
              <FormikNumberField
                name={`invoiceParameters.validItem[${item._id}].deductableAmount`}
                label=""
                extraProps={{ prefix: "£", maw: "100px" }}
              />
            </Table.Td>
          </Table.Tr>
        ))
      : []),
  ];

  const ths = (
    <Table.Tr>
      <Table.Th>Description</Table.Th>
      <Table.Th>Amount</Table.Th>
    </Table.Tr>
  );

  return (
    <TableContainer>
      <Table
        captionSide="bottom"
        withColumnBorders
        withRowBorders
        withTableBorder
        borderColor="black"
        mt={20}
      >
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Button onClick={() => handleAddRow()} mt={10} variant="outline">
        Add Row in the table
      </Button>
    </TableContainer>
  );
}

function SummaryTable() {
  const rows = [
    <Table.Tr key={"totalOrdersCount"}>
      <Table.Td>
        <Typography>Total Orders</Typography>
      </Table.Td>
      <Table.Td>
        <FormikNumberField
          name="invoiceParameters.totalOrdersCount"
          label=""
          extraProps={{ maw: "100px" }}
        />
      </Table.Td>
    </Table.Tr>,
    <Table.Tr key={"deliveryOrderCount"}>
      <Table.Td>
        <Typography>Delivery Orders</Typography>
      </Table.Td>
      <Table.Td>
        <FormikNumberField
          name="invoiceParameters.deliveryOrderCount"
          label=""
          extraProps={{ maw: "100px" }}
        />
      </Table.Td>
    </Table.Tr>,
    <Table.Tr key={"collectionOrderCount"}>
      <Table.Td>
        <Typography>Collection Orders</Typography>
      </Table.Td>
      <Table.Td>
        <FormikNumberField
          name="invoiceParameters.collectionOrderCount"
          label=""
          extraProps={{ maw: "100px" }}
        />
      </Table.Td>
    </Table.Tr>,
    <Table.Tr key={"cardPaymentAmount"}>
      <Table.Td>
        <Group>
          <FormikNumberField
            name="invoiceParameters.cardPaymentCount"
            label=""
            extraProps={{ maw: "100px" }}
          />{" "}
          <Typography>Card Payments</Typography>
        </Group>
      </Table.Td>
      <Table.Td>
        <FormikNumberField
          name="invoiceParameters.cardPaymentAmount"
          label=""
          extraProps={{ prefix: "£", maw: "100px" }}
        />
      </Table.Td>
    </Table.Tr>,
    <Table.Tr key={"cashPaymentAmount"}>
      <Table.Td>
        <Group>
          <FormikNumberField
            name="invoiceParameters.cashPaymentCount"
            label=""
            extraProps={{ maw: "100px" }}
          />{" "}
          <Typography>
            Cash Payments (Including Service & Delivery Charges)
          </Typography>
        </Group>{" "}
      </Table.Td>
      <Table.Td>
        <FormikNumberField
          name="invoiceParameters.cashPaymentAmount"
          label=""
          extraProps={{ prefix: "£", maw: "100px" }}
        />
      </Table.Td>
    </Table.Tr>,
    <Table.Tr key={"totalSales"}>
      <Table.Td>
        <Typography>Total Sales</Typography>
      </Table.Td>
      <Table.Td>
        <FormikNumberField
          name="invoiceParameters.totalSales"
          label=""
          extraProps={{ prefix: "£", maw: "100px" }}
        />
      </Table.Td>
    </Table.Tr>,
  ];

  return (
    <>
      <Title order={4} mt={20} mb={10} m={"auto"}>
        Summary Table
      </Title>
      <Table
        withColumnBorders
        withRowBorders
        withTableBorder
        borderColor="black"
      >
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
interface InvoiceEditProps {
  initialValues: Invoice;
  closeModal: () => void;
}
const InvoiceEdit = (props: InvoiceEditProps) => {
  const { closeModal, initialValues } = props;
  const FormikRef = useRef<FormikProps<Invoice>>(null);
  const {
    mutateAsync: SubmitEditedValues,
    isPending,
    isSuccess,
  } = useUpdateInvoice();
  const handleSubmit = (values: Invoice) => {
    SubmitEditedValues({ updates: values });
  };
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  return (
    <Paper p="xl" shadow="sm" withBorder w={"100%"} pos="relative">
      <Formik<Invoice>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        innerRef={FormikRef}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Stack w={"100%"}>
              <Title order={5} ta="center" mb={20} c="grey">
                Invoice Id: {values?.invoiceId}
              </Title>
              <Box>
                <FormikDatePickerField
                  name="invoiceParameters.invoiceDate"
                  label="Invoice Date"
                />
              </Box>
              <Group>
                <FormikDatePickerField name="fromDate" label="From Date" />
                <FormikDatePickerField name="toDate" label="To Date" />
              </Group>
              <DescriptionAndAmountTable />

              <SummaryTable />
              <Title order={4} mt={20} mb={10} m={"auto"}>
                Account Section
              </Title>
              <Group>
                <FormikNumberField
                  name="invoiceParameters.openingBalance"
                  label="Opening Balance"
                  extraProps={{ prefix: "£" }}
                />
                <FormikNumberField
                  name="invoiceParameters.closingBalance"
                  label="Closing Balance"
                  extraProps={{ prefix: "£" }}
                />
                <FormikNumberField
                  name="invoiceParameters.currentInvoiceCount"
                  label="Current Invoice Count"
                />
              </Group>

              <Group grow gap={"md"} mt={20}>
                <Button type="submit" loading={isPending}>
                  Submit
                </Button>
                <Button type="reset" variant="outline" disabled={isPending}>
                  Reset
                </Button>
              </Group>
            </Stack>
          </Form>
        )}
      </Formik>
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Paper>
  );
};

export default InvoiceEdit;
