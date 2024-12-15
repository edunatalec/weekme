"use client";

import MenuItem from "@/app/admin/_components/MenuItem";
import UserCard from "@/app/admin/_components/UserCard";
import { menus } from "@/app/admin/_data/menus";
import { usePathname } from "next/navigation";

export interface Props {
  onSelectedClick?: () => void;
}

const MenuItems = ({ onSelectedClick }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-2">
      <UserCard />

      <ul className="flex flex-1 flex-col gap-2">
        {menus.map((item, index) => {
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
