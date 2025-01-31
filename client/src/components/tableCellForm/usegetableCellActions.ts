import { useLocation } from "react-router-dom";
import { useUpdateCustomerDetailsbyId } from "../../pages/admin/customers/hooks/useUpdateCustomerDetailsbyId";
import { useCreateOrder } from "../../pages/admin/orders/DisplayOrders/useCreateOrder";
import { useUpdateOrders } from "../../pages/admin/orders/DisplayOrders/useUpdateOrders";
import { useAddCustomer } from "../../pages/admin/customers/hooks/useAddCustomerDetails";
import { useUpdateMerchantDetailsbyId } from "../../pages/admin/merchants/hooks/useUpdateMerchantDetailsbyId";
import { useAddMerchant } from "../../pages/admin/merchants/hooks/useAddMerchantDetails";

const usegetableCellActions = () => {
  const { pathname } = useLocation();

  const actionHooks = {
    orders: {
      create: useCreateOrder(),
      update: useUpdateOrders(),
    },
    customers: {
      create: useAddCustomer(),
      update: useUpdateCustomerDetailsbyId(),
    },
    merchants: {
      create: useAddMerchant(),
      update: useUpdateMerchantDetailsbyId(),
    },
  };

  const getActionsForSection = (section: keyof typeof actionHooks) => {
    const { create, update } = actionHooks[section];

    return {
      New: {
        CreateNewRecord: create.mutateAsync,
        IsCreatingNewCrecord: create.isPending,
        IsSuccessInCreatingNewRecord: create.isSuccess,
        isErrorInCreatingNewRecord: create.isError,
        ErrorObjectinCreatingNewRecord: create.error,
        ResetNewRecordMutation: create.reset, // For customer only
      },
      Edit: {
        EditRecord: update.mutateAsync,
        isPendingEdit: update.isPending,
        isSuccessInEditing: update.isSuccess,
        isErrorinUpdating: update.isError,
      },
    };
  };

  if (pathname?.includes("partners-and-customers/orders")) {
    return getActionsForSection("orders");
  }
  if (pathname?.includes("partners-and-customers/customers")) {
    return getActionsForSection("customers");
  }
  if (pathname?.includes("partners-and-customers/merchants")) {
    return getActionsForSection("merchants");
  }

  // Return a default empty structure to avoid returning {} which causes TS issues
  return {
    New: {
      CreateNewRecord: undefined,
      IsCreatingNewCrecord: false,
      IsSuccessInCreatingNewRecord: false,
      isErrorInCreatingNewRecord: false,
      ErrorObjectinCreatingNewRecord: undefined,
      ResetNewRecordMutation: undefined,
    },
    Edit: {
      EditRecord: undefined,
      isPendingEdit: false,
      isSuccessInEditing: false,
      isErrorinUpdating: false,
    },
  };
};

export default usegetableCellActions;
