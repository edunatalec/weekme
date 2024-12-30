"use server";

import http from "@/services/http/http";
import { UserEntity } from "@repo/core";

export const getUsers = async (page: number): Promise<UserEntity[]> => {
  const response = await http.request({
    endpoint: "users",
    method: "GET",
    queryParams: {
      page: `${page}`,
    },
  });

  console.log(response.data.data[0].roles[0].name);

  return response.data.data;
};
