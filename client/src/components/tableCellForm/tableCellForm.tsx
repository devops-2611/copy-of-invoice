import { FC, useEffect, useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import {
  Button,
  Group,
  Box,
  LoadingOverlay,
  Divider,
  Paper,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import FormikNumberField from "../CoreUI/FormikFields/FormikNumberField";
import FormikInputField from "../CoreUI/FormikFields/FormikInputField";
import FormikSelectField from "../CoreUI/FormikFields/FormikSelectField";
import FormikDateTimeField from "../CoreUI/FormikFields/FormikDateTimeField";
import { NewFormInitialValues } from "./NewFormInitialValues";
import usegetableCellActions from "./usegetableCellActions";
import AppAlertComponent from "../AppAlertComponent";
import useValidationSchema from "./useValidationSchema";
import FormikFileInputField from "../CoreUI/FormikFields/FormikFileUpload";
import FormikDatePickerField from "../CoreUI/FormikFields/FormikDateField";
import { UISCHEMA } from "../../pages/admin/customers/CRUDUISchema/customersUISchema";
import FormikCheckboxField from "../CoreUI/FormikFields/FormikCheckBoxField";
import FormikRatingField from "../CoreUI/FormikFields/FormikRatingField";

interface TableCellFormProps {
  originalRow: Record<string, any>;
  formState: "VIEW" | "NEW" | "EDIT"; // The current state of the form (VIEW, NEW, or EDIT)
  onClose: () => void;
  crudOperationHeader: string;
  uiSchema: UISCHEMA[];
}

const TableCellForm: FC<TableCellFormProps> = ({
  originalRow,
  formState = "VIEW",
  onClose,
  crudOperationHeader,
  uiSchema,
}) => {
  const {
    New: {
      CreateNewRecord,
      ErrorObjectinCreatingNewRecord,
      IsCreatingNewCrecord,
      IsSuccessInCreatingNewRecord,
      isErrorInCreatingNewRecord,
    },
    Edit: { EditRecord, isErrorinUpdating, isPendingEdit, isSuccessInEditing },
  } = usegetableCellActions();
  const { validationSchema } = useValidationSchema({ formState });
  const { scrollIntoView, targetRef, scrollableRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });
  useEffect(() => {
    if (isErrorInCreatingNewRecord || isErrorinUpdating) {
      scrollIntoView();
    }
  }, [isErrorInCreatingNewRecord || isErrorinUpdating]);
  useEffect(() => {
    if (IsSuccessInCreatingNewRecord || isSuccessInEditing) {
      onClose();
    }
  }, [IsSuccessInCreatingNewRecord, isSuccessInEditing]);

  const formikRef = useRef<FormikProps<Record<string, any>>>(null);
  const handleSubmit = (values: Record<string, any>) => {
    if (formState === "EDIT" && EditRecord) {
      EditRecord({ updates: [values] });
    } else if (formState === "NEW" && CreateNewRecord) {
      CreateNewRecord(values);
    }
  };

  useEffect(() => {
    if (IsSuccessInCreatingNewRecord) {
      formikRef?.current?.resetForm();
    }
  }, [IsSuccessInCreatingNewRecord]);
  return (
    <Paper pos={"relative"}>
      <Formik<Record<string, any>>
        initialValues={
          formState === "NEW" ? NewFormInitialValues() : originalRow
        }
        validationSchema={validationSchema ?? {}}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ dirty }) => (
          <Form>
            <Paper
              style={{
                overflow: "scroll",
                maxHeight: "70vh",
                ref: scrollableRef,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "20px",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                {uiSchema?.map((uiField) => {
                  const { fieldType, key, label, name } = uiField;
                  const isHidden =
                    formState === "NEW"
                      ? uiField?.hidden?.hideFieldForNEW
                      : uiField?.hidden?.hideFieldForEDIT;
                  if (isHidden) return;
                  const isDisabled =
                    formState === "EDIT"
                      ? uiField?.disabled?.disableFieldForEdit
                      : uiField?.meta?.DisableInNew;
                  switch (fieldType) {
                    case "DateTimeRange":
                      return (
                        <Box key={uiField?.key} mb="sm" w={"24%"}>
                          <FormikDateTimeField
                            key={key}
                            name={name}
                            label={label}
                            disabled={isDisabled}
                          />
                        </Box>
                      );
                    case "Date":
                      return (
                        <Box key={key} mb="sm" w={"24%"}>
                          <FormikDatePickerField
                            key={key}
                            name={name}
                            label={label}
                            disabled={isDisabled}
                          />
                        </Box>
                      );
                    case "Select":
                      return (
                        <Box key={key} mb="sm" w={"24%"}>
                          <FormikSelectField
                            key={key}
                            name={name}
                            label={label}
                            disabled={isDisabled}
                            data={uiField?.meta?.options ?? []}
                          />
                        </Box>
                      );
                    case "Number":
                      return (
                        <Box key={key} mb="sm" w={"24%"}>
                          <FormikNumberField
                            key={key}
                            name={name}
                            label={label}
                            disabled={isDisabled}
                          />
                        </Box>
                      );
                    case "imageInput":
                      return (
                        <Box key={key} mb="sm" w={"24%"}>
                          <FormikFileInputField
                            key={key}
                            name={name}
                            label={label}
                            accept={"image/png,image/jpeg"}
                            maxSize={2000}
                          />
                        </Box>
                      );
                    case "Checkbox":
                      return (
                        <Box key={key} mb="sm" w={"24%"}>
                          <FormikCheckboxField
                            key={key}
                            name={key}
                            label={label}
                          />
                        </Box>
                      );
                    case "Rating":
                      return (
                        <Box key={key} mb="sm" w={"24%"}>
                          <FormikRatingField
                            key={key}
                            name={key}
                            label={label}
                          />
                        </Box>
                      );

                    default:
                      return (
                        <Box key={key} mb="sm" w={"24%"}>
                          <FormikInputField
                            key={key}
                            name={name}
                            label={label}
                            disabled={isDisabled}
                          />
                        </Box>
                      );
                  }
                })}
                <LoadingOverlay
                  visible={isPendingEdit || IsCreatingNewCrecord}
                />
              </Box>
              <Paper mt={20} ref={targetRef}>
                {isErrorInCreatingNewRecord && dirty && (
                  <AppAlertComponent
                    title={
                      ErrorObjectinCreatingNewRecord?.response?.data?.error ??
                      "Error"
                    }
                    color="red"
                    message={
                      ErrorObjectinCreatingNewRecord?.response?.data?.message ??
                      ErrorObjectinCreatingNewRecord?.response?.data?.errors?.join(
                        ",",
                      ) ??
                      "There was an error creating new record."
                    }
                  ></AppAlertComponent>
                )}
              </Paper>
            </Paper>

            <Divider />

            {formState !== "VIEW" && (
              <Group justify="center" mt={20}>
                <Button
                  type="submit"
                  disabled={isPendingEdit || IsCreatingNewCrecord}
                >
                  {formState === "NEW"
                    ? `Create ${crudOperationHeader}`
                    : `Update ${crudOperationHeader}`}
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  disabled={isPendingEdit || IsCreatingNewCrecord}
                >
                  Reset Form
                </Button>
              </Group>
            )}
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default TableCellForm;
