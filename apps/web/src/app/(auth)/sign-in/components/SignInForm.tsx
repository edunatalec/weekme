"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SignInFormData, useSignInForm } from "@/app/(auth)/sign-in/schema";
import { EmailFormField } from "@/components/EmailFormField";
import { Form } from "@/components/ui/form";
import { PasswordFormField } from "@/components/PasswordFormField";

export const SignInForm = () => {
  const form = useSignInForm();

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <EmailFormField control={form.control} name="email" />
          <PasswordFormField control={form.control} name="password" />
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
