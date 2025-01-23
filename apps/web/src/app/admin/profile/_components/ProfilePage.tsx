"use client";

import { ProfileForm } from "@/app/admin/profile/_components/ProfileForm";
import { ProfileUpdatePassword } from "@/app/admin/profile/_components/ProfileUpdatePassword";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const ProfilePage = () => {
  const [blockPage, setBlockPage] = useState<boolean>(false);

  const handleBlockPage = (value: boolean) => {
    setBlockPage(value);
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 p-4 pt-[4.5rem] md:pt-4",
        blockPage && "pointer-events-none",
      )}
    >
      <h1 className="text-3xl">Seu perfil</h1>

      <ProfileForm updateBlockPage={handleBlockPage} />
      <ProfileUpdatePassword updateBlockPage={handleBlockPage} />
    </div>
  );
};
