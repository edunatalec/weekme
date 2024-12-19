"use client";

import Drawer from "@/app/admin/_components/Drawer";
import ToggleTheme from "@/app/admin/_components/ToggleTheme";
import IconButton from "@/components/IconButton";
import { Menu } from "lucide-react";
import { useReducer } from "react";

const Header = () => {
  const [openMenu, toggleMenu] = useReducer((menu: boolean) => !menu, false);

  return (
    <>
      <header className="fixed z-10 h-14 w-full border-b bg-background/60 backdrop-blur-sm md:hidden">
        <nav className="flex h-full items-center gap-2 px-2">
          <IconButton onClick={toggleMenu}>
            <Menu />
          </IconButton>

          <span className="flex-1">WeekMe</span>

          <ToggleTheme />
        </nav>
      </header>

      <Drawer open={openMenu} toggleMenu={toggleMenu} />
    </>
  );
};

export default Header;
