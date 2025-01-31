import { FC } from "react";
import { useFormikContext, Field, FieldProps } from "formik";
import { Select } from "@mantine/core";
import { AppFormikFormValues } from "./FormikInputField";

interface FormikSelectFieldProps {
  name: string;
  label: string;
  data: { value: string | number | boolean; label: string }[];
  disabled?: boolean;
}

const FormikSelectField: FC<FormikSelectFieldProps> = ({
  name,
  label,
  data,
  disabled,
}) => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<AppFormikFormValues>();

  const meta = { touched: touched[name], error: errors[name] };

  return (
    <Field name={name}>
      {({ field }: { field: FieldProps }) => (
        <Select
          {...field}
          label={label}
          value={values[name] ? values[name] : null}
          data={data}
          clearable
          onChange={(value) => setFieldValue(name, value)}
          error={meta.touched && meta.error ? meta.error : undefined}
          disabled={disabled}
          comboboxProps={{ name }}
        />
      )}
    </Field>
  );
};

export default FormikSelectField;
