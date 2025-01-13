"use client";

import { useRoleForm } from "@/app/admin/roles/schema";
import { BaseForm } from "@/components/form/BaseForm";
import { InputFormField } from "@/components/form/InputFormField";
import { MultiSelectFormField } from "@/components/form/MultiSelectFormField";
import { TextAreaFormField } from "@/components/form/TextAreaFormField";
import { search } from "@/services/crud/service";
import { PermissionEntity, ProtectedResource, RoleEntity } from "@repo/core";
import { useEffect, useState } from "react";

interface Props {
  role?: RoleEntity;
}

export const RoleForm = ({ role }: Props) => {
  const form = useRoleForm(role);

  const [permissions, setPermissions] = useState<PermissionEntity[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await search<PermissionEntity>({
          resource: ProtectedResource.PERMISSIONS,
          size: 50,
          page: 1,
        });

        setPermissions(response.data);
      } catch (_) {
        setPermissions([]);
      }
    })();
  }, []);

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

      {permissions && (
        <MultiSelectFormField
          control={form.control}
          name="permissionIds"
          label="Temporadas"
          items={permissions.map((permission) => ({
            id: permission.id,
            value: permission.name,
          }))}
        />
      )}
    </BaseForm>
  );
};
