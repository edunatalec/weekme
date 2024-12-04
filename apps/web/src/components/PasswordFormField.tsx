import { CustomFormField } from "@/components/CustomFormField";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

export interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues, TName>;
  name: TName;
}

export const PasswordFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  form: Props<TFieldValues, TName>,
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomFormField
      {...form}
      label="Senha"
      type={showPassword ? "text" : "password"}
      icon={{
        ariaLabel: "Alternar visibilidade da senha",
        onClick: () => setShowPassword(!showPassword),
        icon: showPassword ? Eye : EyeOff,
      }}
    />
  );
};
