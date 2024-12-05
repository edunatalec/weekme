import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues, TName>;
  name: TName;
  label: string;
  type: HTMLInputTypeAttribute;
  icon: IconProps;
}

interface IconProps {
  icon: React.ElementType;
  onClick?: () => void;
  ariaLabel?: string | undefined;
}

export const CustomFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  icon: { icon: Icon, ...icon },
  type,
  ...form
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...form}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input {...field} type={type} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2",
                  !icon.onClick && "cursor-default hover:bg-transparent",
                )}
                onClick={icon.onClick}
                aria-label={icon.ariaLabel}
              >
                {<Icon />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
