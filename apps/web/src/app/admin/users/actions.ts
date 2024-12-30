"use server";

import http from "@/services/http/http";
import { Pageable, UserEntity } from "@repo/core";

export const getUsers = async (page: number): Promise<Pageable<UserEntity>> => {
  const response = await http.request<Pageable<UserEntity>>({
    endpoint: "users",
    method: "GET",
    queryParams: {
      page: `${page}`,
    },
  });

  return response.data;
};
