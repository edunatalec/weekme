"use client";

import { Menu } from "@/app/admin/_interfaces/menu";
import { usePermission } from "@/hooks/usePermission";
import { ProtectedResource } from "@repo/core";

import {
  FolderLock,
  LockKeyhole,
  SunSnow,
  TvMinimalPlay,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const menus: Menu[] = [
  {
    text: "Usuários",
    href: "/admin/users",
    icon: <User />,
    resource: ProtectedResource.USERS,
  },
  {
    text: "Cargos",
    href: "/admin/roles",
    icon: <FolderLock />,
    resource: ProtectedResource.ROLES,
  },
  {
    text: "Permissões",
    href: "/admin/permissions",
    icon: <LockKeyhole />,
    resource: ProtectedResource.PERMISSIONS,
  },
  {
    text: "Animes",
    href: "/admin/animes",
    icon: <TvMinimalPlay />,
    resource: ProtectedResource.ANIMES,
  },
  {
    text: "Temporadas",
    href: "/admin/seasons",
    icon: <SunSnow />,
    resource: ProtectedResource.SEASONS,
  },
];

export const useMenus = (): {
  filteredMenus: Menu[];
  currentMenu: Menu | undefined;
} => {
  const { hasPermission } = usePermission();
  const pathname = usePathname();

  const filteredMenus = useMemo(() => {
    return menus.filter((menu) => {
      return hasPermission({ resource: menu.resource, action: "view" });
    });
  }, [hasPermission]);

  const currentMenu = menus.find((menu) => menu.href === pathname);

  return { filteredMenus, currentMenu };
};
