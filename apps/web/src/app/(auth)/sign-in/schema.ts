import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string({ message: "Obrigatório" }).email("E-mail inválido"),
  password: z
    .string({ message: "Obrigatório" })
    .min(8, "Precisa ter no mínimo 8 caracteres")
    .max(20, "Precisa ter no máximo 20 caracteres"),
});

export type SignInFormData = z.infer<typeof schema>;

export const useSignInForm = () => {
  return useForm<SignInFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
