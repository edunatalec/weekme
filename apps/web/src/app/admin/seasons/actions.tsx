"use server";

import http from "@/services/http/http";
import {
  FetchPageableItems,
  FetchPageableItemsProps,
} from "@/types/pagination.type";
import { Pageable, SeasonEntity } from "@repo/core";

export const fetchSeasons: FetchPageableItems = async <T = SeasonEntity,>({
  page,
  size,
  search,
}: FetchPageableItemsProps) => {
  const response = await http.request<Pageable<T>>({
    endpoint: "seasons",
    method: "GET",
    queryParams: {
      page: `${page}`,
      size: `${size}`,
      ...search,
    },
  });

  return response.data;
};
