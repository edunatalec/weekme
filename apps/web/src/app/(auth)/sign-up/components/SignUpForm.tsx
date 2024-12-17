"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { EmailFormField } from "@/components/EmailFormField";
import { PasswordFormField } from "@/components/PasswordFormField";
import { NameFormField } from "@/components/NameFormField";
import { ConfirmPasswordFormField } from "@/components/ConfirmPassword";

import { SignUpFormData, useSignUpForm } from "../schema";
import { signUp } from "../actions";

export const SignUpForm = () => {
  const form = useSignUpForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setErrorMessage(null);
      await signUp(data);
    } catch (error) {
      if (error instanceof Error) {
        return setErrorMessage(error.message);
      }

      return setErrorMessage("Erro em cadastrar usuário");
    }

    redirect("/admin");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 space-y-4">
          <NameFormField control={form.control} name="fullName" />
          <EmailFormField control={form.control} name="email" />
          <PasswordFormField control={form.control} name="password" />
          <ConfirmPasswordFormField
            control={form.control}
            name="confirmPassword"
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
