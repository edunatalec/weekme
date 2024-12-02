"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { Eye, EyeOff, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ButtonForm } from "@/components/shared/form/button-form";

import { loginValidationSchema, useLoginForm } from "@/schemas/signin-schema";

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useLoginForm();

  const onSubmit = (values: z.infer<typeof loginValidationSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-[1.125rem]">
              <FormLabel className="tracking-wide text-neutral-100">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="border-none bg-zinc-950 text-neutral-100 shadow-inner-shadow focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-6 top-1/2 size-6 -translate-y-1/2 transform hover:bg-transparent"
                  >
                    <Mail size={18} color="#A1A1A1" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-1">
              <FormLabel className="tracking-wide text-neutral-100">
                Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="border-none bg-zinc-950 text-neutral-100 shadow-inner-shadow focus-visible:ring-0 focus-visible:ring-offset-0"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-[1.375rem] top-1/2 size-6 -translate-y-1/2 transform hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Alternar visibilidade da senha"
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="#27272A" />
                    ) : (
                      <Eye size={18} color="#27272A" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          href="/auth/reset-password"
          className="mb-5 block text-end text-lg tracking-wide text-[#979797]"
        >
          Esqueceu a senha?
        </Link>
        <ButtonForm text="Login" />
      </form>
    </Form>
  );
};
