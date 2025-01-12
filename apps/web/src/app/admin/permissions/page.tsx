"use client";

import { SearchModule } from "@/components/SearchModule";
import { Column, SearchTable } from "@/components/SearchTable";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { PermissionEntity, ProtectedResource } from "@repo/core";
import Link from "next/link";

const Page = () => {
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

        return (
          <Link
            href={`permissions/${item.id}/edit`}
            className="text-primary underline-offset-4 hover:underline"
          >
            Editar
          </Link>
        );
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

export default Page;
