import { BaseFormField, FormFieldProps } from "@/components/form/BaseFormField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FieldPath, FieldValues } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  items: {
    id: string;
    value: string;
  }[];
} & FormFieldProps<TFieldValues, TName>;

export const MultiSelectFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  items,
  ...props
}: Props<TFieldValues, TName>) => {
  return (
    <BaseFormField {...props}>
      {(field) => (
        <div className="flex flex-wrap gap-2 rounded-md border p-2">
          {items.map((item) => {
            const selectedItems: string[] = field.value;
            const selected = field.value.includes(item.id);

            return (
              <Button
                key={item.id}
                size="auto"
                variant="ghost"
                className={cn(
                  "rounded-md border px-2 py-1",
                  selected &&
                    "border-primary bg-primary text-primary-foreground",
                )}
                onClick={() => {
                  if (selected) {
                    field.onChange(selectedItems.filter((s) => s !== item.id));
                  } else {
                    field.onChange([...field.value, item.id]);
                  }
                }}
              >
                {item.value}
              </Button>
            );
          })}
        </div>
      )}
    </BaseFormField>
  );
};
