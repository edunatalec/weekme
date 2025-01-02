"use client";

import MenuItem from "@/app/admin/_components/MenuItem";
import UserCard from "@/app/admin/_components/UserCard";
import { useMenus } from "@/app/admin/_hooks/useMenus";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface Props {
  onSelectedClick?: () => void;
}

const MenuItems = ({ onSelectedClick }: Props) => {
  const pathname = usePathname();
  const { filteredMenus } = useMenus();

  return (
    <div className="flex flex-1 flex-col gap-2">
      <UserCard />

      <ul className="flex flex-1 flex-col gap-2">
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

      <Button variant="ghost" className="justify-start p-2" size="lg" asChild>
        <Link href="/sign-in?logout">
          <LogOut />
          <span>Logout</span>
        </Link>
      </Button>
    </div>
  );
};

export default MenuItems;
