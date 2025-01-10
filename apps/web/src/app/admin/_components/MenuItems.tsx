"use client";

import MenuItem from "@/app/admin/_components/MenuItem";
import UserCard from "@/app/admin/_components/UserCard";
import { useMenus } from "@/app/admin/_hooks/useMenus";
import { usePathname } from "next/navigation";

export interface Props {
  onSelectedClick?: () => void;
}

const MenuItems = ({ onSelectedClick }: Props) => {
  const pathname = usePathname();
  const { filteredMenus } = useMenus();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <UserCard className="mx-4" />

      <ul className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {filteredMenus.map((item, index) => {
          return (
            <MenuItem
              key={index}
              item={item}
              onSelectedClick={onSelectedClick}
              currentPathname={pathname}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MenuItems;
