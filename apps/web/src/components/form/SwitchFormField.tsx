"use client";

import { BaseFormFieldProps } from "@/components/form/BaseFormField";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FieldPath, FieldValues } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  title: string;
  description: string;
  className?: string;
} & BaseFormFieldProps<TFieldValues, TName>;

export const SwitchFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  title,
  description,
  className,
  ...form
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...form}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base">{title}</FormLabel>
          <div className="flex h-14 flex-row items-center justify-between gap-2 rounded-md border p-2">
            <FormDescription>{description}</FormDescription>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
