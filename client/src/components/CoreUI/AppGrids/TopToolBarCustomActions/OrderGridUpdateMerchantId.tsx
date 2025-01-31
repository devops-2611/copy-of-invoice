import { useMemo, useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { Button } from "@mui/material";
import { IconChevronDown, IconDatabaseEdit } from "@tabler/icons-react";
import { useGetMerchantIdAndName } from "../../../../pages/admin/merchants/hooks/useGetMerchantIdAndName";

interface OrderGridUpdateMerchantIdProps {
  disableButton: boolean;
  handleBulkMerchantIDUpdate: (merchantId: string) => void;
}

function OrderGridUpdateMerchantId({
  disableButton,
  handleBulkMerchantIDUpdate,
}: OrderGridUpdateMerchantIdProps) {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, isFetching } = useGetMerchantIdAndName(
    search,
    !disableButton,
    1,
    100,
  );

  // Memoize the options and relevant message
  const options = useMemo(
    () =>
      data?.data?.merchants?.map((item) => (
        <Combobox.Option
          value={item.merchantId.toString()}
          key={item.merchantId}
        >
          {`${item.merchantName} (${item.merchantId})`}
        </Combobox.Option>
      )),
    [data],
  );

  const relevantText = useMemo(() => {
    if (isLoading || isFetching) return "Loading Merchants...";
    if (isError) return "No Merchants Found";
    if (data?.data?.totalCount && data.data.totalCount > 100)
      return "More than 100 Merchants found, Please refine your search";
    return null;
  }, [isLoading, isFetching, isError, data]);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch(""); // Reset search input when dropdown is closed
    },
    onDropdownOpen: () => {
      if (!disableButton) {
        combobox.focusSearchInput();
      }
    },
  });

  return (
    <Combobox
      store={combobox}
      position="bottom-start"
      withArrow
      disabled={disableButton}
      onOptionSubmit={(val) => {
        handleBulkMerchantIDUpdate(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target withAriaAttributes={false}>
        <Button
          onClick={() => combobox.toggleDropdown()}
          size="small"
          disabled={disableButton}
          endIcon={<IconChevronDown />}
          variant="contained"
          color={"info"}
        >
          Update Merchant &nbsp; <IconDatabaseEdit stroke={2} size={16} />
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown
        mah={300}
        style={{ overflowY: "auto", scrollbarWidth: "thin" }}
      >
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)} // Update search state immediately
          placeholder="Search"
        />
        <Combobox.Options>
          {options && options?.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>{relevantText}</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default OrderGridUpdateMerchantId;
