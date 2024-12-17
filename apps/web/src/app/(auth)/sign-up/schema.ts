import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    fullName: z.string().min(3, "Precisa ter no mínimo 3 caracteres"),
    email: z.string({ message: "Obrigatório" }).email("E-mail inválido"),
    password: z
      .string({ message: "Obrigatório" })
      .min(8, "Precisa ter no mínimo 8 caracteres")
      .max(20, "Precisa ter no máximo 20 caracteres"),
    confirmPassword: z.string({ message: "Obrigatório" }),
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
