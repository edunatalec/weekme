"use server";

import { postApi } from "@/utils/postApi";
import { cookies } from "next/headers";

interface User {
  email: string;
  password: string;
}

export const signIn = async (user: User): Promise<boolean> => {
  const response = await fetch(postApi("/auth/sign-in"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  (await cookies()).set("token", data.accessToken, {
    httpOnly: true,
    secure: true,
  });

  return data;
};
