import { CustomFormField } from "@/components/CustomFormField";
import { Eye, EyeOff } from "lucide-react";
import { useReducer } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<
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
  const [showPassword, toggleShowPassword] = useReducer(
    (show: boolean) => !show,
    false,
  );

  return (
    <CustomFormField
      {...form}
      label="Senha"
      type={showPassword ? "text" : "password"}
      icon={{
        ariaLabel: "Alternar visibilidade da senha",
        onClick: toggleShowPassword,
        icon: showPassword ? Eye : EyeOff,
      }}
    />
  );
};
