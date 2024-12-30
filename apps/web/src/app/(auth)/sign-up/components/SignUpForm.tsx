"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { EmailFormField } from "@/components/EmailFormField";
import { NameFormField } from "@/components/NameFormField";
import { PasswordFormField } from "@/components/PasswordFormField";

import { signUp } from "../actions";
import { SignUpFormData, useSignUpForm } from "../schema";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useSession } from "@/contexts/SessionProvider";

export const SignUpForm = () => {
  const form = useSignUpForm();
  const { updateUser } = useSession();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setErrorMessage(null);

      await signUp(data);
    } catch (error) {
      if (isRedirectError(error)) {
        return updateUser();
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao cadastrar usuário. Tente novamente mais tarde.",
      );

      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 space-y-4">
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
            label="Confirmar senha"
          />

          {errorMessage && (
            <p className="mb-2 text-destructive">{errorMessage}</p>
          )}
        </div>

        <Button className="w-full" type="submit" variant="success">
          Cadastrar-se
        </Button>
      </form>
    </Form>
  );
};
