"use client";

import { AnimeCard } from "@/app/admin/animes/_components/AnimeCard";
import { SearchModule } from "@/components/SearchModule";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { AnimeEntity, ProtectedResource } from "@repo/core";

export const AnimeSearchModule = () => {
  const { hasPermission } = usePermission<ProtectedResource.ANIMES>(
    ProtectedResource.ANIMES,
  );

  const paginatedSearch = usePaginatedSearch<AnimeEntity>({
    resource: ProtectedResource.ANIMES,
    size: 20,
  });

  const animes = paginatedSearch.items;

  return (
    <SearchModule
      paginatedSearch={paginatedSearch}
      search={{
        placeholder: "Pesquise: One Piece...",
        button: hasPermission("create") ? "Novo anime" : undefined,
      }}
    >
      <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 overflow-auto px-4 py-1">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </SearchModule>
  );
};
