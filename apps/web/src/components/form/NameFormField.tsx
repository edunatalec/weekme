import { InputFormField } from "@/components/form/InputFormField";
import { User } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues, TName>;
  name: TName;
}

export const NameFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  form: Props<TFieldValues, TName>,
) => {
  return (
    <InputFormField
      {...form}
      label="Nome"
      type="text"
      icon={{
        left: <User />,
      }}
    />
  );
};
