"use client";

import { SearchModule } from "@/components/SearchModule";
import { Column, SearchTable } from "@/components/SearchTable";
import { TableLink } from "@/components/TableLink";
import { Button } from "@/components/ui/button";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { getSeasonName, ProtectedResource, SeasonEntity } from "@repo/core";

export const SeasonSearchModule = () => {
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
      name: "Ano",
      key: "year",
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

        return <TableLink href={`seasons/${item.id}/edit`} text="Editar" />;
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
