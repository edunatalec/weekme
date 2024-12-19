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
import { ButtonIcon } from "./ButtonIcon";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues, TName>;
  name: TName;
  label: string;
  type: HTMLInputTypeAttribute;
  iconLeft: IconProps;
  iconRight?: IconProps;
}

type IconProps = {
  icon: ReactNode; 
  onClick?: () => void; 
};

export const CustomFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  iconLeft,
  iconRight,
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
              <Input {...field} type={type} className="px-14" />

              <ButtonIcon position="left">{iconLeft.icon}</ButtonIcon>

              <ButtonIcon position="right" onClick={iconRight?.onClick}>
                {iconRight?.icon}
              </ButtonIcon>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
