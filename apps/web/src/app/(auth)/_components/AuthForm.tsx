"use client";

import Image from "next/image";

import darkLogo from "@/assets/dark-logo.png";
import lightLogo from "@/assets/light-logo.png";
import { Center } from "@/components/Center";
import { useTheme } from "@/contexts/ThemeProvider";
import { ConfirmButton } from "@/app/(auth)/_components/ConfirmButton";
import { Form } from "@/components/ui/form";
import { FieldValues, FormProviderProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/Alert";

type Props<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = {
  readonly hasLogo?: boolean;
  readonly title: string;
  readonly subtitle?: string;
  readonly errorMessage: string | null;
  readonly successMessage?: string | null;
  readonly loading: boolean;
  readonly onSubmit: (data: TFieldValues) => void;
  readonly children: React.ReactNode;
  readonly footer?: React.ReactNode[];
} & FormProviderProps<TFieldValues, TContext, TTransformedValues>;

export const AuthForm = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  title,
  hasLogo,
  footer,
  subtitle,
  loading,
  errorMessage,
  successMessage,
  onSubmit,
  children,
  ...form
}: Props<TFieldValues, TContext, TTransformedValues>) => {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-white p-8 dark:bg-black md:p-16">
      <div className="flex w-full flex-col gap-2">
        {hasLogo && (
          <Center>
            <Image
              src={theme === "dark" ? darkLogo : lightLogo}
              alt="Logo"
              width={300}
              className="mb-12 md:m-0 md:hidden"
              onClick={toggle}
            />
          </Center>
        )}

        <h1 className="text-3xl">{title}</h1>

        {subtitle && <h1 className="text-foreground/80">{subtitle}</h1>}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit as any)}
          className={cn("w-full space-y-4", loading && "pointer-events-none")}
        >
          {errorMessage && <Alert type="error" message={errorMessage} />}
          {successMessage && <Alert type="success" message={successMessage} />}

          {children}

          <ConfirmButton text="Entrar" loading={loading} />
        </form>
      </Form>

      {footer && (
        <div>
          <p className="text-center text-foreground/80">{footer}</p>
        </div>
      )}
    </div>
  );
};
