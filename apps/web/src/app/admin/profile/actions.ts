"use server";

import { ProfileFormData } from "@/app/admin/profile/schema";
import http from "@/services/http/http";

export const updateProfile = async (data: ProfileFormData): Promise<void> => {
  await http.request({
    endpoint: "profile",
    method: "PATCH",
    body: data,
  });
};
