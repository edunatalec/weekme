"use client";

import { fetchSeasons } from "@/app/admin/seasons/actions";
import { Center } from "@/components/Center";
import { Loader } from "@/components/Loader";
import { Pagination } from "@/components/Pagination";
import { PaginationStatus } from "@/components/PaginationStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePagination } from "@/hooks/usePagination";
import { getSeasonName, SeasonEntity } from "@repo/core";
import Link from "next/link";

const Page = () => {
  const {
    items: seasons,
    currentPage,
    loading,
    fetchingMore,
    error,
    meta,
    canEnablePaginationItem,
    pagination,
    onPaginationClick,
    search,
    onSearchInputChange,
  } = usePagination<SeasonEntity>({
    fetchItems: fetchSeasons,
    size: 20,
    searchName: "year",
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-2 px-4 py-2">
        <Input
          placeholder="2025..."
          defaultValue={search}
          disabled={loading}
          onChange={(e) => onSearchInputChange(e.target)}
        />

        <Button variant="default" asChild>
          <Link href={"seasons/new"}>Nova temporada</Link>
        </Button>
      </div>

      {loading && (
        <Center className="flex-1">
          <Loader />
        </Center>
      )}

      {error && <Center className="flex-1">{error}</Center>}

      {!error && !loading && (
        <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
          {fetchingMore && (
            <Center className="flex-1">
              <Loader />
            </Center>
          )}

          {!fetchingMore && (
            <div className="flex-1 overflow-auto rounded-md border">
              <table className="w-full table-auto text-left antialiased [&_td]:p-4 [&_th]:p-4 [&_tr]:border-b">
                <thead>
                  <tr className="sticky top-0 bg-background">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ano</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="border-b">
                  {seasons.map((season) => (
                    <tr
                      key={season.id}
                      className="text-sm font-normal leading-normal"
                    >
                      <td className="w-[320px] max-w-[320px] truncate">
                        {season.id}
                      </td>
                      <td>{getSeasonName(season.name)}</td>
                      <td>{season.year}</td>
                      <td>Editar</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <PaginationStatus meta={meta} className="md:px-4" />

          <Pagination
            canEnablePaginationItem={canEnablePaginationItem}
            currentPage={currentPage}
            items={pagination}
            onPaginationClick={onPaginationClick}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
