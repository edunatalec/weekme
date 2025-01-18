"use server";

import { SignInFormData } from "@/app/(auth)/sign-in/schema";
import http from "@/services/http/http";
import { TokenResponse } from "@repo/core";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (
  data: SignInFormData,
  redirectTo: string | null,
): Promise<void> => {
  const response = await http.request<TokenResponse>({
    endpoint: "auth/sign-in",
    method: "POST",
    body: {
      email: data.email,
      password: data.password,
    },
  });

  (await cookies()).set("token", response.data.accessToken, {
    httpOnly: true,
    secure: true,
  });

  redirect(redirectTo ?? "/admin");
};
