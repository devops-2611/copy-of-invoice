import { FC } from "react";
import { useFormikContext, Field, FieldInputProps, getIn } from "formik";
import { NumberInput } from "@mantine/core";
import { AppFormikFormValues } from "./FormikInputField";

interface FormikNumberFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  extraProps?: {
    suffix?: string;
    prefix?: string;
    maw?: string;
  };
}

const FormikNumberField: FC<FormikNumberFieldProps> = ({
  name,
  label,
  disabled,
  extraProps,
}) => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<AppFormikFormValues>();

  const value = getIn(values, name);
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);
  return (
    <Field name={name}>
      {({ field }: { field: FieldInputProps<number> }) => (
        <NumberInput
          {...field}
          label={label}
          value={value}
          error={isTouched && error ? error : undefined}
          onChange={(value) => setFieldValue(name, value)}
          disabled={disabled}
          {...extraProps}
        />
      )}
    </Field>
  );
};

export default FormikNumberField;
