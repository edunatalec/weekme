"use client";

import { getUsers } from "@/app/admin/users/actions";
import { UserEntity } from "@repo/core";
import { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      try {
        const response = await getUsers(page);

        setUsers(response.data);
      } catch (_) {}

      setLoading(false);
    };

    loadUsers();
  }, [page]);

  if (loading) return <span>loading...</span>;

  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-3xl">Usuários</h1>

      <div className="flex-1">
        <table className="w-full table-fixed overflow-x-auto text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Cargos</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b p-2">
                <th className="p-2">{user.id}</th>
                <td className="p-2">{user.fullName}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.active ? "Sim" : "Não"}</td>
                <td className="p-2">
                  {user.roles.map((role) => role.name).join(" ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span>{page}</span>
    </div>
  );
};

export default Page;
