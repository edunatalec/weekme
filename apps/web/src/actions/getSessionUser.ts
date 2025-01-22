"use server";

import http from "@/services/http/http";
import { UserEntity } from "@repo/core";
import { cookies } from "next/headers";

export const getSessionUser = async (): Promise<UserEntity | null> => {
  const token = (await cookies()).get("token");

  if (!token) return null;

  const response = await http.request<UserEntity>({
    endpoint: "profile",
    method: "GET",
  });

  return response.data;
};
