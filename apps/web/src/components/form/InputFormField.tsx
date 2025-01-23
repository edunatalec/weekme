"use client";

import { BaseFormField, FormFieldProps } from "@/components/form/BaseFormField";
import IconButton from "@/components/IconButton";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  icon?: {
    left?: ReactNode;
    right?: ReactNode;
    onRightClick?: () => void;
  };
} & FormFieldProps<TFieldValues, TName>;

export const InputFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  placeholder,
  type = "text",
  icon,
  ...props
}: Props<TFieldValues, TName>) => {
  return (
    <BaseFormField {...props}>
      {(field) => (
        <div className="relative">
          {icon?.left && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              {icon.left}
            </span>
          )}

          <Input
            {...field}
            value={field.value ?? ""}
            type={type}
            placeholder={placeholder}
            className={cn(
              icon?.right && "pr-14",
              icon?.left && typeof icon?.left !== "boolean" && "pl-14",
              "w-full",
            )}
          />

          {icon?.right && (
            <IconButton
              onClick={icon.onRightClick!}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {icon?.right}
            </IconButton>
          )}
        </div>
      )}
    </BaseFormField>
  );
};
