"use client";

import { useSession } from "@/contexts/SessionProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
}

const UserCard = ({ className }: Props) => {
  const { user } = useSession();

  return (
    <Link
      href="/admin/profile"
      className={cn(
        "flex items-center gap-3 rounded-md bg-card px-2 py-2 dark:md:bg-zinc-950",
        className,
      )}
    >
      <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground">
        {user!.avatarUrl ? (
          <Image
            src={user!.avatarUrl}
            fill
            sizes="100%"
            alt="Imagem de perfil"
            priority
          />
        ) : (
          user!.fullName.charAt(0).toUpperCase()
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <span className="text-lg font-bold">{user?.fullName}</span>

        <div className="flex flex-wrap gap-2">
          {user?.roles.map((role) => (
            <span key={role.id} className="rounded-sm bg-primary px-1 text-sm">
              {role.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
