import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import InvoiceEdit from "../../pages/admin/accounting/FeatureInvoiceEdit/InvoiceEdit";
import { MRT_Row } from "material-react-table";
import { Invoice } from "../../pages/admin/accounting/hooks/useGetAllInvoices";
import { useLocation } from "react-router-dom";
import { IconEdit, IconFileDownload } from "@tabler/icons-react";
const InvoiceSummaryField = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <Box>
    <Typography variant="body1" sx={{ fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {value}
    </Typography>
  </Box>
);
interface InvoiceDetails {
  row: MRT_Row<Invoice>;
}
const InvoiceDetails = (props: InvoiceDetails) => {
  const downloadLink = props.row.original?.downloadLink;
  const InvoiceParamaterObj = props.row.original?.invoiceParameters;
  const [opened, { open, close }] = useDisclosure(false);
  const { pathname } = useLocation();

  const summaryFields = [
    {
      label: "Total Sales",
      value: `£${InvoiceParamaterObj?.totalSales}`,
    },
    {
      label: "Total Orders Count",
      value: InvoiceParamaterObj?.totalOrdersCount,
    },
    {
      label: "Delivery Orders",
      value: InvoiceParamaterObj?.deliveryOrderCount,
    },
    {
      label: "Collection Orders",
      value: InvoiceParamaterObj?.collectionOrderCount,
    },
    {
      label: `Card Payments (${InvoiceParamaterObj?.cardPaymentCount}) `,
      value: `£${InvoiceParamaterObj?.cardPaymentAmount}`,
    },
    {
      label: `Cash Payments (${InvoiceParamaterObj?.cashPaymentCount})`,
      value: `£${InvoiceParamaterObj?.cashPaymentAmount}`,
    },
    {
      label: "Delivery Order Value",
      value: `£${InvoiceParamaterObj?.deliveryOrderValue}`,
    },
    {
      label: "Collection Order Value",
      value: `£${InvoiceParamaterObj?.collectionOrderValue}`,
    },
  ];

  return (
    <>
      <Box sx={{ padding: 1 }}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}
          >
            <CheckCircle sx={{ marginRight: 1 }} color="primary" />
            Invoice Summary
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 2,
              marginBottom: 2,
            }}
          >
            {summaryFields.map((field) => (
              <InvoiceSummaryField
                key={field.label}
                label={field.label}
                value={field.value}
              />
            ))}
          </Box>

          <Divider sx={{ marginTop: 2 }} />
          <Group mt={20} align="flex-end">
            {downloadLink && (
              <Button
                variant="contained"
                color="primary"
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ marginTop: 1 }}
                startIcon={<IconFileDownload />}
              >
                Download Invoice
              </Button>
            )}

            {pathname?.includes("accounting/invoices") && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => open()}
                sx={{ marginTop: 1 }}
                startIcon={<IconEdit />}
              >
                EDIT INVOICE
              </Button>
            )}
          </Group>
        </Paper>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        title=""
        fullScreen
        radius={10}
        closeButtonProps={{ iconSize: "lg" }}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <InvoiceEdit initialValues={props.row.original} closeModal={close} />
      </Modal>
    </>
  );
};
export default InvoiceDetails;
