import { InputFormField } from "@/components/form/InputFormField";
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
  hideLeftIcon?: boolean;
}

export const PasswordFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  hideLeftIcon,
  ...form
}: Props<TFieldValues, TName>) => {
  const [showPassword, toggleShowPassword] = useReducer(
    (show: boolean) => !show,
    false,
  );

  return (
    <InputFormField
      {...form}
      label={form.label}
      type={showPassword ? "text" : "password"}
      icon={{
        left: hideLeftIcon || <LockKeyholeIcon />,
        right: showPassword ? <Eye /> : <EyeOff />,
        onRightClick: toggleShowPassword,
      }}
    />
  );
};
