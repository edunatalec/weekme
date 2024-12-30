import { Module } from "@/hooks/usePermission";

export interface Menu {
  icon: React.ReactElement;
  text: string;
  href: string;
  module: Module;
}
