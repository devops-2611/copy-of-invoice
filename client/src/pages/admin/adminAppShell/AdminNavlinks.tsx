import {
  IconMap,
  IconChartLine,
  IconShoppingCart,
  IconDiscount2,
  IconBriefcase,
  IconCreditCard,
  IconMessages,
  IconBuilding,
  IconDashboard,
  IconUser,
  IconAffiliate,
  IconBell,
  IconCar,
  IconChartBar,
  IconCrown,
  IconDiscount,
  IconExchange,
  IconFileInvoice,
  IconInbox,
  IconLayout,
  IconList,
  IconMail,
  IconMailFast,
  IconMessage,
  IconMessageCircle,
  IconPercentage,
  IconSettings,
  IconStar,
  IconTruck,
  IconTruckDelivery,
  IconUserCircle,
  IconWallet,
  IconPhone,
  IconToolsKitchen2,
  IconProps,
  Icon,
} from "@tabler/icons-react";
export interface NavlinksArray {
  label: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  path: string;
}
export interface FinalAdminNavlinks extends NavlinksArray {
  submenu?: NavlinksArray[];
}
export const superAdminNavlinks: FinalAdminNavlinks[] = [
  {
    label: "Dashboard",
    icon: IconDashboard, // General dashboard icon
    path: "admin/dashboard",
  },
  {
    label: "Partners & Customers",
    icon: IconBuilding, // Represents organizations or partnerships
    path: "admin/partners-and-customers",
    submenu: [
      {
        label: "Businesses",
        icon: IconBriefcase,
        path: "partners-and-customers/businesses",
      },
      {
        label: "Customers",
        icon: IconUser,
        path: "partners-and-customers/customers",
      },
      {
        label: "Merchants",
        icon: IconToolsKitchen2,
        path: "partners-and-customers/merchants",
      },
      {
        label: "Orders",
        icon: IconShoppingCart,
        path: "partners-and-customers/orders",
      },
      {
        label: "Analytics",
        icon: IconChartLine,
        path: "partners-and-customers/analytics",
      },
      {
        label: "Zones",
        icon: IconMap,
        path: "partners-and-customers/zones",
      },
    ],
  },
  {
    label: "Swishr Courier",
    icon: IconTruck, // Represents courier services
    path: "admin/swishr-courier",
    submenu: [
      {
        label: "Orders",
        icon: IconShoppingCart,
        path: "swishr-courier/orders",
      },
      {
        label: "Analytics",
        icon: IconChartBar,
        path: "swishr-courier/analytics",
      },
      {
        label: "Customers",
        icon: IconUser,
        path: "swishr-courier/customers",
      },
      { label: "Drivers", icon: IconCar, path: "swishr-courier/drivers" },
      {
        label: "List of Drivers",
        icon: IconList,
        path: "swishr-courier/drivers-list",
      },
      {
        label: "Promotions",
        icon: IconDiscount,
        path: "swishr-courier/promotions",
      },
      { label: "Zones", icon: IconMap, path: "wishr-courier/zones" },
    ],
  },
  {
    label: "Settings",
    icon: IconSettings, // General settings icon
    path: "admin/settings",
    submenu: [
      {
        label: "Users & Roles",
        icon: IconUserCircle,
        path: "admin/settings/users-roles",
      },
    ],
  },
  {
    label: "Accounting",
    icon: IconCreditCard, // Represents financial settings
    path: "admin/accounting",
    submenu: [
      {
        label: "Transactions",
        icon: IconExchange,
        path: "admin/accounting/transactions",
      },
      {
        label: "Invoices",
        icon: IconFileInvoice,
        path: "accounting/invoices",
      },
      {
        label: "Invoice Settings",
        icon: IconSettings,
        path: "admin/accounting/invoice-settings",
      },
      {
        label: "Business Payouts",
        icon: IconWallet,
        path: "admin/accounting/business-payouts",
      },
      {
        label: "Driver Payouts",
        icon: IconTruckDelivery,
        path: "admin/accounting/driver-payouts",
      },
    ],
  },
  {
    label: "Communications",
    icon: IconMessages, // Represents communication tools
    path: "admin/communications",
    submenu: [
      {
        label: "Push Notifications",
        icon: IconBell,
        path: "admin/communications/push-notifications",
      },
      {
        label: "In-App Messages",
        icon: IconMessageCircle,
        path: "admin/communications/in-app-messages",
      },
      {
        label: "Messages Box",
        icon: IconInbox,
        path: "admin/communications/messages-box",
      },
      { label: "E-Mails", icon: IconMail, path: "admin/communications/emails" },
      { label: "SMS", icon: IconMessage, path: "admin/communications/sms" },
    ],
  },
  {
    label: "Marketing & Promotions",
    icon: IconPhone, // Represents marketing campaigns
    path: "admin/marketing-and-promotions",
    submenu: [
      {
        label: "Promotional Emails",
        icon: IconMailFast,
        path: "admin/marketing-and-promotions/promotional-emails",
      },
      {
        label: "Promo Code",
        icon: IconDiscount2,
        path: "admin/marketing-and-promotions/promo-code",
      },
      {
        label: "Order Discounts",
        icon: IconPercentage,
        path: "admin/marketing-and-promotions/order-discounts",
      },
      {
        label: "Account Level Discounts",
        icon: IconWallet,
        path: "admin/marketing-and-promotions/account-discounts",
      },
      {
        label: "VIP Discounts",
        icon: IconCrown,
        path: "admin/marketing-and-promotions/vip-discounts",
      },
      {
        label: "Loyalty Program",
        icon: IconStar,
        path: "admin/marketing-and-promotions/loyalty-program",
      },
    ],
  },
  {
    label: "Affiliates",
    icon: IconAffiliate, // Represents affiliate management
    path: "admin/affiliates",
    submenu: [
      {
        label: "Dashboard",
        icon: IconDashboard,
        path: "admin/affiliates/dashboard",
      },
      {
        label: "List of Affiliates",
        icon: IconList,
        path: "admin/affiliates/list-of-affiliates",
      },
      {
        label: "Users & Roles",
        icon: IconUser,
        path: "admin/affiliates/users-roles",
      },
    ],
  },
  {
    label: "Admin Panel Settings",
    icon: IconSettings, // General admin settings
    path: "admin/admin-panel-settings",
    submenu: [
      {
        label: "Layout Settings",
        icon: IconLayout,
        path: "admin/admin-panel-settings/layout-settings",
      },
      {
        label: "Invoice Settings",
        icon: IconFileInvoice,
        path: "admin/admin-panel-settings/invoice-settings",
      },
      {
        label: "Users & Roles",
        icon: IconUserCircle,
        path: "admin/admin-panel-settings/users-roles",
      },
    ],
  },
];
