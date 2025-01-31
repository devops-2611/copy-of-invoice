import { FC } from "react";
import { useFormikContext, Field, FieldInputProps } from "formik";
import { Box, Checkbox, Text } from "@mantine/core";

interface FormikCheckboxFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  OnChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormikCheckboxField: FC<FormikCheckboxFieldProps> = ({
  name,
  label,
  disabled,
  OnChangeHandler,
}) => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<Record<string, any>>();

  const meta = { touched: touched[name], error: errors[name] };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    if (OnChangeHandler) {
      OnChangeHandler(event);
      return;
    }
    setFieldValue(name, event.target.checked);
  };
  return (
    <Field name={name}>
      {({ field }: { field: FieldInputProps<"checkbox"> }) => (
        <Box>
          <Text style={{ visibility: "hidden" }}>{label}</Text>
          <Box
            style={{
              border: "0.5px solid grey",
              borderRadius: "0.5rem",
              padding: "8px",
            }}
          >
            <Checkbox
              {...field}
              label={label}
              checked={values[name]}
              error={
                meta.touched && meta.error
                  ? meta.error && typeof meta.error === "string"
                  : undefined
              }
              disabled={disabled}
              onChange={(e) => handleChange(e, name)}
            />
          </Box>
        </Box>
      )}
    </Field>
  );
};

export default FormikCheckboxField;
