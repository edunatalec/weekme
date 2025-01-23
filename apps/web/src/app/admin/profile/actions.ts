"use server";

import { ProfileFormData } from "@/app/admin/profile/profile-schema";
import { UpdatePasswordFormData } from "@/app/admin/profile/update-password-schema";
import http from "@/services/http/http";

export const updateProfile = async (data: ProfileFormData): Promise<void> => {
  await http.request({
    endpoint: "profile",
    method: "PATCH",
    body: data,
  });
};

export const updatePassword = async (
  data: UpdatePasswordFormData,
): Promise<void> => {
  await http.request({
    endpoint: "profile/password",
    method: "PATCH",
    body: {
      currentPassword: data.currentPassword,
      newPassword: data.password,
    },
  });
};
