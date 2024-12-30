import IconButton from "@/components/IconButton";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues, TName>;
  name: TName;
  label: string;
  type: HTMLInputTypeAttribute;
  leftIcon: ReactNode;
  rightIcon?: IconProps;
}

type IconProps = {
  icon: ReactNode;
  onClick: () => void;
};

export const CustomFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  leftIcon,
  rightIcon,
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
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                {leftIcon}
              </span>

              <Input {...field} type={type} className="px-14" />

              {rightIcon && (
                <IconButton
                  onClick={rightIcon?.onClick}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {rightIcon?.icon}
                </IconButton>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
