"use server";

import http from "@/services/http/http";
import { UserEntity } from "@repo/core";
import { cookies } from "next/headers";

export const getSessionUser = async (): Promise<UserEntity | null> => {
  const token = (await cookies()).get("token");

  if (!token) return null;

  try {
    const response = await http.request({
      endpoint: "me",
      method: "GET",
    });

    return response.data;
  } catch (_) {
    return null;
  }
};
