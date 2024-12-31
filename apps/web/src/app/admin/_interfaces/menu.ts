import { Module } from "@repo/core";

export interface Menu {
  icon: React.ReactElement;
  text: string;
  href: string;
  module: Module;
}
