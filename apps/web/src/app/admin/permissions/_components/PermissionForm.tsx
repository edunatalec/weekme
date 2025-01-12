"use client";

import { usePermissionForm } from "@/app/admin/permissions/schema";
import { BaseForm } from "@/components/form/BaseForm";
import { InputFormField } from "@/components/form/InputFormField";
import { TextAreaFormField } from "@/components/form/TextAreaFormField";
import { PermissionEntity, ProtectedResource } from "@repo/core";

interface Props {
  permission?: PermissionEntity;
}

export const PermissionForm = ({ permission }: Props) => {
  const form = usePermissionForm(permission);

  return (
    <BaseForm
      {...form}
      id={permission?.id}
      item={permission}
      resource={ProtectedResource.PERMISSIONS}
    >
      <h1 className="text-2xl">
        Preencha o formulário para {permission ? "atualizar" : "cadastrar"} uma
        permissão
      </h1>

      <InputFormField control={form.control} name="name" label="Nome" />

      <TextAreaFormField
        control={form.control}
        name="description"
        label="Descrição"
      />
    </BaseForm>
  );
};
