"use client";

import { useState } from "react";

import { EmailFormField } from "@/components/form/EmailFormField";
import { NameFormField } from "@/components/form/NameFormField";
import { PasswordFormField } from "@/components/form/PasswordFormField";

import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { AuthLink } from "@/app/(auth)/_components/AuthLink";
import { useSession } from "@/contexts/SessionProvider";
import { getErrorMessage } from "@/utils/error";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signUp } from "../actions";
import { SignUpFormData, useSignUpForm } from "../schema";

export const SignUpForm = () => {
  const form = useSignUpForm();
  const { updateUser } = useSession();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setErrorMessage(null);
      setLoading(true);

      await signUp(data);
    } catch (error) {
      if (isRedirectError(error)) {
        return updateUser();
      }

      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      hasLogo
      title="Junte-se ao WeekMe!"
      subtitle="Crie sua conta e seja parte da comunidade otaku que vive e respira animes. Descubra, organize e contribua com o calendário definitivo de animes!"
      footer={[
        "Já tem uma conta? ",
        <AuthLink key="/sign-in" href="/sign-in" text="Faça o login" />,

        " agora e continue sua jornada no universo dos animes!",
      ]}
      loading={loading}
      errorMessage={errorMessage}
      onSubmit={onSubmit}
      {...form}
    >
      <NameFormField control={form.control} name="fullName" />
      <EmailFormField control={form.control} name="email" />
      <PasswordFormField control={form.control} name="password" label="Senha" />
      <PasswordFormField
        control={form.control}
        name="confirmPassword"
        label="Confirme a sua senha"
      />
    </AuthForm>
  );
};
