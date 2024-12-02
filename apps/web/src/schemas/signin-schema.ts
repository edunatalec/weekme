import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "Precisa ter no mínimo 8 caracteres")
    .max(20, "Precisa ter no máximo 20 caracteres"),
});

export const useLoginForm = () => {
  return useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
