import { notifications } from "@mantine/notifications";
import { red, yellow, green, blue, grey, amber } from "@mui/material/colors";
import axios, { AxiosError } from "axios";

type ChipAllowedValues = {
  backgroundColor: string;
  textColor: string; // Optional: Use to define text color for contrast
};

interface MyObject {
  [key: string]: ChipAllowedValues;
}
interface AxiosRequestError {
  message: string;
  code?: string;
  config?: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    data?: any;
  };
}
export const getChipColor = (value: string): ChipAllowedValues => {
  const ChipColor: MyObject = {
    ABANDONED: { backgroundColor: grey[600], textColor: "white" },
    PENDING: { backgroundColor: amber[500], textColor: "black" },
    ACCEPTED: { backgroundColor: blue[300], textColor: "white" },
    READY_TO_PICK_UP: { backgroundColor: blue[500], textColor: "white" },
    SEARCHING_FOR_DRIVER: { backgroundColor: green[300], textColor: "white" },
    DRIVER_ACCEPTED: { backgroundColor: green[400], textColor: "white" },
    DRIVER_ON_THE_WAY: { backgroundColor: green[700], textColor: "white" },
    DRIVER_ARRIVED: { backgroundColor: green[900], textColor: "white" },
    PICKED_UP: { backgroundColor: blue[700], textColor: "white" },
    ON_THE_WAY_TO_CUSTOMER: { backgroundColor: green[600], textColor: "white" },
    ARRIVED_AT_CUSTOMER: { backgroundColor: blue[900], textColor: "white" },
    FAILED: { backgroundColor: red[500], textColor: "white" },
    CANCELLED: { backgroundColor: red[700], textColor: "white" },
    REFUNDED: { backgroundColor: yellow[800], textColor: "black" },
    PARTIALLY_REFUNDED: { backgroundColor: yellow[500], textColor: "black" },
    DELIVERED: { backgroundColor: green[700], textColor: "white" },
    ACTIVE: { backgroundColor: green[700], textColor: "white" },
    SUCCESS: { backgroundColor: green[700], textColor: "white" },
    INACTIVE: { backgroundColor: yellow[800], textColor: "black" },
    UNPAID: { backgroundColor: yellow[800], textColor: "black" },
  };

  const formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  return (
    ChipColor[formattedValue] || {
      backgroundColor: grey[500],
      textColor: "white",
    } // Default color
  );
};
export function getValueofKeyFromObject<T>(obj: T, accessor: string): any {
  const keys = accessor.split(".");
  let result: any = obj;
  for (let key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }

  return result;
}

export const getErrorNotificationContent = (
  error: AxiosError<{ message: string } | AxiosRequestError>,
) => {
  let title = "Unexpected error";
  let message = error.message;

  if (error.response) {
    title = "Request Failed";
    message = error.response.data?.message ?? "Something went wrong";
  } else if (error.request) {
    title = "Axios Request Error";
    message = error.request ?? "Request failed";
  }

  return { title, message };
};

export const displayRelevantErrorNotification = (error: Error) => {
  if (axios.isAxiosError(error)) {
    const { title, message } = getErrorNotificationContent(error);
    notifications.show({
      title,
      message,
      color: "red",
      autoClose: 5000,
    });
  } else {
    console.error("Non-Axios error:", error);
  }
};
