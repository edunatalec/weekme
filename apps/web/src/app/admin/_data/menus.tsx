import { Menu } from "@/app/admin/_interfaces/menu";
import {
  FolderLock,
  LockKeyhole,
  SunSnow,
  TvMinimalPlay,
  User,
} from "lucide-react";

export const menus: Menu[] = [
  { text: "Usuários", href: "/admin/users", icon: <User /> },
  { text: "Cargos", href: "/admin/roles", icon: <FolderLock /> },
  { text: "Permissões", href: "/admin/permissions", icon: <LockKeyhole /> },
  { text: "Animes", href: "/admin/animes", icon: <TvMinimalPlay /> },
  { text: "Temporadas", href: "/admin/seasons", icon: <SunSnow /> },
];
