"use client";

import { getUsers } from "@/app/admin/users/actions";
import { cn } from "@/lib/utils";
import { Meta, UserEntity } from "@repo/core";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const Page = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [page, setPage] = useState(
    Math.min(Math.max(Number(params.get("page")) || 1, 1)),
  );
  const [meta, setMeta] = useState<Meta>({ count: 0, page: 0, totalPages: 0 });
  const [pagination, setPagination] = useState<number[]>([]);

  const paginationMap: { [key: string]: ReactNode } = {
    "-2": "Anterior",
    "-1": <Ellipsis />,
    "0": "Próximo",
  };

  // useEffect(() => {
  //   const currentPage = Math.min(Math.max(Number(params.get("page")) || 1, 1));

  //   setPage(currentPage);
  //   router.push(`${pathname}?page=${currentPage}`);
  // }, [params, pathname, router]);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      try {
        const response = await getUsers(page);

        setUsers(response.data);
        setMeta(response.meta);
      } catch (_) {}

      setLoading(false);
    };

    loadUsers();
  }, [page]);

  useEffect(() => {
    const items = [];

    if (meta.totalPages > 5) {
      items.push(
        ...[page - 1, page, page + 1].filter(
          (item) => !(item <= 1 || item >= meta.totalPages),
        ),
      );

      if (items.length < 3) {
        while (items.length !== 3) {
          if (page < items.at(-1)!) {
            items.push(items.at(-1)! + 1);
          } else {
            items.unshift(items.at(0)! - 1);
          }
        }
      }

      if (items.at(0)! > 2) {
        items.unshift(-1);
      }

      if (items.at(-1)! < meta.totalPages - 1) {
        items.push(-1);
      }

      items.unshift(1);
      items.push(meta.totalPages);
    } else {
      items.push(...Array.from({ length: meta.totalPages }, (_, i) => i + 1));
    }

    items.unshift(-2);
    items.push(0);

    setPagination([...items]);
  }, [page, meta.totalPages]);

  const handlePaginationClick = (value: number) => {
    if (value === -1) return;

    let newPage: number;

    if (value === -2) {
      if (page - 1 < 1) return;

      newPage = page - 1;
    } else if (value === 0) {
      if (page + 1 > meta.totalPages) return;

      newPage = page + 1;
    } else {
      newPage = value;
    }

    setPage(newPage);

    router.push(`${pathname}?page=${newPage}`);
  };

  if (loading) return <span>loading...</span>;

  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-3xl">Usuários</h1>

      <div className="flex-1 overflow-x-auto rounded-md border">
        <table className="w-full overflow-x-auto rounded-md text-left">
          <thead className="sticky top-0 z-10 bg-primary text-primary-foreground">
            <tr>
              <th className="p-4">ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Cargos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-card">
                <th className="px-4 py-2">{user.id}</th>
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
                    <Pencil className="text-blue-500" />
                    <Trash className="text-red-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="text-right text-xs">
        {"Mostrando "}
        <b>
          {meta.page}-{meta.totalPages}
        </b>
        {" de "}
        <b>{meta.count}</b>
      </span>

      <nav className="flex justify-center">
        <ul className="flex gap-1">
          {pagination.map((item, i) => {
            const skip = item === -1;

            return (
              <li
                key={i}
                className={cn(
                  !skip && "cursor-pointer hover:bg-card",
                  page === item && "border",
                  "rounded-sm px-4 py-2",
                )}
                onClick={() => handlePaginationClick(item)}
              >
                {paginationMap[item.toString()] || item}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Page;
