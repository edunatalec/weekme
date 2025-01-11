import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, FormProviderProps } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = {
  readonly id?: string;
  readonly create?: (data: TFieldValues) => Promise<void>;
  readonly update?: (id: string, data: TFieldValues) => Promise<void>;
} & FormProviderProps<TFieldValues, TContext, TTransformedValues>;

export const BaseForm = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  id,
  create,
  update,
  children,
  ...form
}: Props<TFieldValues, TContext, TTransformedValues>) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: TFieldValues) => {
    try {
      setError(null);

      if (id) {
        await update!(id, data);
      } else {
        await create!(data);
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
