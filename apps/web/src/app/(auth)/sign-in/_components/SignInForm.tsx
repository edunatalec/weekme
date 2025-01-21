"use client";

import Link from "next/link";

import { SignInFormData, useSignInForm } from "@/app/(auth)/sign-in/schema";

import { Form } from "@/components/ui/form";

import { EmailFormField } from "@/components/form/EmailFormField";
import { PasswordFormField } from "@/components/form/PasswordFormField";

import { ConfirmButton } from "@/app/(auth)/_components/ConfirmButton";
import { signIn } from "@/app/(auth)/sign-in/actions";
import { Alert } from "@/components/Alert";
import { useSession } from "@/contexts/SessionProvider";
import { getErrorMessage } from "@/utils/error";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", loading && "pointer-events-none")}
      >
        {errorMessage && <Alert type="error" message={errorMessage} />}

        <EmailFormField control={form.control} name="email" />
        <PasswordFormField
          control={form.control}
          name="password"
          label="Senha"
        />

        <Link
          href="/forgot-password"
          className="block text-end text-neutral-400"
        >
          Esqueceu a senha?
        </Link>

        <ConfirmButton text="Entrar" loading={loading} />
      </form>
    </Form>
  );
};
