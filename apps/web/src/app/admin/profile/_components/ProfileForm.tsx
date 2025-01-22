"use client";

import { updateProfile } from "@/app/admin/profile/actions";
import { ProfileFormData, useProfileForm } from "@/app/admin/profile/schema";
import { Alert } from "@/components/Alert";
import { InputFormField } from "@/components/form/InputFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSession } from "@/contexts/SessionProvider";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/error";
import { urlValidator } from "@/validators/url";
import { isRedirectError } from "next/dist/client/components/redirect";
import Image from "next/image";
import { useState } from "react";

export const ProfileForm = () => {
  const { user, updateUser } = useSession();

  const form = useProfileForm(user!);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setErrorMessage(null);
      setLoading(true);

      await updateProfile(data);
      await updateUser();
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setErrorMessage(getErrorMessage(error));
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const avatarUrl = form.watch("avatarUrl");

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-4", loading && "pointer-events-none")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {errorMessage && <Alert type="error" message={errorMessage} />}
        <div className="flex flex-col-reverse gap-8 md:flex-row">
          <div className="flex w-full flex-col gap-4">
            <InputFormField label="Nome completo" name="fullName" {...form} />
            <InputFormField
              label="Imagem de perfil"
              name="avatarUrl"
              placeholder="https://www..."
              {...form}
            />

            <Button
              variant="success"
              className="h-8 self-start text-sm font-medium"
              type="submit"
              loading={loading}
            >
              Atualizar perfil
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <span>Foto de perfil</span>
              <div className="relative size-52">
                {urlValidator.safeParse(avatarUrl).success ? (
                  <Image
                    src={avatarUrl!}
                    fill
                    sizes="100%"
                    width={0}
                    height={0}
                    className="rounded-full"
                    alt=""
                    priority
                  />
                ) : (
                  <div className="h-full w-full rounded-full border border-dotted" />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
