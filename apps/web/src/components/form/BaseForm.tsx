"use client";

import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePermission } from "@/hooks/usePermission";
import { cn } from "@/lib/utils";
import { create, update } from "@/services/crud/service";
import { getErrorMessage } from "@/utils/error";
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
  const router = useRouter();
  const { hasPermission } = usePermission(resource);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (
    (item && !hasPermission("update", item as any)) ||
    (!item && !hasPermission("create", item as any))
  ) {
    redirect("/admin");
  }

  const onSubmit = async (data: TFieldValues) => {
    try {
      setError(null);
      setLoading(true);

      if (id) {
        await update({ id, data, resource });
      } else {
        await create({ data, resource });
      }

      router.back();
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
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
        className={cn("flex h-full flex-col", loading && "pointer-events-none")}
        onSubmit={form.handleSubmit(onSubmit as any)}
      >
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4 pt-[4.5rem] md:pt-4">
          {children}
        </div>

        <div className="space-y-2 p-4">
          {error && <Alert type="error" message={error} />}

          <div className="flex gap-2 2xl:ml-auto 2xl:w-1/2">
            <Button
              onClick={onBackClick}
              variant="outline"
              className="hidden flex-1 md:block"
            >
              Voltar
            </Button>

            <Button className="flex-1" type="submit" loading={loading}>
              {id ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
