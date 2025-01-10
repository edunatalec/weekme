import { BaseFormField, FormFieldProps } from "@/components/form/BaseFormField";
import { Textarea } from "@/components/ui/textarea";
import { FieldPath, FieldValues } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  placeholder?: string;
} & FormFieldProps<TFieldValues, TName>;

export const TextAreaFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  placeholder,
  ...props
}: Props<TFieldValues, TName>) => {
  return (
    <BaseFormField {...props}>
      {(field) => (
        <Textarea
          className="resize-none"
          placeholder={placeholder}
          {...field}
          value={field.value ?? ""}
        />
      )}
    </BaseFormField>
  );
};
