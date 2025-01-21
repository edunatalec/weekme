"use client";

import { useState } from "react";

import { Form } from "@/components/ui/form";

import { EmailFormField } from "@/components/form/EmailFormField";
import { NameFormField } from "@/components/form/NameFormField";
import { PasswordFormField } from "@/components/form/PasswordFormField";

import { ConfirmButton } from "@/app/(auth)/_components/ConfirmButton";
import { useSession } from "@/contexts/SessionProvider";
import { getErrorMessage } from "@/utils/error";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signUp } from "../actions";
import { SignUpFormData, useSignUpForm } from "../schema";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/Alert";

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", loading && "pointer-events-none")}
      >
        {errorMessage && <Alert type="error" message={errorMessage} />}

        <NameFormField control={form.control} name="fullName" />
        <EmailFormField control={form.control} name="email" />
        <PasswordFormField
          control={form.control}
          name="password"
          label="Senha"
        />
        <PasswordFormField
          control={form.control}
          name="confirmPassword"
          label="Confirme a sua senha"
        />

        <ConfirmButton text="Cadastrar-se" loading={loading} />
      </form>
    </Form>
  );
};
