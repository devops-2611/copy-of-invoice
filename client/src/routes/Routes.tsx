import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { BasicAppShell } from "../components/BasicAppShell";
import { AdminAppShell } from "../pages/admin/adminAppShell/AdminAppShell";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthProvider } from "../hooks/useAuth";
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/Homepage"));
const FormWrapper = lazy(
  () => import("../pages/UploadandGenrateInvoice/FormWrapper"),
);
const NotFoundPage = lazy(() => import("../pages/NotFound"));
const OrdersTabsWrapper = lazy(
  () => import("../pages/admin/orders/OrdersTabsWrapper"),
);
const DisplayCustomersGrid = lazy(
  () => import("../pages/admin/customers/DisplayCustomersGrid"),
);
const DisplayMerchantsGrid = lazy(
  () => import("../pages/admin/merchants/DisplayMerchantsGrid"),
);
const DisplayMerchantDetailsbyId = lazy(
  () => import("../pages/admin/merchants/DisplayMerchantDetailsbyId"),
);
const DisplayMerchantInvoicesbyId = lazy(
  () => import("../pages/admin/merchants/DisplaySpecificMerchantInvoices"),
);

const AdminAccountingInvoices = lazy(
  () => import("../pages/admin/accounting/InvoicesTabsWrapper"),
);
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Skeleton height={300} width="100%" color="red" />}>
        <Routes>
          <Route path="/" element={<BasicAppShell></BasicAppShell>}>
            <Route
              index
              element={
                <Suspense>
                  <HomePage />
                </Suspense>
              }
            ></Route>
            <Route
              path="/reports/generate"
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <FormWrapper />
                </Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <HomePage />
                </Suspense>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminAppShell />
              </ProtectedRoute>
            }
          >
            <Route
              path={"partners-and-customers/customers"}
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <DisplayCustomersGrid></DisplayCustomersGrid>
                </Suspense>
              }
            ></Route>
            <Route
              path={"partners-and-customers/merchants"}
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <DisplayMerchantsGrid></DisplayMerchantsGrid>
                </Suspense>
              }
            ></Route>
            {/* <Route
              path={"partners-and-customers/merchants/:merchantId"}
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <DisplayMerchatDetailsTabs></DisplayMerchatDetailsTabs>
                </Suspense>
              }
            ></Route> */}
            <Route
              path={"partners-and-customers/orders"}
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <OrdersTabsWrapper></OrdersTabsWrapper>
                </Suspense>
              }
            ></Route>
            <Route
              path={"accounting/invoices"}
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <AdminAccountingInvoices></AdminAccountingInvoices>
                </Suspense>
              }
            ></Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/merchant/:merchantId"
            element={
              <ProtectedRoute>
                <AdminAppShell />
              </ProtectedRoute>
            }
          >
            <Route
              path={"dashboard"}
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <DisplayMerchantDetailsbyId></DisplayMerchantDetailsbyId>
                </Suspense>
              }
            ></Route>
            <Route
              path={"invoices"}
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <DisplayMerchantInvoicesbyId></DisplayMerchantInvoicesbyId>
                </Suspense>
              }
            ></Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<Skeleton height={300} width="100%" />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<Skeleton height={300} width="100%" />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
