"use server";

import { ForgotPasswordFormData } from "@/app/(auth)/forgot-password/schema";
import http from "@/services/http/http";

export const sendCodeToEmailWhenForgetPassword = async (
  data: ForgotPasswordFormData,
): Promise<string> => {
  const response = await http.request<{ message: string }>({
    endpoint: "forgot-password/send-code",
    method: "POST",
    body: {
      email: data.email,
    },
  });

  return response.data.message;
};
