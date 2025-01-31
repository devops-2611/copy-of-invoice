import { Collections, DeliveryDining, MoneyOff } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  IconCreditCardPay,
  IconCurrencyEuro,
  IconTruckDelivery,
} from "@tabler/icons-react";

const TextWithIcon = ({
  renderedCellValue,
}: {
  renderedCellValue: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
      }}
    >
      {renderedCellValue === "CASH" && <IconCurrencyEuro />}
      {renderedCellValue === "CARD" && <IconCreditCardPay />}
      {renderedCellValue === "DELIVERY" && <IconTruckDelivery />}
      {renderedCellValue === "COLLECTION" && <Collections />}
      <span>{renderedCellValue}</span>
    </Box>
  );
};

export default TextWithIcon;
