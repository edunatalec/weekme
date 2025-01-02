"use client";

import { Menu } from "@/app/admin/_interfaces/menu";
import { usePermission } from "@/hooks/usePermission";
import { Module } from "@repo/core";
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
    module: Module.users,
  },
  {
    text: "Cargos",
    href: "/admin/roles",
    icon: <FolderLock />,
    module: Module.roles,
  },
  {
    text: "Permissões",
    href: "/admin/permissions",
    icon: <LockKeyhole />,
    module: Module.permissions,
  },
  {
    text: "Animes",
    href: "/admin/animes",
    icon: <TvMinimalPlay />,
    module: Module.animes,
  },
  {
    text: "Temporadas",
    href: "/admin/seasons",
    icon: <SunSnow />,
    module: Module.seasons,
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
      return hasPermission({ module: menu.module, action: "view" });
    });
  }, [hasPermission]);

  const currentMenu = filteredMenus.find((menu) => menu.href === pathname);

  return { filteredMenus, currentMenu };
};
