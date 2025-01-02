"use client";

import { FetchPageableItems } from "@/types/pagination.type";
import { Meta } from "@repo/core";
import { isRedirectError } from "next/dist/client/components/redirect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MIN_PAGE_VALUE = 1;

export type PaginationType = "number" | "skip" | "previous" | "next";

export interface PaginationData {
  type: PaginationType;
  value?: number;
}

interface UsePaginationResponse<T> {
  readonly loading: boolean;
  readonly fetchingMore: boolean;
  readonly items: T[];
  readonly meta: Meta;
  readonly currentPage: number;
  readonly pagination: PaginationData[];
  readonly onPaginationClick: (page: PaginationData) => void;
  readonly canEnablePaginationItem: (page: PaginationData) => boolean;
}

interface UsePaginationProps {
  readonly fetchItems: FetchPageableItems;
}

export const usePagination = <T>({
  fetchItems,
}: UsePaginationProps): UsePaginationResponse<T> => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPageValue = useMemo((): number => {
    const page = params.get("page");

    return Math.max(Number(page) || MIN_PAGE_VALUE, MIN_PAGE_VALUE);
  }, [params]);

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [items, setItems] = useState<T[]>([]);
  const [search, setSearch] = useState<{ [key: string]: any }>({});
  const [currentPage, setCurrentPage] = useState<number>(initialPageValue);
  const [meta, setMeta] = useState<Meta>({ count: 0, page: 0, totalPages: 0 });

  const navigated = useRef(false);

  const handleFetchItems = useCallback(async () => {
    try {
      const response = await fetchItems<T>({
        page: currentPage,
        size: 10,
        search,
      });

      setItems(response.data);
      setMeta(response.meta);
    } catch (error) {
      if (isRedirectError(error)) throw error;
    }
  }, [fetchItems, currentPage, search]);

  useEffect(() => {
    (async () => {
      if (navigated.current) {
        if (currentPage > meta.totalPages) return;
        setFetchingMore(true);

        await handleFetchItems();

        setFetchingMore(false);

        navigated.current = false;
      } else {
        setLoading(true);

        await handleFetchItems();

        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetchItems]);

  useEffect(() => {
    router.push(`${pathname}?page=${currentPage}`);
  }, [currentPage, pathname, router]);

  const pagination = useMemo<PaginationData[]>(() => {
    const items: PaginationData[] = [];

    if (meta.totalPages > 5) {
      const base = <PaginationData[]>[
        {
          type: "number",
          value: currentPage - 1,
        },
        {
          type: "number",
          value: currentPage,
        },
        {
          type: "number",
          value: currentPage + 1,
        },
      ].filter((item) => !(item.value <= 1 || item.value >= meta.totalPages));

      items.push(...base);

      while (items.length < 3) {
        if (currentPage < (items.at(-1)!.value as number)) {
          items.push({
            type: "number",
            value: (items.at(-1)!.value as number) + 1,
          });
        } else {
          items.unshift({
            type: "number",
            value: (items.at(0)!.value as number) - 1,
          });
        }
      }

      if ((items.at(0)!.value as number) > MIN_PAGE_VALUE + 1) {
        items.unshift({ type: "skip" });
      }

      if ((items.at(-1)!.value as number) < meta.totalPages - 1) {
        items.push({ type: "skip" });
      }

      items.unshift({ type: "number", value: MIN_PAGE_VALUE });
      items.push({ type: "number", value: meta.totalPages });
    } else {
      items.push(
        ...(Array.from({ length: meta.totalPages }, (_, i) => ({
          type: "number",
          value: i + 1,
        })) as PaginationData[]),
      );
    }

    items.unshift({ type: "previous" });
    items.push({ type: "next" });

    return [...items];
  }, [currentPage, meta.totalPages]);

  const canEnablePaginationItem = useCallback(
    (item: PaginationData): boolean => {
      switch (item.type) {
        case "skip":
          return false;
        case "previous":
          return !(currentPage - 1 < MIN_PAGE_VALUE);
        case "next":
          return !(currentPage + 1 > meta.totalPages);
        case "number":
          return !(item.value === currentPage);
      }
    },
    [meta.totalPages, currentPage],
  );

  const onPaginationClick = useCallback(
    (item: PaginationData) => {
      if (!canEnablePaginationItem(item)) return;

      let page: number;

      if (item.type === "previous") {
        page = currentPage - 1;
      } else if (item.type === "next") {
        page = currentPage + 1;
      } else {
        page = item.value!;
      }

      setCurrentPage(page);
      navigated.current = true;

      router.push(`${pathname}?page=${page}`);
    },
    [canEnablePaginationItem, pathname, router, currentPage],
  );

  return {
    fetchingMore,
    items,
    loading,
    meta,
    currentPage,
    pagination,
    onPaginationClick,
    canEnablePaginationItem,
  };
};
