"use client";

import { ConfirmButton } from "@/app/(auth)/_components/ConfirmButton";
import { sendCodeToEmailWhenForgetPassword as sendCodeToEmailWhenUserForgetPassword } from "@/app/(auth)/forgot-password/actions";
import {
  ForgotPasswordFormData,
  useForgotPasswordForm,
} from "@/app/(auth)/forgot-password/schema";
import { Alert } from "@/components/Alert";
import { EmailFormField } from "@/components/form/EmailFormField";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", loading && "pointer-events-none")}
      >
        {errorMessage && <Alert type="error" message={errorMessage} />}
        {message && <Alert type="success" message={message} />}

        <EmailFormField control={form.control} name="email" />

        <ConfirmButton text="Enviar" loading={loading} />
      </form>
    </Form>
  );
};
