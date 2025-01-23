import { passwordValidator } from "@/validators/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    currentPassword: passwordValidator,
    password: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

export type UpdatePasswordFormData = z.infer<typeof schema>;

export const useUpdatePasswordForm = () => {
  return useForm<UpdatePasswordFormData>({
    resolver: zodResolver(schema),
  });
};
