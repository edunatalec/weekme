"use client";

import { AnimeCards } from "@/app/admin/animes/_components/AnimeCards";
import { SearchModule } from "@/components/SearchModule";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { usePermission } from "@/hooks/usePermission";
import { AnimeEntity, ProtectedResource } from "@repo/core";

const Page = () => {
  const { hasPermission } = usePermission<ProtectedResource.ANIMES>(
    ProtectedResource.ANIMES,
  );

  const paginatedSearch = usePaginatedSearch<AnimeEntity>({
    resource: ProtectedResource.ANIMES,
    size: 20,
  });

  return (
    <SearchModule
      paginatedSearch={paginatedSearch}
      search={{
        placeholder: "Pesquise: One Piece...",
        button: hasPermission("create") ? "Novo anime" : undefined,
      }}
    >
      <div className="flex-1 overflow-auto px-4 py-1">
        <AnimeCards animes={paginatedSearch.items} />
      </div>
    </SearchModule>
  );
};

export default Page;
