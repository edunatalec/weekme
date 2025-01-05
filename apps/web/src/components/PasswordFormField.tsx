import { CustomFormField } from "@/components/CustomFormField";
import { Eye, EyeOff, LockKeyholeIcon } from "lucide-react";
import { useReducer } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues, TName>;
  name: TName;
  label: string;
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
      label={form.label}
      type={showPassword ? "text" : "password"}
      leftIcon={<LockKeyholeIcon />}
      rightIcon={{
        icon: showPassword ? <Eye /> : <EyeOff />,
        onClick: toggleShowPassword,
      }}
    />
  );
};
