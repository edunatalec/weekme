"use client";

import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { resetPassword } from "@/app/(auth)/forgot-password/[hash]/reset/actions";
import {
  ResetPasswordFormData,
  useResetPasswordForm,
} from "@/app/(auth)/forgot-password/[hash]/reset/schema";
import { PasswordFormField } from "@/components/form/PasswordFormField";
import { getErrorMessage } from "@/utils/error";
import { decodeBase64ToString } from "@repo/core";
import { isRedirectError } from "next/dist/client/components/redirect";
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const ResetPasswordForm = () => {
  const form = useResetPasswordForm();
  const params = useParams();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const info = useRef<
    { email: string; code: string; expiresAt: string } | undefined
  >();

  useEffect(
    () => {
      try {
        info.current = JSON.parse(decodeBase64ToString(params.hash as string));

        const now = new Date().toISOString();

        if (now > info.current!.expiresAt) {
          notFound();
        }
      } catch (_) {
        notFound();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setErrorMessage(null);

      setLoading(true);

      const { email, code } = info.current!;

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
    <AuthForm
      title="Crie sua nova senha"
      subtitle="Digite sua nova senha para concluir a recuperação. Certifique-se de escolher uma senha segura que só você conheça."
      footer={[
        "Lembre-se: use uma combinação de letras, números e caracteres especiais para aumentar a segurança da sua senha.",
      ]}
      loading={loading}
      errorMessage={errorMessage}
      onSubmit={onSubmit}
      {...form}
    >
      <PasswordFormField control={form.control} name="password" label="Senha" />

      <PasswordFormField
        control={form.control}
        name="confirmPassword"
        label="Confirmar a sua senha"
      />
    </AuthForm>
  );
};
