import { passwordValidator } from "@/validators/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    password: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof schema>;

export const useResetPasswordForm = () => {
  return useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });
};
