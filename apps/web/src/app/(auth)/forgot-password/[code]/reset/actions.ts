"use server";

import http from "@/services/http/http";
import { redirect } from "next/navigation";

interface Params {
  email: string;
  code: string;
  password: string;
}

export const resetPassword = async (data: Params): Promise<void> => {
  await http.request<{ message: string }>({
    endpoint: "forgot-password/update-password",
    method: "POST",
    body: {
      email: data.email,
      code: data.code,
      password: data.password,
    },
  });

  redirect("/sign-in");
};
