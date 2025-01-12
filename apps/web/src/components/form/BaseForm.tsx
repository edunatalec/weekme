"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePermission } from "@/hooks/usePermission";
import { create, update } from "@/services/crud/service";
import { ProtectedResource } from "@repo/core";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, FormProviderProps } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = {
  readonly id?: string;
  readonly item?: TFieldValues;
  readonly resource: ProtectedResource;
} & FormProviderProps<TFieldValues, TContext, TTransformedValues>;

export const BaseForm = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  id,
  item,
  resource,
  children,
  ...form
}: Props<TFieldValues, TContext, TTransformedValues>) => {
  const { hasPermission } = usePermission(resource);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  if (
    (item && !hasPermission("update", item as any)) ||
    (!item && !hasPermission("create", item as any))
  ) {
    redirect("/admin");
  }

  const onSubmit = async (data: TFieldValues) => {
    try {
      setError(null);

      if (id) {
        await update({ id, data, resource });
      } else {
        await create({ data, resource });
      }

      router.back();
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setError((error as Error).message);
    }
  };

  const onBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col"
        onSubmit={form.handleSubmit(onSubmit as any)}
      >
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4 pt-[4.5rem] md:pt-4">
          {children}
        </div>

        <div className="space-y-2 p-4">
          {error && (
            <div className="flex flex-col rounded-md border border-destructive p-2 text-destructive">
              <span className="font-bold">Erro</span>
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="flex gap-2 2xl:ml-auto 2xl:w-1/2">
            <Button
              onClick={onBackClick}
              variant="outline"
              className="hidden flex-1 md:block"
            >
              Voltar
            </Button>

            <Button className="flex-1" type="submit">
              {id ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
