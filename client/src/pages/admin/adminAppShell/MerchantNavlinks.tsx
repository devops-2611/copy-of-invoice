import {
  IconDashboard,
  IconShoppingCart,
  IconChartLine,
  IconFileInvoice,
  IconCreditCard,
  IconSettings,
  IconPlug,
  IconMessageCircle,
  IconStar,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import { FinalAdminNavlinks } from "./AdminNavlinks";

export const merchantNavLinks: FinalAdminNavlinks[] = [
  {
    label: "Dashboard",
    icon: IconDashboard, // General dashboard icon
    path: "dashboard",
  },
  {
    label: "Orders",
    icon: IconShoppingCart, // Represents orders
    path: "orders",
  },
  {
    label: "Sales / Commissions",
    icon: IconChartLine, // Represents sales analytics
    path: "merchant/sales-commissions",
  },
  {
    label: "Documents",
    icon: IconFileInvoice, // Represents document management
    path: "merchant/documents",
  },
  {
    label: "Invoices",
    icon: IconCreditCard, // Represents financials
    path: "invoices",
  },
  {
    label: "Settings",
    icon: IconSettings, // General settings icon
    path: "merchant/settings",
  },
  {
    label: "Integrations",
    icon: IconPlug, // Represents integrations
    path: "merchant/settings/integrations",
  },
  {
    label: "Reviews",
    icon: IconMessageCircle, // Represents reviews
    path: "merchant/settings/reviews",
  },
  {
    label: "Marketing & Promotions",
    icon: IconStar, // Represents marketing and promotions
    path: "merchant/marketing-promotions",
  },
  {
    label: "Users & Roles",
    icon: IconUserCircle, // Represents user management
    path: "merchant/users-roles",
  },
  {
    label: "Customers",
    icon: IconUsers, // Represents customers
    path: "merchant/customers",
  },
];
