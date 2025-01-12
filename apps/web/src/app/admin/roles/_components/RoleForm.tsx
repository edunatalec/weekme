"use client";

import { useRoleForm } from "@/app/admin/roles/schema";
import { BaseForm } from "@/components/form/BaseForm";
import { InputFormField } from "@/components/form/InputFormField";
import { TextAreaFormField } from "@/components/form/TextAreaFormField";
import { ProtectedResource, RoleEntity } from "@repo/core";

interface Props {
  role?: RoleEntity;
}

export const RoleForm = ({ role }: Props) => {
  const form = useRoleForm(role);

  return (
    <BaseForm
      {...form}
      id={role?.id}
      item={role}
      resource={ProtectedResource.ROLES}
    >
      <h1 className="text-2xl">
        Preencha o formulário para {role ? "atualizar" : "cadastrar"} um cargo
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
