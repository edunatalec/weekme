"use server";

import http from "@/services/http/http";
import {
  FetchPageableItems,
  FetchPageableItemsProps,
} from "@/types/pagination.type";
import { Pageable, UserEntity } from "@repo/core";

export const fetchUsers: FetchPageableItems = async <T = UserEntity>({
  page,
  size,
  search,
}: FetchPageableItemsProps) => {
  console.log("user");
  const response = await http.request<Pageable<T>>({
    endpoint: "users",
    method: "GET",
    queryParams: {
      page: `${page}`,
      size: `${size}`,
      ...search,
    },
  });

  return response.data;
};
