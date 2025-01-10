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
  readonly items: T[];
  readonly meta: Meta;
  readonly currentPage: number;
  readonly pagination: PaginationData[];
  readonly onPaginationClick: (page: PaginationData) => void;
  readonly canEnablePaginationItem: (page: PaginationData) => boolean;
  readonly onSearchInputChange: (e: HTMLInputElement) => void;
  readonly error: string | null;
  readonly search: string | undefined;
}

interface UsePaginationProps {
  readonly fetchItems: FetchPageableItems;
  readonly size?: number;
  readonly searchName?: string;
}

export const usePagination = <T>({
  fetchItems,
  size,
  searchName = "name",
}: UsePaginationProps): UsePaginationResponse<T> => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPageValue = useMemo((): number => {
    const page = params.get("page");

    return Math.max(Number(page) || MIN_PAGE_VALUE, MIN_PAGE_VALUE);
  }, [params]);

  const initialSerchValue = useMemo((): string | undefined => {
    const search = params.get("search");

    if (!search || search.length < 3) return;

    return search;
  }, [params]);

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<T[]>([]);
  const [search, setSearch] = useState<{ [key: string]: any }>({
    ...(initialSerchValue && {
      [searchName]: initialSerchValue,
    }),
  });
  const [currentPage, setCurrentPage] = useState<number>(initialPageValue);
  const [meta, setMeta] = useState<Meta>({ count: 0, page: 0, totalPages: 0 });
  const [error, setError] = useState<string | null>(null);

  const searchTimer = useRef<NodeJS.Timeout>();

  const updateSearchUrl = useCallback(
    (values: { [key: string]: string }) => {
      const searchParams = new URLSearchParams(params);

      for (const key in values) {
        const value = values[key];

        if (value) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      }

      router.push(`${pathname}?${searchParams}`);
    },
    [router, pathname, params],
  );

  const onSearchInputChange = (e: HTMLInputElement) => {
    const value = e.value;

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      if (value.length < 3) {
        setSearch((current) => ({
          ...current,
          [searchName]: undefined,
        }));
      } else {
        setSearch((current) => ({ ...current, [searchName]: value }));
      }

      updateSearchUrl({ search: value });
    }, 800);
  };

  const handleFetchItems = useCallback(async () => {
    try {
      setError(null);

      const response = await fetchItems<T>({
        page: currentPage,
        size: size ?? 10,
        search,
      });

      setItems(response.data);
      setMeta(response.meta);
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setError((error as Error).message);
      setItems([]);
      setMeta({ count: 0, page: 0, totalPages: 0 });
    }
  }, [size, fetchItems, currentPage, search]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      await handleFetchItems();

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetchItems]);

  useEffect(() => {
    updateSearchUrl({
      page: currentPage.toString(),
      search: search[searchName],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pagination = useMemo<PaginationData[]>(() => {
    if (meta.totalPages === 0) return [];

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

      updateSearchUrl({ page: page.toString() });
    },
    [canEnablePaginationItem, updateSearchUrl, currentPage],
  );

  return {
    items,
    loading,
    meta,
    currentPage,
    pagination,
    onPaginationClick,
    canEnablePaginationItem,
    onSearchInputChange,
    error,
    search: search[searchName],
  };
};
