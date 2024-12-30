"use client";

import { Menu } from "@/app/admin/_interfaces/menu";
import { usePermission } from "@/hooks/usePermission";
import {
  FolderLock,
  LockKeyhole,
  SunSnow,
  TvMinimalPlay,
  User,
} from "lucide-react";
import { useMemo } from "react";

const menus: Menu[] = [
  { text: "Usuários", href: "/admin/users", icon: <User />, module: "users" },
  {
    text: "Cargos",
    href: "/admin/roles",
    icon: <FolderLock />,
    module: "roles",
  },
  {
    text: "Permissões",
    href: "/admin/permissions",
    icon: <LockKeyhole />,
    module: "permissions",
  },
  {
    text: "Animes",
    href: "/admin/animes",
    icon: <TvMinimalPlay />,
    module: "animes",
  },
  {
    text: "Temporadas",
    href: "/admin/seasons",
    icon: <SunSnow />,
    module: "seasons",
  },
];

export const useFilteredMenus = () => {
  const { hasPermission } = usePermission();

  const filteredMenus = useMemo(() => {
    return menus.filter((menu) => {
      return hasPermission({ module: menu.module, action: "view" });
    });
  }, [hasPermission]);

  return filteredMenus;
};
