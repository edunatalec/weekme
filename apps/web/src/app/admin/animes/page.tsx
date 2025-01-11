"use client";

import { AnimeCards } from "@/app/admin/animes/_components/AnimeCards";
import { fetchAnimes } from "@/app/admin/animes/actions";
import { Center } from "@/components/Center";
import { Loader } from "@/components/Loader";
import { Pagination } from "@/components/Pagination";
import { PaginationStatus } from "@/components/PaginationStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePagination } from "@/hooks/usePagination";
import { AnimeEntity } from "@repo/core";
import Link from "next/link";

const Page = () => {
  const {
    items: animes,
    loading,
    fetchingMore,
    pagination,
    meta,
    currentPage,
    onPaginationClick,
    canEnablePaginationItem,
    onSearchInputChange,
    error,
    search,
  } = usePagination<AnimeEntity>({
    fetchItems: fetchAnimes,
    size: 20,
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-2 px-4 py-2">
        <Input
          placeholder="One piece..."
          defaultValue={search}
          disabled={loading}
          onChange={(e) => onSearchInputChange(e.target)}
        />

        <Button variant="default" asChild>
          <Link href={"animes/new"}>Novo anime</Link>
        </Button>
      </div>

      {loading && (
        <Center className="flex-1">
          <Loader />
        </Center>
      )}

      {error && <Center className="flex-1">{error}</Center>}

      {!error && !loading && (
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 pt-2 md:p-0 md:pb-4">
          {fetchingMore && (
            <Center className="flex-1">
              <Loader />
            </Center>
          )}

          {!fetchingMore && (
            <div className="flex-1 md:overflow-y-auto md:px-4 md:py-2">
              <AnimeCards animes={animes} />
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
