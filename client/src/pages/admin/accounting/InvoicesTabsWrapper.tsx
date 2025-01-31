import { APPTabs } from "../../../components/CoreUI/tabs/AppTabs";
import DisplayInvoices from "./DisplayInvoices";
import GenerateInvoices from "./GenerateInvoices";
export default function OrdersTabsWrapper() {
  const tabs = [
    {
      label: "Generate Invoices",
      value: "Generate_Invoices",
      content: <GenerateInvoices />,
    },
    {
      label: "View Invoices",
      value: "View_Invoices",
      content: <DisplayInvoices></DisplayInvoices>,
    },
  ];

  return <APPTabs tabs={tabs} />;
}
