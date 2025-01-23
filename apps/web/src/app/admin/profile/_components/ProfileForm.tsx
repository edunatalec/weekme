"use client";

import { ProfilePicture } from "@/app/admin/profile/_components/ProfilePicture";
import { updateProfile } from "@/app/admin/profile/actions";
import {
  ProfileFormData,
  useProfileForm,
} from "@/app/admin/profile/profile-schema";
import { Alert } from "@/components/Alert";
import { InputFormField } from "@/components/form/InputFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSession } from "@/contexts/SessionProvider";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/error";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState } from "react";

interface Props {
  updateBlockPage: (value: boolean) => void;
}

export const ProfileForm = ({ updateBlockPage }: Props) => {
  const { user, updateUser } = useSession();

  const form = useProfileForm(user!);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      updateBlockPage(true);

      await updateProfile(data);
      await updateUser();
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setErrorMessage(getErrorMessage(error));
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
      updateBlockPage(false);
    }
  };

  const avatarUrl = form.watch("avatarUrl");

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-4")}
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
              size="min"
              type="submit"
              loading={loading}
            >
              Atualizar perfil
            </Button>
          </div>
          <div className="flex flex-col">
            <ProfilePicture avatarUrl={avatarUrl} />
          </div>
        </div>
      </form>
    </Form>
  );
};
