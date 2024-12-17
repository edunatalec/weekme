import React, { useState } from "react";
import { CustomFormField } from "@/components/CustomFormField";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues, TName>;
  name: TName;
}

export const ConfirmPasswordFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  form: Props<TFieldValues, TName>,
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomFormField
      {...form}
      label="Confirmar Senha"
      type={showPassword ? "text" : "password"}
      iconRight={{
        icon: showPassword ? (
          <EyeOff color="#A3A3A3" />
        ) : (
          <Eye color="#A3A3A3" />
        ),
        onClick: () => setShowPassword(!showPassword),
      }}
      iconLeft={{
        icon: <LockKeyhole />,
      }}
    />
  );
};
