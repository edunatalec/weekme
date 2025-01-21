import { emailValidator } from "@/validators/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: emailValidator,
});

export type ForgotPasswordFormData = z.infer<typeof schema>;

export const useForgotPasswordForm = () => {
  return useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
  });
};
