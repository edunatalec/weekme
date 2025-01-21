"use client";

import { Badges } from "@/components/Badges";
import { SearchModule } from "@/components/SearchModule";
import { Column, SearchTable } from "@/components/SearchTable";
import { TableLink } from "@/components/TableLink";
import { Button } from "@/components/ui/button";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { ProtectedResource, UserEntity } from "@repo/core";

export const UserSearchModule = () => {
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
      render: (item) => {
        const items = item.roles.map((role) => role.name);

        return <Badges items={items} />;
      },
    },
    {
      render: (item) => {
        if (!hasPermission("update", item)) return;

        return <TableLink href={`users/${item.id}/edit`} text="Editar" />;
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
