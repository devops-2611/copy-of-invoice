import { useCallback, useMemo, useState } from "react";
import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  Group,
  useCombobox,
  CloseButton,
  Text,
} from "@mantine/core";
import { useGetMerchantIdAndName } from "../merchants/hooks/useGetMerchantIdAndName";
import { useFormikContext } from "formik";

interface MultiSelectMerchants {
  name: string;
}

function MutliSelectMerchantIds(props: MultiSelectMerchants) {
  const { name } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, isFetching } = useGetMerchantIdAndName(
    search,
    combobox.dropdownOpened,
    1,
    100,
  );
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  const meta = { touched: touched[name], error: errors[name] };

  const handleValueSelect = (val: string) => {
    const oldValue = values?.[name];
    const finalValue = oldValue
      ? oldValue?.includes(val)
        ? oldValue?.filter((v) => v !== val)
        : [...oldValue, val]
      : [val];
    setFieldValue(name, finalValue);
    setSearch("");
  };

  const handleValueRemove = (val: string) =>
    setFieldValue(
      name,
      values?.[name].filter((v) => v !== val),
    );
  const handleClearAllSelection = useCallback(() => {
    setFieldValue(name, []);
  }, []);
  const Pillvalues = values?.[name]?.map((item) => (
    <Pill
      key={item}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
      //   size="lg"
      styles={{
        root: {
          backgroundColor: "#12b886",
          color: "white",
          fontWeight: "normal",
        },
      }}
    >
      {item}
    </Pill>
  ));
  const options = data?.data?.merchants?.map((merchant) => {
    const merchantNameAndIdString =
      merchant.merchantName + " " + "(" + merchant.merchantId.toString() + ")";
    return (
      <Combobox.Option
        value={merchantNameAndIdString}
        key={merchantNameAndIdString}
      >
        <Group gap="sm">
          {values?.[name]?.includes(merchantNameAndIdString) ? (
            <CheckIcon size={12} />
          ) : null}
          <span>{merchantNameAndIdString}</span>
        </Group>
      </Combobox.Option>
    );
  });

  const relevantText = useMemo(() => {
    if (isLoading || isFetching) return "Loading Merchants...";
    if (isError) return "No Merchants Found";
    if (data?.data?.totalCount && data.data.totalCount > 100)
      return "More than 100 Merchants found, Please refine your search";
    return null;
  }, [isLoading, isFetching, isError, data]);

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.Header
        styles={{ header: { borderBottom: 0, paddingBottom: 0 } }}
      >
        <Text size={"sm"} fw={500}>
          Select Merchants
        </Text>
      </Combobox.Header>
      <Combobox.DropdownTarget>
        <PillsInput
          onClick={() => combobox.openDropdown()}
          size="md"
          rightSection={
            values?.[name]?.length !== 0 && (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  handleClearAllSelection();
                }}
                aria-label="Clear value"
              />
            )
          }
        >
          <Pill.Group>
            {Pillvalues}
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search Merchants"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(
                      values?.[name][values?.[name]?.length - 1],
                    );
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options mah={300} style={{ overflowY: "auto" }}>
          {options && options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>{relevantText}</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
      {meta.error && typeof meta.error === "string" && (
        <Combobox.Footer styles={{ footer: { borderTop: 0 } }}>
          <Text c="red" size="xs">
            {meta.error}
          </Text>
        </Combobox.Footer>
      )}
    </Combobox>
  );
}
export default MutliSelectMerchantIds;
