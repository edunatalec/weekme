"use client";

import { usePermission } from "@/hooks/usePermission";
import { ProtectedResource, UserEntity } from "@repo/core";
import { Pencil, Trash } from "lucide-react";

interface Props {
  users: UserEntity[];
}

export const UsersTable = ({ users }: Props) => {
  const { hasPermission } = usePermission();

  return (
    <div className="flex-1 overflow-auto rounded-md border">
      <table className="w-full text-left">
        <thead className="sticky top-0 bg-primary text-primary-foreground">
          <tr>
            <th className="p-4">ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Cargos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-card">
              <th className="p-4">{user.id}</th>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.active ? "Ativo" : "Desativado"}</td>
              <td>
                <div className="flex flex-wrap gap-1 py-2">
                  {user.roles.map((role) => (
                    <div
                      key={role.id}
                      className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground"
                    >
                      {role.name}
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <div className="flex gap-2">
                  {hasPermission<ProtectedResource.USERS>({
                    resource: ProtectedResource.USERS,
                    action: "update",
                    data: user,
                  }) && <Pencil className="text-blue-500" />}

                  {hasPermission<ProtectedResource.USERS>({
                    resource: ProtectedResource.USERS,
                    action: "delete",
                    data: user,
                  }) && <Trash className="text-red-500" />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
