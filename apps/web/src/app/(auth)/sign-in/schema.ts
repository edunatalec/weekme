import { emailValidator } from "@/validators/email";
import { passwordValidator } from "@/validators/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: emailValidator,
  password: passwordValidator,
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
