"use client";

import { updatePassword } from "@/app/admin/profile/actions";
import {
  UpdatePasswordFormData,
  useUpdatePasswordForm,
} from "@/app/admin/profile/update-password-schema";
import { Alert } from "@/components/Alert";
import { PasswordFormField } from "@/components/form/PasswordFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/error";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState } from "react";

interface Props {
  updateBlockPage: (value: boolean) => void;
}

export const ProfileUpdatePassword = ({ updateBlockPage }: Props) => {
  const form = useUpdatePasswordForm();

  const [showFields, setShowFields] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>();

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      setLoading(true);
      updateBlockPage(true);

      await updatePassword(data);

      form.reset();
      setShowFields(false);
      setSuccessMessage("Senha atualizada com sucesso");
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
      updateBlockPage(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Alterar senha</h2>
      <Button
        variant="success"
        size="min"
        className={cn(showFields && "hidden")}
        onClick={() => {
          setErrorMessage(null);
          setSuccessMessage(null);
          setShowFields(true);
        }}
      >
        Atualizar
      </Button>

      <Form {...form}>
        <form
          className={cn("hidden flex-col gap-4", showFields && "flex")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {successMessage && <Alert type="success" message={successMessage} />}
          {errorMessage && <Alert type="error" message={errorMessage} />}

          <div className="flex w-full flex-col gap-4">
            <PasswordFormField
              hideLeftIcon
              label="Senha atual"
              name="currentPassword"
              {...form}
            />
            <PasswordFormField
              hideLeftIcon
              label="Nova senha"
              name="password"
              {...form}
            />
            <PasswordFormField
              hideLeftIcon
              label="Confirmar nova senha"
              name="confirmPassword"
              {...form}
            />

            <div className="flex gap-2">
              <Button
                variant="success"
                size="min"
                type="submit"
                loading={loading}
              >
                Atualizar
              </Button>

              <Button
                variant="outline"
                size="min"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  setShowFields(false);
                }}
              >
                Fechar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
