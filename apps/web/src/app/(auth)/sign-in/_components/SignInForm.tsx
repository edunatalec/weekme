"use client";

import Link from "next/link";

import { SignInFormData, useSignInForm } from "@/app/(auth)/sign-in/schema";

import { EmailFormField } from "@/components/form/EmailFormField";
import { PasswordFormField } from "@/components/form/PasswordFormField";

import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { AuthLink } from "@/app/(auth)/_components/AuthLink";
import { signIn } from "@/app/(auth)/sign-in/actions";
import { useSession } from "@/contexts/SessionProvider";
import { getErrorMessage } from "@/utils/error";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const SignInForm = () => {
  const form = useSignInForm();
  const searchParams = useSearchParams();
  const { updateUser } = useSession();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SignInFormData) => {
    try {
      setErrorMessage(null);
      setLoading(true);

      await signIn(data, searchParams.get("redirect_to"));
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
      title="Seja bem-vindo ao WeekMe!"
      subtitle="Faça login e compartilhe suas paixões com a comunidade otaku. Juntos, construímos o calendário definitivo de animes."
      footer={[
        "Ainda não tem uma conta? ",
        <AuthLink key="/sign-up" href="/sign-up" text="Cadastre-se" />,
        " agora e comece a explorar, organizar e compartilhar seus animes favoritos com a comunidade!",
      ]}
      loading={loading}
      errorMessage={errorMessage}
      onSubmit={onSubmit}
      {...form}
    >
      <EmailFormField control={form.control} name="email" />
      <PasswordFormField control={form.control} name="password" label="Senha" />

      <Link href="/forgot-password" className="block text-end text-neutral-400">
        Esqueceu a senha?
      </Link>
    </AuthForm>
  );
};
