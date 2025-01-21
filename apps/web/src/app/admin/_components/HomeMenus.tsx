"use client";

import { useMenus } from "@/app/admin/_hooks/useMenus";
import { Button } from "@/components/ui/button";

export const HomeMenus = () => {
  const { filteredMenus } = useMenus();

  return (
    <div className="flex max-w-sm flex-wrap justify-center gap-2">
      {filteredMenus.map((menu, index) => {
        return (
          <Button key={index} variant="outline" asChild>
            <a href={menu.href}>{menu.text}</a>
          </Button>
        );
      })}
    </div>
  );
};
