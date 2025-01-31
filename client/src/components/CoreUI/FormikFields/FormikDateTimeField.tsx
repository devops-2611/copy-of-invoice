import { FC } from "react";
import { useFormikContext, Field, FieldInputProps } from "formik";
import { DateTimePicker } from "@mantine/dates";
import { AppFormikFormValues } from "./FormikInputField";

interface FormikDateTimeFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
}

const FormikDateTimeField: FC<FormikDateTimeFieldProps> = ({
  name,
  label,
  disabled,
}) => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<AppFormikFormValues>();

  const meta = { touched: touched[name], error: errors[name] };

  return (
    <Field name={name}>
      {({ field }: { field: FieldInputProps<Date> }) => (
        <DateTimePicker
          {...field}
          label={label}
          value={
            values[name] && typeof values[name] !== "boolean"
              ? new Date(values[name])
              : undefined
          }
          error={meta.touched && meta.error ? meta.error : undefined}
          onChange={(date) => setFieldValue(name, date)}
          disabled={disabled}
          valueFormat="DD MMM YYYY hh:mm A"
        />
      )}
    </Field>
  );
};

export default FormikDateTimeField;
