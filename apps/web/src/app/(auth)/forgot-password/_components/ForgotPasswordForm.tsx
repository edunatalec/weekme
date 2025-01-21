"use client";

import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { AuthLink } from "@/app/(auth)/_components/AuthLink";
import { sendCodeToEmailWhenForgetPassword as sendCodeToEmailWhenUserForgetPassword } from "@/app/(auth)/forgot-password/actions";
import {
  ForgotPasswordFormData,
  useForgotPasswordForm,
} from "@/app/(auth)/forgot-password/schema";
import { EmailFormField } from "@/components/form/EmailFormField";
import { getErrorMessage } from "@/utils/error";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState } from "react";

export const ForgotPasswordForm = () => {
  const form = useForgotPasswordForm();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setErrorMessage(null);
      setMessage(null);
      setLoading(true);

      const response = await sendCodeToEmailWhenUserForgetPassword(data);

      setMessage(response);
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Recupere sua senha"
      subtitle="Esqueceu sua senha? Não se preocupe, nós ajudamos você a redefini-la para voltar ao universo dos animes!"
      footer={[
        "Lembrou sua senha? ",
        <AuthLink key="/sign-in" href="/sign-in" text="Faça login" />,
        " e continue explorando o calendário definitivo de animes!",
      ]}
      loading={loading}
      errorMessage={errorMessage}
      onSubmit={onSubmit}
      successMessage={message}
      {...form}
    >
      <EmailFormField control={form.control} name="email" />
    </AuthForm>
  );
};
