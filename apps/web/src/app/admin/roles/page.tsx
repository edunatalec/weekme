"use client";

import { SearchModule } from "@/components/SearchModule";
import { Column, SearchTable } from "@/components/SearchTable";
import { Button } from "@/components/ui/button";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { ProtectedResource, RoleEntity } from "@repo/core";
import Link from "next/link";

const Page = () => {
  const { hasPermission } = usePermission<ProtectedResource.ROLES>(
    ProtectedResource.ROLES,
  );

  const paginatedSearch = usePaginatedSearch<RoleEntity>({
    resource: ProtectedResource.ROLES,
    size: 20,
  });

  const columns: Column<RoleEntity>[] = [
    {
      name: "ID",
      key: "id",
    },
    {
      name: "Nome",
      key: "name",
    },
    {
      name: "Status",
      key: "active",
      render: (item) => (item.active ? "Ativo" : "Desativado"),
    },
    {
      render: (item) => {
        if (!hasPermission("update", item)) return;

        return (
          <Link
            href={`roles/${item.id}/edit`}
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
        placeholder: "Pesquise: Admin...",
        button: hasPermission("create") ? "Novo cargo" : undefined,
      }}
    >
      <SearchTable data={paginatedSearch.items} columns={columns} />
    </SearchModule>
  );
};

export default Page;
