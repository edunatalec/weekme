"use client";

import { SearchModule } from "@/components/SearchModule";
import { Column, SearchTable } from "@/components/SearchTable";
import { Button } from "@/components/ui/button";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";

import { ProtectedResource, UserEntity } from "@repo/core";
import Link from "next/link";

const Page = () => {
  const { hasPermission } = usePermission<ProtectedResource.USERS>(
    ProtectedResource.USERS,
  );

  const paginatedSearch = usePaginatedSearch<UserEntity>({
    resource: ProtectedResource.USERS,
    size: 20,
  });

  const columns: Column<UserEntity>[] = [
    {
      name: "ID",
      key: "id",
    },
    {
      name: "Nome",
      key: "fullName",
    },
    {
      name: "Status",
      key: "active",
      render: (item) => (item.active ? "Ativo" : "Desativado"),
    },
    {
      name: "Cargos",
      key: "roles",
      render: (item) => (
        <div className="flex flex-wrap gap-1 py-2">
          {item.roles.map((role) => (
            <div
              key={role.id}
              className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground"
            >
              {role.name}
            </div>
          ))}
        </div>
      ),
    },
    {
      render: (item) => {
        if (!hasPermission("update", item)) return;

        return (
          <Link
            href={`users/${item.id}/edit`}
            className="text-primary underline-offset-4 hover:underline"
          >
            Editar
          </Link>
        );
      },
    },
    {
      render: (item) => {
        if (
          (item.active && !hasPermission("delete", item)) ||
          (!item.active && !hasPermission("update", item))
        )
          return;

        return (
          <Button
            variant="link"
            size="auto"
            onClick={() => paginatedSearch.toggleActiveStatus(item)}
          >
            {item.active ? "Desativar" : "Ativar"}
          </Button>
        );
      },
    },
  ];

  return (
    <SearchModule
      paginatedSearch={paginatedSearch}
      search={{
        placeholder: "Pesquise: Ana...",
      }}
    >
      <SearchTable data={paginatedSearch.items} columns={columns} />
    </SearchModule>
  );
};

export default Page;
