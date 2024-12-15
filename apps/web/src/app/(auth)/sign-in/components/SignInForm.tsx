"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInFormData, useSignInForm } from "@/app/(auth)/sign-in/schema";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { EmailFormField } from "@/components/EmailFormField";
import { PasswordFormField } from "@/components/PasswordFormField";

import { signIn } from "@/app/(auth)/sign-in/actions";
import { useState } from "react";

export const SignInForm = () => {
  const form = useSignInForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignInFormData) => {
    try {
      setErrorMessage(null);
      await signIn(data);
    } catch (error) {
      if (error instanceof Error) {
        return setErrorMessage(error.message);
      }

      return setErrorMessage("Erro na validação");
    }

    redirect("/admin");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <EmailFormField control={form.control} name="email" />

          <PasswordFormField control={form.control} name="password" />

          {errorMessage && (
            <p className="mb-2 text-destructive">{errorMessage}</p>
          )}
        </div>

        <Link
          href="/reset-password"
          className="mb-4 mt-2 block text-end text-neutral-400"
        >
          Esqueceu a senha?
        </Link>

        <Button className="w-full" type="submit" variant="success">
          Login
        </Button>
      </form>
    </Form>
  );
};
