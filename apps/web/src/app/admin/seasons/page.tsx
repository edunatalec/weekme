"use client";

import { SearchModule } from "@/components/SearchModule";
import { Column, SearchTable } from "@/components/SearchTable";
import { Button } from "@/components/ui/button";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { getSeasonName, ProtectedResource, SeasonEntity } from "@repo/core";
import Link from "next/link";

const Page = () => {
  const { hasPermission } = usePermission<ProtectedResource.SEASONS>(
    ProtectedResource.SEASONS,
  );

  const paginatedSearch = usePaginatedSearch<SeasonEntity>({
    resource: ProtectedResource.SEASONS,
    size: 20,
    searchName: "year",
  });

  const columns: Column<SeasonEntity>[] = [
    {
      name: "ID",
      key: "id",
    },
    {
      name: "Nome",
      key: "name",
      render: (item) => getSeasonName(item.name),
    },
    {
      name: "Exibindo",
      key: "show",
      render: (season) => (season.show ? "Sim" : "Não"),
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
            href={`seasons/${item.id}/edit`}
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
        placeholder: "Pesquise: 2025...",
        button: hasPermission("create") ? "Nova temporada" : undefined,
      }}
    >
      <SearchTable data={paginatedSearch.items} columns={columns} />
    </SearchModule>
  );
};

export default Page;
