"use client";

import {
  remove,
  search as searchService,
  update,
} from "@/services/crud/service";
import { getErrorMessage } from "@/utils/error";
import { BaseEntity, Meta, ProtectedResource } from "@repo/core";
import { isRedirectError } from "next/dist/client/components/redirect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MIN_PAGE_VALUE = 1;

export type PaginationType = "number" | "skip" | "previous" | "next";

export interface PaginationData {
  type: PaginationType;
  value?: number;
}

export interface UsePaginatedSearchResponse<T> {
  readonly loading: boolean;
  readonly fetchingMore: boolean;
  readonly items: T[];
  readonly meta: Meta;
  readonly currentPage: number;
  readonly pagination: PaginationData[];
  readonly error: string | null;
  readonly search: string | undefined;

  readonly onPaginationClick: (page: PaginationData) => void;
  readonly canEnablePaginationItem: (page: PaginationData) => boolean;
  readonly onSearchChange: (value: string) => void;
  readonly toggleActiveStatus: (value: T) => Promise<void>;
}

interface UsePaginatedSearchProps {
  readonly resource: ProtectedResource;
  readonly size?: number;
  readonly searchName?: string;
}

export const usePaginatedSearch = <T extends BaseEntity>({
  resource,
  size,
  searchName = "name",
}: UsePaginatedSearchProps): UsePaginatedSearchResponse<T> => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPageValue = useMemo((): number => {
    const page = params.get("page");

    return Math.max(Number(page) || MIN_PAGE_VALUE, MIN_PAGE_VALUE);
  }, [params]);

  const initialSearchValue = useMemo((): string | undefined => {
    const search = params.get("search");

    if (!search) return;

    return search;
  }, [params]);

  const initialFiltersValue = useMemo((): { [key: string]: string } => {
    let filters = {};

    if (initialSearchValue) {
      filters = {
        ...filters,
        ...{
          [searchName]: initialSearchValue,
        },
      };
    }

    return filters;
  }, [initialSearchValue, searchName]);

  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [items, setItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPageValue);
  const [meta, setMeta] = useState<Meta>({ count: 0, page: 0, totalPages: 0 });
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(initialSearchValue || "");
  const [filters, setFilters] = useState<{ [key: string]: string }>(
    initialFiltersValue,
  );

  const searchTimer = useRef<NodeJS.Timeout>();
  const oldSearch = useRef<string>();
  const navigated = useRef<boolean>(false);

  const updateUrlSearchParams = useCallback(
    (values: { [key: string]: string | undefined }) => {
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

  const onSearchChange = (value: string) => {
    setSearch(value);

    value = value.trim();

    if (value.length === 0) {
      return clearSearch();
    }

    if (searchTimer.current) clearTimeout(searchTimer.current);

    searchTimer.current = setTimeout(() => {
      if (oldSearch.current !== value) {
        updateUrlSearchParams({ search: value, page: "1" });

        oldSearch.current = value;

        setFilters((current) => ({ ...current, [searchName]: value }));

        setCurrentPage(1);
      } else if (value.length === 0) {
        clearSearch();
      }
    }, 800);
  };

  const clearSearch = () => {
    clearTimeout(searchTimer.current);

    updateUrlSearchParams({ search: "", page: "1" });

    oldSearch.current = undefined;

    setFilters((current) => {
      const { [searchName]: _, ...filters } = current;

      return filters;
    });

    setCurrentPage(1);
  };

  const toggleActiveStatus = async ({ id, active }: T) => {
    setFetchingMore(true);

    try {
      if (active) {
        await remove({ id, resource });
      } else {
        await update({
          id,
          data: { active: true },
          resource,
        });
      }
    } catch (error) {
      // TODO: Aparecer uma mensagem toast
      if (isRedirectError(error)) throw error;
    }

    await handleFetchItems();

    setFetchingMore(false);
  };

  const handleFetchItems = useCallback(async () => {
    try {
      setError(null);

      const response = await searchService<T>({
        page: currentPage,
        size: size ?? 10,
        filters,
        resource,
      });

      setItems(response.data);
      setMeta(response.meta);
    } catch (error) {
      if (isRedirectError(error)) throw error;

      setError(getErrorMessage(error));
      setItems([]);
      setMeta({ count: 0, page: 0, totalPages: 0 });
    }
  }, [size, resource, currentPage, filters]);

  useEffect(() => {
    (async () => {
      if (navigated.current) {
        setFetchingMore(true);

        await handleFetchItems();

        navigated.current = false;
        setFetchingMore(false);
      } else {
        setLoading(true);

        await handleFetchItems();

        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetchItems]);

  useEffect(() => {
    updateUrlSearchParams({
      page: currentPage.toString(),
      search: filters[searchName],
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

      navigated.current = true;

      setCurrentPage(page);

      updateUrlSearchParams({ page: page.toString() });
    },
    [canEnablePaginationItem, updateUrlSearchParams, currentPage],
  );

  return {
    items,
    loading,
    meta,
    currentPage,
    pagination,
    onPaginationClick,
    canEnablePaginationItem,
    onSearchChange,
    error,
    fetchingMore,
    search,
    toggleActiveStatus,
  };
};
