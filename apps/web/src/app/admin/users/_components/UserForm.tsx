"use client";

import { useUserForm } from "@/app/admin/users/schema";
import { BaseForm } from "@/components/form/BaseForm";
import { InputFormField } from "@/components/form/InputFormField";
import { MultiSelectFormField } from "@/components/form/MultiSelectFormField";
import { search } from "@/services/crud/service";
import { ProtectedResource, RoleEntity, UserEntity } from "@repo/core";
import { useEffect, useState } from "react";

interface Props {
  user?: UserEntity;
}

export const UserForm = ({ user }: Props) => {
  const form = useUserForm(user);

  const [roles, setRoles] = useState<RoleEntity[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await search<RoleEntity>({
          resource: ProtectedResource.ROLES,
          size: 50,
          page: 1,
        });

        setRoles(response.data);
      } catch (_) {
        setRoles([]);
      }
    })();
  }, []);

  return (
    <BaseForm
      {...form}
      id={user?.id}
      item={user}
      resource={ProtectedResource.USERS}
    >
      <h1 className="text-2xl">
        Preencha o formulário para {user ? "atualizar" : "cadastrar"} o usuário
      </h1>

      <InputFormField control={form.control} name="fullName" label="Nome" />

      {roles && (
        <MultiSelectFormField
          control={form.control}
          name="roleIds"
          label="Cargos"
          items={roles.map((role) => ({
            id: role.id,
            value: role.name,
          }))}
        />
      )}
    </BaseForm>
  );
};
