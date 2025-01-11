import { emailValidator } from "@/validators/email.validator";
import { fullNameValidator } from "@/validators/full-name.validator";
import { passwordValidator } from "@/validators/password.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    fullName: fullNameValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof schema>;

export const useSignUpForm = () => {
  return useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};
