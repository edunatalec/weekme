"use client";

import { SearchModule } from "@/components/SearchModule";
import { Column, SearchTable } from "@/components/SearchTable";
import { TableLink } from "@/components/TableLink";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { PermissionEntity, ProtectedResource } from "@repo/core";

export const PermissionSeachModule = () => {
  const { hasPermission } = usePermission<ProtectedResource.PERMISSIONS>(
    ProtectedResource.PERMISSIONS,
  );

  const paginatedSearch = usePaginatedSearch<PermissionEntity>({
    resource: ProtectedResource.PERMISSIONS,
    size: 20,
  });

  const columns: Column<PermissionEntity>[] = [
    {
      name: "ID",
      key: "id",
    },
    {
      name: "Nome",
      key: "name",
    },
    {
      render: (item) => {
        if (!hasPermission("update", item)) return;

        return <TableLink href={`permissions/${item.id}/edit`} text="Editar" />;
      },
    },
  ];

  return (
    <SearchModule
      paginatedSearch={paginatedSearch}
      search={{
        placeholder: "Pesquise: Admin...",
      }}
    >
      <SearchTable data={paginatedSearch.items} columns={columns} />
    </SearchModule>
  );
};
