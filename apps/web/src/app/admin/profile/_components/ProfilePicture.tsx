import { urlValidator } from "@/validators/url";
import Image from "next/image";
import React from "react";

interface Props {
  avatarUrl: string | undefined | null;
}

export const ProfilePicture = ({ avatarUrl }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <span>Foto de perfil</span>
      <div className="relative size-52">
        {urlValidator.safeParse(avatarUrl).success ? (
          <Image
            src={avatarUrl!}
            fill
            sizes="100%"
            width={0}
            height={0}
            className="rounded-full"
            alt=""
            priority
          />
        ) : (
          <div className="h-full w-full rounded-full border border-dotted" />
        )}
      </div>
    </div>
  );
};
