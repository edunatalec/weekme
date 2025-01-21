"use client";

import { ConfirmButton } from "@/app/(auth)/_components/ConfirmButton";
import { resetPassword } from "@/app/(auth)/forgot-password/[code]/reset/actions";
import {
  ResetPasswordFormData,
  useResetPasswordForm,
} from "@/app/(auth)/forgot-password/[code]/reset/schema";
import { Alert } from "@/components/Alert";
import { PasswordFormField } from "@/components/form/PasswordFormField";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/error";
import { decodeBase64ToString } from "@repo/core";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useParams } from "next/navigation";
import { useState } from "react";

export const ResetPasswordForm = () => {
  const form = useResetPasswordForm();
  const params = useParams();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setErrorMessage(null);

      setLoading(true);

      const { email, code } = JSON.parse(
        decodeBase64ToString(params.code as string),
      );

      await resetPassword({
        email,
        code,
        password: data.password,
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;

      if (error instanceof SyntaxError) {
        setErrorMessage("O link foi alterado. Verifique o e-mail novamente.");
      } else {
        setErrorMessage(getErrorMessage(error));
      }
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

        <PasswordFormField
          control={form.control}
          name="password"
          label="Senha"
        />

        <PasswordFormField
          control={form.control}
          name="confirmPassword"
          label="Confirmar a sua senha"
        />

        <ConfirmButton text="Salvar" loading={loading} />
      </form>
    </Form>
  );
};
