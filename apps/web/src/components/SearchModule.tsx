"use client";

import { useMenus } from "@/app/admin/_hooks/useMenus";
import { Center } from "@/components/Center";
import { Loader } from "@/components/Loader";
import { Pagination } from "@/components/Pagination";
import { PaginationStatus } from "@/components/PaginationStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UsePaginatedSearchResponse } from "@/hooks/usePaginatedSearch";
import { X } from "lucide-react";
import Link from "next/link";

export interface Props {
  readonly paginatedSearch: UsePaginatedSearchResponse<any>;
  readonly search: {
    readonly placeholder: string;
    readonly button?: string;
  };
  readonly children: React.ReactNode;
}

export const SearchModule = ({
  paginatedSearch,
  search: { placeholder, button },
  children,
}: Props) => {
  const {
    search,
    loading,
    onSearchChange,
    error,
    fetchingMore,
    meta,
    canEnablePaginationItem,
    currentPage,
    pagination,
    onPaginationClick,
  } = paginatedSearch;

  const { currentMenu } = useMenus();

  return (
    <div className="flex h-full flex-col gap-4 py-4 antialiased">
      <div className="flex gap-2 px-4">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            value={search}
            disabled={loading}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-14"
          />

          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => onSearchChange("")}
            >
              <X />
            </Button>
          )}
        </div>

        {button && (
          <Button variant="default" asChild>
            <Link href={`${currentMenu?.href}/new`}>{button}</Link>
          </Button>
        )}
      </div>

      {loading && (
        <Center className="flex-1">
          <Loader />
        </Center>
      )}

      {error && <Center className="flex-1">{error}</Center>}

      {!error && !loading && (
        <>
          {fetchingMore && (
            <Center className="flex-1">
              <Loader />
            </Center>
          )}

          {!fetchingMore && children}

          <PaginationStatus meta={meta} className="px-4" />

          <Pagination
            canEnablePaginationItem={canEnablePaginationItem}
            currentPage={currentPage}
            items={pagination}
            onPaginationClick={onPaginationClick}
          />
        </>
      )}
    </div>
  );
};
