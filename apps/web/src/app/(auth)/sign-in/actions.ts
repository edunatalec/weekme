"use server";

import { SignInFormData } from "@/app/(auth)/sign-in/schema";
import http from "@/services/http/http";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (data: SignInFormData): Promise<void> => {
  const response = await http.request({
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

  redirect("/admin");
};
