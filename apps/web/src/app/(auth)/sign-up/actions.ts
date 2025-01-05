"use server";

import { SignUpFormData } from "@/app/(auth)/sign-up/schema";
import http from "@/services/http/http";
import { TokenResponse } from "@repo/core";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (data: SignUpFormData): Promise<void> => {
  const response = await http.request<TokenResponse>({
    endpoint: "auth/sign-up",
    method: "POST",
    body: {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    },
  });

  (await cookies()).set("token", response.data.accessToken, {
    httpOnly: true,
    secure: true,
  });

  redirect("/admin");
};
