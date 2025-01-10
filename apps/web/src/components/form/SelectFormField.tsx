import { BaseFormField, FormFieldProps } from "@/components/form/BaseFormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldPath, FieldValues } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  placeholder?: string;
  items: {
    key: string;
    value: string;
  }[];
} & FormFieldProps<TFieldValues, TName>;

export const SelectFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  placeholder,
  items,
  ...props
}: Props<TFieldValues, TName>) => {
  return (
    <BaseFormField {...props}>
      {(field) => (
        <div className="relative">
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </BaseFormField>
  );
};
